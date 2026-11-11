import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { projectRoot, exportRoot } from '../../scripts/lib/baseline.mjs';
import { startStatic } from './local-server.mjs';

const oldSiteRoot = path.resolve(
  process.env.TINT_REFERENCE_DIR ||
  path.join(projectRoot, '../Tint-A-Window-backups/root-legacy-before-flatten-20261111/website/dist')
);

const onlyCase = process.argv[2] || '';
const suffix = process.env.VERIFY_SUFFIX || '';
const log = path.join(projectRoot, onlyCase ? `migration/verify/browser-recheck${suffix}.log` : `migration/verify/browser-results${suffix}.log`);
await fs.writeFile(log, '');
async function emit(kind, result) { await fs.appendFile(log, JSON.stringify({ kind, ...result }) + '\n'); console.log(kind, result.site || '', result.path || result.test || '', result.mode || result.width || '', result.pass); }
const servers = { old: await startStatic(oldSiteRoot), new: await startStatic(exportRoot) };
const expectedScripts = ['/enquiry-flow.js', '/site.js', '/team-ui-715.js'];
const browser = await chromium.launch();
const settings = width => ({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light', locale: 'en-NZ', timezoneId: 'Pacific/Auckland', serviceWorkers: 'block' });
try {
  console.log('Chromium', browser.version());
  for (const [site, server] of (onlyCase ? [] : Object.entries(servers))) {
    const source404 = await fs.readFile(path.join(site === 'old' ? oldSiteRoot : exportRoot, '404.html'), 'utf8');
    const rows = [];
    for (const pathname of ['/', '/about', '/about/', '/404.html', '/__phase4_missing__']) {
      const response = await fetch(server.origin + pathname, { redirect: 'manual' });
      const text = await response.text();
      rows.push({ pathname, status: response.status, location: response.headers.get('location'), fallbackBytesMatch: pathname === '/__phase4_missing__' ? text === source404 : null });
    }
    await emit('http', { site, pass: rows.every(row => row.status === (row.pathname === '/__phase4_missing__' ? 404 : 200)) && rows.at(-1).fallbackBytesMatch, rows });
  }
  // Block Next JS until the original classic scripts have initialized and user
  // values/references are recorded. This measures identity across real hydration.
  for (const mode of (onlyCase ? [] : ['normal', 'slow'])) for (const site of ['old', 'new']) {
    for (const pathname of ['/', '/locations', '/locations/christchurch', '/contact-for-window-tinting', '/residential-window-tinting/privacy-window-films']) {
      const context = await browser.newContext(settings(1440));
      let release;
      const gate = new Promise(resolve => { release = resolve; });
      const errors = [], warnings = [], requests = [];
      try {
        await context.addInitScript(() => {
          window.__phase4 = { loads: [], commits: 0 };
          document.addEventListener('load', event => {
            if (event.target instanceof HTMLScriptElement && event.target.src) window.__phase4.loads.push(new URL(event.target.src).pathname);
          }, true);
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { supportsFiber: true, renderers: new Map(), inject(renderer) { this.renderers.set(1, renderer); return 1; }, checkDCE() {}, onCommitFiberRoot() { window.__phase4.commits++; }, onCommitFiberUnmount() {}, onScheduleFiberRoot() {} };
        });
        await context.route('**/*', async route => {
          const url = new URL(route.request().url());
          if (url.pathname.startsWith('/_next/') && url.pathname.endsWith('.js')) await gate;
          await route.continue();
        });
        const page = await context.newPage();
        page.setDefaultTimeout(15000);
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); if (message.type() === 'warning') warnings.push(message.text()); });
        page.on('request', req => { if (expectedScripts.some(name => req.url().endsWith(name)) || req.url().includes('shoot-media-715.js')) requests.push(new URL(req.url()).pathname); });
        if (mode === 'slow') {
          const cdp = await context.newCDPSession(page);
          await cdp.send('Network.enable');
          await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 160 * 1024, uploadThroughput: 64 * 1024, connectionType: 'cellular3g' });
          await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
        }
        await page.goto(servers[site].origin + pathname, { waitUntil: 'commit', timeout: 60000 });
        await page.waitForFunction(() => window.__phase4.loads.includes('/team-ui-715.js'), { timeout: 45000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 45000 });
        let field = page.locator('main input[name="name"]');
        if (!await field.count()) {
          await page.locator('header .nav-quote').click();
          field = page.locator('.quote-dialog input[name="name"]');
        }
        await field.fill('Phase 4 retained value');
        const before = await page.evaluate(() => {
          const selectors = ['main#main', 'main#main > section', '.photo-carousel', '.photo-rail-controls', '.locations-visit-frame', '.travel-note', '[data-enquiry-form] input', '[data-enquiry-form] select', '[data-enquiry-form] textarea', 'dialog.quote-dialog'];
          window.__phase4.refs = selectors.map(selector => ({ selector, nodes: [...document.querySelectorAll(selector)] }));
          const formState = () => [...document.querySelectorAll('[data-enquiry-form]')].map(form => ({ id: form.dataset.enquiryForm, name: form.querySelector('[name=name]')?.value, property: form.querySelector('[name=property]')?.value, checked: [...form.querySelectorAll('input[name=services]:checked')].map(el => el.value) }));
          window.__phase4.formState = formState;
          return { commits: window.__phase4.commits, counts: window.__phase4.refs.map(({ selector, nodes }) => [selector, nodes.length]), forms: formState(), dialogOpen: document.querySelector('.quote-dialog').open };
        });
        release();
        await page.waitForLoadState('networkidle', { timeout: 90000 });
        let commitObserved = site === 'old';
        if (site === 'new') commitObserved = await page.waitForFunction(() => window.__phase4.commits > 0, { timeout: 15000 }).then(() => true, () => false);
        await page.waitForTimeout(mode === 'slow' ? 2000 : 600);
        const after = await page.evaluate(() => ({
          commits: window.__phase4.commits,
          identity: window.__phase4.refs.map(({ selector, nodes }) => ({ selector, beforeCount: nodes.length, afterCount: document.querySelectorAll(selector).length, retained: nodes.every((node, i) => node.isConnected && document.querySelectorAll(selector)[i] === node) })),
          forms: window.__phase4.formState(), dialogOpen: document.querySelector('.quote-dialog').open,
          scriptLoads: window.__phase4.loads.filter(src => ['/enquiry-flow.js', '/site.js', '/team-ui-715.js', '/shoot-media-715.js'].includes(src)),
        }));
        const pass = commitObserved && before.commits === 0 && after.identity.every(row => row.retained && row.beforeCount === row.afterCount) && JSON.stringify(before.forms) === JSON.stringify(after.forms) && before.dialogOpen === after.dialogOpen && JSON.stringify(after.scriptLoads) === JSON.stringify(expectedScripts) && JSON.stringify(requests) === JSON.stringify(expectedScripts) && errors.length === 0;
        await emit('hydration', { site, path: pathname, mode, pass, commitObserved, before, after, requests, errors, warnings });
      } catch (error) { await emit('hydration', { site, path: pathname, mode, pass: false, error: error.message, errors, warnings, requests }); }
      finally { release(); await context.close(); }
    }
  }

  const cases = [
    ['menus', '/', async (page, width) => {
      if (width === 360) { await page.locator('.mobile-toggle').click(); assert.equal(await page.locator('#site-nav').evaluate(el => el.classList.contains('open')), true); }
      const toggle = page.locator('.nav-toggle').first();
      // Desktop pointer-enter already opens the group; clicking then toggles it
      // closed. Exercise hover on desktop and click on the touch/mobile layout.
      if (width === 360) await toggle.click();
      else await page.locator('.nav-group').first().hover();
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape'); assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      if (width === 360) { await page.keyboard.press('Escape'); assert.equal(await page.locator('.mobile-toggle').getAttribute('aria-expanded'), 'false'); }
    }],
    ['quote-dialog-focus', '/', async (page, width) => {
      const opener = page.locator(width === 360 ? 'header .mobile-quote' : 'header .nav-quote');
      await opener.click(); assert.equal(await page.locator('.quote-dialog').evaluate(el => el.open), true);
      await page.locator('.quote-dialog-close').click(); assert.equal(await page.locator('.quote-dialog').evaluate(el => el.open), false);
      assert.equal(await opener.evaluate(el => document.activeElement === el), true);
    }],
    ...[['homepage', '/', 'main [data-enquiry-form="homepage"]'], ['contact', '/contact-for-window-tinting', 'main [data-enquiry-form="contact"]'], ['popup', '/', '.quote-dialog [data-enquiry-form]']].map(([name, pathname, selector]) => [`form-${name}-validation-files`, pathname, async (page, width) => {
      if (name === 'popup') await page.locator(width === 360 ? 'header .mobile-quote' : 'header .nav-quote').click();
      const form = page.locator(selector);
      await form.locator('button[type=submit]').click();
      assert.equal(await form.evaluate(el => el.checkValidity()), false);
      await form.locator('[name=name]').fill('Verification User'); await form.locator('[name=email]').fill('verify@example.invalid');
      await form.locator('[name=city]').fill('Christchurch'); await form.locator('[name=message]').fill('Local verification only.');
      await form.locator('[name=property]').selectOption('Residential');
      assert.equal(await form.evaluate(el => el.checkValidity()), true);
      const photo = form.locator('[name=photos]');
      const small = { name: 'sample.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a2ioAAAAASUVORK5CYII=', 'base64') };
      await photo.setInputFiles(Array.from({ length: 6 }, (_, i) => ({ ...small, name: `sample-${i}.png` })));
      assert.match(await photo.evaluate(el => el.validationMessage), /up to five/i);
      await photo.setInputFiles({ ...small, buffer: Buffer.alloc(5 * 1024 * 1024 + 1) }); assert.match(await photo.evaluate(el => el.validationMessage), /5 MB/i);
      await photo.setInputFiles({ name: 'invalid.txt', mimeType: 'text/plain', buffer: Buffer.from('invalid') }); assert.match(await photo.evaluate(el => el.validationMessage), /JPG, PNG or WebP/i);
      await form.locator('[data-clear-photos]').click(); assert.equal(await photo.evaluate(el => el.files.length), 0); assert.equal(await form.evaluate(el => el.checkValidity()), true);
    }]),
    ['gallery-filter-lightbox', '/window-tinting-gallery', async page => {
      const all = await page.locator('[data-category]').count(); await page.locator('[data-filter="Commercial"]').click();
      const visible = await page.locator('[data-category]:not([hidden])').count(); assert.ok(visible > 0 && visible < all);
      const photo = page.locator('[data-photo]:not([hidden])').first(); await photo.click(); assert.equal(await page.locator('.lightbox').evaluate(el => el.open), true);
      await page.locator('.lightbox-close').click(); assert.equal(await photo.evaluate(el => document.activeElement === el), true);
    }],
    ['faq-search', '/window-tinting-faq', async page => {
      await page.locator('#faq-search').fill('privacy'); assert.match(await page.locator('#faq-search-status').textContent(), /matching question/);
      await page.locator('#faq-search').fill('zzzzunlikelyverificationterm'); assert.match(await page.locator('#faq-search-status').textContent(), /No matching questions/);
      await page.locator('#faq-search').fill(''); assert.equal(await page.locator('#faq-search-status').textContent(), '');
    }],
    ['carousel-arrows', '/', async page => {
      const track = page.locator('.photo-carousel').first(); await track.scrollIntoViewIfNeeded();
      const next = track.locator('xpath=following-sibling::*[contains(@class,"photo-rail-controls")][1]').locator('button').last();
      await next.click(); await page.waitForTimeout(200); assert.ok(await track.evaluate(el => el.scrollLeft > 0));
    }],
    ['review-autoplay', '/', async page => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const track = page.locator('.review-reel'); await track.scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0); const start = await track.evaluate(el => el.scrollTop);
      await page.waitForTimeout(2800); assert.ok(await track.evaluate(el => el.scrollTop) > start);
    }],
    ['thank-you-direct', '/thank-you', async page => { assert.equal(await page.locator('main h1').textContent(), 'Your enquiry.'); assert.equal(await page.evaluate(() => (window.dataLayer || []).length), 0); }],
    ['receipt-completion-once', '/contact-for-window-tinting', async page => {
      const form = page.locator('main [data-enquiry-form]');
      for (const [name, value] of Object.entries({ name: 'Verification User', email: 'verify@example.invalid', city: 'Christchurch', message: 'Local verification only.' })) await form.locator(`[name=${name}]`).fill(value);
      await form.locator('[name=property]').selectOption('Residential');
      await form.locator('button[type=submit]').click(); await page.waitForURL('**/thank-you');
      assert.equal(await page.locator('main h1').textContent(), 'Your next step: speak with our team.');
      assert.equal(await page.evaluate(() => (window.dataLayer || []).filter(row => row.event === 'enquiry_preview_complete').length), 1);
      await page.reload({ waitUntil: 'networkidle' }); assert.equal(await page.locator('main h1').textContent(), 'Your enquiry.'); assert.equal(await page.evaluate(() => (window.dataLayer || []).length), 0);
    }],
    ['native-document-navigation', '/', async (page, width) => {
      const before = await page.evaluate(() => performance.timeOrigin);
      if (width === 360) await page.locator('.mobile-toggle').click();
      await page.locator('#site-nav .nav-group > a').first().click(); await page.waitForURL('**/residential-window-tinting-services');
      assert.notEqual(await page.evaluate(() => performance.timeOrigin), before);
    }],
  ];
  for (const site of ['old', 'new']) for (const width of [1440, 360]) for (const [test, pathname, run] of cases.filter(([name]) => !onlyCase || name === onlyCase)) {
    const context = await browser.newContext(settings(width));
    try {
      const page = await context.newPage(); page.setDefaultTimeout(10000);
      await page.goto(servers[site].origin + pathname, { waitUntil: 'networkidle', timeout: 45000 });
      await run(page, width);
      await emit('behavior', { site, width, test, pass: true });
    } catch (error) { await emit('behavior', { site, width, test, pass: false, error: error.message }); }
    finally { await context.close(); }
  }
} finally {
  await browser.close();
  await Promise.all(Object.values(servers).map(server => server.close()));
}
