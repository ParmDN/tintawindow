"""Read-only response checks against the running local preview."""
import json
import urllib.request
import urllib.error
from html.parser import HTMLParser
from pathlib import Path

root = Path(__file__).parent
class Links(HTMLParser):
    def __init__(self): super().__init__(); self.links = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a': self.links.append(a.get('href', ''))

paths, occurrences = set(), 0
for file in (root / 'dist').rglob('*.html'):
    parser = Links(); parser.feed(file.read_text())
    for link in parser.links:
        if link.startswith('/'):
            paths.add(link.split('#')[0]); occurrences += 1

rows = []
for path in sorted(paths) + ['/residential-window-tinting-services/', '/robots.txt', '/unavailable-design-check']:
    expected = 404 if path == '/unavailable-design-check' else 308 if path == '/residential-window-tinting-services/' else 200
    try:
        with urllib.request.urlopen('http://127.0.0.1:4325' + path, timeout=5) as response:
            row = {'path':path, 'status':response.status, 'final_url':response.url,
                   'noindex':'noindex' in response.headers.get('X-Robots-Tag','')}
    except urllib.error.HTTPError as error:
        row = {'path':path, 'status':error.code, 'location':error.headers.get('Location'), 'noindex':'noindex' in error.headers.get('X-Robots-Tag','')}
    except Exception as error:
        row = {'path':path, 'error':str(error)}
    row['passed'] = row.get('status') == expected and row.get('noindex', False)
    if path == '/residential-window-tinting-services/':
        row['passed'] = row['passed'] and row.get('location') == '/residential-window-tinting-services'
    rows.append(row)

report = {'internal_link_occurrences':occurrences, 'unique_paths':len(paths),
          'responses_checked':len(rows), 'results':rows, 'issues':[r for r in rows if not r['passed']]}
(root / 'qa-http-polish.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='results'}, indent=2))
raise SystemExit(bool(report['issues']))
