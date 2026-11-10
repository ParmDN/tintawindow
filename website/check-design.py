"""Guard the requested story order, visual chapters and explicit project slots."""
import json
from html.parser import HTMLParser
from pathlib import Path

root = Path(__file__).parent
issues = []
results = []

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.main = False
        self.depth = 0
        self.sections = []
        self.slots = []
        self.heroes = 0
        self.choice_photos = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main':
            self.main = True
            return
        if not self.main:
            return
        classes = attrs.get('class', '').split()
        if 'fresh-hero' in classes:
            self.heroes += 1
        if 'choice-photo' in classes:
            self.choice_photos += 1
        if 'data-project-placeholder' in attrs:
            self.slots.append(attrs['data-project-placeholder'])
        if tag == 'section' and self.depth == 0:
            self.sections.append({'classes': classes, 'surface': attrs.get('data-surface')})
        if tag not in {'img','input','br','hr','meta','link','source','wbr'}:
            self.depth += 1
    def handle_endtag(self, tag):
        if tag == 'main':
            self.main = False
        elif self.main:
            self.depth -= 1

routes = json.loads((root / 'route-manifest.json').read_text())
for index, route in enumerate(routes):
    if route['type'] == 'review':
        continue
    page = Page()
    page.feed((root / 'dist' / route['path'].lstrip('/') / 'index.html').read_text())
    prefix = route['path'] + ': '
    if page.heroes != 1:
        issues.append(prefix + 'expected one new hero')
    for i, section in enumerate(page.sections):
        if not section['surface']:
            issues.append(prefix + 'missing section surface')
        if i and section['surface'] == page.sections[i-1]['surface']:
            issues.append(prefix + 'adjacent sections share a surface')
    if 1 <= index <= 13 and page.slots:
        issues.append(prefix + 'unexpected project placeholders')
    if 1 <= index <= 13:
        html=(root/'dist'/route['path'].lstrip('/')/'index.html').read_text()
        if html.count('class="gallery-context-card"')!=2:issues.append(prefix+'expected two truthful gallery references')
        order = ['revision-brief','revision-details-section','revision-choices-section',
                 'application-section','revision-guide','project-slots',
                 'revision-reasons-section','revision-steps-section','customer-notes',
                 'revision-answers-section','revision-next']
        positions = []
        for name in order:
            position = next((i for i,s in enumerate(page.sections) if name in s['classes']), -1)
            if position < 0:
                issues.append(prefix + 'missing story chapter ' + name)
            positions.append(position)
        if positions != sorted(positions):
            issues.append(prefix + 'story chapters out of order')
    if index in [1,8] and page.choice_photos < 5:
        issues.append(prefix + 'missing overview service imagery')
    results.append({'path':route['path'],'sections':len(page.sections),'project_slots':len(page.slots)})

# Protect the approved homepage story and useful paths, not the old copy length.
import re
home = (root / 'dist/index.html').read_text()
home_page=Page(); home_page.feed(home)
expected=['fresh-hero','home-experience','home-introduction','audience-chapter','home-outcomes','home-reasons','home-people-717','home-real-work','home-installation','customer-notes','home-questions','home-enquiry']
actual=[next((name for name in expected if name in s['classes']),None) for s in home_page.sections]
if actual!=expected:issues.append('Homepage customer journey differs from approved order')
if home.count('class="home-outcome-card"')!=6:issues.append('Homepage needs six linked customer outcomes')
if home_page.slots or 'class="section revision-next"' in home:issues.append('Homepage contains placeholders or a duplicate closing CTA')
if home.count('id="home-enquiry"')!=1:issues.append('Homepage needs one closing enquiry form')
for route in routes:
    html = (root / 'dist' / route['path'].lstrip('/') / 'index.html').read_text()
    footer = html.split('<footer',1)[1].split('</footer>',1)[0]
    if not all(f'href="{p["path"]}"' in footer for p in routes[1:14]):
        issues.append(route['path'] + ': missing service footer links')
    if 'Facebook' not in footer or 'Instagram' not in footer:
        issues.append(route['path'] + ': missing social profile spaces')

# Keep the newly shared enquiry actions and illustrated guides consistent across customer pages.
solar_guides={1,2,4,5,8,9,10}
privacy_guides={3,6,12}
for index, route in enumerate(routes):
    if route['type']=='review':
        continue
    html=(root/'dist'/route['path'].lstrip('/')/'index.html').read_text()
    hero=html.split('class="hero-support"',1)[1].split('</section>',1)[0]
    if '>Get a Quote</a>' not in hero or 'href="tel:0800368468">Call Now</a>' not in hero:
        issues.append(route['path']+': missing paired hero enquiry actions')
    guide=re.search(r'<figure class="tint-reference-guide".*?</figure>',html,re.S)
    if bool(guide)!=(index in solar_guides|privacy_guides):
        issues.append(route['path']+': tint guide in the wrong context')
    if guide and index in solar_guides and ('Illustrated shades, not product samples' not in guide[0] or 'Illustrative visible-light transmission (VLT)' not in guide[0] or 'not heat-rejection' not in guide[0]):
        issues.append(route['path']+': shade guide must label approved VLT examples and exclude implied product performance')
    if re.search(r'solarcontrol\.co\.nz|Solar Control Ltd|sister compan',html,re.I):
        issues.append(route['path']+': unrelated company reference')
    if 'projects, this means better comfort, privacy and usability' in html:
        issues.append(route['path']+': removed filler returned')

slots = json.loads((root / 'project-placeholders.json').read_text())
if slots:
    issues.append('Project placeholder inventory should be empty after the gallery replacement')
if any(s['status'] != 'placeholder' or s['photo'] or s['product'] or s['result'] for s in slots):
    issues.append('Unapproved facts in the placeholder inventory')
report = {'customer_pages':len(results),'project_slots':len(slots),'pages':results,'issues':issues}
(root / 'design-audit.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'customer_pages':len(results),'project_slots':len(slots),'issues':issues}, indent=2))
raise SystemExit(bool(issues))
