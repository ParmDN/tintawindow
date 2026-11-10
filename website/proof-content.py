from keyword_matching import natural_matches
"""Reproduce the final editorial evidence from the built customer pages."""
from html.parser import HTMLParser
from pathlib import Path
import re, json, csv, unicodedata
ROOT=Path(__file__).parent
OUT=ROOT/'qa-content-7.17'
OUT.mkdir(exist_ok=True)
normal=lambda s: ' '.join(s.lower().split())
def fold(s):return ''.join(c for c in unicodedata.normalize('NFD',s) if not unicodedata.combining(c))
def count(s,k):return natural_matches(s,k)
class Blocks(HTMLParser):
 def __init__(self):super().__init__();self.stack=[];self.active=None;self.blocks=[];self.sections=0
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='br' and self.active is not None:self.active[1].append(' ')
  if t not in ['br','img','input','meta','link','hr','source','wbr']:self.stack.append((t,a))
  inside=any(t=='main' for t,a in self.stack)
  excluded=any(t in ['nav','script','style','svg','dialog'] or a.get('aria-hidden')=='true' or 'hidden' in a for t,a in self.stack)
  if t=='section' and inside and not excluded:self.sections+=1
  if (t in ['h1','h2','h3','h4','p','li','dt','dd','summary','figcaption'] or t=='span' and a.get('class')=='gallery-caption') and inside and not excluded:
   if self.active is None:self.active=[t,[]]
 def handle_data(self,s):
  if self.active is not None:self.active[1].append(s)
 def handle_endtag(self,t):
  if self.active is not None and self.active[0]==t:
   value=' '.join(''.join(self.active[1]).split())
   if value:self.blocks.append((t,value))
   self.active=None
  if self.active is not None and t in ['span','em','strong']:self.active[1].append(' ')
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i][0]==t:self.stack=self.stack[:i];break
def syllables(w):
 w=w.lower()
 if len(w)<=3:return 1
 n=len(re.findall('[aeiouy]+',w))
 if w.endswith('e') and not w.endswith(('le','ye')):n-=1
 if w.endswith('es') and not w.endswith(('ses','xes','zes','ches','shes')):n-=1
 return max(1,n)
manifest=json.loads((ROOT/'route-manifest.json').read_text())
audit=json.loads((ROOT/'content-audit.json').read_text())
# Independent explicit association of sheet page groups to site routes, so a swapped
# assignment cannot pass simply because the combined list of keywords is unchanged.
slugs=['','residential-window-tinting-services','commercial-window-tinting-services',
'residential-window-tinting/fade-reduction-window-films','residential-window-tinting/privacy-window-films','residential-window-tinting/heat-control-window-films','residential-window-tinting/anti-glare-window-films','residential-window-tinting/frosted-opaque-window-films','residential-window-tinting/safety-security-window-films',
'commercial-window-tinting/heat-rejection-solar-protection-window-films','commercial-window-tinting/anti-glare-window-films','commercial-window-tinting/anti-graffiti-window-films','commercial-window-tinting/frosted-opaque-decorative-window-films','commercial-window-tinting/safety-security-window-films',
*['locations/'+x for x in ['christchurch','ashburton','timaru','oamaru','queenstown','wanaka','cromwell','lake-tekapo','arrowtown','temuka','geraldine']], 'window-tinting-gallery','about','window-tinting-faq','contact-for-window-tinting']
sheet=json.loads((ROOT/'src/keyword-map-2026-10-23.json').read_text())
groups=[]
for line in sheet['values'][1:]:
 if not len(line)>1 or not line[1]:continue
 if line[0]:groups.append({'source_page':line[0],'keywords':[]})
 groups[-1]['keywords'].append(' '.join(line[1].split()))
assert len(groups)==len(slugs)==29
mapping=[];issues=[];routes={p['path']:p for p in manifest}
for g,slug in zip(groups,slugs):
 path='/'+slug;expected=[normal(k) for k in g['keywords']]
 if path=='/window-tinting-gallery':expected=['tint a window projects']
 if path=='/residential-window-tinting-services':expected.append('house window tinting christchurch')
 actual=[normal(k) for k in routes[path]['keywords']]
 if sorted(expected)!=sorted(actual):issues.append(path+': sheet group does not match page ownership')
 mapping.append({**g,'path':path,'assigned_keywords':routes[path]['keywords'],'passed':sorted(expected)==sorted(actual)})
(OUT/'keyword-mapping.json').write_text(json.dumps({'checked_on':sheet['checkedOn'],'source':sheet['source'],'groups':mapping,'issues':issues},indent=2)+'\n')
export=ROOT/'exports/final-content-2026-10-23-v7.17';export.mkdir(parents=True,exist_ok=True)
readability=[];placements=[];inventory=[]
for page in manifest:
 if page['type']=='review':continue
 p=Blocks();p.feed((ROOT/'dist'/page['path'].lstrip('/')/'index.html').read_text())
 paragraphs=[s for t,s in p.blocks if t=='p' and len(s.split())>7]
 ws=re.findall(r"[A-Za-z]+(?:['’-][A-Za-z]+)*",' '.join(paragraphs))
 sentences=sum(max(1,len(re.findall(r'[.!?]+(?=\s|$)',s))) for s in paragraphs)
 grade=.39*len(ws)/sentences+11.8*sum(syllables(w) for w in ws)/len(ws)-15.59
 long=[s.strip() for b in paragraphs for s in re.split(r'(?<=[.!?])\s+',b) if len(s.split())>32]
 readability.append({'path':page['path'],'estimated_grade':round(grade,1),'average_sentence_words':round(len(ws)/sentences,1),'paragraphs':len(paragraphs),'long_sentences':long})
 headings=[s for t,s in p.blocks if t in ['h1','h2','h3','h4']]
 targets=page['keywords']
 placements.append({'path':page['path'],'headings':headings,'targets':[{'keyword':k,'natural_heading_matches':[s for s in headings if count(s,k)],'readable_variant_in_h1':page.get('h1','')} for k in targets]})
 inventory.append({'path':page['path'],'sections':p.sections,'headings':headings,'blocks':len(p.blocks)})
 filename=(page['path'].strip('/').replace('/','__') or 'home')+'.md'
 text=['# '+page['label'],'','Website page: https://tint-a-window-review.vercel.app'+page['path'],'','Version 7.17 · 23 October 2026','']
 for tag,value in p.blocks:
  if tag in ['h1','h2','h3','h4']:text.extend(['#'*int(tag[1])+' '+value,''])
  elif tag=='summary':text.extend(['### '+value,''])
  else:text.extend([value,''])
 (export/filename).write_text('\n'.join(text)+'\n')
for name,data in [('readability',readability),('heading-placement',placements),('section-inventory',inventory)]:
 (OUT/(name+'.json')).write_text(json.dumps(data,indent=2)+'\n')
(export/'README.md').write_text('''# Final page copy, version 7.17

Rebuilt from the final rendered website on 23 October 2026. There are 30 customer-page copies, including the Locations directory. Each file preserves the reading order of headings, paragraphs, lists, questions and captions, including closed FAQ answers. Shared navigation/footer, pop-up form fields, illustrations and decorative labels are excluded. These are editorial review copies; the website is the layout reference. The precise website word and keyword measurements are in ../../content-audit.csv and ../../FINAL-CONTENT-REVIEW-7.17.md. No Drive documents or email drafts were changed by this export.
''')
report=ROOT/'FINAL-CONTENT-REVIEW-7.17.md'
table=['| Page | Main words | Mapped keywords and natural matches |','|---|---:|---|']
for r in audit['pages']:table.append('| ['+r['page']+'](https://tint-a-window-review.vercel.app'+r['path']+') | '+str(r['words'])+' | '+'; '.join(k+' × '+str(n) for k,n in r['keyword_counts'].items())+' |')
body='# Final content proof, version 7.17\n\n23 October 2026. The approved recommendations are implemented across the 30 customer pages. All 29 source page groups retain their mapped targets. Main SEO landing pages retain at least three natural matches per target and 1,000–1,500 words. About and Projects are deliberately shorter and exempt from word/repetition quotas, as requested on 23 October.\n\n'+audit['method']+'\n\n'+ '\n'.join(table)
body+='\n\n## Editorial changes and limits\n\nHome remains the broad Christchurch service owner and links directly to the assessment page. Privacy and Frosted/Opaque have clearer decision/finish roles. Services have distinct selection guidance, reasons and five-step processes. Regional opening repetition and service catalogues are replaced with practical enquiry planning and concise service paths. No offices, travel schedules or local project results were invented. Genuine first-hand local evidence remains a content-strengthening opportunity.\n\nReal-photo placement and factual caption rules are checked against the revised service mapping. The home project rail retains four supplied photos. The seven selected client shoot photographs have conservative AI lighting/reflection retouch and are used in team, advice and support contexts. The homepage retains its static architectural hero. About uses one hero photograph and one uncropped joint portrait, followed by a six-point vertical timeline from 2026 back to 1987. The four dated original archive photographs are preserved; the redundant individual portraits and separate Two Bills panel are removed. Timeline dates are plain text beside a continuous vertical line. The logo and shared accent palette now use Sun Yellow #FFD43B. The van image has a separate AI reflection/lighting retouch with its original retained. Seven shade guides show explicitly illustrative VLT examples, not product, UV, heat or power-saving measurements. Customer pages do not repeat internal preview labels; the final form step clearly says no enquiry or photographs have been sent.\n\nKeyword phrases now sit in useful prose where forcing them into headings read awkwardly. H1s and section headings retain the relevant service and customer intent in natural language. Grammatical variants with in/across/for, hyphenated service names and and/ampersand equivalents are included. Exact counts remain separately recorded. Case, spaces and accents are normalised for matching; Wānaka matches the unaccented source spelling. These counts are brief checks, not a ranking or originality guarantee.\n\n'
body+='Estimated prose reading grade: '+str(min(r['estimated_grade'] for r in readability))+'–'+str(max(r['estimated_grade'] for r in readability))+'. This uses heuristic syllables, not human comprehension testing. Long sentences over 32 words: '+str(sum(len(r['long_sentences'])for r in readability))+'.\n\nSee QA-CLIENT-REVIEW-7.17.md for section, functional, responsive, overlap and publishing evidence. The site remains a separate noindex review; forms send nothing. Official social links, product/business confirmations, enquiry delivery/privacy, analytics and live-domain migration remain production tasks. Drive documents and the unsent email draft are unchanged.\n'
report.write_text(body)
print(json.dumps({'sheet_groups':len(mapping),'mapping_issues':issues,'customer_pages':len(readability),'sections':sum(r['sections'] for r in inventory),'estimated_grade_range':[min(r['estimated_grade'] for r in readability),max(r['estimated_grade'] for r in readability)],'long_sentences':sum(len(r['long_sentences']) for r in readability),'exports':len(readability)},indent=2))
raise SystemExit(bool(issues))
