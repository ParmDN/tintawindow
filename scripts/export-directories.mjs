// Post-export arrangement, invoked only by the later authorised build.
// Arrange the active export paths; never import/evaluate TypeScript or the old generator.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { exportRoot, htmlFiles } from './lib/baseline.mjs';

const root = await fs.realpath(exportRoot);
const within = file => file === root || file.startsWith(root + path.sep);
async function exists(file) { return fs.stat(file).then(stat => stat.isFile(), () => false); }
const pages = (await htmlFiles(root)).map(source => ({ source, relative: path.relative(root, source) }))
  .filter(page => page.relative !== '_not-found.html');
if (pages.length !== 34) throw new Error(`Expected 34 active HTML documents, found ${pages.length}.`);
for (const page of pages) {
  const relative = page.relative.replaceAll(path.sep, '/');
  const destination = path.resolve(root, relative === 'index.html' || relative === '404.html' || relative.endsWith('/index.html') ? relative : relative.replace(/\.html$/, '/index.html'));
  if (!within(destination)) throw new Error('Export target escaped out/.');
  if (relative === 'index.html' || relative === '404.html' || relative.endsWith('/index.html')) {
    if (!await exists(destination)) throw new Error(`Next did not export ${page.relative}.`);
    continue;
  }
  const source = page.source;
  if (!within(source)) throw new Error('Export source escaped out/.');
  if (!await exists(source) && await exists(destination)) continue;
  if (!await exists(source)) throw new Error(`Missing Next export: ${source}`);
  if (await exists(destination)) throw new Error(`Refusing to replace ${destination}`);
  if (!within(await fs.realpath(source))) throw new Error('Export source symlink escaped out/.');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  if (!within(await fs.realpath(path.dirname(destination)))) throw new Error('Export destination symlink escaped out/.');
  await fs.rename(source, destination);
}
// Some Next versions expose an internal error-rendering alias. Keep the audited
// 404.html artifact without adding an extra public _not-found HTML route.
const internalAlias = path.join(root, '_not-found.html');
if (await exists(internalAlias)) {
  if (!within(await fs.realpath(internalAlias))) throw new Error('Internal alias escaped out/.');
  await fs.unlink(internalAlias);
}
console.log('Arranged the 34 audited HTML documents as directory indexes plus 404.html.');
