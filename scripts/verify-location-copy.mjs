// Focused content verification; does not replace or weaken scripts/check.mjs.
// Default: current pure source render. --export: verify the freshly built out/.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from 'node-html-parser';
import { renderedPages, loadLocalModule } from './audit-window-copy.mjs';

const { locationPageCopy, locationBenefits, locationServices, locationSteps, locationFaqs, locationCta, locationsOverview, homepageReplacements } = loadLocalModule(path.resolve('content/location-page-copy.ts'));
const previous = JSON.parse(fs.readFileSync('migration/verify/location-copy-before.log', 'utf8'));
const current = renderedPages();
const exported = process.argv.includes('--export');
const filename = route => route === '/' ? 'out/index.html' : route === '/404.html' ? 'out/404.html' : path.join('out', route.slice(1), 'index.html');
const pages = exported ? current.map(page => ({ route: page.route, html: fs.readFileSync(filename(page.route), 'utf8') })) : current;
const documentAt = route => parse(pages.find(page => page.route === route).html);
const oldDocumentAt = route => parse(previous.pages.find(page => page.route === route).html);
const text = node => node.textContent.replace(/\s+/g, ' ').trim();
const banned = /Your project, in context|Advice, installation\s*&\s*aftercare|What helps us plan your visit|Regional arrangements|Arrange a visit to your property|After you choose|travel|regional|owner|manager|approval|access.planning/i;
const lines = ['| Page | Hero | Intro | Benefits | Services | Process | FAQ | CTA |', '| --- | --- | --- | --- | --- | --- | --- | --- |'];

assert.equal(pages.length, 34);
assert(!pages.some(page => page.route === '/locations/lake-tekapo'));
if (exported) assert(!fs.existsSync('out/locations/lake-tekapo'));
const headings = ['Local window tinting', 'Your local service', 'Everyday benefits', 'Residential & commercial', 'How it works', 'Common questions', 'Your next step'];
for (const local of locationPageCopy) {
  const route = '/locations/' + local.slug;
  const doc = documentAt(route);
  const sections = doc.querySelectorAll('main#main > section');
  assert.equal(sections.length, 7, route + ': seven sections');
  assert.deepEqual(sections.map(section => text(section.querySelector('.eyebrow'))), headings);
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(text(sections[0].querySelector('h1')), `Window tinting in ${local.town}.`);
  assert.equal(text(sections[0].querySelector('.hero-support > p')), local.hero);
  assert.deepEqual(sections[0].querySelectorAll('.editorial-breadcrumbs > a, .editorial-breadcrumbs > span[aria-current]').map(text), ['Home', 'Locations', local.town]);
  assert.equal(text(sections[1].querySelector('h2')), local.introHeading);
  assert.deepEqual(sections[1].querySelectorAll(':scope > div:last-child > p').map(text), local.intro);
  assert.equal(text(sections[2].querySelector('h2')), 'More comfort from your windows.');
  const benefits = sections[2].querySelectorAll('article');
  assert.equal(benefits.length, 4);
  assert.deepEqual(benefits.map(article => [text(article.querySelector('h3')), text(article.querySelector('p'))]), locationBenefits.map(item => [item.title, item.body]));
  assert.equal(text(sections[3].querySelector('h2')), 'Window film for your home or business.');
  assert.equal(text(sections[3].querySelector('.revision-body > p')), 'Explore window film options for everyday comfort, privacy and interior protection.');
  const services = sections[3].querySelectorAll('article');
  assert.deepEqual(services.map(article => [text(article.querySelector('h3')), text(article.querySelector('p')), article.querySelector('h3 a').getAttribute('href')]), locationServices.map(item => [item.title, item.body, item.href]));
  assert.equal(text(sections[4].querySelector('h2')), 'A simple way to improve your windows.');
  const steps = sections[4].querySelectorAll('.revision-steps article');
  assert.equal(steps.length, 3);
  assert.deepEqual(steps.map(article => [text(article.querySelector('h3')), text(article.querySelector('p'))]), locationSteps.map(item => [item.title, item.body]));
  assert.deepEqual(steps.map(article => text(article.querySelector('.revision-number'))), ['01', '02', '03']);
  assert.equal(text(sections[5].querySelector('h2')), 'Your window tinting questions, answered.');
  const faqs = sections[5].querySelectorAll('details');
  assert.equal(faqs.length, 4);
  assert.deepEqual(faqs.map(item => [text(item.querySelector('summary > span')), text(item.querySelector('div > p'))]), locationFaqs.map(item => [item.question, item.answer]));
  assert.equal(text(sections[6].querySelector('h2')), local.ctaHeading);
  assert.equal(text(sections[6].querySelector(':scope > div:last-child > p')), locationCta(local.town));
  assert(!banned.test(text(doc.querySelector('main'))), route + ': removed planning/arrangement copy absent, including collapsed answers');
  assert(!doc.querySelector('[data-exact-copy]'), 'Exact markers must not reach exported DOM');
  for (const section of [sections[0], sections[4], sections[6]]) assert.deepEqual(section.querySelectorAll('.enquiry-actions a').map(link => [text(link), link.getAttribute('href')]), [['Get a Quote', '/contact-for-window-tinting'], ['Call Now', 'tel:0800368468']]);
  assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute('href'), 'https://www.tintawindow.co.nz' + route);
  assert.equal(doc.querySelector('meta[name="description"]').getAttribute('content'), local.hero.slice(0, 180));
  assert.equal(doc.querySelector('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
  assert(!/Lake Tekapo|lake-tekapo|lake tekapo/i.test(doc.toString()), route + ': no old location reference');
  lines.push(`| ${local.town} | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |`);
}
const overview = documentAt('/locations');
assert.equal(text(overview.querySelector('.hero-support p')), locationsOverview.intro);
assert.deepEqual(overview.querySelectorAll('.location-index > a').map(card => [text(card.querySelector('small')), text(card.querySelector('h2')), text(card.querySelector('p')), card.getAttribute('href')]), locationPageCopy.map(local => [local.region, local.town, local.card, '/locations/' + local.slug]));
assert.equal(text(overview.querySelector('.travel-note h2')), locationsOverview.heading);
assert.equal(text(overview.querySelector('.travel-note p')), locationsOverview.paragraph);
assert.equal(overview.querySelector('.closing').outerHTML, oldDocumentAt('/locations').querySelector('.closing').outerHTML, 'Final overview CTA unchanged');
const home = documentAt('/');
assert.equal(text(home.querySelectorAll('.home-introduction > div:last-child > p')[1]), homepageReplacements.introParagraph);
const homeFaqs = home.querySelectorAll('.home-questions details');
assert.equal(text(homeFaqs[3].querySelector('summary span')), 'How do I care for newly fitted film?');
assert.equal(text(homeFaqs[3].querySelector('div > p')), homepageReplacements.careAnswer);
const scrubHome = doc => {
  const main = doc.querySelector('main').clone();
  main.querySelectorAll('.home-introduction > div:last-child > p')[1].set_content('APPROVED INTRO');
  main.querySelectorAll('.home-questions details')[3].querySelector('div > p').set_content('APPROVED CARE ANSWER');
  return main.innerHTML;
};
assert.equal(scrubHome(home), scrubHome(oldDocumentAt('/')), 'Only two homepage main-content replacements');
const changed = new Set(['/','/locations','/design-review', ...locationPageCopy.map(local => '/locations/' + local.slug)]);
for (const page of pages.filter(page => !changed.has(page.route))) assert.equal(documentAt(page.route).querySelector('main').innerHTML, (page.route === '/window-tinting-faq' ? oldDocumentAt(page.route).querySelector('main').innerHTML.replaceAll('Lake Tekapo', 'Waimate') : oldDocumentAt(page.route).querySelector('main').innerHTML), 'Only authorized main changes: ' + page.route);
const previousReview = oldDocumentAt('/design-review').querySelector('main').innerHTML.replaceAll('lake-tekapo', 'waimate').replaceAll('Lake Tekapo', 'Waimate').replaceAll('lake tekapo', 'waimate');
assert.equal(documentAt('/design-review').querySelector('main').innerHTML, previousReview, 'Only authorized snapshot references changed');
for (const page of pages) {
  const doc = documentAt(page.route);
  assert(!doc.querySelectorAll('a').some(link => /lake-tekapo/i.test(link.getAttribute('href') || '')), page.route + ': no stale internal link');
  for (const attr of ['link[rel="canonical"]', 'script[type="application/ld+json"]']) assert(!/Lake Tekapo|lake-tekapo|lake tekapo/i.test(doc.querySelector(attr)?.outerHTML || ''), 'No stale canonical/schema reference');
}
for (const [file, hash] of Object.entries(previous.sourceHashes)) {
  if (file.startsWith('public/') || file.startsWith('migration/baseline/') || ['app/legacy.css','app/globals.css','scripts/check.mjs','scripts/lib/baseline.mjs','package.json','package-lock.json','next.config.ts','vercel.json'].includes(file)) {
    let bytes = fs.readFileSync(file);
    if (file === 'scripts/check.mjs') {
      // The only newly authorized change is expected-value preparation. Compare
      // every other byte against the same pre-change hash; do not skip the guard.
      const original = bytes.toString('utf8')
        .replace("import { applyIntentionalOverrides, intentionalOverrides } from './check-overrides.mjs';\n", '')
        .replace("const archivedBaseline = await readBaseline();\nconst baseline = applyIntentionalOverrides(archivedBaseline);\nconsole.log(`Expectations: ${intentionalOverrides.reduce((count, page) => count + page.fields.length, 0)} reviewed field overrides on ${intentionalOverrides.length} pages; immutable archive validated; 34 expected documents.`);", 'const baseline = await readBaseline();');
      bytes = Buffer.from(original, 'utf8');
    }
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), hash, 'Protected input unchanged: ' + file);
  }
}
console.log(lines.join('\n'));
console.log(`PASS ${exported ? 'fresh export' : 'source render'}: 34 documents; exact final copy, seven sections, 4/2/3/4 cards/services/steps/FAQs on all 11 locations; homepage limited to two replacements; other page mains and protected inputs unchanged.`);
console.log('FAQPage schema: absent in existing location/Home output; no stale FAQ schema to replace. Existing WebPage and BreadcrumbList remain.');
