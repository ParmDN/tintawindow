// Read-only logic port of website/src/national-copy.mjs. No filesystem effects.
// Scope is deliberately index-based: the two service hubs are indexes 1 and 8.
export const hasNationalHero: any = index => Number.isInteger(index) && index >= 0 && index <= 13;
export const isNationalService: any = index => hasNationalHero(index) && index > 0;

// Service entries opt into exact copy independently; absent indexes keep legacy output.
export const nationalCopy: any = Object.freeze({
 services: Object.freeze({
  1: Object.freeze({
   eyebrow: 'Residential Window Tinting Christchurch',
   headline: 'Residential Window Tinting Across New Zealand',
   appendSentence: 'We provide residential window tinting for homes in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Residential Window Tinting'
  }),
  2: Object.freeze({
   eyebrow: 'Fade-Reducing and UV Window Film Christchurch',
   headline: 'Fade-Reducing and UV Window Film Across New Zealand',
   appendSentence: 'We provide fade-reducing and UV window film for homes in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch UV Protection Window Films'
  }),
  3: Object.freeze({
   eyebrow: 'Privacy Window Film Christchurch',
   headline: 'Privacy Window Film Across New Zealand',
   appendSentence: 'We provide privacy window film for homes in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Privacy Window Films'
  }),
  4: Object.freeze({
   eyebrow: 'Heat Control Window Film Christchurch',
   headline: 'Heat Control Window Film Across New Zealand',
   appendSentence: 'We provide heat control window film for homes in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Heat Control Window Films'
  }),
  5: Object.freeze({
   eyebrow: 'Anti-Glare Window Film Christchurch',
   headline: 'Anti-Glare Window Film Across New Zealand',
   appendSentence: 'We provide anti-glare window film for homes in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Anti-Glare Window Films'
  }),
  6: Object.freeze({
   eyebrow: 'Frosted and Opaque Window Film Christchurch',
   headline: 'Frosted and Opaque Window Film Across New Zealand',
   appendSentence: 'We provide frosted and opaque window film for homes in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Frosted Window Films'
  }),
  7: Object.freeze({
   eyebrow: 'Safety and Security Window Film Christchurch',
   headline: 'Safety and Security Window Film Across New Zealand',
   appendSentence: 'We provide safety and security window film for homes in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Safety Window Films'
  }),
  8: Object.freeze({
   eyebrow: 'Commercial Window Tinting Christchurch',
   headline: 'Commercial Window Tinting Across New Zealand',
   appendSentence: 'We provide commercial window tinting for businesses in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Commercial Window Tinting'
  }),
  9: Object.freeze({
   eyebrow: 'Commercial Heat Control Window Film Christchurch',
   headline: 'Commercial Heat Control and Solar Protection Window Film Across New Zealand',
   appendSentence: 'We provide heat control and solar protection window film for commercial properties in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Solar Control Window Films'
  }),
  10: Object.freeze({
   eyebrow: 'Commercial Anti-Glare Window Film Christchurch',
   headline: 'Commercial Anti-Glare Window Film Across New Zealand',
   appendSentence: 'We provide anti-glare window film for commercial properties in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Anti-Glare Window Films'
  }),
  11: Object.freeze({
   eyebrow: 'Anti-Graffiti Window Film Christchurch',
   headline: 'Anti-Graffiti Window Film Across New Zealand',
   appendSentence: 'We provide anti-graffiti window film for commercial properties in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Anti-Graffiti Window Films'
  }),
  12: Object.freeze({
   eyebrow: 'Commercial Frosted, Opaque and Decorative Window Film Christchurch',
   headline: 'Commercial Frosted, Opaque and Decorative Window Film Across New Zealand',
   appendSentence: 'We provide frosted, opaque and decorative window film for commercial properties in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Decorative Window Films'
  }),
  13: Object.freeze({
   eyebrow: 'Commercial Safety and Security Window Film Christchurch',
   headline: 'Commercial Safety and Security Window Film Across New Zealand',
   appendSentence: 'We provide safety and security window film for commercial properties in Christchurch and across New Zealand.',
   overviewEyebrow: 'Christchurch Safety Window Films'
  })
 }),
 home: Object.freeze({
  heroEyebrow: 'Window Tinting Christchurch',
  heroHeadline: 'Window Film Solutions Across New Zealand',
  heroLead: 'Based in Christchurch, Tint A Window provides residential and commercial window film solutions across New Zealand, helping reduce heat and glare and improve privacy in homes and businesses.',
  introEyebrow: 'Christchurch Window Films',
  introSentence: 'We fit window film in Christchurch homes and businesses, with service also available across New Zealand.',
  audienceEyebrow: 'Christchurch Window Tinting',
  audienceSentence: 'Explore residential and commercial window film solutions for properties in Christchurch and across New Zealand.',
  enquiryEyebrow: 'Christchurch Tinting Advice',
  enquirySentence: 'Talk to us about window tinting in Christchurch and across New Zealand.'
 }),
 closingLabel: 'Christchurch Tinting Advice',
 filmLabels: Object.freeze({
  residential: 'Christchurch Residential Tinting',
  commercial: 'Christchurch Commercial Tinting',
  options: 'Christchurch Film Options'
 })
});

export function filmOptionsLabel(index) {
 return index === 1 ? nationalCopy.filmLabels.residential
  : index === 8 ? nationalCopy.filmLabels.commercial : nationalCopy.filmLabels.options;
}

// Callers escape text normally. This marker protects just the enclosed copy,
// including a future exact sentence embedded within an otherwise polished paragraph.
export const exactCopy: any = escapedText => `<span data-exact-copy>${escapedText}</span>`;
