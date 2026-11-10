"""Rebuild the client/team review pack from the checked rendered site, not stale drafts."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter,defaultdict
from html import escape
import json,csv,re,hashlib,shutil,zipfile
ROOT=Path(__file__).resolve().parent; OUT=ROOT/'review-pack-7.15'; OUT.mkdir(exist_ok=True)
BASE='https://tint-a-window-review.vercel.app'
class Node:
 def __init__(self,tag='',attrs=(),parent=None):self.tag=tag;self.attrs=dict(attrs);self.parent=parent;self.children=[]
 def walk(self):
  for c in self.children:
   if isinstance(c,Node):yield c;yield from c.walk()
 def find(self,tag):return [n for n in self.walk()if n.tag==tag]
 def text(self):return ' '.join(' '.join(c.text()if isinstance(c,Node)else c for c in self.children).split())
class Doc(HTMLParser):
 def __init__(self,s):super().__init__();self.root=Node();self.current=self.root;self.feed(s)
 def handle_starttag(self,t,a):
  n=Node(t,a,self.current);self.current.children.append(n)
  if t not in {'img','br','hr','input','meta','link','source','area','base','embed','param','track','wbr'}:self.current=n
 def handle_endtag(self,t):
  n=self.current
  while n.parent:
   if n.tag==t:self.current=n.parent;return
   n=n.parent
 def handle_data(self,s):self.current.children.append(s)
def writecsv(name,rows):
 with (OUT/name).open('w',newline='')as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
manifest=json.loads((ROOT/'route-manifest.json').read_text());audit={p['path']:p for p in json.loads((ROOT/'content-audit.json').read_text())['pages']};images=json.loads((ROOT/'src/image-manifest.json').read_text()); reverse={v['file']:k for k,a in images.items()for v in [a,*a['variants']]}
source={k:('Client-supplied original'if k.startswith('client-')and k!='client-van'else'Existing client website / installation gallery'if k not in ['logo','frost-concept']else'Original brand logo'if k=='logo'else'AI illustration, not a completed project')for k in images}
source.update({k:'22 October client shoot; AI lighting and reflection retouch' for k in images if k.startswith('shoot-')})
source['client-van']='Existing client website / branded van'
reverse['google-g.png']='brand-icon:Google';source['brand-icon:Google']='Google review-link icon'
logos=json.loads((ROOT/'src/customer-evidence.json').read_text())['logos']
for logo in logos:reverse[logo['file']]='customer-logo:'+logo['name'];source['customer-logo:'+logo['name']]='Existing website customer reference'
page_rows=[];section_rows=[];photo_rows=[];link_rows=[];details=[];issues=[];h1s=defaultdict(list)
intents={0:'Broad Christchurch window tinting and window film; route visitors to home or business services',1:'Homeowner overview; comfort, privacy and interiors; owns residential and house phrases',2:'Reduce sunlight exposure to furnishings; explain UV and other causes of fading',3:'Choose privacy around sightlines, daylight and day/night use',4:'Address solar heat in rooms; choose around glass compatibility and daylight',5:'Address distracting brightness in home seating, screens and reading areas',6:'Compare frosted, opaque and blackout finishes, coverage and light transmission',7:'Domestic safety/security system assessment and fragment-retention limitations',8:'Business overview; heat, glare, surface protection, frosting and safety choices',9:'Commercial solar heat, glazing specification, occupancy and access',10:'Commercial glare around screens, shared rooms and working positions',11:'Replaceable surface protection for graffiti; separate from safety/security film',12:'Commercial frosted and decorative finishes, patterns and privacy coverage',13:'Commercial safety/security system specification, access and approvals',25:'Family roles and trade story, supported archive dates and accurately captioned people',26:'Project enquiry preparation and clear contact options; form is a preview',27:'Direct answers to common window-film questions with links to the service detail',28:'Browse original installation photography; product/outcome facts are not inferred'}

for r in manifest:
 if r['type']=='review':continue
 html=(ROOT/'dist'/r['path'].lstrip('/')/'index.html').read_text();doc=Doc(html).root;main=doc.find('main')[0];sections=[n for n in main.find('section')if n.parent==main]; h1=main.find('h1')[0].text();h1s[h1.lower()].append(r['path']);allphotos=set();page_detail=[];recorded_links=set();recorded_images=set()
 for seq,sec in enumerate(sections,1):
  hs=[n for n in sec.walk()if n.tag in ['h1','h2']];heading=hs[0].text()if hs else sec.attrs.get('aria-label','Gallery / navigation');eye=next((n.text()for n in sec.find('p')if'eyebrow'in n.attrs.get('class','')),'');photos=[];seen_images=set()
  for image in sec.find('img'):
   recorded_images.add(id(image))
   src=image.attrs['src']
   if src in seen_images:continue
   seen_images.add(src)
   key=reverse.get(src.split('/')[-1],'unmapped:'+src);allphotos.add(key);caption=''
   parent=image.parent
   while parent and parent!=sec:
    if parent.find('figcaption'):caption=' | '.join(n.text()for n in parent.find('figcaption'));break
    if parent.tag=='button'and parent.attrs.get('data-photo'):
     caption=next((n.text()for n in parent.find('span')if n.attrs.get('class')=='gallery-caption'),'');break
    if parent.tag=='article'and'gallery-context-card'in parent.attrs.get('class',''):
     caption=' | '.join(n.text()for n in parent.find('p'));break
    parent=parent.parent
   if key.startswith('unmapped:'):issues.append({'page':r['path'],'unmapped_image':src})
   row={'Page':r['label'],'URL':BASE+r['path'],'Section':seq,'Section heading':heading,'Asset':key,'Web file':src,'Source':source.get(key,'Unmapped'),'Alternative text':image.attrs.get('alt',''),'Caption':caption};photo_rows.append(row);photos.append(row)
  links=[n for n in sec.find('a')if n.attrs.get('href')];ctas=[n.text()for n in links if re.search('Get a Quote|Call Now',n.text(),re.I)]
  for a in links:
   recorded_links.add(id(a));link_rows.append({'Page':r['label'],'Section':seq,'Section heading':heading,'Link text':a.text()or'Photograph / visual link','Destination':a.attrs['href']})
  textblocks=[n.text()for n in sec.walk()if n.tag in ['p','li','h1','h2','h3','h4','summary','figcaption']and n.text()]
  row={'Page':r['label'],'URL':BASE+r['path'],'Section':seq,'Anchor':sec.attrs.get('id',''),'Eyebrow':eye,'Heading':heading,'Background':sec.attrs.get('data-surface',''),'Layout':sec.attrs.get('data-layout')or sec.attrs.get('class',''),'Photographs':' | '.join(dict.fromkeys(p['Asset']for p in photos)),'Calls to action':' | '.join(ctas),'Vector diagrams and icons':len(sec.find('svg')),'Copy':'\n'.join(textblocks),'Review status':'Mapped; static checks passed; factual sign-off remains separate'};section_rows.append(row);page_detail.append((row,photos))
  if not row['Background']:issues.append({'page':r['path'],'section':seq,'issue':'missing surface'})
 # Include navigation, footer, fixed enquiry controls, outline links and modal UI.
 def context(n):
  cur=n.parent
  while cur and cur!=doc:
   if cur.tag=='header':return 'Shared header'
   if cur.tag=='footer':return 'Shared footer'
   if cur.tag=='dialog':return 'Lightbox / quote dialog'
   if cur.tag=='nav':return cur.attrs.get('aria-label','Shared navigation')
   cur=cur.parent
  return 'Shared accessibility / utility UI'
 for a in doc.find('a'):
  if id(a)not in recorded_links and a.attrs.get('href'):
   label=context(a);link_rows.append({'Page':r['label'],'Section':label,'Section heading':label,'Link text':a.text()or'Image / visual link','Destination':a.attrs['href']})
 for image in doc.find('img'):
  if id(image)in recorded_images:continue
  src=image.attrs['src'];key=reverse.get(src.split('/')[-1],'unmapped:'+src);label=context(image)
  if key.startswith('unmapped:'):issues.append({'page':r['path'],'unmapped_image':src})
  photo_rows.append({'Page':r['label'],'URL':BASE+r['path'],'Section':label,'Section heading':label,'Asset':key,'Web file':src,'Source':source.get(key,'Unmapped'),'Alternative text':image.attrs.get('alt',''),'Caption':''})
 a=audit.get(r['path'],{}); kw=a.get('keyword_counts',{});localcopy=ROOT/'exports/final-content-2026-10-23-v7.15'/((r['path'].strip('/').replace('/','__')or'home')+'.md')
 page_rows.append({'Page':r['label'],'URL':BASE+r['path'],'Page purpose':intents.get(manifest.index(r),r.get('searchRole','')) if r['type']!='location' else r.get('searchRole','')+'; '+r['label']+' property enquiries; a service area rather than a local office','H1':h1,'Words':a.get('words','Navigation directory; outside word quota'),'Assigned keywords':' | '.join(kw),'Occurrences':' | '.join(f'{k}: {v}'for k,v in kw.items()),'Sections':len(sections),'Unique image assets':len(allphotos),'Photo sources':' | '.join(sorted({source.get(k,'Unmapped')for k in allphotos})),'Copy file':localcopy.name,'Content basis':'Ashit source copy + approved editorial refinements; source snapshot checked 21 October 2026; client shoot/UI revision 23 October 2026','Status':'Ready for client content/design review'})
 details.append((page_rows[-1],page_detail))
for h,urls in h1s.items():
 if len(urls)>1:issues.append({'duplicate_h1':h,'pages':urls})
writecsv('PAGE-MAP.csv',page_rows);writecsv('SECTION-MAP.csv',section_rows);writecsv('PHOTO-MAP.csv',photo_rows);writecsv('LINK-MAP.csv',link_rows)
used=defaultdict(set)
for row in photo_rows:used[row['Asset']].add(row['URL'])
asset_rows=[{'Asset':key,'Source':source[key],'Web file':a['file'],'Responsive files':' | '.join(v['file']for v in a['variants']),'Status':'Used on customer pages'if key in used else'Retained asset; not currently used on customer pages','Pages':' | '.join(sorted(used[key]))}for key,a in images.items()]
writecsv('ASSET-LIBRARY.csv',asset_rows)
media=ROOT.parent/'client-media/roxana-2026-10'
originals=json.loads((media/'download-inventory.json').read_text());selected={p['id']:p for p in json.loads((media/'selected-assets.json').read_text())}
original_rows=[]
for item in originals:
 key=f"client-{item['id']:03}";selected_item=selected.get(item['id'],{})
 original_rows.append({'Photo ID':item['id'],'Original filename':item['original'],'Description':selected_item.get('alt','Retained original; see the private contact sheet'),'Status':'Used on website'if key in used else'Reserved; not used in this version','Pages':' | '.join(sorted(used[key]))})
writecsv('CLIENT-PHOTO-LIBRARY.csv',original_rows)

summary={'version':'7.15','customer_pages':len(page_rows),'sections':len(section_rows),'image_placements_including_shared_ui':len(photo_rows),'links_including_navigation_footer_and_contact':len(link_rows),'keyword_assignments':sum(len(a['keyword_counts'])for a in audit.values()),'word_range':[min(a['words']for a in audit.values()),max(a['words']for a in audit.values())],'unique_h1s':len(h1s),'issues':issues,'html_sha256':{r['path']:hashlib.sha256((ROOT/'dist'/r['path'].lstrip('/')/'index.html').read_bytes()).hexdigest()for r in manifest if r['type']!='review'}}
(OUT/'mapping-proof.json').write_text(json.dumps(summary,indent=2)+'\n')
# A human-readable master map; public URLs only, no private chat or document links.
e=escape; rows=''.join('<tr><td><a href="'+e(p['URL'])+'">'+e(p['Page'])+'</a></td><td>'+e(str(p['Words']))+'</td><td>'+str(p['Sections'])+'</td><td>'+str(p['Unique image assets'])+'</td><td>'+e(p['Occurrences']).replace(' | ','<br>')+'</td></tr>'for p in page_rows)
body='<h1>Tint A Window: complete review map</h1><p>Version 7.15 · 23 October 2026 · 30 customer pages · 349 sections</p><p><a href="'+BASE+'">Website</a> · <a href="'+BASE+'/design-review">Client review guide</a></p><p>Ready for content and design review. Forms are demonstrations and send nothing. Official social links, product/business facts and production enquiry delivery remain launch items.</p><div class="table"><table><thead><tr><th>Page</th><th>Words</th><th>Sections</th><th>Unique images</th><th>Mapped keywords and natural matches</th></tr></thead><tbody>'+rows+'</tbody></table></div>'
for p,sections in details:
 body+='<details><summary>'+e(p['Page'])+' · '+str(p['Sections'])+' sections</summary><p><a href="'+e(p['URL'])+'">Open this page</a></p><p><strong>Search purpose:</strong> '+e(p['Page purpose'])+'</p><h2>'+e(p['H1'])+'</h2>'
 for s,photos in sections:
  body+='<article><p class="label">'+str(s['Section'])+' · '+e(s['Background'])+' · '+e(s['Eyebrow'])+'</p><h3>'+e(s['Heading'])+'</h3><p><strong>Actions:</strong> '+e(s['Calls to action']or'Follow the section links / read the guidance')+'</p>'
  if photos:body+='<div class="photos">'+''.join('<figure><img loading="lazy" src="'+BASE+e(p['Web file'])+'" alt="'+e(p['Alternative text'])+'"><figcaption>'+e(p['Asset'])+' · '+e(p['Source'])+'<br>'+e(p['Caption']or p['Alternative text'])+'</figcaption></figure>'for p in photos)+'</div>'
  body+='<details><summary>Read this section’s copy</summary><div class="copy">'+e(s['Copy'])+'</div></details></article>'
 body+='</details>'
(OUT/'COMPLETE-REVIEW-MAP.html').write_text('<!doctype html><html lang="en-NZ"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow, noarchive"><title>Tint A Window complete review map</title><style>body{font:16px/1.6 system-ui,sans-serif;color:#293c3a;margin:auto;padding:40px;max-width:1300px;background:#f4f4ef}h1{font-size:38px;line-height:1.2}a{color:inherit}table{border-collapse:collapse;width:100%;min-width:760px}th,td{padding:14px;text-align:left;border-bottom:1px solid #c5d3cd}th{background:#293c3a;color:white}.table{overflow:auto}details{padding:18px;margin:18px 0;background:#fff;border-radius:4px 4px 24px 4px}summary{font-weight:650;cursor:pointer}article{border-top:1px solid #d6dfda;padding:22px 0}.label{font-size:12px;text-transform:uppercase;letter-spacing:.08em}.photos{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}figure{margin:0}img{width:100%;height:200px;object-fit:contain;background:#dde8e5}figcaption{font-size:12px}.copy{white-space:pre-wrap}h3{font-size:23px;margin-top:0}@media(max-width:600px){body{padding:20px}h1{font-size:30px}}</style>'+body+'</html>')
copydir=OUT/'page-copy';shutil.copytree(ROOT/'exports/final-content-2026-10-23-v7.15',copydir,dirs_exist_ok=True)
(OUT/'GLOBAL-COMPONENTS.md').write_text('''# Shared components and utility pages

- Header: original Tint A Window logo; Residential overview + six services; Commercial overview + five services; Projects; Our Story; Locations overview + eleven areas; Get a Quote. Desktop pointer entry and click/keyboard controls; mobile disclosure menu.
- Footer: original logo; Residential, Commercial, Explore and Locations columns; one Facebook/Instagram icon group; contact/hours; Quote button; copyright; Digital Neighbour credit. Official social URLs remain pending and are not fabricated.
- Welcome video: visitor-initiated native modal with English captions and transcript; close/Escape pauses and resets, original landscape framing stays intact.
- Shared enquiry: Get a Quote opens a native modal with required fields; Call Now uses the verified business telephone URI. Mobile Quote/Call bar stays fixed. Home, Contact and the popup use consistent review-only fields: property type, multiple services, optional phone, up to five JPG/PNG/WebP photos at 5 MB each, and optional measurements/access details.
- Thank-you: three form origins, one-time completion attribution, no personal data storage/delivery; a direct or refreshed visit is not another submission.
- Illustrations: consistent semantic line icons, with logos reserved for brand placement; inline vector icons and illustrative film/shade guides explain choices; no measured product performance is inferred. SECTION-MAP.csv counts vector elements separately from photo assets.
- Motion: vertical draggable review and horizontal logo reels, dated archive timeline with automatic movement, relevant home/service photo carousels, mobile card rails and restrained section/process accents; manual drag, reading pauses and reduced-motion support. Content/photo sections use normal document flow, without sticky empty gaps.
- Utility review pages: /design-review and /design-review/project-story. All pages and responses remain noindex; no public sitemap is published. The current client live domain is unchanged.
- Sources: Ashit content and keyword snapshots; original website gallery/logo/customer references; Roxana photo captions; previously verified Google excerpts. Full private originals, chat messages and source documents are excluded from the review deployment and this pack.

The link map includes shared header/footer, service outlines, modal and mobile controls. The photo map includes shared logo/icon and lightbox image placements; repeated uses are not separate projects.
''')
(OUT/'START-HERE.md').write_text('''# Tint A Window: client-review pack, version 7.15

Website: https://tint-a-window-review.vercel.app

Client guide: https://tint-a-window-review.vercel.app/design-review

Use COMPLETE-REVIEW-MAP.html to expand each page and review its storyline, section colours, photographs, captions, calls to action and full section copy. The CSV files provide a page map, 349-section map, photo-placement map, complete link map, asset library and status for all 65 supplied originals. The page-copy folder contains editable copy for all 30 customer pages. Seven selected22October shoot photos have AI lighting/reflection retouch; the Home banner opens a captioned four-second welcome when clicked.

## Suggested client review

1. Start with Home, then Residential and Commercial.
2. Review each service for accurate terminology and appropriate photographs.
3. Check Our Story, including the dated archive and separately captioned Two Bills photo.
4. Browse Projects, then Contact and the enquiry/thank-you demonstration.
5. Return one consolidated list using page URL, exact section heading, issue and approved replacement.

## Confirm before launch

Confirm names/roles and experience statements, contact/hours/service coverage, permission for photographs/customer references, product/system specifications and warranty wording. Supply official Facebook and Instagram URLs. Enquiry delivery, approved privacy wording, spam protection, tracking and migration checks need completing before a separate live launch.

This is a noindex review site. Forms do not send requests. No raw WhatsApp originals or private messages are included in this pack. No emails or messages have been sent to the client. Shared process/safety facts and customer review excerpts can recur; keyword ownership is mapped separately. Natural phrase matches and literal exact counts are recorded separately, and actual ranking overlap needs post-launch search data.
''')
if (ROOT/'QA-CLIENT-REVIEW-7.15.md').exists():shutil.copy2(ROOT/'QA-CLIENT-REVIEW-7.15.md',OUT/'FINAL-INSPECTION.md')
if (ROOT/'qa-client-7.15/layout-checks.json').exists():shutil.copy2(ROOT/'qa-client-7.15/layout-checks.json',OUT/'layout-verification.json')
evidence=OUT/'evidence';evidence.mkdir(exist_ok=True)
for name in ['layout-checks.json','card-contrast.json','interaction-checks.json','published-story.png','published-reviews.png','published-mobile-cards.png','published-home.png','published-form.png','story-phone.png','published-about.png','published-welcome-desktop.png','published-welcome-phone.png','final-about-crop-checks.json','new-ui-contrast.json','published-video-http.json','email-ui-implementation.md']:
 if (ROOT/'qa-client-7.15'/name).exists():shutil.copy2(ROOT/'qa-client-7.15'/name,evidence/name)
shutil.copy2(ROOT/'keyword-audit.csv',OUT/'KEYWORD-COUNTS.csv')
with zipfile.ZipFile(ROOT/'Tint-A-Window-Client-Review-v7.15.zip','w',zipfile.ZIP_DEFLATED)as z:
 for p in OUT.rglob('*'):
  if p.is_file():z.write(p,p.relative_to(OUT))
print(json.dumps({k:v for k,v in summary.items()if k!='html_sha256'},indent=2))
raise SystemExit(bool(issues))
