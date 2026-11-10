// Customer-facing edits only. Original SEO source units remain unchanged for review.
const substitutions = [
 ['how the occupied space is used','how the space is used'],
 ['broken-glass retention','help holding broken glass together'],
 ['furnishings, flooring and artwork','carpets, furnishings and artwork'],
 ['furniture, flooring and artwork','carpets, furniture and artwork'],
 ['Your flooring, furniture and artwork','Your carpets, furniture and artwork'],
 ['which flooring, furnishings or artwork','which carpets, furnishings or artwork'],
 ['If flooring or furniture is fading','If carpets, timber flooring or furniture are fading'],
 ['fabrics or flooring','carpets, fabrics or timber flooring'],
 ['or flooring beginning to fade','or carpet or timber flooring beginning to fade'],
 ['Point out floors, furniture or artwork','Point out carpets, timber flooring, furniture or artwork'],
 ['Show the floor, fabric or artwork','Show the carpet, flooring, fabric or artwork'],
 ['Living rooms with timber floors, upholstered furniture or artwork exposed to direct sun.','Living rooms with carpets, timber flooring, upholstered furniture or artwork exposed to direct sun.'],
 ['Start with the seats or rooms you avoid.','Start with the room that gets too hot or the seat in direct sun.'],
 ['Use the service choices above to narrow the need.','Use the service choices above to identify the main problem.'],
 ['These are the separate questions to consider before choosing a solar film.','Compare the film’s heat performance, daylight and reflection before choosing.'],
 ['A product that suits the intended application','A product that suits your glass and the result you need'],
 ['the proposed specification','the proposed product and fitting'],
 ['the agreed specification','the agreed product and fitting details'],
 ['the film specification','the film details'],
 ['film specification','film details'],
 ['glass specification','glass type'],
 ['a specification that solves','a film choice that solves'],
 ['part of the specification','part of the film choice'],
 ['Your quote and specification','Your quote and product details'],
 ['the specification you agreed','the product and fitting you agreed'],
 ['alongside the specification','alongside the product choice'],
 ['relevant specification or assessment','relevant requirements or assessment'],
 ['specification from a responsible professional','requirements from a responsible professional'],
 ['the final scope','the final plan'],
 ['The final scope','The final plan'],
 ['the actual scope','the agreed work'],
 ['the intended scope','the work you want included'],
 ['the agreed scope','the agreed work'],
 ['the same scope','the same plan'],
 ['the scope','the plan'],
 ['finish and scope','finish and work included'],
 ['product, scope and regional','product, work included and regional'],
 ['Measurements and scope','Measurements and access'],
 ['sightlines','views into the room'],
 ['sightline','view into the room'],
 ['a commercial protection brief','a commercial protection plan'],
 ['A commercial protection brief','A commercial protection plan'],
 ['Your project brief','Your project details'],
 ['into the brief','into the plan'],
 ['part of the brief','part of the plan'],
 ['a clear brief','a clear explanation'],
 ['that brief','those details'],
 ['one elevation','one side of the building'],
 ['an occupied workplace','a workplace in use'],
 ['documented assessment','written assessment'],
 ['extensive glazing','large areas of glass'],
 ['Extensive glazing','Large areas of glass'],
 ['broad glazing','large windows'],
 ['glazing upgrade','window upgrade'],
 ['safety glazing','safety glass'],
 ['safety-glazing','safety-glass'],
 ['glazing standard','glass safety standard'],
 ['That family background matters. We are not here to sell film for the sake of it. We look at the property, the glass and the result you want, then recommend a suitable option for the application.', 'That family experience helps connect your priorities with the practical work. We look at the room, the existing glass and what you want to improve, then explain suitable options. You can ask about the finish and understand the choice before agreeing to installation.'],
 ['reduce eye strain and make screens easier to use', 'make bright rooms and screens more comfortable to use'],
 ['Sacrificial Film Protection', 'Replaceable glass protection'],
 ['sacrificial film protection', 'replaceable glass protection'],
 ['A Room-by-Room Brief', 'A room-by-room plan'],
 ['A room-by-room brief', 'A room-by-room plan'],
 ['Agreeing a practical scope', 'Agreeing which windows to treat'],
 ['selected sightlines', 'selected views through the glass'],
 ['which sightlines need protection', 'where people can see in'],
 ['the sightlines you want to obscure', 'the views you want to obscure'],
 ['coverage should match the sightlines', 'coverage should block the views that concern you'],
 ['selected sightlines obscured', 'selected views obscured'],
 ['Standing and seated sightlines differ', 'People standing and sitting see through different parts of the glass'],
 ['Identify the sightline', 'Identify where someone can see in'],
 ['the sightline rather than', 'where someone can see in rather than'],
 ['sightlines and lighting', 'where people can see in and the lighting'],
 ['a clear specification', 'a clear description of the protection required'],
 ['UV specification', 'UV performance information'],
 ['before specification', 'before choosing a product'],
 ['A specification that suits', 'A product that suits'],
 ['a different brief', 'a different problem'],
 ['different briefs', 'different problems'],
 ['include those concerns in the brief', 'tell us about those concerns'],
 ['Bring those needs into the brief together', 'Tell us about those needs together'],
 ['Keep the brief practical', 'Keep the information practical'],
 ['useful to begin your brief', 'useful to explain what you like'],
 ['begin your brief', 'explain what you like'],
 ['a realistic scope', 'a realistic plan for the work'],
 ['the practical scope', 'which windows need attention'],
 ['guest access and occupancy', 'guest access and bookings'],
 ['Discuss occupancy, access', 'Discuss how the room is used, access'],
 ['through the full elevation', 'across all the adjoining windows'],
 ['across the full elevation', 'across all the adjoining windows'],
 ['fade-reducing and UV window film in Christchurch options should be chosen around the room and exposure', 'fade-reducing and UV film options should be chosen around your room and its sunlight'],
 ['fragment retention', 'holding broken glass together'],
 ['Fragment retention', 'Holding broken glass together'],
 ['retain glass fragments', 'hold broken glass together'],
 ['retain broken glass fragments', 'hold broken glass together'],
 ['retain fragments in suitable glazing when the installed film and glass system is correctly specified', 'hold broken glass together when the glass, film and installation suit that purpose'],
 ['retain fragments in suitable commercial glass after breakage', 'hold broken commercial glass together where the film and installation suit that purpose'],
 ['retain fragments if suitable glass breaks', 'hold broken glass together where the film and installation are suitable'],
 ['glazing compatibility', 'whether the film suits your glass'],
 ['glass compatibility', 'whether the film suits your glass'],
 ['a sacrificial surface layer', 'a replaceable protective layer'],
 ['a sacrificial surface', 'a replaceable protective layer'],
 ['sacrificial protection', 'a replaceable protective layer'],
 ['a measured elevation of the glazing', 'a drawing of the windows with measurements'],
 ['acoustic privacy', 'soundproofing'],
 ['sound isolation', 'soundproofing'],
 ['visible light transmission', 'the amount of daylight passing through'],
 ['transmitted light', 'light passing through the window'],
 ['glazing suitability', 'film suitability for the glass'],
 ['working around occupancy', 'working around opening hours'],
 ['Working around occupancy', 'Working around opening hours'],
 ['hours of occupancy', 'hours people use the room'],
 ['guest occupancy', 'guest stays'],
 ['around occupancy', 'around the people using the space'],
 ['occupied space', 'space people use'],
 ['occupied room', 'room in use'],
 ['occupied areas', 'areas people use'],
 ['a clear scope', 'a clear plan for the work'],
 ['A clear scope', 'A clear plan for the work'],
 ['installation scope', 'work to be included'],
 ['privacy brief', 'privacy needs'],
 ['a technical brief', 'technical product information'],
 ['solar comfort', 'comfort in sunny rooms'],
 ['solar performance', 'heat control'],
 ['more visible-light reduction', 'reducing more daylight'],
 ['More visible-light reduction', 'Reducing more daylight'],
 ['visual screening', 'privacy screening'],
 ['visual privacy', 'privacy from view'],
 ['Visual Privacy', 'Privacy from view'],
 ['for visual privacy areas', 'for rooms where privacy matters'],
 ['impact and glass holding support', 'help holding broken glass together'],
 ['a film may need to consider both', 'we may need to balance both'],
 ['film may need to consider both', 'we may need to balance both'],
 ['far more expensive', 'more expensive, depending on the glass and access'],
 ['A product specification is not a promise of a particular indoor temperature or energy saving.', 'We explain the expected effect for your windows; the result also depends on the room and the rest of the building.'],
 ['a greater degree of privacy', 'more privacy']
];
export function plainCopy(value) {
 let text = String(value);
 for (const [from,to] of substitutions) text = text.split(from).join(to);
 // Keep familiar terms such as double glazing and safety glazing intact.
 return text.replace(/\bWanaka\b/gi,'Wānaka').replace(/\bdiffuse light\b/g,'soft, scattered light').replace(/\bexisting glazing\b/g,'existing glass')
  .replace(/\bthe actual glazing\b/g,'the actual glass')
  .replace(/\bthe glazing\b/g,'the glass')
  .replace(/\bglazing details\b/g,'glass details')
  .replace(/\bglazing information\b/g,'information about the glass')
  .replace(/(?<!double )\bglazing\b/gi,match=>/^[A-Z]/.test(match)?'Glass':'glass');
}

// Display headings use sentence case; navigation labels, URLs and keyword strings are not rewritten.
const proper = ['Tint A Window','Christchurch','Ashburton','Timaru','Oamaru','Queenstown','Wānaka','Wanaka','Cromwell','Lake Tekapo','Arrowtown','Temuka','Geraldine','South Island','New Zealand','Bill','Roxana','Airbnb','UV','FAQs','Google'];
const smallHeadings = {
 'Eye Strain and Headaches':'Harsh light while reading',
 'Eye Strain for Staff':'Bright light at work',
 'Screen Glare Support':'Clearer views of your screen',
 'Light Control Considerations':'The daylight you want to keep',
 'Break-in Deterrence Support':'Security needs to assess',
 'Impact and Breakage Support':'Help holding broken glass together',
 'Professional Advice':'Help choosing the right film',
 'Quality Workmanship':'Care with preparation and fitting',
 'Quality Products':'Films chosen for your glass',
 'Product Knowledge':'Clear product advice',
 'After-Sales Support':'Help after installation',
 'A Wide Range of Films':'Options for different rooms',
 'Screen and TV Glare':'Glare on screens and televisions'
};
export function headingCopy(value) {
 let text = plainCopy(smallHeadings[value] || value);
 // Preserve already-sentence-case customer headings, but normalise source Title Case.
 text = text.toLowerCase();
 text = text.replace(/^([\s\d+&/()-]*)([a-z])/,(m,p,c)=>p+c.toUpperCase());
 for (const name of proper) text = text.replace(new RegExp('\\b'+name+'\\b','gi'),name);
 return text;
}

const problems = {
 1:'Which window problem is affecting your home?',
 2:'Where sunlight can fade your interiors',
 3:'Where your home feels exposed',
 4:'Rooms that become too hot to enjoy',
 5:'When bright light gets in the way',
 6:'Where you need more privacy',
 7:'Glass you are concerned about at home',
 8:'Window problems that affect your working day',
 9:'Where sun makes your building uncomfortable',
 10:'Glare that interrupts work and customer comfort',
 11:'Surface damage on exposed glass',
 12:'Privacy where people meet and work',
 13:'Glass protection for busy buildings'
};
const choices = {
 1:'Choose a film for each room',2:'Compare films for UV, light and heat',
 3:'Compare your privacy options',4:'Balance less heat with useful daylight',
 5:'Choose a comfortable level of light',6:'Compare frosting, coverage and light',
 7:'Understand the protection each film offers',8:'Find the right film for your business',
 9:'Compare heat control and daylight',10:'Reduce glare around the way you work',
 11:'How a replaceable layer helps protect glass',12:'Choose the coverage and finish you need',
 13:'Match the film to the protection required'
};
export function sectionHeading(page, section, original) {
 if (page.index===0) return ({2:'What would you like your windows to improve?',4:'Why choose Tint A Window?',5:'Film options for your glass',6:'Careful installation. Help when you need it.'})[section] || headingCopy(original);
 if (page.index>=1 && page.index<=13) {
  if(section===2) return problems[page.index];
  if(section===3) return choices[page.index];
  if(section===4) return 'Why choose Tint A Window?';
  if(section===5) return 'From your first enquiry to the finished window';
 }
 if(page.type==='location') {
  if(section===3) return `Film options for ${page.label==='Wanaka'?'Wānaka':page.label} homes and businesses`;
  if(section===4) return 'Why choose Tint A Window?';
  if(section===5) return 'How we plan and install your film';
  if(section===6) return 'Our South Island service areas';
 }
 if(page.index===25) return ({1:'Meet Bill and Roxana',2:'Window film for homes and businesses',3:'Advice before you choose',4:'Why customers choose our team',5:'Where we work'})[section] || headingCopy(original);
 if(page.index===27) return ({1:'Choosing window film',2:'Installation and care',3:'Privacy in daylight and after dark',4:'Film for workplaces',5:'Getting help from our team'})[section] || headingCopy(original);
 return headingCopy(original);
}
