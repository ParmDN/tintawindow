from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json
r=Path(__file__).parent;dist=r/'dist';issues=[];pages=[]
class Scan(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=[];self.images=[];self.h1=0;self.title=False;self.description=False;self.noindex=False;self.schema=False
 def handle_starttag(self,t,a):
  a=dict(a)
  if 'id' in a:self.ids.append(a['id'])
  if t=='a' and 'href'in a:self.links.append(a['href'])
  if t in ['img','script'] and a.get('src','').startswith('/'):self.images.append(a['src'])
  if t=='link' and a.get('rel')=='stylesheet':self.images.append(a['href'])
  if t=='h1':self.h1+=1
  if t=='title':self.title=True
  if t=='meta' and a.get('name')=='description':self.description=bool(a.get('content'))
  if t=='meta' and a.get('name')=='robots':self.noindex='noindex'in a.get('content','')
  if t=='script' and a.get('type')=='application/ld+json':self.schema=True
for p in dist.rglob('*.html'):
 s=Scan();s.feed(p.read_text());pages.append((p,s))
 for x in s.images:
  if not(dist/x.lstrip('/')).is_file():issues.append(f'{p}: missing asset {x}')
 if s.h1!=1 or not all([s.title,s.description,s.noindex,s.schema]):issues.append(f'{p}: metadata/H1 failure')
 if len(s.ids)!=len(set(s.ids)):issues.append(f'{p}: duplicate IDs')
for p,s in pages:
 for l in s.links:
  u=urlsplit(l)
  if u.scheme or u.netloc:continue
  target=(dist/u.path.lstrip('/')/'index.html') if u.path else p
  if not target.exists():issues.append(f'{p}: broken link {l}');continue
  if u.fragment:
   t=Scan();t.feed(target.read_text())
   if unquote(u.fragment) not in t.ids:issues.append(f'{p}: missing fragment {l}')
source=json.loads((r/'source-section-review.json').read_text())
if len(source)!=243:issues.append(f'Expected 243 source section dispositions, found {len(source)}')
result={'html_files':len(pages),'source_sections_reviewed':len(source),'issues':issues};(r/'site-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));raise SystemExit(bool(issues))
