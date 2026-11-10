import {isNationalService,nationalCopy,filmOptionsLabel,exactCopy} from './national-copy.mjs';
import {imageForService,imageForServiceHeading} from './media-map-717.mjs';
import {storyArchive} from './client-media.mjs';
import {welcomeBanner,meetTheTeam} from './shoot-media.mjs';
import {proofCopy,proofSection,proofHeading,proofBrief,proofExtra} from './final-proof.mjs';
import {serviceCopy,finalSourceSection,finalBrief,finalExtra} from './final-content.mjs';
import {homepageRefinement} from './homepage-refinement.mjs';
import {homeQuote} from './quote-form.mjs';
import {enquiryActions} from './enquiry-actions.mjs';
import {filmGuide,hasFilmGuide} from './film-guide.mjs';
import {plainCopy,headingCopy,sectionHeading} from './editorial-review.mjs';
import fs from 'node:fs';
const customerEvidence=JSON.parse(fs.readFileSync(new URL('./customer-evidence.json',import.meta.url),'utf8'));
import {finalLocalStories} from './final-local-stories.mjs';
import {localStories} from './local-stories.mjs';
import {freshDesign} from './fresh-design.mjs';
import {sectionDesign,detailIcon} from './section-design.mjs';
import {extras, keywordCopy} from './page-copy.mjs';
const raw=JSON.parse(fs.readFileSync(new URL('./ashit-source-map.json',import.meta.url),'utf8'));
export const dispositions=[];
const clean=s=>s.replace(/For house window tinting (?:in )?Christchurch projects, this means better comfort, privacy and usability\. For commercial properties, it can mean less glare and better protection for exposed glass\./gi,'Tell us which room feels too hot, too bright or too exposed. We can help you compare film options around the way you use it.').replace(/—|–/g,', ').replace(/\bchristchurch\b/g,'Christchurch').replace(/\bwanaka\b/g,'Wanaka')
.replace(/Block 99% of harmful UV rays, based on current product claims/g,'Reduce UV transmission, with performance confirmed for the selected film')
.replace(/Current product claims include films that (?:can )?block 99% of harmful UV rays[^.]*\./g,'Ask for the selected film’s UV specification. The protection offered depends on the product and its application.')
.replace(/Strengthen glass and improve safety/g,'Help retain glass fragments where the specified system is suitable')
.replace(/Help strengthen vulnerable glass and hold broken glass together after impact\./g,'Help retain fragments in suitable glazing when the installed film and glass system is correctly specified.')
.replace(/strengthen suitable commercial glass and hold broken glass together after impact/gi,'help retain fragments in suitable commercial glass after breakage')
.replace(/(?:help )?strengthen glass and hold broken glass together/gi,'help retain glass fragments after breakage, depending on the installed system')
.replace(/strengthen glass/gi,'help retain broken glass fragments')
.replace(/\bhelp help\b/gi,'help')
.replace(/Frosted and opaque films can provide privacy (?:in bathrooms and toilets )?while still allowing natural light (?:into bathrooms, toilets and small windows|through the glass)\./g,'Frosted film obscures the view while admitting diffuse light. Opaque and blackout options vary in light transmission; compare the selected product.')
.replace(/Security film can add another layer of resistance to suitable glass and help slow forced entry attempts\./g,'An appropriately specified glass, film and attachment system may help delay forced entry. The proposed system needs evidence for that intended use.')
.replace(/fade-reducing and UV window film in Christchurch options should be chosen around the room and exposure/g,'fade-reducing and UV film options for Christchurch homes should be chosen around the room and exposure')
.replace(/Add full privacy with frosted or opaque films/g,'Obscure views with appropriately selected frosted or opaque films')
.replace(/full privacy/gi,m=>/^[A-Z]/.test(m)?'Visual Privacy':'visual privacy')
.replace(/(?:help )?strengthen suitable (?:home |commercial )?(?:glass|panes) and (?:help )?hold broken glass together(?: after impact)?/gi,'help retain fragments if suitable glass breaks')
.replace(/Clean, blemish-free installation/g,'Careful preparation and clean fitting')
.replace(/a tidy, blemish-free result/g,'a tidy result')
.replace(/Supply and fitting in short order where suitable/g,'Supply and installation timing confirmed for your project')
.replace(/For more than 39 years, we have helped property owners/g,'Drawing on more than 39 years of industry experience, we help property owners')
.replace(/^Related Service:\s*/,'')
.replace(/Modern film technology has improved significantly\. Product and installation warranty details depend on the film selected and its application\./,'Film appearance can change while an installation dries. Follow the care guidance for the selected product and contact us about persistent bubbles, lifting edges or other concerns. The appropriate response depends on the film, its condition and the installation details.')
.replace(/across New Zealand/g,'across Christchurch and selected South Island locations');
const instruction=/^(Use this section|Use existing|Suggested|Short Pullout|Example Short|Customer feedback themes|Current site includes|This section should|Our agreed location pages include|Trust Points:|We Supply:|Our services include:)/i;
function neutral(s,p){s=clean(s);for(const k of [...p.keywords].sort((a,b)=>b.length-a.length)){const escaped=k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s+');s=s.replace(new RegExp(escaped,'gi'),m=>p.index===14?'window film installation in Christchurch':p.index===25?'our family business':p.index===26?'speak with our team':p.index===27?'our window film answers':m.replace(/\s+(Christchurch|Ashburton|Timaru|Oamaru|Queenstown|Wanaka|Cromwell|Lake Tekapo|Arrowtown|Temuka|Geraldine)$/i,' in $1'));}return s.replace(/window tinting in (Christchurch|Ashburton|Timaru|Oamaru|Queenstown|Wanaka|Cromwell|Lake Tekapo|Arrowtown|Temuka|Geraldine) services/gi,'window tinting services in $1').replace(/in Christchurch (?:homeowners|businesses) can choose around/g,'in Christchurch, with options selected around').replace(/in Christchurch (?:homeowners|businesses) choose/g,'in Christchurch').replace(/in Christchurch (?:homeowners|businesses) can arrange/g,'in Christchurch, which you can arrange').replace(/\buv\b/gi,'UV').replace(/\b(christchurch|ashburton|timaru|oamaru|queenstown|wanaka|cromwell|lake tekapo|arrowtown|temuka|geraldine)\b/gi,m=>m.split(' ').map(w=>w[0].toUpperCase()+w.slice(1).toLowerCase()).join(' '));}
export function revisedContent(ctx){
 const {esc,img,eyebrow,btn,link,pages,banner,boutiqueHero,lightStudy,industrySection,serviceStory,locationLook,testimonials,contactPage,galleryPage,faqHTML,regional}=ctx;
 const fresh=freshDesign(ctx);
 const node=(t,tag='p')=>`<${tag}>${esc(plainCopy(t))}</${tag}>`;
 const splitGroups=units=>{let groups=[],lead=[],cur=null;for(let i=0;i<units.length;i++){let u=units[i];const title=u.role==='subheading'||(u.role==='paragraph'&&u.text.length<95&&!/[.!?:”]$/.test(u.text)&&units[i+1]?.role==='paragraph'&&units[i+1].text.length>35);if(title){cur={title:u.text,body:[]};groups.push(cur);}else if(cur)cur.body.push(u);else lead.push(u);}return{groups,lead};};
 const serviceLink=t=>{const lower=t.toLowerCase();let index=/anti.graffiti/.test(lower)?11:/frost|opaque|decorative/.test(lower)?6:/safety|security/.test(lower)?7:/fade|uv/.test(lower)?2:/privacy/.test(lower)?3:/heat|solar/.test(lower)?4:/glare/.test(lower)?5:/commercial window tinting/.test(lower)?8:/residential window tinting/.test(lower)?1:null;if(index!==null&&/commercial/.test(lower)){index=({4:9,5:10,6:12,7:13})[index]||index;}return index===null?null:pages[index].path;};
 const choiceTarget=(title,p)=>serviceLink((p.type==='commercial'||p.index===8?'Commercial ':'')+title);
 const prose=(units,resolve=null)=>{let html='',list=[];const flush=()=>{if(list.length){html+='<ul class="editorial-points" role="list">'+list.map(t=>`<li>${resolve?.(t)?`<a href="${resolve(t)}">${esc(t)}</a>`:esc(t)}</li>`).join('')+'</ul>';list=[];}};for(const u of units){if(u.role==='list')list.push(u.text);else{flush();html+=node(u.text);}}flush();return html;};
 const compositions=sectionDesign({esc,img:(name,...args)=>img(name==='craft'?'shoot-bill-working':name,...args),eyebrow,prose});
 function sourceSections(p){let sections=[];for(const u of raw.filter(x=>x.path===p.path&&x.section!==null&&!['format-label','document-metadata'].includes(x.role))){if(!sections[u.section])sections[u.section]={index:u.section,units:[]};sections[u.section].units.push({...u,text:plainCopy(neutral(u.text,p))});}return sections;}
 function renderSection(s,p){const eye=s.units.find(u=>u.role==='eyebrow')?.text||'',sourceHeading=s.units.find(u=>u.role==='heading')?.text||'',heading=proofHeading(p,s.index,sectionHeading(p,s.index,sourceHeading));dispositions.push({path:p.path,sourceSection:s.index,sourceHeading,disposition:p.type==='location'&&[1,2,3,4,5,6,7].includes(s.index)?'Final proof: distinct regional enquiry preparation, relevant service paths, coordination, five practical steps and questions; no local office or project outcome invented':serviceCopy[p.index]&&[2,3,4,5,7].includes(s.index)?'Rewritten for direct customer benefits, useful options, qualified claims and page-specific questions; source intent retained':p.index===0?({0:'Existing branded hero retained',1:'Merged into the concise customer introduction',2:'Rewritten as six linked customer outcomes',3:'Residential and commercial photographic pathways retained',4:'Condensed into six distinct reasons to choose',5:'Detailed film options removed from Home; existing service pages retain the guidance',6:'Condensed into assessment, installation and aftercare',7:'Verified customer excerpts retained',8:'Moved into a compact experience strip after the hero',9:'Merged into the final enquiry form'}[s.index]||'Merged into the simplified homepage journey'):(localStories[p.index]&&[1,2,7].includes(s.index))?'Rewritten as an individual property-planning brief and relevant questions':((p.index<=13&&s.index===1)||p.index===0&&s.index===3)?'Merged into the opening answer or illustrated property choices':/Get Started|Still Have Questions/.test(eye)?'Adapted into branded closing enquiry section':s.index===0?'Adapted into the v7 opening':/Testimonials|Customer Feedback/.test(eye)?'Draft examples replaced with verified customer excerpts':/Trusted By/.test(eye)?'Restored verified customer references':'Retained and edited for clarity and qualified claims'});if(s.index===0)return '';
 if(p.index===0&&s.index===3)return fresh.audience();
 const baseLocal=finalLocalStories[p.index]||localStories[p.index];const local=baseLocal&&proofCopy.locations[p.index]?{...baseLocal,title:proofCopy.locations[p.index].title,intro:proofCopy.locations[p.index].intro}:baseLocal;
 if(local&&s.index===1)return `<section class="section revision-section revision-feature-section" id="content-1"><div class="revision-heading">${eyebrow('Your project, in context')}<h2>${esc(local.title)}</h2></div><div class="revision-body">${local.intro.map(t=>node(t)).join('')}</div><figure>${img(p.image)}</figure></section>`;
 if(local&&s.index===2)return `<section class="section revision-section revision-details-section" id="content-2"><div class="revision-heading">${eyebrow('Decisions worth making early')}<h2>What to check<br><em>before choosing film.</em></h2></div><div class="revision-body revision-details">${local.decisions.map(([h,t])=>`<article><h3>${esc(headingCopy(h))}</h3><p>${esc(plainCopy(t))}</p></article>`).join('')}</div></section>`;
 if(local&&s.index===7)return `<section class="section revision-section revision-answers-section faq-group" id="content-7"><div class="revision-heading">${eyebrow('Before arranging the work')}<h2>Questions for your<br><em>${esc(p.label==='Wanaka'?'Wānaka':p.label)} project.</em></h2></div><div class="revision-body">${faqHTML(local.faqs.map(([q,a])=>({q,a:[a]})),p)}</div></section>`;

 if(/Testimonials|Customer Feedback/.test(eye))return testimonials();
 if(/Trusted By/.test(eye))return `<section class="section client-references" id="customer-logos" data-carousel="horizontal" aria-label="Customer references"><div>${eyebrow('Customer experience')}<h2>Experience with<br><em>homes and businesses.</em></h2><p>Experience across different spaces, with each film selected around the property and the people using it.</p></div><div class="logo-reel" data-reel-track tabindex="0" aria-label="Customer logos; scroll to see more">${customerEvidence.logos.map(x=>`<figure data-reel-item><img src="/assets/customer-logos/${x.file}" width="${x.width}" height="${x.height}" alt="${esc(x.name)}" loading="lazy"></figure>`).join('')}</div></section>`;
 if(/Get Started|Still Have Questions/.test(eye))return '';
 if(p.index===26&&s.index===1)return '';
 const units=s.units.filter(u=>!['heading','eyebrow','cta'].includes(u.role)&&!instruction.test(u.text)).map(u=>({...u,text:u.text.replace('You can call 0800 368 468, email info@tintawindow.co.nz, or complete the enquiry form with details about your property and windows.','Call 0800 368 468 or email info@tintawindow.co.nz with your location and window details. This review website’s form demonstrates the enquiry journey and does not send a request.').replace('At night, when lights are on inside, the privacy effect can change.','It does not give reliable privacy with lights on inside after dark.')}));
 if(p.index===25&&s.index===1)return meetTheTeam({img,eyebrow,title:esc(heading),content:prose(units)});
 if(p.index===0&&s.index===2)return compositions.benefits({eye,title:heading,units});
 const grouped=splitGroups(units);

 if(/Why Choose Us/.test(eye)&&grouped.groups.length>1)return compositions.reasons({eye,title:heading,...grouped,index:s.index});
 if(p.index>=1&&p.index<=13&&s.index===2&&grouped.groups.length>1)return compositions.problems({eye,title:heading,...grouped,p,index:s.index});
 const isFaq=/Common Questions/.test(eye)||p.index===27;
 let content='',kind='editorial',visual='';
 if(isFaq){let qs=[],cur=null;for(const u of units){if(u.text.endsWith('?')){cur={q:u.text.replace(/^\d+[.)]\s*/,''),a:[]};qs.push(cur);}else if(cur)cur.a.push(u.text);}if(p.index===27){const additions=({1:[0,2],2:[3],4:[1],5:[4]})[s.index]||[];for(const i of additions){const guide=extras[27][i];qs.push({q:guide.title,a:guide.paras});}}content=faqHTML(qs,p.index===27&&s.index===4?{type:'commercial'}:p);kind='answers';}
 else {const {groups,lead}=splitGroups(/How It Works|Simple Process/.test(eye)?units.map(u=>({...u,role:u.role==='list'?'paragraph':u.role})):units);content=prose(lead);if(groups.length>1){const process=/How It Works|Simple Process/.test(eye),values=/Why Choose Us/.test(eye);kind=process?'steps':values?'reasons':/Services|Service$/.test(eye)?'choices':'details';content+=`<div class="revision-${kind}">${groups.map((g,i)=>`<article class="${!g.body.length?'revision-category':''}">${process?`<span class="revision-number">${String(i+1).padStart(2,'0')}</span>`:''}${kind==='choices'&&([1,8].includes(p.index)||p.type==='location')&&g.body.length?`<figure class="choice-photo">${img(p.type==='location'?(/Commercial/.test(g.title)?'client-054':'client-019'):imageForServiceHeading(g.title,p.index===8))}</figure>`:''}${kind==='choices'&&!([1,8].includes(p.index)||p.type==='location')?detailIcon(/reflective|privacy/i.test(g.title)?'privacy':/heat|solar|glare|UV/i.test(g.title)?'sun':/safety|security|graffiti/i.test(g.title)?'shield':'pane'):''}<h3>${/Services|Service$/.test(eye)&&choiceTarget(g.title,p)&&choiceTarget(g.title,p)!==p.path?`<a href="${choiceTarget(g.title,p)}">${esc(headingCopy(g.title.replace(/^\d+[.)]\s*/,'')))}</a>`:esc(headingCopy(g.title.replace(/^\d+[.)]\s*/,'')))}</h3>${prose(g.body,/Services|Service$/.test(eye)?t=>serviceLink((/Commercial/.test(g.title)?'Commercial ':'')+t):null)}${/Related Service/.test(g.title)&&serviceLink(g.title)?link('Explore this film',serviceLink(g.title)):''}</article>`).join('')}</div>`;}else{content=prose(units,p.index===25&&s.index===2?serviceLink:null);if(s.index===1||/Installation|Supply|Our Story/.test(eye)){kind='feature';visual=`<figure>${img(p.index===25?'client-016':/Our Story|Installation/.test(eye)?'client-016':p.index===0?(s.index===1?'residential':'glazing'):p.image||'architecture')}</figure>`;}}}
 return `<section class="section revision-section revision-${kind}-section ${isFaq?'faq-group':''}" id="content-${s.index}"><div class="revision-heading">${isNationalService(p.index)&&s.index===3?`<p class="eyebrow"><span></span>${exactCopy(esc(filmOptionsLabel(p.index)))}</p>`:eyebrow(eye==='Film Services'?'Compare your options':eye)}<h2>${esc(heading)}</h2></div><div class="revision-body">${content}${kind==='steps'?enquiryActions():''}</div>${visual}</section>`;
 }
 function extra(p,only=null){return(extras[p.index]||[]).map((original,i)=>{if(only!==null&&i!==only)return ''; const guide=hasFilmGuide(p.index)&&i===0; const s={...proofExtra(p,finalExtra(p,original),i),photo:p.index===25&&i===0?'shoot-team-conversation':original.photo||(p.index===26?({1:'room',3:'work-1',5:'craft'}[i]||null):({1:'glazing',2:'architecture',3:'residential',4:'room',5:'view',6:'glazing',7:'glazing',8:'work-5',9:'work-4',10:'commercial',11:'work-5',12:'work-6',13:'glazing'}[p.index]||null))};return `<section class="${p.index===26?`enquiry-chapter-${i} `:''}section revision-section revision-guide ${guide?'with-tint-guide':''} ${i%2?'revision-guide-reverse':''}"><div class="revision-heading">${eyebrow(s.eye||'A considered choice')}<h2>${esc(s.title)}</h2></div><div class="revision-body">${s.paras.map(t=>node(t)).join('')}${s.items?'<dl class="decision-list">'+s.items.map(([h,t])=>`<div><dt>${esc(h)}</dt><dd>${esc(t)}</dd></div>`).join('')+'</dl>':''}${p.index!==26&&(!guide&&i===0)?enquiryActions():''}</div>${guide?filmGuide(p.index):s.photo?`<figure>${img(s.photo)}</figure>`:''}</section>`;}).join('');}
 const customerHeadings={
  1:'Enjoy a more comfortable home.',
  2:'Protect the interiors you love.',
  3:'Feel less exposed in your own home.',
  4:'Enjoy the room, even when the sun comes in.',
  5:'Softer light. More room to relax.',
  6:'Privacy that belongs in your space.',
  7:'Understand your options for safer glass.',
  8:'Glass that works around your business.',
  9:'A more comfortable place to work.',
  10:'Keep the daylight. Ease the distraction.',
  11:'A replaceable layer for exposed glass.',
  12:'Create privacy that fits your workplace.',
  13:'Plan the protection your premises need.',
  14:'A clearer plan for your Christchurch property.',
  15:'Make more of the rooms you use.',
  16:'Start with the light in your Timaru property.',
  17:'Consider the glass. Preserve the character.',
  18:'Comfort with the outlook in mind.',
  19:'Keep the view part of everyday life.',
  20:'Make sunny spaces more comfortable.',
  21:'Balance privacy, comfort and the view.',
  22:'Choose a finish that suits your Arrowtown property.',
  23:'Practical choices for everyday comfort.',
  24:'Choose around the rooms you use every day.'
 };
 function keySections(p){const d=proofBrief(p,finalBrief(p,keywordCopy[p.index]));if(!d)return{start:'',end:''};
 const customerTitle=p.index===14?d.title:serviceCopy[p.index]?.title||customerHeadings[p.index];
 const overviewEyebrow=nationalCopy.services[p.index]?.overviewEyebrow;
 const keywordLabel=customerTitle&&!serviceCopy[p.index]&&p.type!=='location'?p.keywords.find(k=>d.title.toLowerCase().includes(k.toLowerCase())):null;
 return {start:`<section class="section revision-brief" id="possibilities"><div>${overviewEyebrow?`<p class="eyebrow"><span></span>${exactCopy(esc(overviewEyebrow))}</p>`:keywordLabel?`<p class="eyebrow">${esc(keywordLabel)}</p>`:eyebrow(p.type==='location'?'Planning your project':d.eye||'Made for your space')}<h2>${esc(customerTitle||d.title)}</h2></div><div>${d.paras.map(t=>node(t)).join('')}</div></section>`,end:`<section class="section revision-next"><div>${isNationalService(p.index)?`<p class="eyebrow"><span></span>${exactCopy(esc(nationalCopy.closingLabel))}</p>`:eyebrow('Your next step')}<h2>${esc(d.endTitle||'Tell us what you would like to change.')}</h2></div><div>${d.end.map(t=>node(t)).join('')}${enquiryActions(p.index===26?'#start-enquiry':undefined)}</div></section>`};}
 function render(p){const key=keySections(p),source=sourceSections(p);const sections=source.map(s=>renderSection(proofSection(p,finalSourceSection(p,s)),p));const outline=p.index>=1&&p.index<=13?`<nav class="service-outline" aria-label="On this service page"><span>Explore this service</span><a href="#possibilities">Overview</a><a href="#content-3">Film choices</a><a href="#suitable-spaces">Suitable spaces</a>${hasFilmGuide(p.index)?'<a href="#tint-guide-title">Film guide</a>':''}<a href="#project-examples">Projects</a><a href="#content-7">Questions</a></nav>`:'';let body=fresh.hero(p)+outline+key.start;
 if(p.index===0){
  const home=homepageRefinement(ctx);
  const logos=sections[8].replace('section client-references','section client-references home-experience');
  body=welcomeBanner(fresh.hero(p))+logos+home.intro+sections[3]+home.benefits+home.reasons+home.work+home.installation+sections[7]+home.questions+homeQuote(img);
 }else if(p.index>=1&&p.index<=13){
  body+=sections[2]+sections[3]+industrySection(p)+extra(p)+fresh.projects(p)+sections[4]+sections[5]+sections[6]+sections[7];
  if(p.type!=='hub')body+=`<section class="section revision-related"><h2>Explore related options</h2><div class="related-service-cards">${pages.filter(x=>x.type===p.type&&x.index!==p.index).map(x=>`<a href="${x.path}">${img(imageForService(x))}<span>${esc(x.label)}</span></a>`).join('')}</div></section>`;
 }else if(p.index===25){
  body=fresh.hero(p)+sections[1]+storyArchive(ctx)+`<section class="section story-approach-717"><div>${eyebrow('How we work with you')}<h2>Clear advice.<br>Careful work.</h2></div><div><p>Whether you want a cooler living room, more privacy or less glare at work, we begin with how you use the space. We check the glass and discuss suitable films, including their appearance and any limits.</p><p>You can ask about samples, installation and care before making a decision. We explain the proposed work so you know what is included and who to contact if you need help afterwards.</p><div class="story-service-links"><a href="/residential-window-tinting-services">Residential Window Tinting</a><a href="/commercial-window-tinting-services">Commercial Window Tinting</a></div></div></section><section class="section revision-next story-next-717"><div>${eyebrow('Talk to Bill and Roxana')}<h2>Let’s talk about<br>your windows.</h2></div><div><p>Tell us where your property is and what you would like to improve. You do not need to know a product name to start.</p>${enquiryActions()}</div></section>`;
  return body;

 }else if(p.index===26){body+=contactPage(p).replace(/^[\s\S]*?<\/section>/,'')+extra(p);}
 else if(p.index===28){body=fresh.hero(p)+galleryPage(p);}
 else {
  if(p.index===27)body+='<section class="section faq-tools" aria-label="Search frequently asked questions"><label class="faq-search">Search questions<input type="search" id="faq-search" placeholder="Try privacy or double glazing"></label><p id="faq-search-status" aria-live="polite"></p></section>';
  body+=sections.slice(1).join('')+(p.index===27?'':extra(p));
 }
 fs.writeFileSync(new URL('../project-placeholders.json',import.meta.url),JSON.stringify(fresh.placeholderSlots,null,2));
 return [0,28].includes(p.index)?body:body+key.end;
 }

 return{render};
}
