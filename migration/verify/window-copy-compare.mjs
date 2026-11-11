// Screenshot comparison crops: pre-patch source preview vs fresh static export.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { startStatic } from './local-server.mjs';
const routes = ['/about', '/residential-window-tinting/privacy-window-films', '/residential-window-tinting/heat-control-window-films', '/commercial-window-tinting/anti-glare-window-films'];
const server = await startStatic(path.resolve('out'));
const browser = await chromium.launch({ executablePath: path.resolve('migration/verify/browsers/chromium_headless_shell-1254/chrome-headless-shell-win64/chrome-headless-shell.exe') });
try {
  for (const route of routes) for (const phase of ['before', 'after']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
    if (phase === 'before') await page.route(server.origin + route, request => request.fulfill({ contentType: 'text/html', body: fs.readFileSync(path.join('migration/verify/window-copy-before', route.replaceAll('/', '_') + '.html'), 'utf8') }));
    await page.goto(server.origin + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const selector = route === '/about' ? '.story-timeline-717 > li:first-child' : 'main .revision-brief';
    const file = `migration/verify/window-copy-${phase}${route.replaceAll('/', '_')}-detail.png`;
    await page.locator(selector).screenshot({ path: file });
    console.log(`${phase} ${route}: ${file}`);
    await page.close();
  }
} finally { await browser.close(); await server.close(); }
