// Shared read-only baseline discovery. Plain Node; no TypeScript/runtime renderer.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

export const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
export const baselineRoot = path.join(projectRoot, 'migration', 'baseline', 'dist-html');
export const exportRoot = path.join(projectRoot, 'out');
export const productionOrigin = 'https://www.tintawindow.co.nz';
export const styleOrder = ['fonts.css', 'style.css', 'boutique.css', 'brand.css', 'surfaces.css', 'revision.css', 'fresh.css', 'polish.css', 'atelier.css', 'signature.css', 'film-guide.css', 'refinement.css', 'responsive-sections.css', 'client-polish.css', 'shoot-media-715.css', 'team-ui-715.css', 'story-717.css', 'service-layout-717.css', 'launch-polish-717.css', 'team-ui-718.css', 'photo-alignment-719.css', 'placement-polish-720.css'];

export async function htmlFiles(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(absolute));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(absolute);
  }
  return files.sort();
}

export function parseHtml(html) {
  return parse(html, { blockTextElements: { script: true, style: true, pre: true, textarea: true } });
}

export async function readBaseline() {
  const result = [];
  for (const file of await htmlFiles(baselineRoot)) {
    const relative = path.relative(baselineRoot, file).split(path.sep).join('/');
    const route = relative === 'index.html' ? '/' : relative === '404.html' ? '/404.html' : '/' + relative.slice(0, -'/index.html'.length);
    const html = await fs.readFile(file, 'utf8');
    const document = parseHtml(html);
    const type = document.querySelector('body')?.getAttribute('class')?.split(/\s+/).find(value => value.startsWith('page-'))?.slice(5);
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    if (!type || !canonical) throw new Error(`Incomplete baseline document: ${relative}`);
    result.push({ file, relative, route, type, canonical, html, document });
  }
  if (result.length !== 34) throw new Error(`Expected 34 immutable baseline HTML files, found ${result.length}.`);
  return result;
}
