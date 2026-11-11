// Read-only logic port of website/src/final-proof.mjs. No filesystem effects.
// Page-purpose and editorial refinements, updated for client review on 23 October 2026.
import { proofData } from './proof-data';
import type { ProofData } from './types';
export const proofCopy: ProofData = structuredClone(proofData);
// Keep the reviewed source snapshot intact; apply the current customer-facing wording here.
proofCopy.services[1].choice_heading='Choose a film for each room';
proofCopy.services[1].choice_lead='Start with the main concern in each room. For residential window tinting Christchurch-wide, a sunny lounge may need a different film from a street-facing bedroom or entrance.';
proofCopy.services[8].process_title='Plan installation around your working day';
proofCopy.services[10].choice_heading='Softer light for screens and work areas';
proofCopy.services[10].process_title='Choose light control for the people using the space';
proofCopy.services[13].process_title='Check the glass, protection and fitting details';
proofCopy.services[9].process[4][1]='Give cleaners the care guidance and keep a record of treated panes. Overall comfort also depends on cooling, ventilation and how the building is used.';
const localServiceCopy: any={
 14:[
  'For your home, list the rooms that need attention and the change you would like. We can compare heat, glare, privacy and fading options, then confirm which panes, product and fitting work the quote covers.',
  'For a workplace, show where staff and customers use the space. Identify who can compare samples and approve the work. Include opening hours and access needs so the assessment and fitting can be planned around the building.'
 ],
 15:[
  'Tell us whether the windows belong to the house, a workshop office or another building at the address. Label photographs separately and start with the rooms that need the most help with heat, glare, fading or privacy.',
  'For business premises, describe the work area and the windows causing difficulty. Include opening hours, the person who can approve the finish and a contact for access. We confirm travel and installation arrangements for the address.'
 ],
 16:[
  'For your home, tell us whether the concern is a hot room, harsh light, fading carpets or people seeing in. Include photographs from your usual seat and say which daylight and views you would like to keep.',
  'For a shop, office or customer space, show staff seating and any displays that need to remain visible through the glass. Include opening hours and access restrictions so we can discuss film choices and a practical fitting plan.'
 ],
 17:[
  'If your home has older or replacement windows, share the glass details you know and leave uncertain information for assessment. We can compare suitable films for comfort, privacy or interior protection while considering the appearance you want to preserve.',
  'For commercial glass, show the whole frontage and any panes that have been replaced. Explain the heat, glare, privacy or protection need. Include any appearance requirements, opening hours and the person responsible for approving the work.'
 ],
 18:[
  'For your home or holiday property, show the views you want to keep and the rooms that need help. Include guest bookings where relevant and name the person who can compare samples and approve the finish.',
  'For accommodation or other managed premises, bring the owner and access contact into the same discussion. Explain guest or staff needs, room availability and who approves the product. Confirm the fitting plan before relying on a gap between bookings.'
 ],
 19:[
  'If you are away from the property, ask a local contact for photographs labelled by room. Show the seating, windows and outlook. Explain whether the priority is comfort, privacy or protecting carpets and furnishings, and who can review samples.',
  'For a workplace or managed property, identify the person who approves the film and whoever provides access. Share the agreed product and window list with both. Include operating hours and make sure cleaning guidance reaches the property manager.'
 ],
 20:[
  'Show which home windows catch direct sun and when the room becomes uncomfortable. Include nearby shade and tell us whether heat, screen glare or both need attention. We compare suitable film with the daylight and winter warmth you value.',
  'For business premises, identify the desks, reception or customer seats affected by sunlight. Describe heat and glare separately, including the hours they occur. We can discuss suitable films, sample decisions and fitting around your normal opening hours.'
 ],
 21:[
  'Tell us which views you want to keep and when privacy matters in the home. Include evening use and guest bedrooms where relevant. We explain daytime reflective film and obscured finishes so the choice suits the room after dark too.',
  'For accommodation or a workplace, explain how the rooms are used during daylight and in the evening. Identify the windows, access contact and person approving the finish. Privacy and heat control may need different solutions within the same property.'
 ],
 22:[
  'Show the full window layout, including any panes you plan to leave clear. Explain the comfort or privacy improvement you want and the appearance you wish to keep. Suitable samples help compare the change from inside and outside.',
  'For business premises, include any actual appearance or owner-approval requirements before choosing a finish. Show adjoining panes and describe how staff or customers use the space. We can then discuss suitable products, access and a clearly agreed installation plan.'
 ],
 23:[
  'For privacy at home, show where people can see in while standing or sitting. A simple sketch can mark the area to cover and the glass to keep clear. We can discuss samples without needing exact measurements at the first enquiry.',
  'For a workplace, sketch the privacy coverage needed on doors or partitions and include the full glass layout. Explain any separate heat, glare or safety concern. Identify who approves the finish and when the rooms can be accessed.'
 ],
 24:[
  'Start with the room that needs the most help, then list any windows you may treat later. Heat, glare, fading and privacy can call for different films. Keep the product and pane details from the first stage for future reference.',
  'For business premises, separate the work needed now from any possible later stage. Explain how the rooms are used, who approves the product and which areas must stay available. We can discuss a fitting plan around those priorities.'
 ]
};
for(const [index,[home,business]] of Object.entries<any>(localServiceCopy)){
 proofCopy.locations[index].home_service=home;
 proofCopy.locations[index].business_service=business;
}
const unit: any=(role,text)=>({role,text});
const grouped: any=items=>items.flatMap(([title,text])=>[unit('subheading',title),unit('paragraph',text)]);
export function proofSection(p,s){
 const d: any=proofCopy.services[p.index],r=proofCopy.locations[p.index];
 let items,eye,heading,lead;
 if(d&&s.index===3){lead=d.choice_lead;heading=d.choice_heading;}
 if(d&&s.index===4){items=d.reasons;eye='Why Choose Us';heading='Advice for this particular film';}
 if(d&&s.index===5){items=d.process;eye='How It Works';heading=d.process_title;}
 if(r&&s.index===3){items=[['Residential window tinting',r.home_service],['Commercial window tinting',r.business_service]];lead=r.services_intro;eye='Residential & Commercial Services';heading=p.index===14?'Choose a service before your assessment':'Explore the detail for your property';}
 if(r&&s.index===4){items=r.coordination;eye='Why Choose Us';heading=r.coordination_title;}
 if(r&&s.index===5){items=r.process;eye='How It Works';heading=r.process_title;}
 if(r&&s.index===6){return {...s,units:[unit('eyebrow','Regional arrangements'),unit('heading','Confirm the visit for your address'),unit('paragraph',p.index===14?'A Christchurch assessment is arranged for the actual property, not a general room type. Send the address, the pane list and who can provide access. Confirm what the visit includes and how samples and the next quote step will be discussed.':`For ${p.label==='Wanaka'?'Wānaka':p.label}, assessment, travel and fitting arrangements are confirmed for the particular job. Include the address area and the access contact in your enquiry. Ask which information can be discussed first and what still needs checking at the property.`),unit('paragraph','These are service areas, not separate local offices. If another property is involved, share its address separately so the proposed visit and work are clear.'),unit('list','Christchurch'),unit('list','Ashburton'),unit('list','Timaru'),unit('list','Queenstown'),unit('list','Wanaka')]};}
 if(!items&&!heading)return s;
 const eyebrow: any=eye||s.units.find(u=>u.role==='eyebrow')?.text||'Your choices';
 return {...s,units:[unit('eyebrow',eyebrow),unit('heading',heading),...(lead?[unit('paragraph',lead)]:[]),...(items?grouped(items):s.units.filter(u=>!['heading','eyebrow'].includes(u.role)))]};
}
export function proofHeading(p,s,original){return proofCopy.services[p.index]&&s===3?proofCopy.services[p.index].choice_heading:proofCopy.services[p.index]&&s===4?'Advice for your '+({1:'home',2:'interiors',3:'privacy',4:'sunny room',5:'visual comfort',6:'privacy finish',7:'glass protection',8:'business',9:'sun-facing building',10:'working space',11:'exposed glass',12:'workplace design',13:'protection requirements'}[p.index]):proofCopy.services[p.index]&&s===5?proofCopy.services[p.index].process_title:proofCopy.locations[p.index]&&s===3?(p.index===14?'Choose a service before your assessment':'Explore the detail for your property'):proofCopy.locations[p.index]&&s===4?proofCopy.locations[p.index].coordination_title:proofCopy.locations[p.index]&&s===5?proofCopy.locations[p.index].process_title:proofCopy.locations[p.index]&&s===6?'Confirm the visit for your address':original;}
export function proofBrief(p,d){
 if(p.index===14)return {...d,title:'Arrange a useful Christchurch window-film assessment.',paras:['For window tinting in Christchurch, an assessment helps turn a concern into a clear proposal. Use this page to prepare the window details, access and questions that make a visit useful. Explore our homepage for the full range of services.','You do not need to select a product before contacting us. Tell us which panes need attention, who can provide access and whether an owner or another person must approve the proposed finish. We will discuss the checks and next step for your property.'],endTitle:'Arrange your Christchurch assessment.',end:['Planning window tinting in Christchurch? Send the property location, window list and the questions you would like an assessment to answer. We can discuss access, suitable samples and the information needed for a project-specific quote.']};
 return d;
}
export function proofExtra(p,original,index){const override: any=proofCopy.extras?.[p.index]?.[index];return override?{...original,...override}:original;}
