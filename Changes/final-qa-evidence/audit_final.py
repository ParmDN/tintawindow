"""Read-only project audit; writes evidence and reports under Changes only."""
import difflib
import hashlib
import html
import importlib.util
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'website'
BASE = Path(r'C:\Users\Aditya\AppData\Local\Temp\tint-window-readonly-7b3f54ed1d544b439cbc91ac23ada2e8\website')
DOCX = Path(r'C:\Users\Aditya\Downloads\Tint A Window Final Developer Instructions.docx')
OUT = ROOT / 'Changes/final-qa-evidence'
spec = importlib.util.spec_from_file_location('shared', SITE / 'verify-shared-mechanism.py')
shared = importlib.util.module_from_spec(spec)
spec.loader.exec_module(shared)
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}


def text_xml(node):
    return ''.join(n.text or '' for n in node.findall('.//w:t', ns))


def plain(node):
    def chunks(n):
        if n.tag in {'script', 'style', 'svg'} or n.attrs.get('aria-hidden') == 'true' or 'hidden' in n.attrs or n.tag == 'dialog' and 'open' not in n.attrs:
            return
        for c in n.children:
            if isinstance(c, shared.Node):
                yield from chunks(c)
            else:
                yield c
    return ' '.join(' '.join(chunks(node)).split())


def one(node, predicate):
    return shared.one(node, predicate)


def byclass(node, cls):
    return one(node, lambda n: n.has(cls))


def section(node, section_id):
    return one(node, lambda n: n.tag == 'section' and n.attrs.get('id') == section_id)


def first_sentence(value):
    return re.split(r'(?<=[.!?])\s+', value, maxsplit=1)[0]


def parse_docx():
    with ZipFile(DOCX) as z:
        body = ET.fromstring(z.read('word/document.xml')).find('w:body', ns)
    tables, paragraphs = [], []
    index, title, path = 0, 'Homepage', '/'
    for child in body:
        if child.tag.endswith('}p'):
            value = text_xml(child)
            paragraphs.append(value)
            match = re.match(r'^(\d+)\s+(.+)', value)
            if match:
                index, title = int(match[1]), match[2]
            if value.startswith('https://'):
                path = urlsplit(value).path
        elif child.tag.endswith('}tbl'):
            rows = [[text_xml(cell) for cell in row.findall('./w:tc', ns)] for row in child.findall('./w:tr', ns)]
            tables.append({'index': index, 'title': title, 'path': path, 'rows': rows[1:]})
    film_rule = next(p for p in paragraphs if 'film-options section' in p)
    film_pairs = re.findall(r'[“"]([^”"]+)[”"] with [“"]([^”"]+)[”"]', film_rule)
    closing_rule = next(p for p in paragraphs if 'above the final H2' in p)
    closing_pair = re.search(r'replace [“"]([^”"]+)[”"] with [“"]([^”"]+)[”"]', closing_rule).groups()
    closing_h2 = re.search(r'final H2 [“"]([^”"]+)[”"]', closing_rule)[1]
    assert len(tables) == 14 and [t['index'] for t in tables] == list(range(14))
    assert len(film_pairs) == 3
    result = {'file': str(DOCX), 'sha256': hashlib.sha256(DOCX.read_bytes()).hexdigest(), 'paragraphs': paragraphs, 'tables': tables, 'film_pairs': film_pairs, 'closing_pair': closing_pair, 'closing_h2': closing_h2}
    (OUT / 'docx-extraction.json').write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')
    return result


def run_audit():
    docx = parse_docx()
    routes = json.loads((SITE / 'route-manifest.json').read_text(encoding='utf-8'))
    old_routes = json.loads((BASE / 'route-manifest.json').read_text(encoding='utf-8'))
    included = {r['path'] for r in routes[:14]}
    issues, pages, retained = [], [], []
    replacements = {}
    for table in docx['tables']:
        i, path, rows = table['index'], table['path'], table['rows']
        assert routes[i]['path'] == path, 'DOCX URL/source index mismatch'
        before = (BASE / 'dist' / path.lstrip('/') / 'index.html').read_text(encoding='utf-8')
        after = (SITE / 'dist' / path.lstrip('/') / 'index.html').read_text(encoding='utf-8')
        old, new = shared.Document(before).root, shared.Document(after).root
        old_hero, hero = byclass(old, 'fresh-hero'), byclass(new, 'fresh-hero')
        old_eye, eye = byclass(old_hero, 'eyebrow'), byclass(hero, 'hero-eyebrow')
        old_headline = one(old_hero, lambda n: n.tag == 'h1')
        headline = byclass(hero, 'hero-headline')
        old_lead = one(byclass(old_hero, 'hero-support'), lambda n: n.tag == 'p')
        lead = one(byclass(hero, 'hero-support'), lambda n: n.tag == 'p')
        audit_rows, pairs = [], []

        def audit(element, exact, built_node, built_value=None, expected=None, tags=None, old_node=None, old_value=None):
            built = plain(built_node) if built_value is None else built_value
            wanted = exact if expected is None else expected
            passed = built == wanted and (tags is None or built_node.tag in tags)
            audit_rows.append({'element': element, 'docx': exact, 'built': built, 'tag': built_node.tag, 'passed': passed})
            if not passed:
                issues.append(f'{path}: {element} mismatch')
            if old_node is not None or old_value is not None:
                pairs.append({'element': element, 'old': plain(old_node) if old_value is None else old_value, 'new': built, 'docx': True})

        audit('Hero small eyebrow', rows[0][1], eye, tags={'h1'}, old_node=old_eye)
        audit('Hero large headline', rows[1][1], headline, tags={'span'}, old_node=old_headline)
        full_lead = rows[2][1] if i == 0 else plain(old_lead) + ' ' + rows[2][1]
        audit('Hero paragraph' if i == 0 else 'Hero paragraph: baseline + appendix', rows[2][1], lead, expected=full_lead, tags={'p'}, old_node=old_lead)
        raw_expected = '<p>' + html.escape(full_lead, quote=False) + '</p>'
        if raw_expected not in after:
            issues.append(f'{path}: raw paragraph or single-space separator mismatch')
        eyes = []
        if i == 0:
            for sid, eye_row, sentence_row, paragraph_selector in [('possibilities', 3, 4, 'intro'), ('choose-your-space', 5, 6, 'audience'), ('home-enquiry', 7, 8, 'enquiry')]:
                a, b = section(old, sid), section(new, sid)
                ae, be = byclass(a, 'eyebrow'), byclass(b, 'eyebrow')
                audit(f'{sid}: eyebrow', rows[eye_row][1], be, tags={'p', 'span'}, old_node=ae)
                eyes.append(be)
                if paragraph_selector == 'intro':
                    ap = one(a, lambda n: n.tag == 'p' and plain(n).startswith('We fit '))
                    bp = one(b, lambda n: n.tag == 'p' and plain(n).startswith('We fit '))
                elif paragraph_selector == 'audience':
                    ap = one(byclass(a, 'chapter-heading'), lambda n: n.tag == 'p' and not n.has('eyebrow'))
                    bp = one(byclass(b, 'chapter-heading'), lambda n: n.tag == 'p' and not n.has('eyebrow'))
                else:
                    ap = one(a, lambda n: n.tag == 'p' and plain(n).startswith('Talk to us about '))
                    bp = one(b, lambda n: n.tag == 'p' and plain(n).startswith('Talk to us about '))
                audit(f'{sid}: replaced sentence', rows[sentence_row][1], bp, built_value=first_sentence(plain(bp)), tags={'p'}, old_value=first_sentence(plain(ap)))
        else:
            ae, be = byclass(section(old, 'possibilities'), 'eyebrow'), byclass(section(new, 'possibilities'), 'eyebrow')
            audit('Overview eyebrow', rows[3][1], be, tags={'p', 'span'}, old_node=ae)
            film_old, film_new = byclass(section(old, 'content-3'), 'eyebrow'), byclass(section(new, 'content-3'), 'eyebrow')
            film_exact = dict(docx['film_pairs'])[plain(film_old)]
            audit('Film-options label', film_exact, film_new, tags={'p', 'span'}, old_node=film_old)
            end_old, end_new = byclass(old, 'revision-next'), byclass(new, 'revision-next')
            ce_old, ce_new = byclass(end_old, 'eyebrow'), byclass(end_new, 'eyebrow')
            audit('Closing label', docx['closing_pair'][1], ce_new, tags={'p', 'span'}, old_node=ce_old)
            final_h2 = one(end_new, lambda n: n.tag == 'h2')
            audit('Final H2 (retained)', docx['closing_h2'], final_h2, tags={'h2'})
            eyes += [be, film_new, ce_new]

        h1s = [n for n in new.walk() if n.tag == 'h1']
        h2s = lambda node: [plain(n) for n in node.walk() if n.tag == 'h2']
        title = lambda node: plain(one(node, lambda n: n.tag == 'title'))
        meta = lambda node: [(n.attrs.get('name'), n.attrs.get('property'), n.attrs.get('content')) for n in node.walk() if n.tag == 'meta']
        canonical = lambda node: [n.attrs.get('href') for n in node.walk() if n.tag == 'link' and n.attrs.get('rel') == 'canonical']
        buttons = lambda node: [(n.tag, plain(n), n.attrs.get('href')) for n in node.walk() if n.tag in {'a', 'button'}]
        images = lambda node: [(n.attrs.get('src'), n.attrs.get('alt')) for n in node.walk() if n.tag == 'img']
        checks = {
            'sole_hero_h1': len(h1s) == 1 and h1s[0] is eye,
            'span_mentions_new_zealand': headline.tag == 'span' and 'New Zealand' in plain(headline),
            'section_eyebrows_not_headings': all(n.tag in {'p', 'span'} for n in eyes),
            'original_h2s_identical': h2s(old) == h2s(new),
            'meta_title_identical': title(old) == title(new),
            'meta_values_identical': meta(old) == meta(new),
            'canonical_identical': canonical(old) == canonical(new),
            'url_identical': old_routes[i]['path'] == path,
            'button_and_link_text_hrefs_identical': buttons(old) == buttons(new),
            'image_src_alt_identical': images(old) == images(new),
            'manifest_actual_h1': routes[i]['h1'] == plain(eye)
        }
        for name, passed in checks.items():
            if not passed:
                issues.append(f'{path}: {name}')
        old_visible, new_visible = plain(one(old, lambda n: n.tag == 'body')), plain(one(new, lambda n: n.tag == 'body'))
        restored = new_visible
        for pair in pairs:
            if restored.count(pair['new']) != 1:
                issues.append(f'{path}: ambiguous DOCX replacement {pair["element"]}')
            restored = restored.replace(pair['new'], pair['old'], 1)
        extra = []
        if restored != old_visible:
            old_question, new_question = 'Not sure where to start?', 'Not sure about window film in Christchurch?'
            if i == 0 and restored.count(new_question) == 1 and restored.replace(new_question, old_question, 1) == old_visible:
                extra.append({'old': old_question, 'new': new_question, 'source': 'website/src/homepage-refinement.mjs', 'key': 'homepageRefinement().benefits / .home-outcome-help > p', 'revert': "Replace ${exactCopy(esc('Not sure about window film in Christchurch?'))} with Not sure where to start? and rebuild."})
            else:
                issues.append(f'{path}: unexplained visible text difference')
                extra.append({'unexplained_diff': list(difflib.unified_diff(old_visible.split(), restored.split(), n=3))})
        replacements[path] = pairs
        pages.append({'index': i, 'title': table['title'], 'path': path, 'rows': audit_rows, 'checks': checks, 'h2_count': len(h2s(new)), 'non_docx_changes': extra, 'visible_text_explained': not any('unexplained_diff' in x for x in extra)})

        old_strings = ['For your home', 'For your workplace', 'Made for your space', 'Your next step', 'Residential Services', 'Commercial Services', 'Window film, chosen around you', 'Choose your space', 'Start a conversation']
        if i == 0:
            old_strings += [p['old'] for p in pairs if 'replaced sentence' in p['element']]
        for value in old_strings:
            for n in new.walk():
                if n.tag not in {'p', 'span', 'legend', 'h1', 'h2', 'h3', 'a', 'summary', 'li', 'figcaption'} or value not in plain(n):
                    continue
                if any(isinstance(c, shared.Node) and value in plain(c) for c in n.children):
                    continue
                ancestors, p = [], n
                while p.parent:
                    ancestors.append(p.tag + (('#' + p.attrs['id']) if p.attrs.get('id') else '') + ('.' + '.'.join(p.attrs.get('class', '').split()) if p.attrs.get('class') else ''))
                    p = p.parent
                legitimate = n.tag == 'legend' and value in {'Residential Services', 'Commercial Services'}
                retained.append({'path': path, 'old_string': value, 'location': ' < '.join(ancestors), 'text': plain(n), 'legitimate': legitimate, 'reason': 'Unchanged form service-picker legend, not the film-options label' if legitimate else 'Needs review'})
                if not legitimate:
                    issues.append(f'{path}: old string remains outside expected form legend: {value}')

    old_files = {p.relative_to(BASE / 'dist') for p in (BASE / 'dist').rglob('*.html')}
    new_files = {p.relative_to(SITE / 'dist') for p in (SITE / 'dist').rglob('*.html')}
    if old_files != new_files:
        issues.append('HTML inventory changed')
    excluded, footers, report_differences = [], [], []
    for relative in sorted(old_files & new_files):
        a, b = (BASE / 'dist' / relative).read_bytes(), (SITE / 'dist' / relative).read_bytes()
        before, after = a.decode('utf-8'), b.decode('utf-8')
        af, bf = re.findall(r'<footer\b[\s\S]*?</footer>', before), re.findall(r'<footer\b[\s\S]*?</footer>', after)
        same = bool(af) and af == bf
        footers.append({'file': relative.as_posix(), 'passed': same})
        if not same:
            issues.append(f'{relative}: footer changed')
        path = '/' if relative.as_posix() == 'index.html' else '/' + relative.parent.as_posix()
        if path not in included:
            if relative.as_posix() == 'design-review/index.html':
                passed, report_differences = shared.compare_generated_review(before, after, BASE, SITE, tuple(included))
            else:
                passed = a == b
            excluded.append({'file': relative.as_posix(), 'passed': passed, 'exception': relative.as_posix() == 'design-review/index.html'})
            if not passed:
                issues.append(f'{relative}: excluded output mismatch')
    if routes[14:] != old_routes[14:]:
        issues.append('Excluded route-manifest records changed')
    for a, b in zip(old_routes[:14], routes[:14]):
        if {k: v for k, v in a.items() if k != 'h1'} != {k: v for k, v in b.items() if k != 'h1'}:
            issues.append(a['path'] + ': route record changed beyond H1')

    manifest = dict((name, digest) for digest, name in (line.split('  ', 1) for line in (ROOT / 'MANIFEST.sha256').read_text().splitlines() if line.strip()))
    baseline_validated, guard = [], []
    for name, digest in manifest.items():
        if name.startswith(('website/src/', 'website/public/')) or name.startswith('website/check') or name in {'website/build.mjs', 'website/package.json', 'website/keyword_matching.py'}:
            p = BASE / Path(name).relative_to('website')
            passed = p.exists() and hashlib.sha256(p.read_bytes()).hexdigest() == digest
            baseline_validated.append({'file': name, 'passed': passed})
            if not passed:
                issues.append('Original baseline manifest mismatch: ' + name)
        if name.startswith('website/check') or name.startswith('website/src/keyword-map') or name in {'website/keyword_matching.py', 'website/proof-content.py'}:
            passed = hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest
            guard.append({'file': name, 'passed': passed})
            if not passed:
                issues.append('Protected original check/map changed: ' + name)
    summary = {'baseline': str(BASE), 'baseline_manifest_validation': baseline_validated, 'docx_sha256': docx['sha256'], 'docx_exact_rows': sum(len(t['rows']) for t in docx['tables']), 'pages': pages, 'retained_old_occurrences': retained, 'excluded': excluded, 'footers': footers, 'report_cell_differences': report_differences, 'protected_files': guard, 'keyword_summary': [p for p in json.loads((SITE / 'content-audit.json').read_text())['pages'] if p['path'] in included], 'issues': issues}
    (OUT / 'audit.json').write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding='utf-8')
    (OUT / 'visible-text-replacements.json').write_text(json.dumps(replacements, indent=2, ensure_ascii=False), encoding='utf-8')
    print(json.dumps({'docx_tables': 14, 'docx_exact_rows': summary['docx_exact_rows'], 'audit_rows': sum(len(p['rows']) for p in pages), 'baseline_files_verified': len(baseline_validated), 'excluded_html': len(excluded), 'footers': len(footers), 'report_cell_differences': report_differences, 'non_docx_changes': [x for p in pages for x in p['non_docx_changes']], 'retained_old_occurrences': len(retained), 'issues': issues}, indent=2, ensure_ascii=False))
    return summary


if __name__ == '__main__':
    result = run_audit()
    raise SystemExit(bool(result['issues']))
