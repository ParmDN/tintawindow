"""Package only reviewed website files for the isolated Vercel review project."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import json,re,shutil,hashlib
root=Path(__file__).resolve().parent
bundle=root/'vercel-review';public=bundle/'public'
bundle.mkdir(exist_ok=True)
# Recreate only the generated public output; preserve Vercel project linking.
if public.exists():shutil.rmtree(public)
public.mkdir()
base='https://tint-a-window-review.vercel.app'
allowed={'.html','.css','.js','.webp','.jpg','.jpeg','.png','.svg','.ttf','.woff','.woff2','.ico','.mp4','.vtt'}
for f in (root/'dist').rglob('*'):
 if not f.is_file() or f.suffix not in allowed:continue
 rel=f.relative_to(root/'dist');dest=public/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 if f.suffix!='.html':shutil.copy2(f,dest);continue
 s=f.read_text().replace('content="noindex, nofollow"','content="noindex, nofollow, noarchive"')
 s=s.replace('In this local website preview','In this website design preview')
 s=re.sub(r'(<meta property="og:image" content=")https://www.tintawindow.co.nz',lambda m:m[1]+base,s)
 s=re.sub(r'(<meta property="og:url" content=")https://www.tintawindow.co.nz',lambda m:m[1]+base,s)
 image=re.search(r'<meta property="og:image" content="([^"]+)"',s)
 if image:s=s.replace('</head>','<meta name="twitter:image" content="'+image[1]+'"><meta property="og:site_name" content="Tint A Window · Design Review"></head>')
 if str(rel)=='design-review/index.html':
  s=re.sub(r'<section class="section review-notes".*?</section>', '''<section class="section review-notes" data-surface="paper"><h2>Your version 7.20 review.</h2><p>The conversation photograph has balanced side space on Home and About through an AI-assisted background and composition edit. About portrait framing, tablet flow, Contact portrait sizing and local section gaps are refined. Both team design emails have been checked across the shared layouts: hidden photo-slider bars, one-second autoplay with manual controls, stronger outline icons, compact Projects labelling, a 1320px content limit and the responsive Locations visit card. The approved content and static Home hero are preserved.</p><p>Please return one consolidated list of changes with the page address and exact section heading. Bill's confirmed founding date is 1987, supporting 39+ years of industry experience in 2026. Confirm remaining business details, product data and permission to use the photographs and customer references.</p><p>The static architectural hero remains. About now has a concise family story and vertical archive timeline; Projects opens directly into a 36-photograph installation gallery. Relevant service photographs follow Roxana's supplied categories. General glass examples do not prove a particular safety film or measured outcome. The original logo layout now uses the brighter brand yellow.</p><p>Tint-guide percentages are clearly labelled illustrative visible light transmission (VLT), not heat/UV rejection, energy savings or a stocked-product list. Suitable solar film may reduce electricity used for cooling, depending on the glass, film, climate and building use. No annual bill saving is promised.</p><p><a href="/design-review/project-story">Use the project-story template</a> for any additional verified project evidence. Facebook and Instagram profile URLs are still awaiting confirmation.</p><h2>A noindex client-review site.</h2><p>This separate Vercel review does not replace the live website. Forms demonstrate service selection and the thank-you journey only; nothing is sent and photos are not uploaded. Local photo selection allows up to five JPG, PNG or WebP files, 5 MB each.</p><p>Received enquiry delivery, privacy and retention wording, spam protection, production tracking, migration checks and explicit launch approval remain required. Approving this review's design and copy does not authorise replacing the live website or enabling indexing.</p></section>''',s,flags=re.S)
  s=s.replace('Local design preview.','Online design review.')
 dest.write_text(s)
# Let crawlers read noindex. Disallowing crawling would hide the noindex directive.
(public/'robots.txt').write_text('User-agent: *\nAllow: /\n# Review site: content responses carry X-Robots-Tag: noindex, nofollow, noarchive.\n')
headers=[{'key':'X-Robots-Tag','value':'noindex, nofollow, noarchive'},{'key':'X-Content-Type-Options','value':'nosniff'},{'key':'Referrer-Policy','value':'strict-origin-when-cross-origin'},{'key':'Content-Security-Policy','value':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; connect-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'"}]
config={'$schema':'https://openapi.vercel.sh/vercel.json','framework':None,'buildCommand':None,'installCommand':None,'outputDirectory':'public','cleanUrls':True,'trailingSlash':False,'headers':[{'source':'/(.*)','headers':headers}]}
(bundle/'vercel.json').write_text(json.dumps(config,indent=2)+'\n')
(bundle/'.vercelignore').write_text('.DS_Store\n.env*\n')
class Links(HTMLParser):
 def __init__(self,s):super().__init__();self.urls=[];self.ids=set();self.feed(s)
 def handle_starttag(self,t,a):
  a=dict(a)
  if a.get('id'):self.ids.add(a['id'])
  for k in ('href','src','data-src'):
   if a.get(k):self.urls.append(a[k])
  for c in a.get('srcset','').split(','):
   if c.strip():self.urls.append(c.split()[0])
issues=[];docs={p:Links(p.read_text()) for p in public.rglob('*.html')};references=0
for p,d in docs.items():
 s=p.read_text()
 if 'content="noindex, nofollow, noarchive"' not in s:issues.append([str(p),'missing meta noindex'])
 for bad in ['app.fireflies.ai','docs.google.com','localhost:','file:///Users','/Users/sags','<form action="http']:
  if bad in s:issues.append([str(p),'private or local reference',bad])
 for u in d.urls:
  parts=urlsplit(u)
  if parts.scheme or parts.netloc:continue
  references+=1;t=public/parts.path.lstrip('/') if parts.path.startswith('/') else p.parent/parts.path if parts.path else p
  if t.is_dir():t=t/'index.html'
  if not t.is_file():issues.append([str(p.relative_to(public)),u,'missing file'])
  elif parts.fragment and t in docs and parts.fragment not in docs[t].ids:issues.append([str(p.relative_to(public)),u,'missing anchor'])
files=[p for p in public.rglob('*') if p.is_file()]
report={'project':'tint-a-window-review','base':base,'files':len(files),'html_pages':len(docs),'local_references':references,'bytes':sum(p.stat().st_size for p in files),'indexing':'noindex in every HTML page and content response; platform redirects lead to checked noindex pages; robots permits reading the directives','private_source_included':False,'issues':issues,'file_sha256':{str(p.relative_to(public)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files}}
(root/'qa-vercel-package.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='file_sha256'},indent=2))
raise SystemExit(bool(issues))
