"""Compare this step with a pre-edit build; never runs in the build chain.

Usage: python verify-shared-mechanism.py --baseline PATH_TO_BASELINE_WEBSITE
For the accepted shared build plus subsequent Home copy, add --homepage-copy.
"""
import argparse
import html
import importlib.util
import json
import re
from html.parser import HTMLParser
from pathlib import Path


class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []

    def walk(self):
        for child in self.children:
            if isinstance(child, Node):
                yield child
                yield from child.walk()

    def text(self):
        return ' '.join(''.join(c.text() if isinstance(c, Node) else c for c in self.children).split())

    def has(self, cls):
        return cls in self.attrs.get('class', '').split()


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = self.current = Node()
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.current)
        self.current.children.append(node)
        if tag not in {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}:
            self.current = node

    def handle_endtag(self, tag):
        node = self.current
        while node.parent:
            if node.tag == tag:
                self.current = node.parent
                return
            node = node.parent

    def handle_data(self, data):
        self.current.children.append(data)


def one(root, predicate):
    found = [n for n in root.walk() if predicate(n)]
    assert len(found) == 1, f'Expected one matching node, found {len(found)}'
    return found[0]


def section(html, section_id=None, cls=None):
    # Match nested sections too, using the parser for semantic assertions elsewhere.
    start = re.search(r'<section\b[^>]*' + (r'\bid="' + re.escape(section_id) + '"' if section_id else r'\bclass="[^"]*\b' + re.escape(cls) + r'\b[^"]*"') + r'[^>]*>', html)
    assert start, f'Missing section {section_id or cls}'
    depth = 1
    for tag in re.finditer(r'</?section\b[^>]*>', html[start.end():]):
        depth += -1 if tag.group().startswith('</') else 1
        if depth == 0:
            return html[start.start():start.end() + tag.end()]
    raise AssertionError('Unclosed section')


def compare_generated_review(old, new, baseline, root, allowed_paths=('/',)):
    """Allow measured numbers only in explicitly selected rows; retain other bytes."""
    old_audit = {p['path']: p for p in json.loads((baseline / 'content-audit.json').read_text(encoding='utf-8'))['pages']}
    new_audit = {p['path']: p for p in json.loads((root / 'content-audit.json').read_text(encoding='utf-8'))['pages']}
    masked = [old, new]
    differences = []
    for path in allowed_paths:
        pattern = re.compile(r'<tr><td><a href="' + re.escape(path) + r'">[\s\S]*?</tr>')
        rows = [list(pattern.finditer(document)) for document in masked]
        if any(len(matches) != 1 for matches in rows) or path not in old_audit or path not in new_audit:
            return False, differences
        measured = [old_audit[path], new_audit[path]]
        for version, audit in enumerate(measured):
            row = rows[version][0]
            fields = list(re.finditer(r'<td>([\s\S]*?)</td>', row[0]))
            if len(fields) != 5 or fields[1][1] != str(audit['words']):
                return False, differences
            matches = list(re.finditer(r'([^<>]+) <strong>× (\d+)</strong>', fields[4][1]))
            if {html.unescape(m[1]): int(m[2]) for m in matches} != audit['keyword_counts']:
                return False, differences
            masked_row = row[0][:fields[1].start(1)] + '__MEASURED_WORDS__' + row[0][fields[1].end(1):]
            masked_row = re.sub(r'(<strong>× )\d+(</strong>)', r'\1__MEASURED_KEYWORD_COUNT__\2', masked_row)
            masked[version] = masked[version][:row.start()] + masked_row + masked[version][row.end():]
        if measured[0]['words'] != measured[1]['words']:
            differences.append({'path': path, 'cell': 'word count', 'before': measured[0]['words'], 'after': measured[1]['words']})
        for keyword in sorted(measured[0]['keyword_counts'].keys() | measured[1]['keyword_counts'].keys()):
            before, after = measured[0]['keyword_counts'].get(keyword), measured[1]['keyword_counts'].get(keyword)
            if before != after:
                differences.append({'path': path, 'cell': 'keyword count', 'keyword': keyword, 'before': before, 'after': after})
    return masked[0] == masked[1], differences


def normalise_expected_changes(html, index):
    hero = section(html, cls='fresh-hero')
    original = hero
    hero = hero.replace('<h1 class="eyebrow hero-eyebrow">', '<p class="eyebrow">', 1)
    hero = hero.replace('</h1>', '</p>', 1)
    hero = re.sub(r'<span class="hero-headline"><span>([\s\S]*?)</span> <span class="hero-accent">([\s\S]*?)</span></span>', r'<h1><span>\1</span> <em>\2</em></h1>', hero, count=1)
    html = html.replace(original, hero, 1)
    if index > 0:
        old = 'Residential Services' if index == 1 else 'Commercial Services' if index == 8 else 'Compare your options'
        new = 'Christchurch Residential Tinting' if index == 1 else 'Christchurch Commercial Tinting' if index == 8 else 'Christchurch Film Options'
        current = section(html, section_id='content-3')
        html = html.replace(current, current.replace(new, old, 1), 1)
        current = section(html, cls='revision-next')
        html = html.replace(current, current.replace('Christchurch Tinting Advice', 'Your next step', 1), 1)
    return html


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path, required=True)
    parser.add_argument('--homepage-copy', action='store_true', help='Compare with the accepted shared build, allowing the nine Home edits and the single reviewed keyword question')
    args = parser.parse_args()
    root = Path(__file__).resolve().parent
    baseline = args.baseline.resolve()
    home_verifier = None
    if args.homepage_copy:
        spec = importlib.util.spec_from_file_location('homepage_verifier', root / 'verify-homepage.py')
        home_verifier = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(home_verifier)
    old_routes = json.loads((baseline / 'route-manifest.json').read_text(encoding='utf-8'))
    routes = json.loads((root / 'route-manifest.json').read_text(encoding='utf-8'))
    affected = {r['path']: i for i, r in enumerate(old_routes[:14])}
    assert [r['path'] for r in routes] == [r['path'] for r in old_routes], 'Route inventory changed'
    groups = {name: [] for name in ['a_hero_roles', 'b_other_headings', 'c_labels_and_cards', 'd_excluded_pages_and_footers', 'e_only_authorised_changes', 'f_manifest_h1']}
    counts = {'affected_pages': 0, 'excluded_html_files': 0, 'footers': 0}
    report_cell_differences = []

    def check(group, condition, message):
        if not condition:
            groups[group].append(message)

    old_files = {p.relative_to(baseline / 'dist') for p in (baseline / 'dist').rglob('*.html')}
    new_files = {p.relative_to(root / 'dist') for p in (root / 'dist').rglob('*.html')}
    check('d_excluded_pages_and_footers', new_files == old_files, 'HTML file inventory changed')
    for relative in sorted(old_files & new_files):
        old_bytes = (baseline / 'dist' / relative).read_bytes()
        new_bytes = (root / 'dist' / relative).read_bytes()
        old, new = old_bytes.decode('utf-8'), new_bytes.decode('utf-8')
        path = '/' if str(relative).replace('\\', '/') == 'index.html' else '/' + str(relative.parent).replace('\\', '/')
        old_doc, doc = Document(old).root, Document(new).root
        footers = re.findall(r'<footer\b[\s\S]*?</footer>', new)
        old_footers = re.findall(r'<footer\b[\s\S]*?</footer>', old)
        check('d_excluded_pages_and_footers', footers == old_footers and bool(footers), f'{relative}: footer differs or missing')
        counts['footers'] += len(footers)
        if path not in affected:
            counts['excluded_html_files'] += 1
            if relative.as_posix() == 'design-review/index.html':
                permitted, report_cell_differences = compare_generated_review(old, new, baseline, root)
                check('d_excluded_pages_and_footers', permitted, f'{relative}: difference outside measured Home word/keyword cells')
            else:
                check('d_excluded_pages_and_footers', new_bytes == old_bytes, f'{relative}: excluded HTML differs')
            continue
        counts['affected_pages'] += 1
        index = affected[path]
        h1s = [n for n in doc.walk() if n.tag == 'h1']
        check('a_hero_roles', len(h1s) == 1 and h1s[0].has('hero-eyebrow'), f'{path}: wrong H1 count or role')
        headline = one(doc, lambda n: n.tag == 'span' and n.has('hero-headline'))
        check('a_hero_roles', not any(n.tag == 'em' or re.fullmatch('h[1-6]', n.tag) for n in headline.walk()), f'{path}: headline descendants must use spans')
        old_eye = one(old_doc, lambda n: n.tag == 'section' and n.has('fresh-hero'))
        old_eye = one(old_eye, lambda n: n.has('eyebrow'))
        expected_eye = home_verifier.EXPECTED['heroEyebrow'] if home_verifier and index == 0 else old_eye.text()
        check('a_hero_roles', h1s[0].text() == expected_eye, f'{path}: unexpected eyebrow wording')
        current_route = next(r for r in routes if r['path'] == path)
        check('f_manifest_h1', current_route['h1'] == h1s[0].text(), f'{path}: manifest H1 mismatch')
        old_headings = [(n.tag, n.text()) for n in old_doc.walk() if re.fullmatch('h[2-6]', n.tag)]
        headings = [(n.tag, n.text()) for n in doc.walk() if re.fullmatch('h[2-6]', n.tag)]
        check('b_other_headings', headings == old_headings, f'{path}: another heading changed')
        if index > 0:
            film = one(doc, lambda n: n.tag == 'section' and n.attrs.get('id') == 'content-3')
            eye = one(film, lambda n: n.has('eyebrow'))
            expected = 'Christchurch Residential Tinting' if index == 1 else 'Christchurch Commercial Tinting' if index == 8 else 'Christchurch Film Options'
            check('c_labels_and_cards', eye.tag == 'p' and eye.text() == expected, f'{path}: film label mismatch')
            closing = one(doc, lambda n: n.tag == 'section' and n.has('revision-next'))
            check('c_labels_and_cards', one(closing, lambda n: n.has('eyebrow')).text() == 'Christchurch Tinting Advice', f'{path}: closing label mismatch')
            check('c_labels_and_cards', one(closing, lambda n: n.tag == 'h2').text() == 'Tell us what you would like to change.', f'{path}: final H2 changed')
            old_film = section(old, section_id='content-3')
            new_film = section(new if home_verifier else normalise_expected_changes(new, index), section_id='content-3')
            check('c_labels_and_cards', new_film == old_film, f'{path}: film layout/icons/links differ')
        expected_html = home_verifier.restore_home_changes(new, old) if home_verifier and index == 0 else new if home_verifier else normalise_expected_changes(new, index)
        check('e_only_authorised_changes', expected_html == old, f'{path}: HTML differs beyond the authorised changes')
        check('e_only_authorised_changes', 'data-exact-copy' not in new and '\ue000' not in new, f'{path}: exact-copy marker leaked')
    result = {'counts': counts, 'report_cell_differences': report_cell_differences, 'checks': {k: {'passed': not v, 'issues': v} for k, v in groups.items()}}
    print(json.dumps(result, indent=2))
    raise SystemExit(any(groups.values()))


if __name__ == '__main__':
    main()
