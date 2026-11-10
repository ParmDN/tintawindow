"""Read-only checks against the dedicated Vercel review site."""
from pathlib import Path
from urllib.request import Request,urlopen,build_opener,HTTPRedirectHandler
from urllib.error import HTTPError,URLError
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json,hashlib,time
root=Path(__file__).resolve().parent
package=json.loads((root/'qa-vercel-package.json').read_text());base=package['base']
class NoRedirect(HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):return None
opener=build_opener(NoRedirect)
class Meta(HTMLParser):
 def __init__(self,html):super().__init__();self.robots='';self.h1=0;self.feed(html)
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='meta' and d.get('name')=='robots':self.robots=d.get('content','')
  if t=='h1':self.h1+=1
tasks=[]
for file,sha in package['file_sha256'].items():
 path='/'+file
 if path.endswith('/index.html'):path=path[:-11] or '/'
 elif path=='/index.html':path='/'
 elif path=='/404.html':path='/404'
 tasks.append({'path':path,'expected':200,'file':file,'sha256':sha})
for path in ['/unavailable-final-review-check','/src/ashit-source-map.json','/src/team-content.json','/src/social-links.json','/content-audit.csv','/qa-final.json','/package.json','/build.mjs','/routes.json','/.env.local','/.vercel/project.json','/sitemap.xml','/client-media/shoot-2026-10-22/ai-retouch-provenance.json','/research/shoot-review-2026-10-23/transcripts.json']:
 tasks.append({'path':path,'expected':404})
for r in json.loads((root/'route-manifest.json').read_text()):
 if r['path']!='/':tasks.append({'path':r['path']+'/','expected':308,'location':r['path']})
def check(t):
 row={k:v for k,v in t.items() if k!='sha256'}
 try:
  try:response=opener.open(Request(base+t['path'],headers={'User-Agent':'Tint-A-Window-Review-QA/1.0','Accept-Encoding':'identity'}),timeout=25)
  except HTTPError as e:response=e
  with response:body=response.read();row.update(status=response.status,noindex=response.headers.get('X-Robots-Tag',''),location=response.headers.get('Location'),content_type=response.headers.get('Content-Type',''))
  errors=[]
  # The static 404.html document can be directly fetched with HTTP 200; unknown URLs must be real 404s.
  expected=[t['expected']]
  if t.get('file')=='404.html':expected=[200,308]
  if row['status'] not in expected:errors.append('unexpected HTTP status')
  if row['status'] not in (301,302,307,308) and 'noindex' not in row['noindex']:errors.append('missing noindex response header')
  if row['status'] in (301,302,307,308):
   row['indexing_check']='Platform redirect: destination is checked separately for noindex'
   if row['location'] not in [x['path'] for x in tasks if x['expected']==200]:errors.append('redirect destination not covered by noindex check')
  if t.get('location') and row['location'] not in [t['location'],base+t['location']]:errors.append('incorrect redirect')
  if t.get('sha256') and row['status']==200:
   if hashlib.sha256(body).hexdigest()!=t['sha256']:errors.append('response differs from packaged file')
   if t['file'].endswith('.html'):
    m=Meta(body.decode());row.update(meta_robots=m.robots,h1=m.h1)
    if 'noindex' not in m.robots:errors.append('missing meta noindex')
    if m.h1!=1:errors.append('unexpected H1 count')
   if t['file']=='robots.txt':
    row['robots']=body.decode()
    if 'Allow: /' not in row['robots'] or 'Disallow: /' in row['robots']:errors.append('robots prevents reading noindex')
  row['errors']=errors
 except Exception as e:row['errors']=[type(e).__name__+': '+str(e)]
 return row
with ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(check,tasks))
# Retry transport errors only; do not mask configuration failures.
for i,r in enumerate(rows):
 if any(x.startswith(('TimeoutError','URLError','timeout:')) for x in r['errors']):rows[i]=check(tasks[i])
report={'base':base,'checked_on':'2026-10-27','requests':len(rows),'html_pages':sum('meta_robots' in r for r in rows),'issues':[r for r in rows if r['errors']],'results':rows}
(root/'qa-vercel-live.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='results'},indent=2))
raise SystemExit(bool(report['issues']))
