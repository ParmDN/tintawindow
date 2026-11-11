// Verify the approved capitalization patch against its pre-change source render.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';
import { renderedPages, runtimeRows, loadLocalModule } from './audit-window-copy.mjs';

const beforeDir = 'migration/verify/window-copy-before';
const filename = route => route === '/' ? 'home.html' : route.replaceAll('/', '_') + '.html';
const beforePages = renderedPages().map(({ route }) => ({ route, html: fs.readFileSync(path.join(beforeDir, filename(route)), 'utf8') }));
const afterPages = renderedPages();
const normalize = text => text.replace(/\bWindows?\b/g, word => word.toLowerCase())
  .replace(/Explore (Residential|Commercial) window Films/g, 'Explore $1 window films')
  .replace(/House window Tinting phrase/g, 'house window tinting phrase');
const changes = [];
let nodeCount = 0;
function compare(before, after, route, field = '') {
  assert.equal(before.nodeType, after.nodeType, `${route}${field}: node type`);
  assert.equal(before.rawTagName, after.rawTagName, `${route}${field}: tag`);
  const here = field + '/' + (before.rawTagName || 'text');
  if (before.nodeType === 3) {
    assert.equal(normalize(before.rawText), normalize(after.rawText), `${route}${here}: only approved case changes`);
    if (before.rawText !== after.rawText) changes.push({ route, field: here, before: before.rawText, after: after.rawText });
  } else {
    const a = before.attributes || {}, b = after.attributes || {};
    assert.deepEqual(Object.keys(a).sort(), Object.keys(b).sort(), `${route}${here}: attribute names`);
    for (const key of Object.keys(a)) {
      if (/^(?:alt|aria-label|placeholder)$/.test(key)) {
        assert.equal(normalize(a[key]), normalize(b[key]), `${route}${here}: ${key}`);
        if (a[key] !== b[key]) changes.push({ route, field: here + '/@' + key, before: a[key], after: b[key] });
      } else assert.equal(a[key], b[key], `${route}${here}: protected ${key}`);
    }
    assert.equal(before.childNodes.length, after.childNodes.length, `${route}${here}: child order/count`);
    before.childNodes.forEach((child, i) => compare(child, after.childNodes[i], route, here + `[${i}]`));
  }
  nodeCount++;
}
for (const after of afterPages) {
  const before = beforePages.find(page => page.route === after.route);
  const a = parse(before.html), b = parse(after.html);
  compare(a, b, after.route);
  for (const selector of ['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '.hero-headline', '.eyebrow', 'script[type="application/ld+json"]', 'meta', 'link']) {
    assert.deepEqual(a.querySelectorAll(selector).map(n => n.outerHTML), b.querySelectorAll(selector).map(n => n.outerHTML), `${after.route}: preserve ${selector}`);
  }
  const brand = html => [...html.matchAll(/Tint A Window|Tint-A-Window|TintAWindow/g)].map(match => match[0]);
  assert.deepEqual(brand(before.html), brand(after.html), `${after.route}: protected brands`);
}
const beforeRows = runtimeRows(beforePages);
const afterRows = runtimeRows(afterPages, true);
const rowKey = row => row.location + '|' + row.field + '|' + row.offset;
const afterByKey = new Map(afterRows.map(row => [rowKey(row), row]));
const proposals = beforeRows.filter(row => row.status === 'PROPOSE LOWERCASE');
assert.equal(proposals.length, 131);
const retained = proposals.filter(row => afterByKey.has(rowKey(row)));
assert(retained.every(row => afterByKey.get(rowKey(row)).status === 'KEEP APPROVED TITLE / OPTION A'), 'Every retained proposal is now an Option A title exception');
const starts = beforeRows.filter(row => row.status.startsWith('KEEP SENTENCE'));
assert.equal(starts.length, 142);
assert(starts.every(row => afterByKey.has(rowKey(row))), 'All 142 original sentence/heading starts retained');
const remaining = afterRows.filter(row => row.status === 'REMAINING NON-EXCEPTION');
assert.deepEqual(remaining, [], 'No runtime non-exception remains');

const { customerPolish } = loadLocalModule(path.resolve('content/customer-polish.ts'));
assert.equal(customerPolish('<p>We choose Window film in Christchurch. Window film helps Tint A Window.</p>'), '<p>We choose window film in Christchurch. Window film helps Tint A Window.</p>');
const previousPolish = loadLocalModule(path.resolve(beforeDir, 'customer-polish.ts.before')).customerPolish;
assert.equal(customerPolish('<h2>Anti-Glare Window Film</h2>'), previousPolish('<h2>Anti-Glare Window Film</h2>'), 'Existing title formatting is unchanged');
assert.equal(customerPolish('<p class="eyebrow"><span></span>Residential Window Films</p>'), '<p class="eyebrow"><span></span>Residential Window Films</p>');
assert.equal(customerPolish('<p>Microsoft Windows and Tint-A-Window use Windows.</p>'), '<p>Microsoft Windows and Tint-A-Window use windows.</p>');
assert.equal(customerPolish('<img src="/Window.jpg" alt="Compare Window film" data-window="Window" aria-label="Tint A Window home">'), '<img src="/Window.jpg" alt="Compare window film" data-window="Window" aria-label="Tint A Window home">');
assert.equal(customerPolish('<a href="/Window">Compare Window film</a>'), '<a href="/Window">Compare window film</a>');
console.log(`PASS: ${afterPages.length} routes; ${nodeCount} DOM nodes; protected structure/URLs/keys/brands, headings/meta/schema unchanged.`);
console.log(`Original 131 proposals: ${131 - retained.length} lowercased, ${retained.length} retained by approved Option A; all 142 original sentence/heading starts kept.`);
console.log(`Remaining capitalized non-exceptions: ${remaining.length}. Formatter regression assertions passed.`);
console.log('Current capitalized occurrences: ' + JSON.stringify(afterRows.reduce((counts, row) => { counts[row.status] = (counts[row.status] || 0) + 1; return counts; }, {})));
for (const change of changes) console.log('CHANGE ' + JSON.stringify(change));
for (const row of retained) console.log('OPTION-A-RETAINED ' + JSON.stringify(afterByKey.get(rowKey(row))));

if (process.argv.includes('--export')) {
  for (const route of ['/about', '/residential-window-tinting/privacy-window-films', '/residential-window-tinting/anti-glare-window-films', '/commercial-window-tinting/anti-glare-window-films']) {
    const doc = parse(fs.readFileSync(path.join('out', route.slice(1), 'index.html'), 'utf8'));
    const expected = parse(afterPages.find(page => page.route === route).html);
    assert.equal(doc.querySelector('#main').innerHTML, expected.querySelector('#main').innerHTML, `${route}: fresh export main matches current source`);
  }
  console.log('PASS: fresh export main matches current source on About and three service pages.');
}
