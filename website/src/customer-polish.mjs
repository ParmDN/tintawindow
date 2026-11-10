// Editorial changes apply to visible copy, never URLs, original source snapshots or product claims.
const phrases=[
 ['In this review version, selected photographs stay on your device and are not uploaded.','Keep a copy of the photographs with your project notes, so you can identify the correct window when you call.'],
 ['The review form does not send aftercare requests or upload images, so please use those direct contact details when you need the team to respond.','For help with an existing installation, use those direct contact details and identify the pane that needs attention.'],
 ['Choose a window tint Christchurch homeowners and businesses can compare on their own glass, with suitable samples and clear fitting advice.','When choosing Window Tint in Christchurch, compare suitable samples on your own glass and ask about fitting and care.'],
 ['Choosing a window tint Christchurch homeowners can feel confident about starts with that check.','Choosing Window Tint in Christchurch starts with checking your glass and how the room is used.'],
 ['Find a window tint Christchurch homeowners can choose for their own space.','Choose Window Tint in Christchurch that suits the rooms you use every day.'],
 ['We fit window film Christchurch-wide for homes and businesses, with selected South Island service too.','We fit Window Film in Christchurch homes and businesses, with selected South Island locations also covered.'],
 ['We fit window film Christchurch-wide for homes and workplaces.','Choose Window Film in Christchurch for your home or workplace.'],
 ['Compare suitable film around daylight, building appearance and the people inside.','Compare films that balance heat control, daylight and the appearance of your building.'],
 ['Discuss film that can help hold broken glass together, with the product and installation assessed for the protection your home needs.','Explore film that can help hold broken glass together. We assess your windows and the protection you need before recommending a product.'],
 ['The first thing to know about Tint A Window is that you can start with the problem, not a product name.','One thing to know about Tint A Window: we start with your room and what you want to improve. You do not need a product name.'],
 ['by the work the glass needs to do','by the problem you want to solve'],
 ['around the task and the people using the space','for the work people do beside the glass'],
 ['around the intended protection','for the protection you need'],
 ['against the needs you share','for the concerns you describe'],
 ['against the risk and any written requirement','for the risks you have identified and any written requirements'],
 ['around the furnishings at risk','for the furnishings at risk'],
 ['around the materials at risk','for the materials at risk'],
 ['around the light that interrupts','to reduce the light that interrupts'],
 ['before a product is agreed','before you choose a product'],
 ['a finish that belongs','a finish that suits your home'],
 ['Visual privacy','Privacy from view'],
 ['visual privacy','privacy from view'],
 ['glass retention','holding broken glass together'],
 ['These are service areas, not separate local offices.','Visits to these service areas are arranged for each property.'],
 ['What makes this enquiry easier to plan','What helps us plan your visit'],
 ['Confirm the visit for your address','Arrange a visit to your property'],
 ['This review website’s form demonstrates the enquiry journey and does not send a request.','You can also use the form to bring your project details together.'],
 ['The review form above prepares details on your device; it does not send an enquiry.','Use the form above to bring your requirements together before discussing the next step.'],
 ['This website design preview does not send enquiries.','Please call or email us to request your quote.'],
 ['This local website preview does not send enquiries.','Please call or email us to request your quote.']
];
const places='Christchurch|Ashburton|Timaru|Oamaru|Queenstown|Wānaka|Wanaka|Cromwell|Lake Tekapo|Arrowtown|Temuka|Geraldine';
const service=/(?:commercial |residential |house )?window tinting|(?:commercial )?(?:fade[- ]reducing (?:&amp;|&|and) UV|fade[- ]reducing|privacy|window privacy|heat control|anti[- ]glare|frosted and opaque|decorative|safety (?:&amp;|&|and) security|anti[- ]graffiti|solar protection) window films?|window privacy film installation|window tint(?= in | across | for )|window film(?= in | across )/gi;
function polishText(value){
 let s=value.replace(/35\+? years of industry experience/g,'39+ years of industry experience');
 for(const [from,to] of phrases)s=s.split(from).join(to);
 s=s.replace(new RegExp('((?:window privacy film installation|window tinting|window films?|window tint)) ('+places+')-wide','gi'),'$1 in $2');
 s=s.replace(new RegExp('((?:window privacy film installation|window tinting|window films?|window tint)) ('+places+')(?![a-z])','gi'),'$1 in $2');
 s=s.replace(/fade reducing (?:&amp;|&) UV/gi,'Fade-reducing and UV').replace(/\banti glare\b/gi,'Anti-glare').replace(/\banti graffiti\b/gi,'Anti-graffiti');
 s=s.replace(service,m=>m[0].toUpperCase()+m.slice(1).toLowerCase().replace(/\buv\b/g,'UV'));
 return s;
}
export function customerPolish(html){
 // Exact segments contain escaped text only. Restore them after the unchanged
 // token pass so neighbouring text, attributes, scripts and styles behave as before.
 const exact=[];
 html=html.replace(/<span data-exact-copy>([^<]*)<\/span>/g,(_,copy)=>{
  const token=`\uE000EXACT_COPY_${exact.length}\uE001`;
  if(html.includes(token))throw new Error('Exact-copy placeholder collision');
  exact.push(copy);return token;
 });
 let skip=false;
 const polished=html.replace(/<[^>]+>|[^<]+/g,token=>{
  if(token.startsWith('<')){if(/^<(script|style)\b/i.test(token))skip=true;else if(/^<\/(script|style)>/i.test(token))skip=false;return token;}
  return skip?token:polishText(token);
 });
 return polished.replace(/\uE000EXACT_COPY_(\d+)\uE001/g,(token,index)=>exact[Number(index)]??token);
}
