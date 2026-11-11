// Review-only draft. Run only when a later phase explicitly authorises execution.
// Writes solely to migration/, never to out/, public/ or the reference website.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { projectRoot, readBaseline } from './lib/baseline.mjs';

const pages = (await readBaseline()).filter(page => !['review', 'confirmation', 'missing'].includes(page.type));
if (pages.length !== 30) throw new Error(`Expected 30 sitemap draft routes, found ${pages.length}.`);
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(page => `  <url><loc>${escapeXml(page.canonical)}</loc></url>`).join('\n') + '\n</urlset>\n';
const destination = path.join(projectRoot, 'migration', 'sitemap.production-draft.xml');
await fs.writeFile(destination, xml, { encoding: 'utf8', flag: 'w' });
console.log(`Wrote review-only draft with ${pages.length} routes: ${destination}`);
