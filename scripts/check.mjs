// Plain Node, read-only, console output only. Do not run before Phase 4.
// node scripts/check.mjs [export-directory]
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { projectRoot, exportRoot, productionOrigin, readBaseline, htmlFiles, parseHtml, styleOrder } from './lib/baseline.mjs';
import { applyIntentionalOverrides, intentionalOverrides } from './check-overrides.mjs';

const errors = [];
const fail = message => errors.push(message);
const expect = (condition, message) => { if (!condition) fail(message); };
const root = await fs.realpath(process.argv[2] ? path.resolve(process.argv[2]) : exportRoot);
const within = file => file === root || file.startsWith(root + path.sep);
const statFile = file => fs.stat(file).then(stat => stat.isFile(), () => false);
const archivedBaseline = await readBaseline();
const baseline = applyIntentionalOverrides(archivedBaseline);
console.log(`Expectations: ${intentionalOverrides.reduce((count, page) => count + page.fields.length, 0)} reviewed field overrides on ${intentionalOverrides.length} pages; immutable archive validated; 34 expected documents.`);
const documents = new Map();
const loadedCss = new Map();
const cssVisited = new Set();
const binaryFiles = new Set();
let references = 0;
const localHosts = new Set([new URL(productionOrigin).hostname, 'tintawindow.co.nz', 'parity.invalid']);
const scriptsExpected = ['/enquiry-flow.js', '/site.js', '/team-ui-715.js'];

function single(document, selector, attr, label) {
  const nodes = document.querySelectorAll(selector);
  expect(nodes.length === 1, `${label}: expected one ${selector}, found ${nodes.length}`);
  return attr ? nodes[0]?.getAttribute(attr) : nodes[0]?.text;
}
function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]));
  return value;
}
async function documentAt(file) {
  if (!documents.has(file)) documents.set(file, parseHtml(await fs.readFile(file, 'utf8')));
  return documents.get(file);
}
function localUrl(reference, sourceUrl) {
  if (!reference?.trim() || /^(?:data|blob|mailto|tel):/i.test(reference)) return null;
  if (/^javascript:/i.test(reference)) throw new Error('javascript: link is not a native document URL');
  const url = new URL(reference.trim(), sourceUrl);
  if (!['http:', 'https:'].includes(url.protocol) || !localHosts.has(url.hostname)) return null;
  return url;
}
async function resolveFile(url) {
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { throw new Error(`Malformed URL encoding: ${url.href}`); }
  const file = path.resolve(root, '.' + pathname);
  if (!within(file)) throw new Error(`Reference escapes export: ${url.href}`);
  const candidates = [file, path.join(file, 'index.html')];
  if (!path.extname(pathname)) candidates.push(file + '.html');
  for (const candidate of candidates) {
    if (!await statFile(candidate)) continue;
    const real = await fs.realpath(candidate);
    if (!within(real)) throw new Error(`Reference symlink escapes export: ${url.href}`);
    return real;
  }
  throw new Error(`Unresolved internal reference: ${url.pathname}`);
}

async function checkReference(reference, sourceUrl, label, fragment = false) {
  try {
    const url = localUrl(reference, sourceUrl);
    if (!url) return;
    references++;
    const file = await resolveFile(url);
    binaryFiles.add(file);
    if (fragment && url.hash && url.hash !== '#') {
      const id = decodeURIComponent(url.hash.slice(1));
      if (/\.(?:html|svg)$/i.test(file)) {
        const document = file.endsWith('.html') ? await documentAt(file) : parseHtml(await fs.readFile(file, 'utf8'));
        const found = document.querySelectorAll('[id],[name]').some(el => el.getAttribute('id') === id || (el.rawTagName?.toLowerCase() === 'a' && el.getAttribute('name') === id));
        expect(found, `${label}: missing fragment #${id} in ${url.pathname}`);
      }
    }
    return { file, url };
  } catch (error) { fail(`${label}: ${error.message}`); }
}

function cssUrls(text) {
  return [...text.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi)].map(match => match[1] ?? match[2] ?? match[3]);
}
async function inspectCss(file, url) {
  if (cssVisited.has(file)) return;
  cssVisited.add(file);
  const css = await fs.readFile(file, 'utf8');
  for (const ref of cssUrls(css)) {
    if (!ref || ref.startsWith('#')) continue; // fragment-only SVG paint URLs refer to the document
    await checkReference(ref, url, `CSS ${path.relative(root, file)}`);
  }
  for (const match of css.matchAll(/@import\s+(?:url\(\s*)?["']([^"']+)["']/gi)) {
    const target = await checkReference(match[1], url, `CSS import ${path.relative(root, file)}`);
    if (target) await inspectCss(target.file, target.url);
  }
}

// Equivalent CSS is checked by input provenance plus compiled-bundle coverage.
// Minification changes whitespace/colours/selectors, so raw output byte matching
// would be invalid. Pixel parity still belongs to the Phase 4 browser comparison.
async function checkCssProvenance() {
  const chunks = [Buffer.from('@charset "UTF-8";\n')];
  for (const name of styleOrder) {
    let bytes = await fs.readFile(path.join(projectRoot, 'public', name));
    if (name === 'style.css') bytes = Buffer.from(bytes.toString('utf8').replace('@charset "UTF-8";', ''), 'utf8');
    chunks.push(Buffer.from(`\n/* Source: website/public/${name} */\n`), bytes);
  }
  const legacy = await fs.readFile(path.join(projectRoot, 'app', 'legacy.css'));
  expect(legacy.equals(Buffer.concat(chunks)), 'legacy.css no longer equals the 22 ordered public stylesheets with only @charset relocation.');
  const globals = await fs.readFile(path.join(projectRoot, 'app', 'globals.css'), 'utf8');
  expect([...globals.matchAll(/@import\s+["']\.\/legacy\.css["']/g)].length === 1, 'globals.css must import legacy.css exactly once.');
  expect(!/tailwindcss\/preflight|@import\s+["']tailwindcss["']/.test(globals), 'Preflight/default Tailwind reset must not be imported.');
  const markers = [
    ['fonts.css', ['font-0.ttf', 'font-1.ttf', 'font-2.ttf', 'font-3.ttf', 'font-4.ttf']],
    ['style.css', ['.skip', '.site-header', '.lightbox']],
    ['boutique.css', ['.boutique-scene', '.privacy-model']],
    ['brand.css', ['.brand-banner', '.mobile-quote']],
    ['surfaces.css', ['.aperture-lines', '.banner-frame']],
    ['revision.css', ['.revision-section', '.revision-next']],
    ['fresh.css', ['.fresh-credentials', '.fresh-hero']],
    ['polish.css', ['.atelier-footer', '.footer-contact-strip']],
    ['atelier.css', ['.benefit-composition', '.reasons-composition']],
    ['signature.css', ['.brand-film-mark', '.incoming-particle']],
    ['film-guide.css', ['.tint-reference-guide', '.sample-film']],
    ['refinement.css', ['.thank-you-section', '.home-installation']],
    ['responsive-sections.css', ['.archive-timeline', '.drag-scroll']],
    ['client-polish.css', ['.quote-dialog', '.quick-quote-form']],
    ['shoot-media-715.css', ['.hero-loop-poster', '.shoot-profile-grid']],
    ['team-ui-715.css', ['.locations-visit-frame', '.photo-rail-controls']],
    ['story-717.css', ['.story-team-717', '.story-timeline-717']],
    ['service-layout-717.css', ['.revision-guide', '.project-gallery-link']],
    ['launch-polish-717.css', ['--brand-yellow', '--sunwash']],
    ['team-ui-718.css', ['.photo-carousel', '.compact-gallery-717']],
    ['photo-alignment-719.css', ['shoot-bill-working', 'shoot-team-conversation']],
    ['placement-polish-720.css', ['shoot-roxana-support', '.home-installation-steps']],
  ];
  for (const [file, css] of loadedCss) {
    for (const [name, needles] of markers) {
      for (const needle of needles) expect(css.includes(needle), `${path.relative(root, file)}: missing ${name} coverage marker ${needle}`);
    }
    for (let i = 0; i <= 4; i++) {
      const occurrences = css.split(`font-${i}.ttf`).length - 1;
      expect(occurrences === 1, `${path.relative(root, file)}: font-${i}.ttf occurs ${occurrences} times; possible duplicated/missing legacy CSS.`);
    }
  }
}

const expectedFiles = new Set(baseline.map(page => page.relative));
const actualFiles = await htmlFiles(root);
for (const file of actualFiles) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  expect(expectedFiles.has(relative), `Unexpected exported HTML document: ${relative}`);
}
expect(actualFiles.length === 34, `Expected exactly 34 output HTML files, found ${actualFiles.length}.`);

for (const page of baseline) {
  const file = path.join(root, page.relative);
  if (!await statFile(file)) { fail(`Missing expected HTML: ${page.relative}`); continue; }
  const document = await documentAt(file);
  const label = page.route;
  const baseUrl = new URL(page.route, 'https://parity.invalid');
  expect(document.querySelectorAll('h1').length === 1, `${label}: expected exactly one h1.`);
  expect(document.querySelectorAll('main').length === 1 && document.querySelectorAll('main#main').length === 1, `${label}: expected one main#main and no extra main.`);
  expect(document.querySelectorAll('header.site-header').length === 1, `${label}: duplicated/missing header.`);
  expect(document.querySelectorAll('footer.site-footer').length === 1, `${label}: duplicated/missing footer.`);
  expect(document.querySelectorAll('dialog.quote-dialog').length === 1, `${label}: duplicated/missing quote dialog.`);
  expect(document.querySelector('body')?.getAttribute('class') === `fresh page-${page.type}`, `${label}: incorrect body class.`);
  const robots = document.querySelectorAll('meta[name="robots"]').map(el => (el.getAttribute('content') || '').toLowerCase().split(/\s*,\s*/));
  expect(robots.some(values => values.includes('noindex') && values.includes('nofollow')), `${label}: missing robots noindex, nofollow.`);
  expect(!robots.some(values => values.includes('index') || values.includes('follow')), `${label}: conflicting robots directive.`);
  for (const [selector, attr] of [['title', null], ['meta[name="description"]', 'content'], ['link[rel="canonical"]', 'href']]) {
    const actual = single(document, selector, attr, label);
    const expected = single(page.document, selector, attr, `baseline ${label}`);
    expect(actual === expected, `${label}: baseline ${selector} mismatch: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  }
  for (const [selector, attr] of [['meta[charset]', 'charset'], ['meta[name="viewport"]', 'content'], ['meta[name="theme-color"]', 'content'], ['link[rel="icon"]', 'href']]) {
    expect(single(document, selector, attr, label) === single(page.document, selector, attr, `baseline ${label}`), `${label}: ${selector} differs from baseline.`);
  }
  for (const expected of page.document.querySelectorAll('meta[property],meta[name^="twitter:"]')) {
    const key = expected.hasAttribute('property') ? 'property' : 'name';
    const selector = `meta[${key}="${expected.getAttribute(key)}"]`;
    expect(single(document, selector, 'content', label) === expected.getAttribute('content'), `${label}: ${selector} differs from baseline.`);
  }
  try {
    const actual = single(document, 'script[type="application/ld+json"]', null, label);
    const expected = single(page.document, 'script[type="application/ld+json"]', null, `baseline ${label}`);
    expect(JSON.stringify(stable(JSON.parse(actual))) === JSON.stringify(stable(JSON.parse(expected))), `${label}: JSON-LD differs from baseline.`);
    expect(!actual.includes('<'), `${label}: JSON-LD must escape less-than characters.`);
  } catch (error) { fail(`${label}: invalid JSON-LD: ${error.message}`); }

  const externalScripts = document.querySelectorAll('script[src]');
  const siteScripts = externalScripts.filter(el => scriptsExpected.includes(new URL(el.getAttribute('src'), baseUrl).pathname));
  expect(JSON.stringify(siteScripts.map(el => new URL(el.getAttribute('src'), baseUrl).pathname)) === JSON.stringify(scriptsExpected), `${label}: missing, duplicate or out-of-order classic site scripts.`);
  for (const el of siteScripts) expect(el.hasAttribute('defer') && !el.hasAttribute('async') && (!el.getAttribute('type') || /^(?:text|application)\/javascript$/.test(el.getAttribute('type'))), `${label}: site script is not classic deferred.`);
  for (const el of externalScripts) {
    const pathname = new URL(el.getAttribute('src'), baseUrl).pathname;
    expect(!pathname.endsWith('/shoot-media-715.js'), `${label}: dormant hero script must not load.`);
    expect(scriptsExpected.includes(pathname) || pathname.startsWith('/_next/'), `${label}: unexpected loaded script ${pathname}`);
  }

  const sheets = document.querySelectorAll('link[rel="stylesheet"]');
  expect(sheets.length === 1, `${label}: expected one compiled equivalent CSS stylesheet, found ${sheets.length}.`);
  expect(document.querySelectorAll('style').length === 0, `${label}: unexpected inline style block.`);
  for (const sheet of sheets) {
    const href = sheet.getAttribute('href');
    const target = await checkReference(href, baseUrl, `${label} stylesheet`);
    expect(!styleOrder.includes(path.posix.basename(new URL(href, baseUrl).pathname)), `${label}: original individual stylesheet loaded alongside/instead of the equivalent bundle.`);
    if (target) {
      loadedCss.set(target.file, await fs.readFile(target.file, 'utf8'));
      await inspectCss(target.file, target.url);
    }
  }

  // Navigable anchors (including same-origin absolute links) and fragment targets.
  // Select SVG use nodes directly: an unescaped colon in [xlink:href] is not a
  // valid attribute selector for css-select. Both href forms are still checked.
  for (const el of document.querySelectorAll('a[href],area[href],use')) {
    await checkReference(el.getAttribute('href') ?? el.getAttribute('xlink:href'), baseUrl, `${label} ${el.rawTagName}`, true);
  }
  for (const el of document.querySelectorAll('form[action]')) await checkReference(el.getAttribute('action'), baseUrl, `${label} form action`);
  for (const el of document.querySelectorAll('[src],[poster],[data-src],[data-mobile-src],[data-desktop-src]')) {
    for (const attr of ['src', 'poster', 'data-src', 'data-mobile-src', 'data-desktop-src']) {
      if (el.hasAttribute(attr)) await checkReference(el.getAttribute(attr), baseUrl, `${label} ${el.rawTagName}[${attr}]`);
    }
  }
  for (const el of document.querySelectorAll('[srcset],[imagesrcset]')) {
    for (const attribute of ['srcset', 'imagesrcset']) {
      const srcset = el.getAttribute(attribute);
      if (srcset && !srcset.startsWith('data:')) for (const candidate of srcset.split(',')) await checkReference(candidate.trim().split(/\s+/)[0], baseUrl, `${label} ${attribute}`);
    }
  }
  for (const el of document.querySelectorAll('link[href]')) {
    if (el.getAttribute('rel') === 'canonical' || el.getAttribute('rel') === 'stylesheet') continue;
    await checkReference(el.getAttribute('href'), baseUrl, `${label} link[${el.getAttribute('rel')}]`);
  }
  for (const el of document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]')) await checkReference(el.getAttribute('content'), baseUrl, `${label} social image`);
  for (const el of document.querySelectorAll('[style],[fill],[stroke],[filter],[clip-path],[mask]')) {
    for (const attr of ['style', 'fill', 'stroke', 'filter', 'clip-path', 'mask']) {
      for (const ref of cssUrls(el.getAttribute(attr) || '')) await checkReference(ref, baseUrl, `${label} ${attr} url`, true);
    }
  }
  const ids = new Set();
  for (const el of document.querySelectorAll('[id]')) {
    const id = el.getAttribute('id');
    expect(!ids.has(id), `${label}: duplicate id ${id}`);
    ids.add(id);
  }
}

expect(loadedCss.size === 1, `All routes must share one equivalent root CSS bundle; found ${loadedCss.size}.`);
await checkCssProvenance();
const robots = await fs.readFile(path.join(root, 'robots.txt'), 'utf8').catch(() => '');
expect(/^User-agent:\s*\*/im.test(robots) && /^Disallow:\s*\/\s*$/im.test(robots), 'robots.txt must retain Disallow:/.');

if (errors.length) {
  console.error(`FAIL: ${errors.length} issue(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: 34 HTML documents, baseline head/schema values, native structure, classic scripts, 22-sheet equivalent CSS and ${references} internal references (${binaryFiles.size} unique files).`);
}
