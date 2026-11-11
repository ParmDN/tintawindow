// Run only in an explicitly authorised verification phase.
// node scripts/parity/capture.mjs <site-directory> <screenshot-directory>
// Requires the dev-only playwright package and its Chromium browser.
import http from 'node:http';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { chromium } from 'playwright';

const [directory, destination] = process.argv.slice(2);
if (!directory || !destination) throw new Error('Usage: capture.mjs <site-directory> <screenshot-directory>');
const root = await fs.realpath(path.resolve(directory));
const output = path.resolve(destination);
const within = (base, file) => file === base || file.startsWith(base + path.sep);
if (within(root, output)) throw new Error('Screenshots must be outside the served directory.');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.vtt': 'text/vtt; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
async function isFile(file) { return fs.stat(file).then(s => s.isFile(), () => false); }
async function htmlFiles(dir) {
  const files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(file));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(file);
  }
  return files.sort();
}
// Discover the actual export, including utility/review pages; no routes.json needed.
const routes = (await htmlFiles(root)).map(file => {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '/' : relative.endsWith('/index.html') ? '/' + relative.slice(0, -11) : relative === '404.html' ? '/404.html' : '/' + relative.slice(0, -5);
  return { route, image: relative.replace(/\.html$/, '.png') };
});
if (!routes.length) throw new Error('No HTML files found. Serve website/dist or the complete Next export, not the HTML-only baseline.');
const server = http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400).end(); return; }
    let file = path.resolve(root, '.' + pathname);
    if (!within(root, file)) { res.writeHead(403).end(); return; }
    if ((await fs.stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
    if (!await isFile(file) && !path.extname(pathname)) {
      // Support both directory-index legacy output and trailingSlash:false Next output.
      const clean = path.resolve(root, '.' + pathname);
      file = await isFile(clean + '.html') ? clean + '.html' : path.join(clean, 'index.html');
    }
    let status = 200;
    if (!await isFile(file)) { file = path.join(root, '404.html'); status = 404; }
    if (!await isFile(file)) { res.writeHead(404).end(); return; }
    file = await fs.realpath(file);
    if (!within(root, file)) { res.writeHead(403).end(); return; }
    res.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : await fs.readFile(file));
  } catch (error) { if (!res.headersSent) res.writeHead(500); res.end(); console.error(error); }
});
let browser;
try {
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
  for (const width of [360, 768, 1440]) {
    for (const { route, image } of routes) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light', locale: 'en-NZ', timezoneId: 'Pacific/Auckland', serviceWorkers: 'block' });
      try {
        const page = await context.newPage();
        const failures = [];
        page.on('pageerror', e => failures.push(e.message));
        page.on('requestfailed', r => failures.push(`${r.url()}: ${r.failure()?.errorText}`));
        page.on('response', r => { if (r.status() >= 400 && new URL(r.url()).pathname !== '/404.html') failures.push(`${r.status()} ${r.url()}`); });
        const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
        if (!response || ![200, ...(route === '/404.html' ? [404] : [])].includes(response.status())) throw new Error(`Unexpected response for ${route}: ${response?.status()}`);
        await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}' });
        // Visit the whole document so native lazy loading and observers settle.
        await page.evaluate(async () => {
          await document.fonts.ready;
          // Offscreen horizontal rails can keep native lazy images unloaded.
          // Decode them too, without changing src/srcset/sizes or layout.
          document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; });
          let y = 0;
          for (let step = 0; step < 500; step++) {
            window.scrollTo(0, y);
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            if (y >= document.documentElement.scrollHeight - innerHeight) break;
            y = Math.min(y + Math.max(200, innerHeight * .75), document.documentElement.scrollHeight - innerHeight);
          }
          const images = [...document.images].filter(img => img.currentSrc || img.getAttribute('src'));
          await Promise.all(images.map(async img => {
            if (!img.complete) await new Promise((resolve, reject) => {
              const timeout = setTimeout(() => reject(new Error(`Image timed out: ${img.currentSrc || img.src}`)), 15000);
              img.addEventListener('load', () => { clearTimeout(timeout); resolve(); }, { once: true });
              img.addEventListener('error', () => { clearTimeout(timeout); reject(new Error(`Image failed: ${img.currentSrc || img.src}`)); }, { once: true });
            });
            if (!img.naturalWidth) throw new Error(`Image failed: ${img.currentSrc || img.src}`);
            await img.decode();
          }));
          document.querySelectorAll('video').forEach(video => { video.pause(); });
          document.querySelectorAll('.photo-carousel,[data-reel-track],.mobile-card-rail').forEach(el => { el.scrollLeft = 0; el.scrollTop = 0; });
          window.scrollTo(0, 0);
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        });
        if (failures.length) throw new Error(`${route}:\n${failures.join('\n')}`);
        // Verification-only paint warmup for the previously observed gallery
        // compositor issue. Identical on both sites; no masks or altered images.
        if (route === '/window-tinting-gallery') {
          const end = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
          for (let y = 0; y <= end + 600; y += 600) {
            await page.evaluate(y => window.scrollTo(0, y), Math.min(y, end));
            await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
            await page.screenshot({ animations: 'disabled', caret: 'hide' });
          }
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
        }
        const target = path.join(output, String(width), image);
        await fs.mkdir(path.dirname(target), { recursive: true });
        await page.screenshot({ path: target, fullPage: true, animations: 'disabled', caret: 'hide' });
        console.log(`${width} ${route} -> ${target}`);
      } finally { await context.close(); }
    }
  }
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
