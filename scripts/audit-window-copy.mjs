// Read-only audit: no writes, network requests, CMS mutations or automatic patches.
// Run: node scripts/audit-window-copy.mjs > WINDOW-COPY-DRY-RUN.md
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { parse } from 'node-html-parser';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const cache = new Map();

// Execute only this project's pure local content renderer, transpiled in memory.
// No source-generator imports, generated files, build, or CMS access.
export function loadLocalModule(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const source = fs.readFileSync(file, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  }, fileName: file }).outputText;
  const localRequire = name => {
    if (!name.startsWith('.')) return require(name);
    const target = path.resolve(path.dirname(file), name);
    const resolved = [target, target + '.ts', target + '.tsx', target + '/index.ts']
      .find(p => fs.existsSync(p) && fs.statSync(p).isFile());
    if (!resolved) throw new Error(`Unresolved local import: ${file}: ${name}`);
    return loadLocalModule(resolved);
  };
  new Function('require', 'module', 'exports', '__filename', '__dirname', code)
    (localRequire, module, module.exports, file, path.dirname(file));
  return module.exports;
}

export function renderedPages() {
  const { getPage, pagePaths } = loadLocalModule(path.join(root, 'lib/pages.ts'));
  return pagePaths.map(route => ({ route, html: getPage(route).html }));
}

function files(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}

function matches(text, context = '') {
  // Mask protected brand forms with equal-length placeholders to retain offsets.
  const masked = text.replace(/Tint A Window|Tint-A-Window|TintAWindow/g, s => '_'.repeat(s.length));
  return [...text.matchAll(/\bWindows?\b/g)].map(match => {
    const offset = match.index;
    const before = text.slice(Math.max(0, offset - 65), offset + match[0].length + 65);
    let status = 'PROPOSE LOWERCASE';
    if (masked.slice(offset, offset + match[0].length) !== match[0]) status = 'KEEP BRAND';
    else if (/Microsoft\s*$/i.test(text.slice(0, offset))) status = 'KEEP THIRD-PARTY';
    else if (/^(?:https?:|\/|\.\.?\/)|@|\.(?:webp|png|jpg|js|ts|svg)\b/i.test(text)) status = 'REVIEW PROTECTED PATH/IDENTIFIER';
    else if (!text.slice(0, offset).trim() || /[.!?]\s*[“"'(]*$/.test(text.slice(0, offset))) status = 'KEEP SENTENCE/HEADING START (confirm)';
    else if (/title|heading|h[1-6]|label|alt|name|caption/i.test(context)) status = 'REVIEW HEADING/LABEL/ALT';
    return { offset, word: match[0], before, after: status.startsWith('PROPOSE') || status.startsWith('REVIEW HEADING')
      ? before.slice(0, offset - Math.max(0, offset - 65)) + match[0].toLowerCase() + before.slice(offset - Math.max(0, offset - 65) + match[0].length)
      : before, status };
  });
}

function sourceRows() {
  const paths = ['app', 'components', 'content', 'lib', 'src', 'tests', 'docs', 'content-archive']
    .flatMap(dir => files(path.join(root, dir))).filter(f => /\.(?:[cm]?[jt]sx?|json|md)$/.test(f));
  paths.push(...files(path.join(root, 'public')).filter(f => /\.(?:js|vtt|svg)$/.test(f)));
  const rows = [];
  for (const file of paths.sort()) {
    const relative = path.relative(root, file).replaceAll('\\', '/');
    const source = fs.readFileSync(file, 'utf8');
    const add = (text, field, offset) => {
      const line = source.slice(0, offset).split('\n').length;
      for (const match of matches(text, field)) rows.push({ location: `${relative}:${line}`, field, ...match });
    };
    if (/\.(?:[cm]?[jt]sx?)$/.test(file)) {
      const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
      const visit = (node, scope = []) => {
        let next = scope;
        if ((ts.isPropertyAssignment(node) || ts.isVariableDeclaration(node)) && node.name) next = [...scope, node.name.getText(ast)];
        if (ts.isArrayLiteralExpression(node)) {
          node.elements.forEach((element, i) => visit(element, [...next, `[${i}]`]));
          return;
        }
        const isKey = node.parent && ts.isPropertyAssignment(node.parent) && node.parent.name === node;
        if (!isKey && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isJsxText(node))) {
          add(node.text, next.join('.') || 'string literal/template fragment', node.getStart(ast));
        }
        ts.forEachChild(node, child => visit(child, next));
      };
      visit(ast);
    } else if (file.endsWith('.json')) {
      const walk = (value, field) => {
        if (typeof value === 'string') add(value, field, Math.max(0, source.indexOf(JSON.stringify(value))));
        else if (value && typeof value === 'object') Object.entries(value).forEach(([key, val]) => walk(val, `${field}.${key}`));
      };
      walk(JSON.parse(source), '$');
    } else add(source, 'quoted documentation/asset text (manual review)', 0);
  }
  return rows;
}

export function runtimeRows(pages = renderedPages(), approvedPolicy = false) {
  const rows = [];
  for (const { route, html } of pages) {
    const doc = parse(html, { blockTextElements: { script: true, style: true } });
    const add = (text, field, title = false) => matches(text, field).forEach(match => {
      if (approvedPolicy && match.status !== 'KEEP BRAND' && match.status !== 'KEEP THIRD-PARTY' && !match.status.startsWith('REVIEW PROTECTED')) {
        if (title) match.status = 'KEEP APPROVED TITLE / OPTION A';
        else if (match.status.startsWith('KEEP SENTENCE')) match.status = 'KEEP APPROVED SENTENCE START';
        else match.status = 'REMAINING NON-EXCEPTION';
        if (!match.status.startsWith('REMAINING')) match.after = match.before;
      }
      rows.push({ location: route, field, ...match });
    });
    const walk = (node, field = '', title = false) => {
      if (node.nodeType === 3) return add(node.text, field + '/text()', title);
      const tag = node.rawTagName?.toLowerCase();
      if (tag === 'style' || (tag === 'script' && node.getAttribute('type') !== 'application/ld+json')) return;
      const here = field + '/' + (tag || 'document');
      if (tag === 'script') {
        const jsonWalk = (val, key) => {
          if (typeof val === 'string') add(val, key, /\.name$/.test(key));
          else if (val && typeof val === 'object') Object.entries(val).forEach(([k, v]) => jsonWalk(v, key + '.' + k));
        };
        jsonWalk(JSON.parse(node.text), here + '/JSON-LD');
        return;
      }
      for (const key of ['alt', 'title', 'aria-label', 'placeholder', 'label']) {
        const value = node.getAttribute?.(key);
        if (value) add(value, here + '/@' + key);
      }
      if (tag === 'meta' && node.getAttribute('content')) add(node.getAttribute('content'), here + '/@content[' + (node.getAttribute('name') || node.getAttribute('property')) + ']', /^(?:og:title|twitter:title|og:site_name)$/.test(node.getAttribute('name') || node.getAttribute('property') || ''));
      const isTitle = title || /^(?:title|h[1-6])$/.test(tag || '') || /\b(?:eyebrow|hero-headline)\b/.test(node.getAttribute?.('class') || '');
      // The review keyword map's final cell contains page titles, not prose.
      const keywordTitle = tag === 'td' && node.parentNode?.childNodes.filter(child => child.rawTagName === 'td').indexOf(node) === 4 && route === '/design-review';
      node.childNodes?.forEach((child, i) => walk(child, here + `[${i}]`, isTitle || keywordTitle));
    };
    walk(doc);
  }
  return rows;
}

function table(rows) {
  const cell = s => String(s).replaceAll('|', '\\|').replace(/\s+/g, ' ').trim();
  return ['| File / route | Field / DOM path | Decision | Before (context) | Proposed after |',
    '| --- | --- | --- | --- | --- |',
    ...rows.map(row => `| ${cell(row.location)} | ${cell(row.field)} | ${cell(row.status)} | ${cell(row.before)} | ${cell(row.after)} |`)].join('\n');
}

export function audit(approvedPolicy = false) {
  const source = sourceRows();
  const runtime = runtimeRows(renderedPages(), approvedPolicy);
  const summary = rows => Object.entries(rows.reduce((counts, row) => {
    counts[row.status] = (counts[row.status] || 0) + 1; return counts;
  }, {})).map(([status, count]) => `- ${status}: ${count}`).join('\n');
  return `# Window capitalization — read-only dry run\n\nNo content was patched. Source and rendered occurrences are counted separately; they overlap and are not unique edits. Each row is one capitalized Window/Windows occurrence. Before/after are local context excerpts; review rows are suggestions, not approval. Lowercase occurrences already comply.\n\n## Scope and limits\n\nThis checkout renders local content/*.ts through lib/pages.ts and lib/render-site.ts. No Sanity dependency/client/configuration, content-archive/, src/, tests/, docs/, or Vitest setup exists here. No remote dataset was read or written, and no dataset identity can be confirmed. Supply the Sanity project/dataset and matching checkout before any CMS write. Never export credentials in this report.\n\nIncludes local source string/template/JSX literals, public JS string literals/VTT/SVG text, and all 34 pages rendered in memory from current source (including metadata, JSON-LD and visible attributes). Template fragments and replacement patterns require manual review: the source table is a superset, not proof of visible usage. CSS/URLs/keys/identifiers are never patched. Immutable migration/baseline and historical migration reports/build output are excluded. Sentence boundaries and headings are heuristic and all exceptions need review.\n\nBrand placeholders preserve offsets. No broad replacement is authorized. In particular, keep normal sentence/heading starts, third-party names, URL/slug/filename/identifier/schema values; decide interior title-case words from the exceptions table. Whole-heading sentence-case changes beyond Window/Windows need separate approval.\n\n## Confirmed runtime capitalization cause and approval boundary\n\n\`content/customer-polish.ts\` applies its \`service\` regular expression case-insensitively to rendered text and then runs \`m[0].toUpperCase()+m.slice(1).toLowerCase()\`. This can capitalize Window in the middle of sentences even if source literals are lowercased. Its phrase substitutions also insert capitalized service terms. \`content/editorial-review.ts\` performs additional heading processing; head values are also stored in \`content/routes.ts\` and emitted through \`lib/metadata.ts\`.\n\nA copy-only replacement cannot guarantee the final rule while that formatter remains unchanged. Any adjustment to this text-formatting transform needs explicit approval because the request limits edits to content/string literals and excludes code logic. No formatter has been changed. Existing brand variants, regex patterns, replacement match keys, frozen /design-review HTML, alt text, quotations/testimonials, and historical source units need careful review; source scan rows are not an automatic edit list.\n\n## Source occurrences (${source.length})\n\n${summary(source)}\n\n## Current rendered occurrences (${runtime.length}, 34 routes)\n\n${summary(runtime)}\n\n## Runtime exceptions and doubtful cases\n\n${table(runtime.filter(row => !row.status.startsWith('PROPOSE') && row.status !== 'KEEP BRAND'))}\n\n## Runtime lowercase proposals\n\n${table(runtime.filter(row => row.status.startsWith('PROPOSE')))}\n\n## Complete source inventory (including protected brands)\n\n${table(source)}\n\n## Protected runtime brands\n\n${table(runtime.filter(row => row.status === 'KEEP BRAND'))}\n\n## Approval and next verification\n\nApprove the lowercase proposals and identify allowed exceptions before patching copy. A Sanity export/backup and explicit target dataset confirmation are required if a remote CMS project is supplied. This static-export project has no /api/revalidate endpoint; local changes take effect on a rebuild and host publication. No publication is authorized. No Vitest dependency or test command exists, so Vitest cannot be run without a separately approved setup. The immutable parity checker compares old copy exactly and will intentionally flag approved future copy changes; do not weaken it to hide differences.\n`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.stdout.write(audit(process.argv.includes('--approved-policy')));
}
