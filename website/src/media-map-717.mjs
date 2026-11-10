// Shared service-card mapping, visually checked against the supplied library on 23 October 2026.
// Category notes establish relevance, not a named film or measured project performance.
export const serviceMediaMap = Object.freeze({
  1: 'client-019',
  2: 'client-062',
  3: 'client-064',
  4: 'client-020',
  5: 'client-026',
  6: 'client-040',
  7: 'glazing',
  8: 'client-054',
  9: 'client-051',
  10: 'client-045',
  11: 'client-065',
  12: 'client-056',
  13: 'work-4'
});

export function imageForService(pageOrIndex, fallback = 'glazing') {
  const index = typeof pageOrIndex === 'object' ? pageOrIndex?.index : pageOrIndex;
  return serviceMediaMap[index] || fallback;
}

// Resolves a service heading within the relevant Residential or Commercial hub.
// Does not swap an image globally: installation/process portraits remain appropriate there.
export function serviceIndexForHeading(title, commercial = false) {
  const value = String(title || '').toLowerCase();
  if (/anti.?graffiti/.test(value)) return 11;
  if (/frost|opaque|decorative/.test(value)) return commercial ? 12 : 6;
  if (/safety|security/.test(value)) return commercial ? 13 : 7;
  if (/fade|\buv\b/.test(value)) return 2;
  if (/privacy/.test(value)) return 3;
  if (/heat|solar/.test(value)) return commercial ? 9 : 4;
  if (/glare/.test(value)) return commercial ? 10 : 5;
  if (/commercial/.test(value)) return 8;
  if (/residential|home/.test(value)) return 1;
  return null;
}

export function imageForServiceHeading(title, commercial = false, fallback = 'glazing') {
  const index = serviceIndexForHeading(title, commercial);
  return index === null ? fallback : imageForService(index, fallback);
}

export const problemMediaMap = Object.freeze({
  1: 'client-020',
  2: 'client-062',
  3: 'client-064',
  4: 'client-020',
  5: 'client-026',
  6: 'client-040',
  7: 'glazing',
  8: 'client-054',
  9: 'client-051',
  10: 'client-045',
  11: 'client-065',
  12: 'client-056',
  13: 'work-4'
});

// Apply before the render context copies project data or appends gallery additions.
// client-035 is a photograph of a screen, not suitable as installation evidence.
export function applyMediaMapping({ pages = [], clientHeroes = {}, clientProjects = {}, galleryAdditions = [] } = {}) {
  Object.assign(clientHeroes, serviceMediaMap);
  for (const page of pages) {
    if (serviceMediaMap[page.index]) page.image = serviceMediaMap[page.index];
  }
  if (clientProjects[12]) {
    clientProjects[12] = {
      ...clientProjects[12],
      photos: ['client-056', 'client-033'],
      title: 'Privacy for shared spaces.',
      intro: 'See frosted glass in two different settings: a continuous interior glass wall and smaller panes beside seating. Compare a real sample to choose the coverage and light you need.',
      captions: {
        'client-056': 'A continuous frosted-glass wall beside a walkway.',
        'client-033': 'Frosted panes beside tables and seating.'
      }
    };
  }
  for (let i = galleryAdditions.length - 1; i >= 0; i--) {
    if (galleryAdditions[i].file === 'client-035') galleryAdditions.splice(i, 1);
  }
}
