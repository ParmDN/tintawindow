import {nationalCopy,exactCopy} from './national-copy.mjs';
import {detailIcon} from './section-design.mjs';
import {enquiryActions} from './enquiry-actions.mjs';
import {homeTeamNote} from './shoot-media.mjs';

// A short customer journey; detailed film guidance belongs to its service page.
export function homepageRefinement({esc,img,eyebrow,pages,faqHTML}) {
 const heading=(eye,title,copy='')=>`<div class="home-chapter-heading">${eyebrow(eye)}<h2>${title}</h2>${copy?`<p>${copy}</p>`:''}</div>`;
 const outcomes=[
  ['sun','Less heat in sunny rooms','Keep sunny rooms more comfortable. Suitable solar-control film may also reduce electricity used for air conditioning, depending on your glass, the selected film and how you cool the room.',4],
  ['screen','Less glare, more daylight','Soften distracting brightness on screens and work surfaces without choosing a darker finish than you need.',5],
  ['privacy','Privacy that suits your space','Feel less overlooked. Compare daytime reflective finishes with frosted options that obscure the view after dark too.',3],
  ['sun','Care for carpets and interiors','Reduce UV exposure to carpets, timber flooring, furnishings and artwork. Film can help reduce fading, but cannot prevent every cause.',2],
  ['home','Comfort without losing the outlook','Balance light, appearance and everyday use. Start with the room you want to enjoy, then compare suitable samples.',1],
  ['shield','Protection for vulnerable glass','Explore films that can help hold broken glass together. The product, glass and fitting need to suit the protection you want.',7]
 ];
 const reasons=[
  ['A family business, personally involved','Bill and Roxana bring technical guidance and project coordination together, so you know who you are talking to.'],
  ['Advice around your actual glass','We consider the glass, the light and the problem you want to solve before discussing a film.'],
  ['Samples before a decision','Compare colour, reflection and privacy in your own setting. The right finish should suit the space as well as the task.'],
  ['Careful preparation and fitting','The finish starts with preparation. We discuss access and installation arrangements around your property.'],
  ['Clear product information','Understand the selected film’s performance, suitability and applicable warranty terms before going ahead.'],
  ['Support after installation','Get guidance on drying and cleaning, with someone to contact if you have a concern about the finish.']
 ];
 return {
 intro:`<section class="section revision-brief home-introduction" id="possibilities"><div><p class="eyebrow"><span></span>${exactCopy(esc(nationalCopy.home.introEyebrow))}</p><h2>Make your windows work better for you.</h2></div><div><p>A room can look beautiful and still feel too hot, too bright or too exposed. We provide window tinting Christchurch-wide to help you enjoy that space again, while keeping the glass and outlook you value.</p><p>${exactCopy(esc(nationalCopy.home.introSentence))} Start with what bothers you: a hot lounge, harsh light on a screen or neighbours looking in. Choose a window tint Christchurch homeowners and businesses can compare on their own glass, with suitable samples and clear fitting advice.</p></div></section>`,
 benefits:`<section class="section home-outcomes" id="content-2">${heading('Start with what matters','What would you like<br>your windows to improve?','Choose the problem you want to solve. Each option explains what film can do and what to consider before choosing.')}<div class="home-outcome-grid">${outcomes.map(([icon,title,copy,index])=>`<a class="home-outcome-card" href="${pages[index].path}">${[4,5,3,2,1,7].includes(index)?`<figure class="outcome-photo">${img(({4:'client-020',5:'client-026',3:'client-064',2:'client-062',1:'client-019',7:'client-049'})[index])}</figure>`:''}${detailIcon(icon)}<h3>${esc(title)}</h3><p>${esc(copy)}</p><span class="home-card-link">Explore ${esc(pages[index].label)}</span></a>`).join('')}</div><div class="home-outcome-help"><p>${exactCopy(esc('Not sure about window film in Christchurch?'))} Tell us which room feels too hot, too bright or too exposed. <a href="/locations/christchurch">Arrange a Christchurch window-film assessment</a>.</p>${enquiryActions()}</div></section>`,
 reasons:`<section class="section home-reasons" id="content-4">${heading('Why choose Tint A Window','Good advice.<br>Care in every detail.')}<div class="home-reasons-layout"><figure>${img('shoot-bill-working')}<figcaption>Bill at the glass, explaining the practical details.</figcaption></figure><div class="home-reason-grid">${reasons.map(([title,copy],i)=>`<article>${detailIcon(['home','advice','compare','craft','document','care'][i])}<h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join('')}</div></div></section>${homeTeamNote({img})}`,
 work:`<section class="section home-real-work" id="installation-gallery">${heading('A closer look at our work','Real spaces.<br>Considered finishes.','Browse photographs from our installation gallery. Look at the windows, the light and the way each space is used.')}<div class="home-gallery-pair">${[['client-064','Glazed doors and open living'],['client-040','Privacy with a frosted finish'],['client-019','Coastal windows and open views'],['client-056','Frosted glass in a shared space']].map(([photo,title])=>`<a href="${pages[28].path}" class="home-gallery-card"><figure>${img(photo)}<figcaption>${title}<span>View installation gallery</span></figcaption></figure></a>`).join('')}</div><p class="home-gallery-note">Notice the view, the reflections and how the glass fits the room. Bring an image you like to the conversation, then compare suitable samples for your own windows. Photographs show appearance, not a product’s measured performance.</p></section>`,
 installation:`<section class="section home-installation revision-steps-section" id="content-6">${heading('From first conversation to aftercare','A clear plan.<br>A careful installation.')}<div class="revision-steps home-installation-steps">${[
  ['Tell us what needs to change','Share the rooms, windows and times of day that cause a problem. We’ll discuss your priorities, assess the glass and compare suitable samples.'],
  ['Agree the work and prepare','Confirm the film, quote, access and timing. We prepare the glass and fit the agreed film, with care for the surrounding space.'],
  ['Know what happens next','Follow the selected film’s drying and cleaning guidance. Keep the product and warranty information, and contact us if something needs attention.']
 ].map(([title,copy],i)=>`<article><span class="revision-number">0${i+1}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></section>`,
 questions:`<section class="section home-questions"><div>${eyebrow('Questions, answered')}<h2>What to know<br>before you choose.</h2></div>${faqHTML([
  {q:'Will window film make my rooms too dark?',a:['Not every film has a dark finish. We help you compare window film Christchurch-wide using suitable samples, looking at daylight, colour and reflection from both sides. A sample makes it easier to judge the change before you decide.']},
  {q:'Does privacy film work after dark?',a:['Reflective film relies on the light balance and does not provide reliable privacy with lights on inside at night. Frosted film obscures the view while admitting diffuse light. Opaque options vary in light transmission.']},
  {q:'Can film be fitted to double glazing?',a:['Suitability depends on the glass and film, including coatings and exposure. Choosing a window tint Christchurch homeowners can feel confident about starts with that check. We explain suitable products rather than assume every pane can take the same film.']},
  {q:'How do I care for newly fitted film?',a:['Follow the drying time and cleaning guidance for the selected product. Avoid abrasive materials, and contact us about persistent bubbles, lifting edges or other concerns.']},
  {q:'How much does window film cost?',a:['The quote depends on the selected film, pane sizes, number of windows, glass condition and access. Send photographs and approximate measurements if you have them. We can explain what needs checking before a project-specific quote is agreed. You do not need to know the product name to start.']},
  {q:'Can you help with one room or a small job?',a:['Yes. Tell us about the window that needs attention, even if the rest of the property works well. We can discuss suitability, a finish that sits alongside adjoining glass and the practical next step. There is no need to plan a whole-property installation before asking for advice.']}
 ])}</section>`
 };
}
