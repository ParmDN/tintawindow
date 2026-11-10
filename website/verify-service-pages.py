"""Verify selected service indexes against the build immediately before their edits.

Usage: python verify-service-pages.py --baseline PATH_TO_WEBSITE --indexes 1
The config supplies expected per-index strings. Page 1 also has an independent
brief fixture. No report rows outside --indexes receive a numeric exception.
"""
import argparse
import html
import importlib.util
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('shared_verifier', ROOT / 'verify-shared-mechanism.py')
shared = importlib.util.module_from_spec(spec)
spec.loader.exec_module(shared)
PILOT_BRIEF = {
    'eyebrow': 'Residential Window Tinting Christchurch',
    'headline': 'Residential Window Tinting Across New Zealand',
    'appendSentence': 'We provide residential window tinting for homes in Christchurch and across New Zealand.',
    'overviewEyebrow': 'Christchurch Residential Window Tinting'
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path, required=True)
    parser.add_argument('--indexes', type=int, nargs='+', required=True)
    args = parser.parse_args()
    baseline = args.baseline.resolve()
    indexes = args.indexes
    assert len(set(indexes)) == len(indexes) and all(1 <= i <= 13 for i in indexes), 'Select unique service indexes 1–13'
    config = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', "import {nationalCopy} from './src/national-copy.mjs';console.log(JSON.stringify(nationalCopy.services));"], cwd=ROOT, text=True, encoding='utf-8'))
    assert all(str(i) in config for i in indexes), 'Selected index has no exact-copy configuration'
    if 1 in indexes:
        assert config['1'] == PILOT_BRIEF, 'Page 1 configuration differs from the approved brief'
    old_routes = json.loads((baseline / 'route-manifest.json').read_text(encoding='utf-8'))
    routes = json.loads((ROOT / 'route-manifest.json').read_text(encoding='utf-8'))
    assert [r['path'] for r in old_routes] == [r['path'] for r in routes], 'Route inventory changed'
    selected = {old_routes[i]['path']: i for i in indexes}
    groups = {k: [] for k in ['a_h1', 'b_headline', 'c_paragraph', 'd_overview', 'e_labels_and_h2', 'f_actions_images_metadata', 'g_isolation', 'h_only_requested_changes', 'i_manifest']}

    def check(group, condition, message):
        if not condition:
            groups[group].append(message)

    old_files = {p.relative_to(baseline / 'dist') for p in (baseline / 'dist').rglob('*.html')}
    new_files = {p.relative_to(ROOT / 'dist') for p in (ROOT / 'dist').rglob('*.html')}
    check('g_isolation', old_files == new_files, 'HTML inventory changed')
    counts = {'selected_pages': 0, 'unselected_html_identical': 0, 'footers_identical': 0}
    report_differences = []
    for relative in sorted(old_files & new_files):
        a = (baseline / 'dist' / relative).read_bytes()
        b = (ROOT / 'dist' / relative).read_bytes()
        before, after = a.decode('utf-8'), b.decode('utf-8')
        path = '/' if relative.as_posix() == 'index.html' else '/' + relative.parent.as_posix()
        old_footers = re.findall(r'<footer\b[\s\S]*?</footer>', before)
        footers = re.findall(r'<footer\b[\s\S]*?</footer>', after)
        same_footer = bool(footers) and footers == old_footers
        check('g_isolation', same_footer, f'{relative}: footer changed')
        counts['footers_identical'] += int(same_footer)
        if relative.as_posix() == 'design-review/index.html':
            allowed, report_differences = shared.compare_generated_review(before, after, baseline, ROOT, tuple(selected))
            check('g_isolation', allowed, 'Generated report differs outside selected-page measured word/keyword cells')
            continue
        if path not in selected:
            check('g_isolation', a == b, f'{relative}: unselected page changed')
            counts['unselected_html_identical'] += int(a == b)
            continue
        counts['selected_pages'] += 1
        index = selected[path]
        expected = config[str(index)]
        old_doc, doc = shared.Document(before).root, shared.Document(after).root
        h1s = [n for n in doc.walk() if n.tag == 'h1']
        check('a_h1', len(h1s) == 1 and h1s[0].has('hero-eyebrow') and h1s[0].text() == expected['eyebrow'], f'{path}: H1 mismatch')
        headline = shared.one(doc, lambda n: n.has('hero-headline'))
        check('b_headline', headline.tag == 'span' and headline.text() == expected['headline'] and 'New Zealand' in headline.text() and not any(re.fullmatch('h[1-6]', n.tag) for n in headline.walk()), f'{path}: headline mismatch')
        old_support = shared.one(old_doc, lambda n: n.has('hero-support'))
        support = shared.one(doc, lambda n: n.has('hero-support'))
        old_paragraph = shared.one(old_support, lambda n: n.tag == 'p').text()
        paragraph = shared.one(support, lambda n: n.tag == 'p')
        expected_paragraph = old_paragraph + ' ' + expected['appendSentence']
        check('c_paragraph', paragraph.text() == expected_paragraph, f'{path}: paragraph differs from old paragraph + one-space appendix')
        exact_paragraph_html = '<p>' + html.escape(old_paragraph, quote=False) + ' ' + html.escape(expected['appendSentence'], quote=False) + '</p>'
        check('c_paragraph', exact_paragraph_html in after, f'{path}: paragraph raw spacing or markup changed')
        overview = shared.one(doc, lambda n: n.tag == 'section' and n.attrs.get('id') == 'possibilities')
        eye = shared.one(overview, lambda n: n.has('eyebrow'))
        check('d_overview', eye.tag in ['p', 'span'] and eye.text() == expected['overviewEyebrow'], f'{path}: overview mismatch')
        film = shared.one(doc, lambda n: n.tag == 'section' and n.attrs.get('id') == 'content-3')
        label = 'Christchurch Residential Tinting' if index == 1 else 'Christchurch Commercial Tinting' if index == 8 else 'Christchurch Film Options'
        check('e_labels_and_h2', shared.one(film, lambda n: n.has('eyebrow')).text() == label, f'{path}: film label mismatch')
        check('e_labels_and_h2', shared.section(before, section_id='content-3') == shared.section(after, section_id='content-3'), f'{path}: film section changed')
        closing = shared.one(doc, lambda n: n.tag == 'section' and n.has('revision-next'))
        check('e_labels_and_h2', shared.one(closing, lambda n: n.has('eyebrow')).text() == 'Christchurch Tinting Advice', f'{path}: closing label mismatch')
        check('e_labels_and_h2', shared.one(closing, lambda n: n.tag == 'h2').text() == 'Tell us what you would like to change.', f'{path}: final H2 mismatch')
        headings = lambda tree: [(n.tag, n.text()) for n in tree.walk() if re.fullmatch('h[2-6]', n.tag)]
        check('e_labels_and_h2', headings(doc) == headings(old_doc), f'{path}: another heading changed')
        for pattern, label in [(r'<head\b[\s\S]*?</head>', 'head/metadata'), (r'<img\b[^>]*>', 'images'), (r'<div class="enquiry-actions">[\s\S]*?</div>', 'actions')]:
            check('f_actions_images_metadata', re.findall(pattern, before) == re.findall(pattern, after), f'{path}: {label} changed')

        # Reverse precisely the four approved changes, then compare the complete HTML.
        old_hero = shared.one(old_doc, lambda n: n.has('fresh-hero'))
        old_eye = shared.one(old_hero, lambda n: n.has('hero-eyebrow')).text()
        old_overview = shared.one(old_doc, lambda n: n.tag == 'section' and n.attrs.get('id') == 'possibilities')
        old_overview_eye = shared.one(old_overview, lambda n: n.has('eyebrow')).text()
        old_headline = re.search(r'<span class="hero-headline"><span>[\s\S]*?</span> <span class="hero-accent">[\s\S]*?</span></span>', before)
        assert old_headline, f'{path}: baseline must precede this page exact-copy edit'
        restored = after.replace('<span class="hero-headline"><span>' + expected['headline'] + '</span></span>', old_headline[0], 1)
        restored = restored.replace('<h1 class="eyebrow hero-eyebrow"><span></span>' + expected['eyebrow'] + '</h1>', '<h1 class="eyebrow hero-eyebrow"><span></span>' + old_eye + '</h1>', 1)
        restored = restored.replace(exact_paragraph_html, '<p>' + html.escape(old_paragraph, quote=False) + '</p>', 1)
        overview_html = shared.section(restored, section_id='possibilities')
        restored = restored.replace(overview_html, overview_html.replace(expected['overviewEyebrow'], old_overview_eye, 1), 1)
        check('h_only_requested_changes', restored == before, f'{path}: HTML changed beyond the four specified replacements')
        check('h_only_requested_changes', 'data-exact-copy' not in after and '\ue000' not in after, f'{path}: exact-copy marker leaked')
    for old_route, route in zip(old_routes, routes):
        expected_route = {**old_route, 'h1': config[str(selected[route['path']])]['eyebrow']} if route['path'] in selected else old_route
        check('i_manifest', route == expected_route, f'{route["path"]}: unexpected route record change')
    print(json.dumps({'indexes': indexes, 'counts': counts, 'report_cell_differences': report_differences, 'checks': {k: {'passed': not v, 'issues': v} for k, v in groups.items()}}, indent=2))
    raise SystemExit(any(groups.values()))


if __name__ == '__main__':
    main()
