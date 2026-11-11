// Read-only logic port of website/src/section-design.mjs. No filesystem effects.
import {problemMediaMap} from './media-map-717';
import {enquiryActions} from './enquiry-actions';
import {headingCopy} from './editorial-review';
// Purpose-specific compositions. Source copy is passed in, never replaced by display labels.
const drawings: any={
 sun:'<circle cx="24" cy="24" r="8"/><path d="M24 3v6m0 30v6M3 24h6m30 0h6M9 9l4 4m22 22 4 4M9 39l4-4m22-22 4-4"/>',
 privacy:'<path d="M4 24s7-13 20-13 20 13 20 13-7 13-20 13S4 24 4 24Z"/><circle cx="24" cy="24" r="6"/><path d="m8 41 32-34"/>',
 shield:'<path d="m24 4 16 6v13c0 10-9 17-16 21C17 40 8 33 8 23V10Z"/><path d="m16 24 6 6 12-14"/>',
 pane:'<path d="M8 5h27v32H8zM15 12h27v32H15zM8 21h27M22 5v32"/>',
 craft:'<path d="m9 6 31 18-5 9L4 15zM18 23l-7 15a4 4 0 0 0 7 4l9-14M4 15l31 18"/>',
 care:'<path d="M7 27v-6a17 17 0 0 1 34 0v6M7 21H4v13h8V21Zm34 0h3v13h-8V21Zm0 13c0 7-9 9-16 9h-4v-5h7v5"/>',
 compare:'<path d="M5 7h15v34H5zM28 7h15v34H28zM9 15h7m-7 7h7m-7 7h7M32 15h7m-7 7h7m-7 7h7"/>',
 finish:'<path d="M7 7h27v34H7zM29 13l5-9 5 9 9 5-9 5-5 9-5-9-9-5zM13 33l8-8"/>',
 range:'<path d="m5 15 19-10 19 10-19 10zM5 24l19 10 19-10M5 33l19 10 19-10"/>',
 document:'<path d="M11 4h20l8 9v30H11zM31 4v10h8M17 21h16m-16 7h16m-16 7h9"/>',
 home:'<path d="m3 23 21-18 21 18M9 18v25h30V18M19 43V29h10v14M19 17h10v7H19z"/>',
 building:'<path d="M5 43V16h14V5h19v38M2 43h44M11 22v4m0 6v4M25 12h7m-7 7h7m-7 7h7m-7 7h7M19 43V16"/>',
 advice:'<path d="M5 7h38v26H23L12 43V33H5zM13 16h22m-22 8h15"/>',
 cafe:'<path d="M9 18h24v14a11 11 0 0 1-22 0V18ZM33 19h4a7 7 0 0 1 0 14h-5M5 44h33M15 4v7m7-7v7m7-7v7"/>',
 screen:'<path d="M4 7h40v27H4zM24 34v9m-11 0h22M9 12h30"/>',
 hotel:'<path d="M5 12v31m38-26v26M5 33h38M5 22h12v11m0-13h19a7 7 0 0 1 7 7v6"/><circle cx="11" cy="18" r="4"/>',
 shop:'<path d="m8 5-4 13h40L40 5ZM7 23v20h34V23M13 29h12v14m6-14h4v7h-4zM14 5l-2 13m12-13v13M34 5l2 13"/>',
 clinic:'<path d="M7 8h34v35H7zM20 3h8v5M20 17h8v6h6v8h-6v6h-8v-6h-6v-8h6z"/>'
};
export const detailIcon: any=(name='pane')=>`<svg class="detail-icon" data-icon="${name}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[name]||drawings.pane}</svg>`;
export function applicationIcon(name){return detailIcon(/café|restaurant|hospitality/i.test(name)?'cafe':/office|workspace/i.test(name)?'screen':/hotel|holiday|airbnb|accommodation/i.test(name)?'hotel':/retail|shopfront|showroom/i.test(name)?'shop':/clinic|consulting/i.test(name)?'clinic':/apartment|education|facilit|building/i.test(name)?'building':'home');}

export function sectionDesign({esc,img,eyebrow,prose}: any){
 const heading: any=(eye,title)=>`<div class="revision-heading">${eyebrow(eye)}<h2>${esc(title)}</h2></div>`;
 const photo: any=(name,cls='')=>`<figure class="${cls}">${img(name)}${name==='frost-concept'?'<figcaption>Illustrated privacy-film concept.</figcaption>':''}</figure>`;
 function benefits({eye,title,units}: any){
  const points: any=units.filter(u=>u.role==='list'),paras=units.filter(u=>u.role!=='list');
  const groups: any=[{name:'Comfort',icon:'sun',indices:[0,1,2,3]},{name:'Privacy & character',icon:'privacy',indices:[4,5,9]},{name:'Protection',icon:'shield',indices:[6,7,8]}];
  return `<section class="section revision-section revision-editorial-section benefit-composition" id="content-2">${heading(eye,title)}<div class="benefit-intro">${prose(paras.slice(0,2))}</div><div class="benefit-layout">${photo('interior','benefit-photo')}<div class="benefit-groups">${groups.map(g=>`<div class="benefit-group">${detailIcon(g.icon)}<div><p class="benefit-label">${g.name}</p>${prose(g.indices.map(i=>points[i]))}</div></div>`).join('')}</div></div><div class="benefit-close">${prose(paras.slice(2))}${enquiryActions()}</div></section>`;
 }
 function problems({eye,title,groups,lead,p,index}: any){
  const pictures: any=problemMediaMap;
  const last: any=groups.at(-1),conclusion=last.body.length>1&&/should solve|a real .*problem/i.test(last.body.at(-1).text)?[last.body.pop()]:[];
  return `<section class="section revision-section revision-details-section problem-composition" id="content-${index}">${heading(eye,title)}<div class="problem-layout">${photo(pictures[p.index]||p.image,'problem-photo')}<div class="revision-body">${prose(lead)}<div class="revision-details">${groups.map(g=>`<article>${detailIcon(/privacy|bathroom|exposed|overlook/i.test(g.title)?'privacy':/safety|security|damage|scratch|graffiti/i.test(g.title)?'shield':/screen|work|glare|office|strain/i.test(g.title)?'screen':/heat|sun|fading|light|blinds/i.test(g.title)?'sun':'pane')}<h3>${esc(headingCopy(g.title))}</h3>${prose(g.body)}</article>`).join('')}</div>${conclusion.length?`<div class="problem-takeaway">${prose(conclusion)}${enquiryActions()}</div>`:''}</div></div></section>`;
 }
 function reasons({eye,title,groups,lead,index}: any){
  const [experience,...rest]=groups;
  const reasonIcon: any=title=>/install|fit|prepar/i.test(title)?'craft':/support|aftercare/i.test(title)?'care':/family|local/i.test(title)?'home':/residential|commercial|property/i.test(title)?'building':/warrant|product|information/i.test(title)?'document':/sample|compar|choice/i.test(title)?'compare':'advice';
  return `<section class="section revision-section revision-reasons-section atelier-reasons" id="content-${index}">${heading('Advice, installation & aftercare',title)}${lead.length?`<div class="reasons-intro">${prose(lead)}</div>`:''}<div class="reasons-composition"><div class="reasons-feature">${photo('craft','reasons-photo')}<article class="experience-panel"><h3>${esc(headingCopy(experience.title)).replace(/^35\+/,'<span class="experience-number">39+</span>')}</h3>${prose(experience.body)}</article></div><div class="revision-body revision-reasons">${rest.map((g,i)=>`<article>${detailIcon(reasonIcon(g.title))}<h3>${esc(headingCopy(g.title))}</h3>${prose(g.body)}</article>`).join('')}</div></div></section>`;
 }
 return {benefits,problems,reasons};
}
