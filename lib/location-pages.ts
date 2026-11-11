import type { PageDefinition } from '../content/types';
import { exactCopy } from '../content/national-copy';
import { enquiryActions } from '../content/enquiry-actions';
import { locationForPath, locationBenefits, locationServices, locationSteps, locationFaqs, locationCta } from '../content/location-page-copy';

/** Replaces the legacy location composition; never appends a second copy. */
export function renderLocationPage(page: PageDefinition, { esc, img, hero, faqHTML }: any): string {
  const local = locationForPath(page.path);
  if (!local) throw new Error(`Missing final location copy: ${page.path}`);
  // Reuse the existing exact-copy token mechanism without weakening the formatter.
  // Tokens are removed during assembly; the final DOM keeps the existing hooks.
  const copy = (value: string): string => exactCopy(esc(value));
  const eyebrow = (value: string): string => `<p class="eyebrow"><span></span>${copy(value)}</p>`;
  return hero(page)
    + `<section class="section revision-brief" id="possibilities"><div>${eyebrow('Your local service')}<h2>${copy(local.introHeading)}</h2></div><div>${local.intro.map(value => `<p>${copy(value)}</p>`).join('')}</div></section>`
    + `<section class="section revision-section revision-details-section" id="content-2"><div class="revision-heading">${eyebrow('Everyday benefits')}<h2>${copy('More comfort from your windows.')}</h2></div><div class="revision-body revision-details">${locationBenefits.map(item => `<article><h3>${copy(item.title)}</h3><p>${copy(item.body)}</p></article>`).join('')}</div></section>`
    + `<section class="section revision-section revision-choices-section " id="content-3"><div class="revision-heading">${eyebrow('Residential & commercial')}<h2>${copy('Window film for your home or business.')}</h2></div><div class="revision-body"><p>${copy('Explore window film options for everyday comfort, privacy and interior protection.')}</p><div class="revision-choices">${locationServices.map((item, index) => `<article class=""><figure class="choice-photo">${img(index ? 'client-054' : 'client-019', '', false, index ? 'Windows in a commercial building' : 'Residential windows and natural light')}</figure><h3><a href="${item.href}">${copy(item.title)}</a></h3><p>${copy(item.body)}</p></article>`).join('')}</div></div></section>`
    + `<section class="section revision-section revision-steps-section " id="content-5"><div class="revision-heading">${eyebrow('How it works')}<h2>${copy('A simple way to improve your windows.')}</h2></div><div class="revision-body"><div class="revision-steps">${locationSteps.map((item, index) => `<article class=""><span class="revision-number">0${index + 1}</span><h3>${copy(item.title)}</h3><p>${copy(item.body)}</p></article>`).join('')}</div>${enquiryActions()}</div></section>`
    + `<section class="section revision-section revision-answers-section faq-group" id="content-7"><div class="revision-heading">${eyebrow('Common questions')}<h2>${copy('Your window tinting questions, answered.')}</h2></div><div class="revision-body">${faqHTML(locationFaqs.map(item => ({ q: item.question, a: [item.answer], exact: true })), page)}</div></section>`
    + `<section class="section revision-next"><div>${eyebrow('Your next step')}<h2>${copy(local.ctaHeading)}</h2></div><div><p>${copy(locationCta(local.town))}</p>${enquiryActions()}</div></section>`;
}
