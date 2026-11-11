// Read-only logic port of website/src/site-data.mjs. No filesystem effects.
import {editorial,detail,metadata,regionalAngles} from './enhancements';
import { teamInput } from './team';
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
 ...['Christchurch','Ashburton','Timaru','Oamaru','Queenstown','Wanaka','Cromwell','Lake Tekapo','Arrowtown','Temuka','Geraldine'].map((x,i)=>[x,`/locations/${x.toLowerCase().replaceAll(' ','-')}/`,'location',`Window tinting in ${x==='Wanaka'?'Wānaka':x}.`,['architecture','view','interior','residential','glazing','lake','view','lake','glazing','interior','residential'][i],`Window Tinting ${x} | Service Area | Tint A Window`]),
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
export const regional: any={
 Christchurch:{tag:'Our home region',focus:'Thoughtful window film for everyday living.',intro:'From a single street-facing room to a whole commercial frontage, tell us what is making your Christchurch space difficult to use. We can discuss a local assessment, compare samples and plan the installation around the property.',heading:'Start with the room, not the shade.',advice:'For house window tinting, tell us which rooms feel too hot, what time glare becomes a problem, and whether you need privacy during the day or at night. For commercial work, include occupancy, access and any landlord requirements.',links:['Ashburton','Timaru','Geraldine']},
 Ashburton:{tag:'Canterbury',focus:'Make more of the light in your home.',intro:'Planning window tinting in Ashburton? We help homeowners and businesses consider heat, glare, fading and privacy together, so the selected film suits the room rather than simply changing the colour of the glass.',heading:'A useful first look at your windows.',advice:'Send a wide photograph of the room and a closer photograph of the glass and frames. Tell us whether you want to preserve a clear outlook, protect interior finishes or make a sunny space more comfortable. We will confirm assessment and travel arrangements for your address.',links:['Christchurch','Timaru','Geraldine']},
 Timaru:{tag:'South Canterbury',focus:'For comfortable homes and considered shopfronts.',intro:'Our Timaru window tinting service covers residential and commercial glass. A living room, a busy workplace and a public-facing shop window have different requirements, and each deserves a film chosen for its purpose.',heading:'Protection where people meet the glass.',advice:'For an exposed shopfront, tell us about scratching, tagging or accidental impact concerns. Anti-graffiti film is a replaceable surface layer; safety film serves a different purpose. Photographs and approximate dimensions help us discuss the right application before arranging a visit.',links:['Temuka','Geraldine','Oamaru']},
 Oamaru:{tag:'North Otago',focus:'Improve the glass. Respect the character.',intro:'For window tinting in Oamaru, we start with what you value about the property: its natural light, its outlook, its finishes or the way the space is used. We then discuss suitable films for the glass already in place.',heading:'Existing glazing deserves a careful look.',advice:'Let us know about older panes, replacement glass or mixed glazing within the building. Include photographs of the frames and any visible glazing labels. Appearance and compatibility should be considered together before a film is specified.',links:['Timaru','Temuka','Cromwell']},
 Queenstown:{tag:'Queenstown & surrounds',focus:'Keep the outlook. Enjoy the room.',intro:'Tint A Window’s work has included architectural homes and accommodation properties in Queenstown. We bring that considered approach to window tinting: looking at the glass, the interior finishes and the views you want to keep.',heading:'Start with the view you want to preserve.',advice:'For large view-facing windows, tell us about glare, hot rooms and any artwork, flooring or furnishings affected by sunlight. Film choice should balance light, reflection and protection. Send photographs and dimensions so we can discuss samples, access and regional scheduling.',links:['Arrowtown','Wanaka','Cromwell']},
 Wanaka:{tag:'Wānaka & surrounds',focus:'Room for the light. Room to unwind.',intro:'We provide window tinting for Wānaka homes and commercial properties, with film choices considered around comfort, privacy and the outlook. The client’s brief places architectural residential work here at the heart of Tint A Window’s regional service.',heading:'Plan around how the property is used.',advice:'If you are organising work for a holiday home or accommodation property, include access arrangements and the dates the building will be occupied. We can discuss the assessment, samples and installation plan before you make a trip. Regional availability is confirmed with your enquiry.',links:['Queenstown','Cromwell','Arrowtown']},
 Cromwell:{tag:'Central Otago',focus:'Comfort that fits the whole space.',intro:'For Cromwell window tinting enquiries, we help you look at the whole space: how the glass faces the sun, where you sit or work, and which surfaces need protection. Residential and commercial film options can be compared around those priorities.',heading:'Tell us how the room changes through the day.',advice:'Note when a space becomes uncomfortable and whether heat or glare is the main concern. Include glass dimensions and any information about double glazing. We will consider film compatibility and explain the appearance of suitable options before confirming the project scope.',links:['Queenstown','Wanaka','Oamaru']},
 'Lake Tekapo':{tag:'Mackenzie',focus:'A clear outlook. A more comfortable interior.',intro:'Window tinting in Lake Tekapo can be planned around homes, accommodation and workplaces where the outlook is an important part of the space. We consider light, glare and privacy requirements alongside the existing glazing.',heading:'Think about privacy after sunset, too.',advice:'Tell us whether you want clear views or privacy in a particular room. Reflective film depends on the balance of light and does not provide reliable night-time privacy with lights on inside. We can discuss the trade-offs, alternatives and regional visit arrangements.',links:['Timaru','Geraldine','Queenstown']},
 Arrowtown:{tag:'Queenstown Lakes',focus:'A subtle change to the spaces you love.',intro:'Our Arrowtown window tinting service takes a considered approach to the appearance of your home or commercial property. We discuss the effect you want before recommending a suitable film for the glass.',heading:'Compare the finish in your setting.',advice:'Include an exterior photograph as well as an interior view when you enquire. Reflection, colour and light transmission affect how a film looks. Tell us about any body corporate, landlord or other approval requirements so these can be considered before installation.',links:['Queenstown','Wanaka','Cromwell']},
 Temuka:{tag:'South Canterbury',focus:'Practical improvements. A careful finish.',intro:'For window tinting in Temuka, start with the part of your home or workplace that could work better. It may be a bathroom that needs privacy, a sunny living room, or glass at an entrance that needs a different type of protection.',heading:'Choose the level of privacy you need.',advice:'For bathrooms, entrance glass and sidelights, tell us whether the view should be obscured or fully blocked. Frosted and opaque films have different effects on light. Measurements and photographs help us discuss the layout and confirm the next step for your address.',links:['Timaru','Geraldine','Ashburton']},
 Geraldine:{tag:'South Canterbury',focus:'Make your windows work for your day.',intro:'We help Geraldine homeowners and businesses explore window tinting for spaces affected by heat, glare, fading or a lack of privacy. Each enquiry starts with the property and the problem you would like to solve.',heading:'A room-by-room approach makes the choice clearer.',advice:'List the rooms or work areas you would like us to look at, and the main issue in each. Different parts of one building may need different films. Tell us about access and your preferred timing so assessment and regional installation arrangements can be discussed.',links:['Temuka','Timaru','Ashburton']}
};
// Public copy should not repeat internal briefing language.
regional.Wanaka.intro='Tint A Window’s experience includes architectural homes in Wānaka. Our window tinting service considers comfort, privacy and the outlook together, with film choices selected around your existing glazing and the way you use the property.';

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
for(const p of locations){const [focus,intro,heading,advice]=regionalAngles[p.label];Object.assign(regional[p.label],{focus,intro,heading,advice});if(!p.description)p.description=`Window tinting in ${displayName(p.label)}. ${focus} Discuss suitable films, photographs and assessment arrangements with Tint A Window.`;}
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
