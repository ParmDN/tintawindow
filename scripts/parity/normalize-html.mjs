// Run only in an explicitly authorised verification phase.
// node scripts/parity/normalize-html.mjs <input.html|directory> [output.html|directory]
// One file without output writes to stdout. Directory mode requires an output directory.
// Requires dev-only node-html-parser. This compares generated HTML, not a live DOM.
import { parse } from 'node-html-parser';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const rawText = new Set(['pre', 'textarea', 'script', 'style']);
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const attributeEscape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function normalizeHtml(html) {
  const root = parse(html, { comment: true, blockTextElements: { script: true, style: true, pre: true, textarea: true } });
  const nextAsset = value => /^\/_next\//.test(value || '');
  // Narrow exclusions: retain site JS, JSON-LD, CSS links, content, class hooks,
  // image preloads, inline styles, and unknown scripts/attributes.
  for (const el of root.querySelectorAll('script')) {
    if (nextAsset(el.getAttribute('src')) || el.getAttribute('id') === '__NEXT_DATA__' || /^\s*(?:self\.|window\.)?__next_f\.(?:push|init)\s*\(/.test(el.rawText) || /^\s*\(self\.__next_f\s*=/.test(el.rawText)) el.remove();
  }
  for (const el of root.querySelectorAll('link')) {
    const rel = el.getAttribute('rel');
    if (nextAsset(el.getAttribute('href')) && (rel === 'modulepreload' || (rel === 'preload' && el.getAttribute('as') === 'script'))) el.remove();
  }
  for (const el of root.querySelectorAll('next-route-announcer,meta[name="next-size-adjust"]')) el.remove();
  function serialize(node, preserve = false) {
    if (node.nodeType === 3) return preserve ? node.rawText : node.rawText.replace(/[\t\n\r\f ]+/g, ' ');
    if (node.nodeType === 8) {
      // React suspense/streaming boundary comments; keep ordinary site comments.
      return /^(?:\/?\$[!?]?|\/?&)$/.test(node.rawText) ? '' : node.toString();
    }
    if (!node.rawTagName) return node.childNodes.map(child => serialize(child, preserve)).join('');
    const tag = node.rawTagName.toLowerCase();
    const attrs = Object.entries(node.attributes).sort(([a], [b]) => a.localeCompare(b, 'en')).map(([name, value]) => ` ${name}="${attributeEscape(value)}"`).join('');
    const start = `<${tag}${attrs}>`;
    if (voidTags.has(tag)) return start;
    return start + node.childNodes.map(child => serialize(child, preserve || rawText.has(tag))).join('') + `</${tag}>`;
  }
  // Standardise the doctype separately: parser releases may treat it as text.
  return '<!doctype html>\n' + serialize(root).replace(/<!doctype\s+html\s*>/gi, '').trim() + '\n';
}

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input) throw new Error('Usage: normalize-html.mjs <input.html|directory> [output.html|directory]');
  const source = await fs.realpath(path.resolve(input));
  const target = output ? path.resolve(output) : null;
  const directory = (await fs.stat(source)).isDirectory();
  if (directory && !target) throw new Error('Directory mode requires an output directory.');
  if (target && (target === source || target.startsWith(source + path.sep) || source.startsWith(target + path.sep))) throw new Error('Input and output must be separate, non-nested paths.');
  async function visit(file, dest) {
    if ((await fs.stat(file)).isDirectory()) {
      for (const entry of await fs.readdir(file, { withFileTypes: true })) {
        if (entry.isDirectory() || (entry.isFile() && entry.name.endsWith('.html'))) await visit(path.join(file, entry.name), path.join(dest, entry.name));
      }
    } else {
      const normalized = normalizeHtml(await fs.readFile(file, 'utf8'));
      if (dest) { await fs.mkdir(path.dirname(dest), { recursive: true }); await fs.writeFile(dest, normalized); }
      else process.stdout.write(normalized);
    }
  }
  await visit(source, target);
}
// Exporting the normalizer also supports later comparison tooling without running CLI work.
import { pathToFileURL } from 'node:url';
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await main();
