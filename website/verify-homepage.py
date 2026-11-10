"""Verify Home against the accepted post-shared-step build, outside the build chain.

Usage: python verify-homepage.py --baseline PATH_TO_POST_SHARED_WEBSITE --copy-baseline PATH_TO_ACCEPTED_HOME_WEBSITE
"""
import argparse
import importlib.util
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('shared_verifier', ROOT / 'verify-shared-mechanism.py')
shared = importlib.util.module_from_spec(spec)
spec.loader.exec_module(shared)

# Independent assertions of the approved brief, not values read from rendering config.
EXPECTED = {
    'heroEyebrow': 'Window Tinting Christchurch',
    'heroHeadline': 'Window Film Solutions Across New Zealand',
    'heroLead': 'Based in Christchurch, Tint A Window provides residential and commercial window film solutions across New Zealand, helping reduce heat and glare and improve privacy in homes and businesses.',
    'introEyebrow': 'Christchurch Window Films',
    'introSentence': 'We fit window film in Christchurch homes and businesses, with service also available across New Zealand.',
    'audienceEyebrow': 'Christchurch Window Tinting',
    'audienceSentence': 'Explore residential and commercial window film solutions for properties in Christchurch and across New Zealand.',
    'enquiryEyebrow': 'Christchurch Tinting Advice',
    'enquirySentence': 'Talk to us about window tinting in Christchurch and across New Zealand.'
}

EXTRA_OLD = 'Not sure where to start?'
EXTRA_NEW = 'Not sure about window film in Christchurch?'

def restore_home_changes(new, old):
    old_doc = shared.Document(old).root
    old_support = shared.one(old_doc, lambda n: n.has('hero-support'))
    old_lead = shared.one(old_support, lambda n: n.tag == 'p').text()
    main_match = re.search(r'<main\b[^>]*>([\s\S]*?)</main>', new)
    assert main_match, 'Missing main element'
    restored = main_match[1].replace(EXTRA_NEW, EXTRA_OLD, 1)
    old_headline = re.search(r'<span class="hero-headline"><span>[\s\S]*?</span> <span class="hero-accent">[\s\S]*?</span></span>', old)
    assert old_headline, 'Baseline must be the accepted post-shared-step build'
    restored = restored.replace('<span class="hero-headline">' + EXPECTED['heroHeadline'] + '</span>', old_headline[0], 1)
    old_copy = {
        'heroEyebrow': 'Made for your light. Made for your life.',
        'heroLead': old_lead,
        'introEyebrow': 'Window film, chosen around you',
        'introSentence': 'We fit Window film in Christchurch homes and businesses, with selected South Island locations also covered.',
        'audienceEyebrow': 'Choose your space',
        'audienceSentence': 'Choose Window film in Christchurch for your home or workplace.',
        'enquiryEyebrow': 'Start a conversation',
        'enquirySentence': 'Talk to us about Window tinting in Christchurch.'
    }
    for key, value in old_copy.items():
        restored = restored.replace(EXPECTED[key], value, 1)
    restored = new[:main_match.start(1)] + restored + new[main_match.end(1):]
    return restored


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path, required=True)
    parser.add_argument('--copy-baseline', type=Path, required=True, help='Accepted exact-copy build before the one-question keyword fix')
    args = parser.parse_args()
    baseline = args.baseline.resolve()
    old = (baseline / 'dist/index.html').read_text(encoding='utf-8')
    new = (ROOT / 'dist/index.html').read_text(encoding='utf-8')
    old_doc, doc = shared.Document(old).root, shared.Document(new).root
    main_doc = shared.one(doc, lambda n: n.tag == 'main')
    visible_main_text = main_doc.text()
    groups = {k: [] for k in ['a_h1', 'b_headline', 'c_exact_copy', 'd_h2_unchanged', 'e_services_excluded_and_footers', 'f_only_requested_home_changes', 'g_manifest', 'h_single_non_docx_edit']}

    def check(group, passed, message):
        if not passed:
            groups[group].append(message)

    h1s = [n for n in doc.walk() if n.tag == 'h1']
    check('a_h1', len(h1s) == 1 and h1s[0].has('hero-eyebrow') and h1s[0].text() == EXPECTED['heroEyebrow'], 'Home H1 count, class or exact text mismatch')
    headline = shared.one(doc, lambda n: n.has('hero-headline'))
    check('b_headline', headline.tag == 'span' and headline.text() == EXPECTED['heroHeadline'], 'Home headline tag or text mismatch')
    for key, value in EXPECTED.items():
        count = visible_main_text.count(value)
        check('c_exact_copy', count == 1, f'{key}: expected exactly one case-sensitive occurrence in page content; found {count}')
    check('c_exact_copy', visible_main_text.count(EXTRA_NEW) == 1, 'Expected exactly one reviewed keyword question')
    copy_before = (args.copy_baseline.resolve() / 'dist/index.html').read_text(encoding='utf-8')
    check('h_single_non_docx_edit', new.count(EXTRA_NEW) == 1 and new.replace(EXTRA_NEW, EXTRA_OLD, 1) == copy_before, 'Changes outside the nine DOCX strings exceed the one approved question')
    old_hero = shared.one(old_doc, lambda n: n.has('fresh-hero'))
    old_support = shared.one(old_hero, lambda n: n.has('hero-support'))
    old_lead = shared.one(old_support, lambda n: n.tag == 'p').text()
    for value in [old_lead, 'Window film, chosen around you', 'Choose your space', 'Start a conversation']:
        check('c_exact_copy', value not in new, f'Old copy remains: {value}')
    check('c_exact_copy', 'data-exact-copy' not in new and '\ue000' not in new, 'Exact-copy marker leaked')
    for section_id, key in [('possibilities', 'introEyebrow'), ('choose-your-space', 'audienceEyebrow'), ('home-enquiry', 'enquiryEyebrow')]:
        section = shared.one(doc, lambda n: n.tag == 'section' and n.attrs.get('id') == section_id)
        eye = shared.one(section, lambda n: n.has('eyebrow'))
        check('c_exact_copy', eye.tag == 'p' and eye.text() == EXPECTED[key], f'{section_id}: eyebrow tag or text mismatch')
    headings = lambda tree: [(n.tag, n.text()) for n in tree.walk() if re.fullmatch('h[2-6]', n.tag)]
    check('d_h2_unchanged', headings(doc) == headings(old_doc), 'H2–H6 headings changed')

    restored = restore_home_changes(new, old)
    check('f_only_requested_home_changes', restored == old, 'Home differs beyond the nine approved replacements, headline split removal and one reviewed question')

    old_files = {p.relative_to(baseline / 'dist') for p in (baseline / 'dist').rglob('*.html')}
    new_files = {p.relative_to(ROOT / 'dist') for p in (ROOT / 'dist').rglob('*.html')}
    check('e_services_excluded_and_footers', old_files == new_files, 'HTML file inventory changed')
    old_routes = json.loads((baseline / 'route-manifest.json').read_text(encoding='utf-8'))
    routes = json.loads((ROOT / 'route-manifest.json').read_text(encoding='utf-8'))
    service_paths = {r['path'].strip('/') + '/index.html' for r in old_routes[1:14]}
    counts = {'service_pages_identical': 0, 'other_excluded_html_identical': 0, 'footers_identical': 0}
    report_differences = []
    report_other_cell_differences = []
    for relative in sorted(old_files & new_files):
        a, b = (baseline / 'dist' / relative).read_bytes(), (ROOT / 'dist' / relative).read_bytes()
        before, after = a.decode('utf-8'), b.decode('utf-8')
        old_footers = re.findall(r'<footer\b[\s\S]*?</footer>', before)
        footers = re.findall(r'<footer\b[\s\S]*?</footer>', after)
        match = bool(footers) and footers == old_footers
        check('e_services_excluded_and_footers', match, f'{relative}: footer changed')
        counts['footers_identical'] += int(match)
        if relative.as_posix() == 'index.html':
            continue
        if relative.as_posix() == 'design-review/index.html':
            permitted, report_differences = shared.compare_generated_review(before, after, baseline, ROOT)
            check('e_services_excluded_and_footers', permitted, 'Generated design-review differs outside measured Home word/keyword cells')
            def keyword_cells(html):
                cells = {}
                for row in re.findall(r'<tr>[\s\S]*?</tr>', html):
                    fields = re.findall(r'<td>([\s\S]*?)</td>', row)
                    if len(fields) != 5:
                        continue
                    link = re.search(r'<a href="([^"]+)"', fields[0])
                    if link:
                        for fragment in re.split(r'<br\s*/?>', fields[4]):
                            match = re.fullmatch(r'([\s\S]*?) <strong>× (\d+)</strong>', fragment)
                            if match:
                                cells[(link[1], match[1])] = int(match[2])
                return cells
            old_keywords, new_keywords = keyword_cells(before), keyword_cells(after)
            for key in sorted(old_keywords.keys() | new_keywords.keys()):
                if old_keywords.get(key) != new_keywords.get(key):
                    report_other_cell_differences.append({'path': key[0], 'column': 'keyword occurrences', 'keyword': key[1], 'before': old_keywords.get(key), 'after': new_keywords.get(key)})
        else:
            check('e_services_excluded_and_footers', a == b, f'{relative}: excluded HTML differs')
            if a == b:
                key = 'service_pages_identical' if relative.as_posix() in service_paths else 'other_excluded_html_identical'
                counts[key] += 1
    check('g_manifest', routes[1:] == old_routes[1:], 'Another route record changed')
    expected_home = {**old_routes[0], 'h1': EXPECTED['heroEyebrow']}
    check('g_manifest', routes[0] == expected_home, 'Home route record changed beyond its actual H1')
    result = {'counts': counts, 'report_cell_differences': report_differences, 'report_keyword_cell_differences': report_other_cell_differences, 'checks': {k: {'passed': not v, 'issues': v} for k, v in groups.items()}}
    print(json.dumps(result, indent=2))
    raise SystemExit(any(groups.values()))


if __name__ == '__main__':
    main()
