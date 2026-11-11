// Focused source-render preview; no build, CMS access or baseline modifications.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { parse } from 'node-html-parser';
import { renderedPages } from './audit-window-copy.mjs';
import { startStatic } from '../migration/verify/local-server.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = renderedPages().find(page => page.route === '/about').html;
const doc = parse(html);
const old = parse(await fs.readFile(path.join(root, 'migration/baseline/dist-html/about/index.html'), 'utf8'));
const selector = '.story-timeline-717';
const timeline = doc.querySelector(selector);
const items = timeline.querySelectorAll(':scope > li');
const dates = items.map(item => item.querySelector('.story-history-date').text);
assert.deepEqual(dates, ['1987', 'Late 1980s', '1992', 'Mid-1990s', 'Mid to late 1990s', '2026']);
const previous = old.querySelectorAll(selector + ' > li');
assert.deepEqual(items.map(item => item.outerHTML), previous.map(item => item.outerHTML).reverse(), 'Only item order changes: copy, images, alt text, IDs and attributes are byte-identical');
assert.equal(timeline.getAttribute('aria-label'), 'Tint A Window history, oldest to newest');
assert(doc.querySelector('#our-archive .eyebrow').text.includes('From the beginning to today'));
const previousMain = old.querySelector('#main').innerHTML;
const nextMain = doc.querySelector('#main').innerHTML;
assert.equal(nextMain.replace(doc.querySelector('#our-archive').outerHTML, '<ARCHIVE>'), previousMain.replace(old.querySelector('#our-archive').outerHTML, '<ARCHIVE>'), 'About content outside timeline unchanged');
console.log('PASS source DOM: chronological dates; all six cards byte-identical after reversal; outside timeline unchanged.');
console.log('Caption:', items[3].querySelector('figcaption').text);

process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.join(root, 'migration/verify/browsers');
const server = await startStatic(path.join(root, 'public'));
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: path.join(process.env.PLAYWRIGHT_BROWSERS_PATH,
    'chromium_headless_shell-1254/chrome-headless-shell-win64/chrome-headless-shell.exe') });
  for (const width of [360, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route(server.origin + '/about', route => route.fulfill({ contentType: 'text/html', body: html }));
    await page.goto(server.origin + '/about', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#our-archive img').evaluateAll(async images => {
      await Promise.all(images.map(image => { image.loading = 'eager'; return image.decode().catch(() => {}); }));
    });
    const measure = list => {
      const style = getComputedStyle(list, '::before');
      const lineCenter = parseFloat(style.left) + parseFloat(style.width) / 2;
      const cards = [...list.children].map(item => {
        const dot = getComputedStyle(item, '::before');
        const box = item.getBoundingClientRect();
        const article = item.querySelector('article');
        return {
          date: item.querySelector('.story-history-date').textContent,
          background: getComputedStyle(article).backgroundColor,
          dotCenter: parseFloat(dot.left) + parseFloat(dot.width) / 2 + (dot.boxSizing === 'border-box' ? 0 : parseFloat(dot.borderLeftWidth)),
          top: box.top, bottom: box.bottom,
          dotTop: parseFloat(dot.top), dotHeight: parseFloat(dot.height) + (dot.boxSizing === 'border-box' ? 0 : 2 * parseFloat(dot.borderTopWidth)),
          height: box.height,
        };
      });
      return { lineCenter, lineTop: style.top, lineBottom: style.bottom, cards,
        overflow: document.documentElement.scrollWidth > innerWidth };
    };
    const metrics = await page.locator(selector).evaluate(measure);
    const baselinePage = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await baselinePage.route(server.origin + '/about-baseline', route => route.fulfill({ contentType: 'text/html', body: old.toString() }));
    await baselinePage.goto(server.origin + '/about-baseline', { waitUntil: 'networkidle' });
    const baselineMetrics = await baselinePage.locator(selector).evaluate(measure);
    assert.equal(metrics.lineTop, baselineMetrics.lineTop);
    assert.equal(metrics.lineBottom, baselineMetrics.lineBottom);
    assert.equal(metrics.lineCenter, baselineMetrics.lineCenter);
    for (const card of metrics.cards) assert.equal(card.dotCenter - metrics.lineCenter,
      baselineMetrics.cards[0].dotCenter - baselineMetrics.lineCenter, 'Dot/line offset is unchanged from baseline');
    await baselinePage.close();
    assert.equal(metrics.cards[0].background, 'rgb(41, 60, 58)');
    assert.equal(metrics.cards.at(-1).background, 'rgb(41, 60, 58)');
    assert(!metrics.overflow, 'No horizontal overflow');
    assert(parseFloat(metrics.lineTop) >= metrics.cards[0].dotTop && parseFloat(metrics.lineTop) <= metrics.cards[0].dotTop + metrics.cards[0].dotHeight, 'Line begins within first dot');
    assert(metrics.cards.at(-1).height - parseFloat(metrics.lineBottom) > metrics.cards.at(-1).dotTop + metrics.cards.at(-1).dotHeight / 2, 'Line reaches final dot');
    for (let i = 1; i < metrics.cards.length; i++) assert(metrics.cards[i].top >= metrics.cards[i - 1].bottom - 1);
    assert.deepEqual(errors, []);
    const screenshot = path.join(root, `migration/verify/about-timeline-${width}-current.png`);
    await page.locator('#our-archive').screenshot({ path: screenshot });
    console.log(`PASS ${width}px: endpoint highlights, chronological DOM, line/dot alignment, no overlap/overflow/page errors; ${JSON.stringify(metrics)}`);
    await page.close();
  }
} finally {
  await browser?.close();
  await server.close();
}
