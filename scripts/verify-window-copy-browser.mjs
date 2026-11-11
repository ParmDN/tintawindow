// Local static-export smoke checks; no remote host/CMS or publication.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { parse } from 'node-html-parser';
import { runtimeRows } from './audit-window-copy.mjs';
import { startStatic } from '../migration/verify/local-server.mjs';

const routes = ['/about', '/residential-window-tinting/privacy-window-films', '/residential-window-tinting/heat-control-window-films', '/commercial-window-tinting/anti-glare-window-films'];
const server = await startStatic(path.resolve('out'));
const browser = await chromium.launch({ headless: true, executablePath: path.resolve('migration/verify/browsers/chromium_headless_shell-1254/chrome-headless-shell-win64/chrome-headless-shell.exe') });
try {
  for (const route of routes) for (const width of [360, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    const errors = [], warnings = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' || /hydrat/i.test(message.text())) warnings.push(message.text());
    });
    await page.goto(server.origin + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const expected = parse(fs.readFileSync(path.join('out', route.slice(1), 'index.html'), 'utf8'));
    assert.equal(await page.title(), expected.querySelector('title').text);
    assert.deepEqual(await page.locator('nav .overview').allTextContents(), ['Explore Residential window films', 'Explore Commercial window films', 'Explore all locations']);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('h1').textContent(), expected.querySelector('h1').text);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if (route === '/about') {
      assert.deepEqual(await page.locator('.story-history-date').allTextContents(), ['1987', 'Late 1980s', '1992', 'Mid-1990s', 'Mid to late 1990s', '2026']);
      assert.equal(await page.locator('.story-timeline-717 figcaption').nth(2).textContent(), 'Mid-1990s · Family archive');
    }
    if (route.includes('/privacy-window-films')) {
      assert((await page.locator('main').innerText()).includes('For window privacy film installation in Christchurch'));
      assert(!(await page.locator('main').innerText()).includes('For Window privacy film installation in Christchurch'));
    }
    const rows = runtimeRows([{ route, html: await page.content() }], true);
    assert.deepEqual(rows.filter(row => row.status === 'REMAINING NON-EXCEPTION'), []);
    assert.deepEqual(errors, []);
    assert.deepEqual(warnings, []);
    const file = `migration/verify/window-copy-${route.replaceAll('/', '_')}-${width}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`PASS ${route} ${width}px: fresh export, headings/nav/brands, capitalization, ${route === '/about' ? 'chronological timeline, ' : ''}no overflow, no browser errors or hydration warnings; ${file}`);
    await page.close();
  }
  const gallery = await browser.newPage();
  await gallery.goto(server.origin + '/window-tinting-gallery', { waitUntil: 'networkidle' });
  assert.equal(await gallery.locator('[aria-label="Enlarge Window film at building scale"]').count(), 0);
  assert.equal(await gallery.locator('[aria-label="Enlarge window film at building scale"]').count(), 1);
  console.log('PASS gallery: lowercase aria-label, visible Window-at-heading-start retained.');
  await gallery.close();
} finally {
  await browser.close();
  await server.close();
}
