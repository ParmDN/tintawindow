// Review-only draft. Run only when a later phase explicitly authorises execution.
// Writes solely to migration/, never to out/, public/ or the reference website.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { projectRoot, exportRoot, htmlFiles, parseHtml } from './lib/baseline.mjs';

// Use the fresh export, not the immutable migration baseline's superseded routes.
const pages = [];
for (const file of await htmlFiles(exportRoot)) {
  const document = parseHtml(await fs.readFile(file, 'utf8'));
  const type = document.querySelector('body')?.getAttribute('class')?.split(/\s+/).find(value => value.startsWith('page-'))?.slice(5);
  if (['review', 'confirmation', 'missing'].includes(type)) continue;
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (!type || !canonical) throw new Error(`Incomplete sitemap source: ${file}`);
  pages.push({ canonical });
}
if (pages.length !== 30) throw new Error(`Expected 30 sitemap draft routes, found ${pages.length}.`);
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(page => `  <url><loc>${escapeXml(page.canonical)}</loc></url>`).join('\n') + '\n</urlset>\n';
const destination = path.join(projectRoot, 'migration', 'sitemap.production-draft.xml');
await fs.writeFile(destination, xml, { encoding: 'utf8', flag: 'w' });
console.log(`Wrote review-only draft with ${pages.length} routes: ${destination}`);
