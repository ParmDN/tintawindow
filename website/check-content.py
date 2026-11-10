from keyword_matching import natural_matches, exact_matches
import re,json,csv,unicodedata
from pathlib import Path
from html.parser import HTMLParser
root=Path(__file__).parent
class Content(HTMLParser):
 def __init__(self):super().__init__();self.stack=[];self.chunks=[];self.h1=0;self.images=[];self.sections=0
 def handle_starttag(self,t,a):
  d=dict(a);self.stack.append((t,d)) if t not in ['img','br','hr','input','meta','link','source','wbr'] else None
  if t=='h1':self.h1+=1
  inside=any(tag=='main' for tag,attrs in self.stack)
  excluded=any(tag in ['dialog','svg'] or attrs.get('aria-hidden')=='true' or 'hidden' in attrs for tag,attrs in self.stack)
  if inside and not excluded and t=='img':self.images.append(d.get('src',''))
  if inside and not excluded and t=='section':self.sections+=1
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i][0]==t:self.stack=self.stack[:i];break
 def handle_data(self,d):
  if any(t=='main' for t,a in self.stack) and not any(t in ['script','style','svg'] or a.get('aria-hidden')=='true' or 'hidden' in a or t=='nav' for t,a in self.stack):self.chunks.append(d)
def text(s):p=Content();p.feed(s);return re.sub(r'\s+',' ',' '.join(p.chunks)).strip(),p.h1
def words(s):return len(re.findall(r"[\w]+(?:['’‐‑-][\w]+)*",s,re.UNICODE))
def fold(s):return ''.join(c for c in unicodedata.normalize('NFD',s) if not unicodedata.combining(c))
def matches(s,k):return natural_matches(s,k)
rows=[];details=[];issues=[]
for p in json.loads((root/'route-manifest.json').read_text()):
 if p['type'] in ['review','locations']:continue
 html=(root/'dist'/p['path'].lstrip('/')/'index.html').read_text();s,h=text(html);k=p['keywords'];counts={q:matches(s,q) for q in k}
 if p['path']=='/' and matches(s,'house window tinting christchurch')!=0:issues.append('Homepage still contains the exact Residential-owned house phrase')
 if p['type']=='gallery':counts={'Tint A Window projects':matches(s,'Tint A Window projects')}
 row={'page':p['label'],'path':p['path'],'words':words(s),'targets':len(k),'keyword_counts':counts,'exact_keyword_counts':{q:exact_matches(s,q) for q in counts}};rows.append(row)
 if p['type'] not in ['about','gallery'] and not 1000<=row['words']<=1500:issues.append(f"{p['path']}: {row['words']} words outside the client review range")
 for q,n in counts.items():
  details.append({'path':p['path'],'keyword':q,'occurrences':n,'exact_occurrences':exact_matches(s,q)})
  if p['type'] not in ['about','gallery'] and n<3:issues.append(f"{p['path']}: {q} appears {n} times; the client brief requires at least three")
 if p['path']=='/' and not all(re.search(pattern,s,re.I) for pattern in [r'window tinting in Christchurch',r'window film (?:in )?Christchurch']):issues.append('Homepage missing its broad local service intent')
 if h!=1:issues.append(f'{p["path"]}: {h} H1 headings')
 for bad in ['Use this section','This helps customers move','Use existing testimonial','Short Pullout Examples','This section should','Our agreed location pages','[Address','The client’s brief']:
  if bad in s:issues.append(f'{p["path"]}: editorial residue {bad}')
 (root/'audit-text').mkdir(exist_ok=True);(root/'audit-text'/(p['path'].strip('/').replace('/','__') or 'home')).with_suffix('.txt').write_text(s)
(root/'content-audit.json').write_text(json.dumps({'pages':rows,'issues':issues,'method':'Main content text including closed FAQ answers, excluding shared navigation, breadcrumbs, footer, hidden panels, metadata and SVG. Case-insensitive whole phrase matches; whitespace and accents normalised (Wānaka matches the sheet spelling Wanaka). Hyphenated words count as one. Photographic captions are included; no installation product or measured result is inferred from an image. Gallery spelling corrected from source typo. The 23 October brief retains at least three natural matches and 1,000–1,500 words for main SEO landing pages. About and Projects are intentionally concise and exempt from these quantity checks; their phrase counts are reported for review. Counts include explicit grammatical variants with in, across or for before a location, hyphenated service names and and/& equivalents. Exact phrase counts are recorded separately. These checks confirm brief adherence, not a ranking guarantee. Hyphenated locality forms such as Christchurch-wide count as phrase occurrences.'},indent=2)+'\n')
with (root/'content-audit.csv').open('w') as f:
 w=csv.writer(f);w.writerow(['Page','URL','Main-content words','Assigned targets','Natural keyword matches']);w.writerows([r['page'],r['path'],r['words'],r['targets'],'; '.join(f'{k}: {v}' for k,v in r['keyword_counts'].items())] for r in rows)
with (root/'keyword-audit.csv').open('w') as f:
 w=csv.DictWriter(f,fieldnames=['path','keyword','occurrences','exact_occurrences']);w.writeheader();w.writerows(details)
for r in rows:print(r['path'],r['words'],r['keyword_counts'])
print('ISSUES',len(issues));print('\n'.join(issues))
# Refresh the human-readable review from these measured results.
from html import escape as e
review=root/'dist/design-review/index.html'
manifest=json.loads((root/'route-manifest.json').read_text())
image_manifest=json.loads((root/'src/image-manifest.json').read_text())
photo_files={v['file']:name for name,a in image_manifest.items() for v in [a,*a['variants']] if name!='logo'}
design={}
for page in manifest:
 if page['type']=='review':continue
 c=Content();c.feed((root/'dist'/page['path'].lstrip('/')/'index.html').read_text())
 design[page['path']]={'photos':len({photo_files[src.split('/')[-1]] for src in c.images if src.split('/')[-1] in photo_files}),'sections':c.sections}
summary=f"{len(design)} customer pages; {sum(d['sections'] for d in design.values())} sections mapped; {len(details)} keyword assignments checked."
table_rows=rows.copy()
for page in manifest:
 if page['type']=='locations':
  copy,_=text((root/'dist'/page['path'].lstrip('/')/'index.html').read_text())
  table_rows.append({'page':page['label'],'path':page['path'],'words':words(copy),'targets':0,'keyword_counts':{}})
table=''.join('<tr><td><a href="'+e(x['path'])+'">'+e(x['page'])+'</a><small>'+e(x['path'])+'</small></td><td>'+str(x['words'])+'</td><td>'+str(design[x['path']]['sections'])+'</td><td>'+str(design[x['path']]['photos'])+'</td><td>'+('<br>'.join(e(k)+' <strong>× '+str(v)+'</strong>' for k,v in x['keyword_counts'].items()) or 'Navigation directory')+'</td></tr>' for x in table_rows)
body=(root/'src/review-template.html').read_text().replace('{{SUMMARY}}',e(summary)).replace('{{TABLE}}',table)
review.write_text(re.sub(r'(<main id="main">).*?(</main>)',lambda m:m[1]+body+m[2],review.read_text(),flags=re.S))
raise SystemExit(bool(issues))
