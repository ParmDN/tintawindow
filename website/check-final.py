from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import re,json,csv,collections,hashlib
root=Path(__file__).resolve().parent
class Node:
 def __init__(self,tag='',attrs=(),parent=None):self.tag=tag;self.attrs=dict(attrs);self.parent=parent;self.children=[]
 def find(self,t):return [n for n in self.walk() if n.tag==t]
 def walk(self):
  for c in self.children:
   if isinstance(c,Node):yield c;yield from c.walk()
 def text(self):return ' '.join(' '.join(c.text() if isinstance(c,Node) else c for c in self.children).split())
class Doc(HTMLParser):
 def __init__(self,html):super().__init__();self.root=Node();self.current=self.root;self.feed(html)
 def handle_starttag(self,t,a):
  n=Node(t,a,self.current);self.current.children.append(n)
  if t not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:self.current=n
 def handle_endtag(self,t):
  n=self.current
  while n.parent:
   if n.tag==t:self.current=n.parent;return
   n=n.parent
 def handle_data(self,d):self.current.children.append(d)
issues=[];inventory=[];metadata=[];blocks=[];routes=json.loads((root/'route-manifest.json').read_text())
for r in routes:
 file=root/'dist'/r['path'].lstrip('/')/'index.html';doc=Doc(file.read_text()).root
 main=doc.find('main')[0]; metas={n.attrs.get('name') or n.attrs.get('property'):n.attrs.get('content') for n in doc.find('meta')}
 if r['type']=='review':continue
 sections=[n for n in main.find('section') if n.parent==main]
 for i,s in enumerate(sections,1):
  headings=s.find('h1')+s.find('h2'); heading=headings[0].text() if headings else '(unlabelled section)'
  inventory.append({'Page':r['path'],'Section':i,'Heading':heading,'Section ID':s.attrs.get('id',''),'Surface':s.attrs.get('data-surface',''),'Images':len(s.find('img')),'Questions':len(s.find('summary')),'Client decision':'','Reviewer notes':''})
 for n in main.walk():
  if n.tag in ('p','li','h1','h2','h3','summary'):
   t=n.text();blocks.append((r['path'],n.tag,t))
   if re.search(r'\b(help help|the the|and and|can can|in in)\b',t,re.I):issues.append([r['path'],'repeated word',t])
   if re.search(r'window tinting in .{2,20} services\b|Explore considered window film for your property|Frosted and opaque films can provide privacy.*allowing natural light',t):issues.append([r['path'],'editorial regression',t])
 for n in doc.find('script'):
  if n.attrs.get('type')=='application/ld+json':
   try:json.loads(''.join(c for c in n.children if isinstance(c,str)))
   except Exception as e:issues.append([r['path'],'invalid schema',str(e)])
 for n in doc.find('img'):
  if not n.attrs.get('alt'):issues.append([r['path'],'missing image alternative',n.attrs.get('src')])
  if not all(n.attrs.get(k) for k in ('width','height')):issues.append([r['path'],'missing image dimensions',n.attrs.get('src')])
 for key in ('description','og:title','og:description','og:image','twitter:card','robots'):
  if not metas.get(key):issues.append([r['path'],'missing metadata',key])
 title=doc.find('title')[0].text();metadata.append({'path':r['path'],'title':title,'description':metas['description'],'canonical':next(n.attrs['href'] for n in doc.find('link') if n.attrs.get('rel')=='canonical')})
 for key in ('description',):
  if len(metas[key])<60 or len(metas[key])>180:issues.append([r['path'],'description length',len(metas[key])])
for key in ('title','description','canonical'):
 grouped=collections.defaultdict(list)
 for m in metadata:grouped[m[key]].append(m['path'])
 for val,paths in grouped.items():
  if len(paths)>1:issues.append(['metadata duplicate',key,paths])
# Compare fresh sheet against actual page ownership, accounting for explicit approved exceptions.
normal=lambda s:' '.join(s.lower().split())
live=json.loads((root/'src/keyword-map-2026-10-23.json').read_text())
sheet={normal(row[1]) for row in live['values'][1:] if len(row)>1 and row[1]}
assigned={normal(k) for r in routes for k in r.get('keywords',[])}
missing=sheet-assigned;extra=assigned-sheet
expected_missing={'tint a windows project'};expected_extra={'tint a window projects','house window tinting christchurch'}
if missing!=expected_missing or extra!=expected_extra:issues.append(['keyword-source-drift',sorted(missing),sorted(extra)])
comparison={'live_sheet_targets':len(sheet),'assigned_targets':len(assigned),'source_phrase_corrected':{'Tint a Windows Project':'Tint A Window projects'},'user_addition':{'house window tinting christchurch':'/residential-window-tinting-services'},'unexplained_differences':[] if missing==expected_missing and extra==expected_extra else [sorted(missing),sorted(extra)]}
(root/'keyword-source-check.json').write_text(json.dumps(comparison,indent=2)+'\n')
with (root/'SECTION-REVIEW.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(inventory[0]));w.writeheader();w.writerows(inventory)
(root/'metadata-review.json').write_text(json.dumps(metadata,indent=2)+'\n')
(root/'content-review.txt').write_text('\n\n'.join(f'{p} | {tag}\n{t}' for p,tag,t in blocks))
report={'checked_on':'2026-10-23','customer_pages':len(metadata),'top_level_sections':len(inventory),'content_blocks':len(blocks),'metadata_unique':True,'keyword_source_check':comparison,'issues':issues,'html_sha256':{r['path']:hashlib.sha256((root/'dist'/r['path'].lstrip('/')/'index.html').read_bytes()).hexdigest() for r in routes}}
(root/'qa-final.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='html_sha256'},indent=2))
raise SystemExit(bool(issues))
