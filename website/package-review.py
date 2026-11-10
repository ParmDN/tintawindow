"""Create an offline client preview and a separate developer handoff; publish nothing."""
from pathlib import Path
from urllib.parse import urlsplit,unquote
from html.parser import HTMLParser
from html import escape
import os,re,json,csv,shutil,zipfile,hashlib
root=Path(__file__).resolve().parent
exports=root.parent/'exports';exports.mkdir(exist_ok=True)
name='Tint-A-Window-v7.1-Client-Review-2026-10-06'
client=exports/name;client.mkdir(exist_ok=True)
site=client/'website';site.mkdir(exist_ok=True)
routes=json.loads((root/'route-manifest.json').read_text());customers=[r for r in routes if r['type']!='review']
routepaths={r['path'] for r in customers}
for f in (root/'dist').rglob('*'):
 if not f.is_file():continue
 rel=f.relative_to(root/'dist')
 if 'design-review' in rel.parts or f.name=='routes.json':continue
 dest=site/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 if f.suffix=='.html':
  def convert(m):
   url=m[2]
   def local(u):
    parts=urlsplit(u);path=parts.path
    if parts.scheme or parts.netloc or not path.startswith('/') or path.startswith('//'):return u
    if path.startswith('/design-review'):target=client/'START-HERE.html'
    else:
     target=site/path.lstrip('/')
     if path.rstrip('/') in routepaths or path=='/':target=target/'index.html'
    return os.path.relpath(target,dest.parent).replace(os.sep,'/')+('?' +parts.query if parts.query else '')+('#'+parts.fragment if parts.fragment else '')
   value=', '.join(' '.join([local(bit.split()[0]),*bit.split()[1:]]) for bit in url.split(',')) if m[1]=='srcset' else local(url)
   return m[1]+'="'+value+'"'
  s=re.sub(r'\b(href|src|srcset|data-src)="([^"]*)"',convert,f.read_text());dest.write_text(s)
 elif f.suffix=='.css':dest.write_text(re.sub(r'url\((\s*[\'\"]?)/',r'url(\1',f.read_text()))
 else:shutil.copy2(f,dest)
for fname in ['SECTION-REVIEW.csv','content-audit.csv','CLIENT-INPUTS.md']:
 shutil.copy2(root/fname,client/fname)
groups=[('Start here',['home','hub']),('Residential services',['residential']),('Commercial services',['commercial']),('Service areas',['location','locations']),('Company and support',['about','contact','faq','gallery'])]
links=''.join('<section><h2>'+heading+'</h2><div class="pages">'+''.join('<a href="website'+('/' if r['path']=='/' else r['path']+'/')+'index.html">'+escape(r['label'])+' <span>↗</span></a>' for r in customers if r['type'] in types)+'</div></section>' for heading,types in groups)
counts=json.loads((root/'content-audit.json').read_text())['pages']
html='''<!doctype html><html lang="en-NZ"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Tint A Window | Final Review v7.1</title><style>
*{box-sizing:border-box}body{margin:0;color:#202a26;background:#f7f4ed;font:17px/1.65 Arial,sans-serif}header{background:#202a26;color:#fff;padding:50px max(24px,calc((100vw - 1060px)/2))}header img{width:250px;max-width:90%;background:#fff;padding:14px}h1{font:400 clamp(36px,6vw,64px)/1.08 Georgia,serif;max-width:800px}h2{font:400 30px/1.2 Georgia,serif;margin-top:0}header p{max-width:760px;color:#e8eae6}a{color:inherit;text-underline-offset:4px}main{max-width:1124px;padding:32px;margin:auto}section{padding:32px;margin:24px 0;background:#fff;border-radius:4px}.notice{background:#fff2cc}.pages{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.pages a{display:flex;justify-content:space-between;border-bottom:1px solid #d9dfda;padding:14px 0;text-decoration:none;gap:12px}a:focus-visible{outline:3px solid #ba8617;outline-offset:4px}.button{display:inline-block;background:#edb849;color:#202a26;padding:12px 24px;font-weight:bold;text-decoration:none}li+li{margin-top:10px}.files a{display:block;margin:12px 0}small{font-size:14px}footer{padding:20px 32px 50px;max-width:1124px;margin:auto}@media(max-width:650px){main{padding:16px}section{padding:24px}.pages{grid-template-columns:1fr}}
</style><header><img src="website/assets/logo-large.webp" alt="Tint A Window original logo"><p>Digital Neighbour · Version 7.1 · 6 October 2026</p><h1>A considered website.<br>Ready for your final review.</h1><p>The complete website, together in one package. Review the story, the wording, the photographs and the way customers move towards an enquiry.</p><a class="button" href="website/index.html">Open the website ↗</a></header><main><section class="notice"><h2>Review candidate, before live launch.</h2><p>Extract the entire ZIP into one folder, then open this START-HERE.html file in a desktop browser. Keep the website folder beside it. No software installation or internet connection is required to browse the local pages.</p><p>The enquiry form prepares a preview only. It sends no messages and uploads no photographs. Project spaces are labelled placeholders. Facebook and Instagram destinations are awaiting confirmation. Two frosted-film hero images are labelled AI concepts. These items need approval or completion before launch.</p><p>This package is not a public website address. To review on phones remotely, the developer can host the normal site build on a separately approved review URL.</p></section><section><h2>What to review.</h2><ol><li>Start at Home, then follow Residential and Commercial into every service. Check whether the message, imagery and next step feel right for your customers.</li><li>Check the family story, contact details, hours, service areas, product statements, customer references and permission to use photographs.</li><li>Identify the approved projects and social profiles to add. Existing logo project slots are markers, not completed case studies.</li><li>Use the page address and exact section heading when recording a change. Add proposed wording or an image filename, and identify who approves it.</li></ol><p>There are 30 customer pages and 356 main sections. All 29 SEO-mapped pages contain 1,245–1,376 words, with 37 keyword assignments occurring three or four times. These counts do not predict search rankings.</p></section>'''+links+'''<section class="files"><h2>Keep feedback in one place.</h2><a href="SECTION-REVIEW.csv">Open the section-by-section review sheet (CSV)</a><a href="content-audit.csv">Open the page word and keyword counts (CSV)</a><a href="CLIENT-INPUTS.md">Read the client inputs and approval checklist</a><p>Open the CSV in Excel or Google Sheets. Its decision and reviewer-notes columns are blank for your feedback. Return one consolidated copy to Digital Neighbour.</p><p>Approval options: approved for implementation, changes required, or waiting for client material. Approval of the design and copy is separate from approval to launch.</p></section></main><footer><small>Prepared by Digital Neighbour. Original logo and supplied content retained as the foundation. No production site has been replaced. The live form, privacy information, final hosting checks and launch approval remain with the implementation team.</small></footer></html>'''
(client/'START-HERE.html').write_text(html)
(client/'READ-ME.txt').write_text('Tint A Window v7.1 client review, 6 October 2026\n\nExtract the whole ZIP. Double-click START-HERE.html. Keep all folders together.\n\nUse a desktop browser for this portable preview. The form does not send. Phone/email links open your own apps.\nUse SECTION-REVIEW.csv for consolidated feedback. This is a review candidate, not a live launch.\n')
# Verify every packaged local HTML reference, srcset candidate, CSS URL and anchor.
issues=[];refs=0
class Links(HTMLParser):
 def __init__(self):super().__init__();self.refs=[];self.ids=set()
 def handle_starttag(self,t,a):
  a=dict(a)
  if 'id' in a:self.ids.add(a['id'])
  for k in ('href','src','data-src'):
   if a.get(k):self.refs.append(a[k])
  for bit in a.get('srcset','').split(','):
   if bit.strip():self.refs.append(bit.split()[0])
docs={}
for f in client.rglob('*.html'):
 d=Links();d.feed(f.read_text());docs[f.resolve()]=d
for f,d in docs.items():
 for u in d.refs:
  p=urlsplit(u)
  if p.scheme or p.netloc:continue
  refs+=1;target=(f.parent/unquote(p.path)).resolve() if p.path else f
  if not target.is_relative_to(client.resolve()) or not target.is_file():issues.append([str(f.relative_to(client)),u,'missing or escaping file'])
  elif p.fragment and target in docs and unquote(p.fragment) not in docs[target].ids:issues.append([str(f.relative_to(client)),u,'missing anchor'])
for f in client.rglob('*.css'):
 for raw in re.findall(r'url\(([^)]+)\)',f.read_text()):
  u=raw.strip(' \"\'')
  if u.startswith(('data:','http:','https:','#')):continue
  refs+=1
  if not (f.parent/u).is_file():issues.append([str(f.relative_to(client)),u,'missing CSS asset'])
report={'html_files':len(docs),'local_references':refs,'issues':issues}
(root/'qa-portable.json').write_text(json.dumps(report,indent=2)+'\n')
if issues:raise SystemExit(json.dumps(report,indent=2))
def zipdir(folder,dest,exclude=()):
 with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED,compresslevel=7) as z:
  for f in sorted(folder.rglob('*')):
   if f.is_file() and not f.name.startswith('.env') and '.vercel' not in f.parts and not any(x in f.parts for x in exclude):z.write(f,Path(folder.name)/f.relative_to(folder))
 with zipfile.ZipFile(dest) as z:
  if z.testzip():raise RuntimeError('Archive integrity failure')
 return {'file':dest.name,'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}
archives=[zipdir(client,exports/(name+'.zip')),zipdir(root,exports/'Tint-A-Window-v7.1-Team-Handoff-2026-10-06.zip',exclude=('__pycache__','.DS_Store','vercel-review'))]
(exports/'Tint-A-Window-v7.1-PACKAGE-INDEX.json').write_text(json.dumps({'version':'7.1','date':'2026-10-06','portable_checks':report,'archives':archives},indent=2)+'\n')
print(json.dumps({'portable_checks':report,'archives':archives},indent=2))
