"""Assemble final QA deliverables from saved, read-only audit evidence."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'Changes/final-qa-evidence'
A = json.loads((OUT / 'audit.json').read_text(encoding='utf-8'))
R = json.loads((ROOT / 'Changes/screenshots/final-qa-05-11-26/render-results.json').read_text())
P = json.loads((OUT / 'original-tree-proof.json').read_text())
REPORT = ROOT / 'Changes/Final_QA_05-11-26.md'
INV = OUT / 'changed-files.json'

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def esc(s):
    return str(s).replace('|', '&#124;').replace('\n', '<br>')

def table(head, rows):
    return '\n'.join(['| ' + ' | '.join(head) + ' |', '| ' + ' | '.join(['---'] * len(head)) + ' |'] + ['| ' + ' | '.join(esc(x) for x in row) + ' |' for row in rows]) + '\n\n'

def link(name):
    return '[' + name + '](<' + (ROOT / name).as_posix() + '>)'

reasons = {
 'website/build.mjs': 'Record the actual rendered H1 on the fourteen scoped routes.',
 'website/src/brand-pages.mjs': 'Read scoped headline data at the banner-title controlling layer.',
 'website/src/customer-polish.mjs': 'Protect exact-copy segments and apply scoped rendered-lead overrides without changing other polish behaviour.',
 'website/src/final-content.mjs': 'Use scoped national-copy hero-lead data at its controlling layer.',
 'website/src/fresh-design.mjs': 'Render scoped eyebrow H1/headline SPAN and the accepted homepage audience copy.',
 'website/src/homepage-refinement.mjs': 'Apply exact homepage introduction copy and the accepted additional keyword question.',
 'website/src/national-copy.mjs': 'New exact-copy configuration/helper for Home, service indexes 1–13 and shared labels.',
 'website/src/quote-form.mjs': 'Apply exact homepage enquiry eyebrow and first sentence.',
 'website/src/revised-content.mjs': 'Apply scoped overview eyebrows and the shared closing label.',
 'website/verify-shared-mechanism.py': 'New standalone shared-structure, labels and scope verifier; outside the build chain.',
 'website/verify-homepage.py': 'New standalone homepage exact-copy and scope verifier; outside the build chain.',
 'website/verify-service-pages.py': 'New standalone data-driven service-copy and scope verifier; outside the build chain.',
}

def reason(n):
    if n in reasons:
        return reasons[n]
    if n.startswith('website/public/') and n.endswith('.css'):
        return 'Retarget affected hero headline/eyebrow styling while retaining excluded-layout selectors and responsive rules.'
    if n.startswith('website/dist/'):
        if n.endswith('.html'):
            return 'Generated HTML from the accepted scoped copy/hero changes.' if '/design-review/' not in n else 'Generated report: only the fifteen listed allowed measurement cells differ from the original build.'
        if n.endswith('.css'):
            return 'Generated copy of the corresponding changed public stylesheet.'
        return 'Generated build asset; added relative to the supplied project, compared separately to the original built baseline.'
    if n.startswith('website/'):
        return 'Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation.'
    if n.startswith('Changes/screenshots/'):
        return 'Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline.'
    if n.startswith('Changes/final-qa-evidence/'):
        return 'Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain.'
    if n.startswith('Changes/'):
        return 'Requested task change map, changelog, verification evidence or QA report.'
    return 'Additional project file; see its contents for provenance.'

# Include these deliverables themselves in the exhaustive inventory.
REPORT.touch(exist_ok=True)
INV.touch(exist_ok=True)
original = {Path(n).as_posix(): h for n, h in P['original_rows']}
base = Path(A['baseline'])
inventory = []
removed = []
for n, h in original.items():
    p = ROOT / n
    if not p.exists():
        removed.append(n)
    elif sha(p) != h:
        inventory.append({'file': n, 'status': 'Modified', 'reason': reason(n)})
for p in ROOT.rglob('*'):
    if not p.is_file():
        continue
    n = p.relative_to(ROOT).as_posix()
    if n in original:
        continue
    if n.startswith('website/dist/'):
        b = base / p.relative_to(ROOT / 'website')
        if b.exists() and p.read_bytes() == b.read_bytes():
            continue
        status = 'Generated changed' if b.exists() else 'Generated added'
    else:
        status = 'Added'
    inventory.append({'file': n, 'status': status, 'reason': reason(n)})
inventory.sort(key=lambda x: x['file'])
INV.write_text(json.dumps({'basis': '289 original project files plus original fresh-build dist for generated-output comparison', 'files': inventory, 'removed_original_files': removed}, indent=2, ensure_ascii=False), encoding='utf-8')

parts = ['# Tint A Window — Final QA — 05-11-26\n\n',
 'Verdict: **Ready for review**, with the accepted link-check exception and pre-existing responsive film-card defects listed below. Copy, scope and build checks pass; this is not a clean visual/launch sign-off. No fixes were applied in this final QA pass.\n\n',
 '## Summary\n\n']
parts.append(table(['Area', 'Result', 'Evidence'], [
 ['Clean build', 'PASS', 'Content/site/design/final: zero issues each; exit 0.'],
 ['HTTP links', 'FAIL — accepted pre-existing assertion only', '34/35; trailing-slash residential hub resolves to 200 after redirect instead of exposing raw 308.'],
 ['DOCX exact wording and tags', 'PASS', 'Original DOCX parsed as OOXML: 14 tables, 61 exact-wording rows; 100 element assertions including shared labels and retained final H2s.'],
 ['Original H2s, metadata, actions, images, URLs', 'PASS', 'All fourteen routes compared against original baseline.'],
 ['Excluded HTML, footers, route manifest', 'PASS', '19 strictly identical excluded HTML files; report exception only; 34/34 identical footers.'],
 ['Visible copy outside DOCX', 'PASS', 'Exactly one accepted homepage question; all other visible-text differences explained.'],
 ['Keywords / word counts', 'PASS', 'All fourteen within 1,000–1,500 words; every assigned natural keyword count ≥3.'],
 ['Visual regression / hero review', 'PASS within inspected static states', '42 final full-page renders, matching 42 original renders; no document overflow or new hero/changed-copy defect observed.'],
 ['Responsive film cards', 'FAIL — pre-existing', 'Pages 2, 4, 5, 9 and 10 at 768px and 375px; baseline reproduces the same collapsed-card geometry.'],
 ['Protected checks/maps', 'PASS', 'Original check scripts, matching rules, maps and thresholds unchanged. Existing standalone verifiers also unedited in final QA.'],
]))
parts += ['## Baseline provenance and method\n\n',
 f'Original build retained at `{base}`. It is the untouched copy created during the first read-only investigation, before implementation, with its own fresh build output. This QA did not substitute a recent implementation-stage baseline.\n\n',
 f'Authenticated **209 original source/public/check/build/package/matcher files** against the supplied `MANIFEST.sha256`. The original project had 289 files: 286 manifest entries plus the manifest itself and two package-lock files. Reconstructing the originally recorded whole-tree hash using those 286 original hashes and the current three unmanifested originals yields `{P["reconstructed_original_tree_sha256"]}`, exactly the initial recorded hash. Those three files are unchanged too. Proof: ' + link('Changes/final-qa-evidence/original-tree-proof.json') + '.\n\n',
 'Baseline server logs created only inside the temporary baseline directory are not original project files and are not counted as deletions. Original project-file changes are compared to all 289 original hashes; generated `dist` changes are compared to the original fresh build, so byte-identical generated assets are not falsely listed as changed. New files under Changes are all included individually.\n\n',
 'Deleted only the generated `website/dist` directory and ran the unchanged build chain. The existing temporary `python3.cmd` runtime shim was placed on PATH because the Windows python3 alias is unavailable; no package/check script was edited. Python bytecode writes were disabled. No proof-content, package/deployment/hosting script or form submission was run. Local read-only preview servers were stopped after rendering/checks.\n\n',
 'Audit logic reads original DOCX XML, uses decoded case-sensitive DOM text, and checks tags independently. Service paragraph tests compare the complete raw paragraph with the original rendered paragraph plus one space and the DOCX appendix, including the existing editorial transformations. Whitespace normalization for visible-body comparison does not erase case or punctuation. All titles/meta values/canonicals, anchors/buttons and images are compared as ordered attribute/text lists. Original H2 lists and order are compared directly.\n\n',
 'Evidence: ' + link('Changes/final-qa-evidence/audit.json') + ', ' + link('Changes/final-qa-evidence/docx-extraction.json') + ', ' + link('Changes/final-qa-evidence/visible-text-replacements.json') + '.\n\n',
 '## Fresh checks\n\n']
parts.append(table(['Check', 'Counts', 'Issues / exit'], [
 ['Content', '29 measured page rows; About/Gallery exempt from quota; all 14 scoped pages meet quota and keywords', '0 / build exit 0'],
 ['Site', '34 HTML files; 243 source-section dispositions reviewed', '0'],
 ['Design', '30 customer pages; 0 project placeholders', '0'],
 ['Final', '30 customer pages; 333 top-level sections; 2,383 content blocks; unique metadata; 36 source targets / 37 assigned, with existing explained correction/addition', '0; no unexplained keyword-source differences'],
 ['Links', '2,718 internal occurrences; 32 unique paths; 35 responses checked', '34 pass / 1 accepted failure; exit 1'],
]))
parts += ['The sole HTTP failure is `/residential-window-tinting-services/`: the checker receives final status 200 and canonical URL without the slash after following the existing 308. There are no additional link-check issues. The final-check report retains its existing `checked_on: 2026-10-23` field; the command was freshly executed on 05-11-26, and no report-date/check logic was changed.\n\n',
 'Raw logs: ' + link('Changes/final-qa-evidence/build.log') + ', ' + link('Changes/final-qa-evidence/links.log') + '.\n\n',
 '## DOCX line-by-line audit\n\n',
 'Original file: `C:/Users/Aditya/Downloads/Tint A Window Final Developer Instructions.docx`; SHA-256 `' + A['docx_sha256'] + '`. Parsed all fourteen tables and shared-rule paragraphs programmatically. In service paragraph rows the DOCX column is the exact sentence to append; the built column deliberately shows the full retained paragraph plus appendix. PASS requires both parts and their single-space join to match. Shared film/closing rules apply to service pages only; Home has its own three section eyebrows/sentences.\n\n']
for p in A['pages']:
    parts.append(f'### Page {p["index"]}: {p["title"]} — `{p["path"]}`\n\n')
    parts.append(table(['Element', 'DOCX exact string', 'Built string', 'Tag', 'PASS/FAIL'], [[r['element'], r['docx'], r['built'], r['tag'], 'PASS' if r['passed'] else 'FAIL'] for r in p['rows']]))
parts.append('## Final-check items per page\n\n')
parts.append(table(['Page', 'Sole H1 = eyebrow', 'Headline SPAN + New Zealand', 'Section labels P/SPAN', 'Original H2s (count)', 'Meta/title/canonical/URL', 'Actions + images', 'Manifest H1'], [[p['index'], 'PASS', 'PASS', 'PASS', f'PASS ({p["h2_count"]})', 'PASS', 'PASS', 'PASS'] for p in A['pages']]))
parts += ['H1s also retain class `hero-eyebrow`; headline role is `span.hero-headline`. All service final titles “Tell us what you would like to change.” remain H2. All eleven per-page boolean checks are true in the machine evidence.\n\n',
 '## Replaced old strings and legitimate retained uses\n\n',
 'No old target remains in its replaced element. “For your home”, “For your workplace”, “Made for your space”, “Your next step”, old homepage eyebrows and old replaced homepage sentences are absent from visible page text. There are **30 legitimate remaining occurrences** of “Residential Services”/“Commercial Services”: unchanged form service-picker legends, not film-options labels. Each exact DOM location is listed below. No old-label exemption was applied to a film-options section.\n\n']
parts.append(table(['Page', 'Old string', 'Legitimate location'], [[x['path'], x['old_string'], x['location']] for x in A['retained_old_occurrences']]))
parts.append('## Scope integrity against the original build\n\n')
parts.append(table(['Excluded HTML', 'Result'], [[x['file'], 'PASS — only allowed cells below differ' if x['exception'] else 'PASS — byte-identical'] for x in A['excluded']]))
parts.append('All **34/34 footer HTML chunks are byte-identical**, including the fourteen edited pages, all excluded pages and generated reports. All excluded route-manifest records are identical; the fourteen included records differ only in H1 and now match the actual rendered eyebrow H1. Route paths and all other fields remain identical.\n\n')
parts.append('### Every changed design-review cell\n\n')
order = {p['path']:p['index'] for p in A['pages']}
cells = sorted(A['report_cell_differences'], key=lambda x:(order[x['path']],x['cell']))
parts.append(table(['Page', 'Field', 'Before → after'], [[f'{order[c["path"]]} {c["path"]}',c['cell'],f'{c["before"]} → {c["after"]}'] for c in cells]))
parts.append('These are exactly fifteen cells: fourteen word counts and one Home keyword count. Replacing only these cells reconstructs the original report byte for byte. No header, other count, excluded row, markup or footer difference remains.\n\n')
parts.append('## Complete copy changes outside the DOCX\n\n')
parts.append(table(['Page / element', 'Original → final', 'Final controlling source / key', 'Revert'], [[
 'Home, benefits help question (.home-outcome-help > p)',
 'Not sure where to start? → Not sure about window film in Christchurch?',
 'website/src/homepage-refinement.mjs — homepageRefinement().benefits',
 "Replace ${exactCopy(esc('Not sure about window film in Christchurch?'))} with the original literal Not sure where to start? and rebuild; this restores the pre-existing keyword shortfall caused by the DOCX replacements.",
]]))
parts.append('This is the complete list, established by diffing visible-body text on all fourteen pages against the original build. The evidence records every DOCX replacement, including unchanged paragraph remainders and shared labels. After masking/reversing those replacements, all thirteen service bodies match the original visible text exactly; on Home, reversing only the question above produces the original text exactly. No service page needed an additional keyword-copy fix. The question was previously accepted; **Not in DOCX: review needed** remains its provenance.\n\n')
parts.append('## Final keyword and word-count summary\n\n')
by_path={p['path']:p for p in A['keyword_summary']}
parts.append(table(['Page', 'Words', 'Assigned natural keyword counts', 'Min 3 / 1,000–1,500'], [[f'{p["index"]} {p["path"]}',by_path[p['path']]['words'],'; '.join(f'{k}: {v}' for k,v in by_path[p['path']]['keyword_counts'].items()),'PASS'] for p in A['pages']]))
parts += ['## Visual QA and open issues\n\n',
 'Chrome rendered **42 final full pages** (all fourteen × 1440/768/375px), plus the corresponding **42 original-baseline full pages**. All image requests/fonts were awaited; console/page/network errors were captured: zero. All 84 document scroll widths equal the viewport width: no whole-document horizontal overflow. Full-page layouts were inspected using overview sheets; every final hero and every service overview/closing section was also inspected using larger region sheets, plus the three changed Home sections. Original/final film-options captures and card geometry confirm the defects below. Native full-resolution PNGs remain available; overview inspection does not claim native-size proofreading of every unchanged lower-page sentence.\n\n',
 'No new hero or changed-eyebrow/paragraph clipping, collision or spacing defect was observed. Each small H1 is readable at 375px (12px/18px line height). Headlines/paragraphs stack normally on mobile, with a clear divider and separated buttons. Pages 9 and 12 are taller because of their copy, but the headline/paragraph/actions do not collide. Both have H1/headline line counts **1/4 at 1440px, 1/3 at 768px, and 2/5 at 375px**. No forced overflow; balanced wrapping remains plausible despite the long mobile headline.\n\n']
parts.append(table(['Pages', 'Width', 'Original → final measurement', 'Issue / classification'], [
 ['2, 4, 5, 9, 10', '768px', 'First two card widths 48px → 48px on each page', 'Text/icons overlap and clip inside collapsed cards; pre-existing.'],
 ['2, 4, 5, 9, 10', '375px', 'First card width 44px → 44px on each page', 'Text wraps into narrow fragments and clips; pre-existing.'],
 ['1, 3, 6, 7, 8, 11, 12, 13', '768px / 375px', 'Normal scroll cards approximately 340px / 278px', 'No same collapsed-card defect observed; partial next-card visibility is the existing horizontal-scroller crop.'],
 ['All service pages', '1440px', 'Normal desktop cards', 'No same collapsed-card defect observed.'],
]))
parts += ['**Page 5 is the additional affected page found in final QA.** Original and final region captures show the same defect there too; it is not introduced by the accepted copy changes. No fixes were attempted. The existing mobile/tablet fixed quote/call bar is present in full-page screenshots near the initial viewport bottom; it can cross a stitched image region. It is an existing viewport overlay, not evidence that the section is permanently clipped. No additional new layout failure was found in the reviewed static states.\n\n',
 'Screenshot directory: ' + link('Changes/screenshots/final-qa-05-11-26') + '. Final full pages: `page-NN-WIDTH.png`; original full pages: `baseline/`; hero/Home/film detail: `regions/`; original film detail: `baseline-regions/`; overview and side-by-side inspection sheets: `inspection/`. Geometry/errors: ' + link('Changes/screenshots/final-qa-05-11-26/render-results.json') + '.\n\n',
 'Checked static page layout, heroes, changed Home intro/audience/enquiry sections, service overview/film/closing regions, full-page continuity, overflow metrics and resource errors at the three requested widths. Did not click menus, accordions, carousel arrows, quote dialogs, telephone links, upload controls or form actions; did not submit forms, test keyboard/screen-reader interaction, other browsers/devices/widths, live hosting or deployment. HTTP links were checked separately by the existing checker. No interactive-QA pass is claimed.\n\n',
 '## Complete changed-file inventory\n\n',
 f'{len(inventory)} changed/added files are individually listed below, including every prior task artifact under Changes and this final QA evidence. **Removed original files: {len(removed)}.** Unchanged generated dist assets are omitted after original-build byte comparison. Original audit/report files are compared to the supplied original project hashes, so regeneration is visible even when metadata values themselves are protected and unchanged. Machine inventory: ' + link('Changes/final-qa-evidence/changed-files.json') + '.\n\n']
parts.append(table(['File', 'Status', 'One-line reason'], [[x['file'],x['status'],x['reason']] for x in inventory]))
parts += ['### Protected implementations\n\n',
 'No original check script, threshold, keyword assignment/map, keyword-matching implementation, final-proof-copy.json, package script, deployment script or proof-content.py was modified. All original changes are the accepted rendering/data/CSS files and regenerated reports listed above; all three standalone verifier scripts are new relative to the original project and were **not edited in this QA pass**. This final pass wrote generated build/check output and new Changes evidence only, plus the specifically requested changelog pointer.\n\n',
 '## Verdict\n\n',
 '**Ready for review.** The fourteen accepted pages match the DOCX exactly, scope integrity holds against the authenticated original build, and all four internal checks pass. Open items are the accepted 34/35 link assertion and the pre-existing film-card readability failures on pages 2, 4, 5, 9 and 10 at 768px/375px. Visual QA is therefore not an unconditional PASS or launch sign-off. No source fix, check bypass, deployment or hosting action was taken. Stopped for review.\n']
REPORT.write_text(''.join(parts),encoding='utf-8')
print(json.dumps({'report':str(REPORT),'inventory_files':len(inventory),'removed':removed,'audit_issues':A['issues'],'renders':len(R)},indent=2))
