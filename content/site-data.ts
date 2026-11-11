// Read-only logic port of website/src/site-data.mjs. No filesystem effects.
import {editorial,detail,metadata} from './enhancements';
import { teamInput } from './team';
import {locationPageCopy} from './location-page-copy';
import type { TeamPage } from './types';
export const team: TeamPage[] = structuredClone(teamInput);
function editDeep(x){if(typeof x==='string')return editorial(x);if(Array.isArray(x))return x.map(editDeep);if(x&&typeof x==='object')return Object.fromEntries(Object.entries<any>(x).map(([k,v])=>[k,editDeep(v)]));return x;}
for(let i: any=0;i<team.length;i++)team[i]=editDeep(team[i]);
export const contact: any='/contact-for-window-tinting';
export const residential: any='/residential-window-tinting-services';
export const commercial: any='/commercial-window-tinting-services';
export const gallery: any='/window-tinting-gallery';
export const faq: any='/window-tinting-faq';
export const phone: any='0800 368 468';
export const email: any='info@tintawindow.co.nz';
const defs: any=[
 ['Home','/','home','Beautiful light. Better living.','architecture','Window Tinting Christchurch | Tint A Window'],
 ['Residential',residential,'hub','A home that feels as good as it looks.','residential','Residential Window Tinting Christchurch | Tint A Window'],
 ['Fade reduction',null,'residential','Protect the things that make it home.','restaurant','Fade Reducing & UV Window Film Christchurch | Tint A Window'],
 ['Privacy',null,'residential','A little more privacy. A lot more comfort.','interior','Privacy Window Film Christchurch | Tint A Window'],
 ['Heat control',null,'residential','Enjoy the sun. Soften the heat.','architecture','Heat Control Window Film Christchurch | Tint A Window'],
 ['Anti-glare',null,'residential','Let the light in. Take the edge off.','lake','Anti Glare Window Film Christchurch | Tint A Window'],
 ['Frosted & opaque',null,'residential','Beautifully private, by design.','interior','Frosted and Opaque Window Film Christchurch | Tint A Window'],
 ['Safety & security',null,'residential','A considered layer of protection.','view','Safety & Security Window Film Christchurch | Tint A Window'],
 ['Commercial',commercial,'hub','Better glass. Better working spaces.','commercial','Commercial Window Tinting Christchurch | Tint A Window'],
 ['Heat & solar control',null,'commercial','Keep your building working comfortably.','commercial','Commercial Heat Control Window Film Christchurch | Tint A Window'],
 ['Anti-glare',null,'commercial','Make room for clearer thinking.','restaurant','Commercial Anti-Glare Window Films Christchurch | Tint A Window'],
 ['Anti-graffiti',null,'commercial','Protect the surface. Preserve the glass.','commercial','Anti Graffiti Window Films Christchurch | Tint A Window'],
 ['Frosted & decorative',null,'commercial','Privacy with a sense of place.','restaurant','Commercial Frosted & Decorative Window Film Christchurch | Tint A Window'],
 ['Safety & security',null,'commercial','Glass protection, carefully specified.','commercial','Commercial Safety & Security Window Film Christchurch | Tint A Window'],
 ...['Christchurch','Ashburton','Timaru','Oamaru','Queenstown','Wānaka','Cromwell','Waimate','Arrowtown','Temuka','Geraldine'].map((x,i)=>[x,`/locations/${(x==='Wānaka'?'wanaka':x.toLowerCase().replaceAll(' ','-'))}/`,'location',`Window tinting in ${x==='Wanaka'?'Wānaka':x}.`,['architecture','view','interior','residential','glazing','lake','view','lake','glazing','interior','residential'][i],`Window Tinting ${x} | Service Area | Tint A Window`]),
 ['Our story','/about/','about','A family trade. A personal approach.','craft','About Tint A Window | Our Family Story'],
 ['Contact',contact,'contact','Let’s talk about your windows.','architecture','Contact Tint A Window | Request a Window Film Quote'],
 ['FAQs',faq,'faq','A clearer view of window film.','glazing','Window Film FAQs | Tint A Window']
];
export const pages: any=defs.map((d,i)=>({label:d[0],path:d[1]||(team[i].suggestedPath+'/'),type:d[2],headline:d[3],image:d[4],title:d[5],source:team[i],index:i}));
pages.push({label:'Projects',path:gallery,type:'gallery',headline:'Made for the way you see the world.',image:'view',title:'Window Tinting Projects & Gallery | Tint A Window',index:28});
export const homes: any=pages.filter(p=>p.type==='residential');
export const businesses: any=pages.filter(p=>p.type==='commercial');
export const locations: any=pages.filter(p=>p.type==='location');
import { keywordGroups } from './search-terms';
export { keywordGroups };
const keyIndexes: any=[0,1,3,4,5,6,7,8,2,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,26,28,27,25];
pages.forEach((p,i)=>p.keywords=keywordGroups[keyIndexes[i]]?.keywords||[]);
export const photos: any=[
 {file:'architecture',title:'Glass, light & open living',type:'Residential',alt:'Large glazed doors and timber decking on an architectural home'},
 {file:'glazing',title:'An outlook worth keeping',type:'Residential',alt:'Mountain reflections in a home’s floor-to-ceiling glazing'},
 {file:'commercial',title:'Window film at building scale',type:'Commercial',alt:'Multi-storey building with glazed windows and balconies'},
 {file:'residential',title:'A home filled with light',type:'Residential',alt:'Two-storey home with large corner windows'},
 {file:'restaurant',title:'Comfort in shared spaces',type:'Commercial',alt:'Dining room with timber furniture and full-height windows'},
 {file:'interior',title:'A considered finish',type:'Residential',alt:'Wide glazed sliding doors opening onto a timber deck'},
 {file:'lake',title:'A view through the glass',type:'Residential',alt:'Lake and mountains seen through a home’s windows'},
 {file:'view',title:'Architecture in the landscape',type:'Residential',alt:'Long low contemporary house with large glazing and a lawn'},
 {file:'craft',title:'The work behind the finish',type:'Installation',alt:'Window film installer working from scaffolding beside a home'}
];
export const regional: any=Object.fromEntries(locationPageCopy.map(local=>[local.town,{
 tag:local.region,focus:local.card,intro:local.hero,heading:local.introHeading,
 advice:local.intro.join(' '),links:[]
}]));

// Version 2: content roles, fact-safe leads and actual image choices.
for(const p of pages){
 p.path=p.path==='/'?'/':p.path.replace(/\/$/,'');
 p.originalKeywords=[...p.keywords];
 p.description=metadata[p.index];
 if(detail[p.index]){p.source.sections[1].lines=[detail[p.index].intro];p.image=detail[p.index].image||'architecture';}
}
// User-approved refinement: Residential owns the house window tinting phrase.
pages[28].keywords=['Tint A Window projects'];
pages[0].keywords=pages[0].keywords.filter(k=>k!=='house window tinting christchurch');
pages[1].keywords.push('house window tinting christchurch');
pages[0].searchRole='Primary owner: broad Christchurch window tinting and window film';
pages[1].searchRole='Primary owner: residential, house and home window tinting Christchurch';
pages[14].searchRole='Supporting page: local assessment and installation arrangements';
pages[14].title='Christchurch Window Film Assessments | Tint A Window';
pages[14].headline='Your Christchurch project. A clear next step.';
pages[9].title='Commercial Heat Control Christchurch | Tint A Window';
pages[10].title='Commercial Glare Control Christchurch | Tint A Window';
pages[12].title='Commercial Frosted Film Christchurch | Tint A Window';
pages[13].title='Commercial Safety Film Christchurch | Tint A Window';
pages[8].image='work-1';
pages[6].source.sections[0].lines[0]='Choose the right balance of privacy, light and coverage with frosted or opaque window film for your home.';
pages[13].source.sections[0].lines[0]='Discuss film for suitable commercial glazing, with specifications selected around fragment retention and the protection required.';
for(const p of locations){const local=locationPageCopy.find(local=>p.path===`/locations/${local.slug}`);if(!local)throw new Error('Missing local copy '+p.path);p.description=local.hero;p.headline=`Window tinting in ${local.town}.`;p.keywords=[`window tinting ${local.town.toLowerCase()}`];}
function displayName(n){return n==='Wanaka'?'Wānaka':n;}
photos.push(
 {file:'room',title:'Light across a living room',type:'Residential',alt:'Sunlit living room with upholstered sofas, timber flooring and tall windows'},
 {file:'work-1',title:'A considered commercial frontage',type:'Commercial',alt:'Modern single-storey commercial building with tall reflective glazing'},
 {file:'work-5',title:'Glazing on a larger scale',type:'Commercial',alt:'Glazed multi-storey commercial building with access equipment outside'},
 {file:'work-6',title:'Working above the street',type:'Commercial',alt:'Upper-storey commercial windows above a row of shops'}
);
team[27].sections.splice(team[27].sections.length-1,0,{eyebrow:'Planning & Aftercare',heading:'Before and after installation',lines:[
 'What affects the price of window tinting?',
 'Film choice, glass area, access, preparation and the installation location affect the scope. Photographs and approximate measurements help us start the conversation; the quote is based on the agreed work.',
 'How should I prepare for installation?',
 'Tell us about access restrictions, occupied rooms or items close to the glass. We will discuss the preparation needed for your property before the appointment.',
 'When can I clean the film?',
 'Follow the care instructions for the installed product. Drying and curing time varies, so confirm when cleaning can start and which products or tools to avoid.',
 'What warranty applies to my installation?',
 'Warranty terms depend on the film and application. Ask for the relevant manufacturer and installation information for your selected product before agreeing the work.'
]});

// Use the standard local spelling in the customer-facing page title.
pages[19].title=pages[19].title.replace('Wanaka','Wānaka');
