// Approved intentional differences from migration/baseline/dist-html.
// Literal old/new values are independent of application content and out/.
// Review every field: the checker asserts the archived old value before using new.
import assert from 'node:assert/strict';
import { parseHtml } from './lib/baseline.mjs';

export const intentionalOverrides = [
  {
    "page": "/locations/arrowtown",
    "baselinePage": "/locations/arrowtown",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors."
      }
    ]
  },
  {
    "page": "/locations/ashburton",
    "baselinePage": "/locations/ashburton",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy."
      }
    ]
  },
  {
    "page": "/locations/christchurch",
    "baselinePage": "/locations/christchurch",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property.",
        "expected": "Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property.",
        "expected": "Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property.",
        "expected": "Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property.",
        "expected": "Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business."
      }
    ]
  },
  {
    "page": "/locations/cromwell",
    "baselinePage": "/locations/cromwell",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy."
      }
    ]
  },
  {
    "page": "/locations/geraldine",
    "baselinePage": "/locations/geraldine",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy."
      }
    ]
  },
  {
    "page": "/locations",
    "baselinePage": "/locations",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team.",
        "expected": "Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team.",
        "expected": "Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team.",
        "expected": "Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team.",
        "expected": "Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy."
      }
    ]
  },
  {
    "page": "/locations/waimate",
    "baselinePage": "/locations/lake-tekapo",
    "fields": [
      {
        "kind": "route",
        "field": "route",
        "baseline": "/locations/lake-tekapo",
        "expected": "/locations/waimate"
      },
      {
        "kind": "route",
        "field": "relative",
        "baseline": "locations/lake-tekapo/index.html",
        "expected": "locations/waimate/index.html"
      },
      {
        "kind": "head",
        "field": "title.text",
        "selector": "title",
        "attribute": null,
        "baseline": "Window tinting in Lake Tekapo | Service Area | Tint A Window",
        "expected": "Window tinting in Waimate | Service Area | Tint A Window"
      },
      {
        "kind": "head",
        "field": "link[rel=\"canonical\"]@href",
        "selector": "link[rel=\"canonical\"]",
        "attribute": "href",
        "baseline": "https://www.tintawindow.co.nz/locations/lake-tekapo",
        "expected": "https://www.tintawindow.co.nz/locations/waimate"
      },
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Lake Tekapo. Plan for daylight and evenings. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Waimate for homes and businesses. Help reduce heat, glare and fading while adding privacy where you need it."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:title\"]@content",
        "selector": "meta[property=\"og:title\"]",
        "attribute": "content",
        "baseline": "Window Tinting Lake Tekapo | Service Area | Tint A Window",
        "expected": "Window Tinting Waimate | Service Area | Tint A Window"
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Lake Tekapo. Plan for daylight and evenings. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Waimate for homes and businesses. Help reduce heat, glare and fading while adding privacy where you need it."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:title\"]@content",
        "selector": "meta[name=\"twitter:title\"]",
        "attribute": "content",
        "baseline": "Window Tinting Lake Tekapo | Service Area | Tint A Window",
        "expected": "Window Tinting Waimate | Service Area | Tint A Window"
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Lake Tekapo. Plan for daylight and evenings. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Waimate for homes and businesses. Help reduce heat, glare and fading while adding privacy where you need it."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:url\"]@content",
        "selector": "meta[property=\"og:url\"]",
        "attribute": "content",
        "baseline": "https://www.tintawindow.co.nz/locations/lake-tekapo",
        "expected": "https://www.tintawindow.co.nz/locations/waimate"
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/name",
        "path": [
          0,
          "name"
        ],
        "baseline": "Window Tinting Lake Tekapo | Service Area | Tint A Window",
        "expected": "Window Tinting Waimate | Service Area | Tint A Window"
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting in Lake Tekapo. Plan for daylight and evenings. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Waimate for homes and businesses. Help reduce heat, glare and fading while adding privacy where you need it."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/url",
        "path": [
          0,
          "url"
        ],
        "baseline": "https://www.tintawindow.co.nz/locations/lake-tekapo",
        "expected": "https://www.tintawindow.co.nz/locations/waimate"
      },
      {
        "kind": "schema",
        "field": "JSON-LD/1/itemListElement/2/name",
        "path": [
          1,
          "itemListElement",
          2,
          "name"
        ],
        "baseline": "Lake Tekapo",
        "expected": "Waimate"
      },
      {
        "kind": "schema",
        "field": "JSON-LD/1/itemListElement/2/item",
        "path": [
          1,
          "itemListElement",
          2,
          "item"
        ],
        "baseline": "https://www.tintawindow.co.nz/locations/lake-tekapo",
        "expected": "https://www.tintawindow.co.nz/locations/waimate"
      }
    ]
  },
  {
    "page": "/locations/oamaru",
    "baselinePage": "/locations/oamaru",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading."
      }
    ]
  },
  {
    "page": "/locations/queenstown",
    "baselinePage": "/locations/queenstown",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window.",
        "expected": "Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window.",
        "expected": "Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window.",
        "expected": "Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window.",
        "expected": "Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses."
      }
    ]
  },
  {
    "page": "/locations/temuka",
    "baselinePage": "/locations/temuka",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading."
      }
    ]
  },
  {
    "page": "/locations/timaru",
    "baselinePage": "/locations/timaru",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window.",
        "expected": "Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading."
      }
    ]
  },
  {
    "page": "/locations/wanaka",
    "baselinePage": "/locations/wanaka",
    "fields": [
      {
        "kind": "head",
        "field": "meta[name=\"description\"]@content",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "baseline": "Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice.",
        "expected": "Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading."
      },
      {
        "kind": "head",
        "field": "meta[property=\"og:description\"]@content",
        "selector": "meta[property=\"og:description\"]",
        "attribute": "content",
        "baseline": "Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice.",
        "expected": "Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading."
      },
      {
        "kind": "head",
        "field": "meta[name=\"twitter:description\"]@content",
        "selector": "meta[name=\"twitter:description\"]",
        "attribute": "content",
        "baseline": "Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice.",
        "expected": "Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/0/description",
        "path": [
          0,
          "description"
        ],
        "baseline": "Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice.",
        "expected": "Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading."
      },
      {
        "kind": "schema",
        "field": "JSON-LD/1/itemListElement/2/name",
        "path": [
          1,
          "itemListElement",
          2,
          "name"
        ],
        "baseline": "Wanaka",
        "expected": "Wānaka"
      }
    ]
  }
];

const headAttributes = new Map([
  ['title', null],
  ['link[rel="canonical"]', 'href'],
  ['meta[name="description"]', 'content'],
  ['meta[property="og:title"]', 'content'],
  ['meta[property="og:description"]', 'content'],
  ['meta[property="og:url"]', 'content'],
  ['meta[name="twitter:title"]', 'content'],
  ['meta[name="twitter:description"]', 'content'],
]);
const schemaPaths = new Set([
  [0, 'name'], [0, 'description'], [0, 'url'],
  [1, 'itemListElement', 2, 'name'],
  [1, 'itemListElement', 2, 'item'],
].map(value => JSON.stringify(value)));
const escapeText = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/**
 * Prepare expected documents in memory. The on-disk archive and the original
 * parsed documents are never modified. Existing checker assertions still compare
 * the entire head/schema plus structure/assets, not just the overridden leaves.
 * A stale old value, unknown field/page, duplicate or no-op is a hard failure.
 */
export function applyIntentionalOverrides(archive, overrides = intentionalOverrides) {
  assert.equal(archive.length, 34, 'The immutable archive must contain 34 documents.');
  const byBaseline = new Map();
  const seenPages = new Set();
  for (const entry of overrides) {
    assert(!byBaseline.has(entry.baselinePage), 'Duplicate baseline override page: ' + entry.baselinePage);
    assert(!seenPages.has(entry.page), 'Duplicate expected override page: ' + entry.page);
    assert(archive.some(page => page.route === entry.baselinePage), 'Unknown archived override page: ' + entry.baselinePage);
    assert(entry.fields.length > 0, 'Empty override: ' + entry.page);
    byBaseline.set(entry.baselinePage, entry);
    seenPages.add(entry.page);
  }
  const prepared = archive.map(original => {
    const entry = byBaseline.get(original.route);
    if (!entry) return original;
    const document = parseHtml(original.html);
    const page = { ...original, document };
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    assert.equal(scripts.length, 1, entry.page + ': one archived schema block required');
    const schema = JSON.parse(scripts[0].text);
    const usedFields = new Set();
    let schemaChanged = false;
    for (const change of entry.fields) {
      const label = entry.page + ' → ' + change.field;
      assert(!usedFields.has(change.field), 'Duplicate override field: ' + label);
      usedFields.add(change.field);
      assert.equal(typeof change.baseline, 'string', label + ': explicit old string required');
      assert.equal(typeof change.expected, 'string', label + ': explicit expected string required');
      assert.notEqual(change.baseline, change.expected, label + ': no-op override');
      if (change.kind === 'route') {
        assert.equal(entry.baselinePage, '/locations/lake-tekapo', label + ': unapproved route source');
        assert.equal(entry.page, '/locations/waimate', label + ': unapproved route destination');
        assert(['route', 'relative'].includes(change.field), label + ': unknown route field');
        assert.equal(original[change.field], change.baseline, label + ': old baseline value drifted');
        assert.equal(change.expected, change.field === 'route' ? '/locations/waimate' : 'locations/waimate/index.html', label + ': exact new route required');
        page[change.field] = change.expected;
      } else if (change.kind === 'head') {
        assert(headAttributes.has(change.selector), label + ': head field cannot be overridden');
        assert.equal(change.attribute, headAttributes.get(change.selector), label + ': unexpected attribute');
        assert.equal(change.field, change.selector + (change.attribute ? '@' + change.attribute : '.text'), label + ': inconsistent field label');
        const nodes = document.querySelectorAll(change.selector);
        assert.equal(nodes.length, 1, label + ': one archived head node required');
        const old = change.attribute ? nodes[0].getAttribute(change.attribute) : nodes[0].text;
        assert.equal(old, change.baseline, label + ': old baseline value drifted');
        if (change.attribute) nodes[0].setAttribute(change.attribute, change.expected);
        else nodes[0].set_content(escapeText(change.expected));
      } else {
        assert.equal(change.kind, 'schema', label + ': unknown override kind');
        assert(schemaPaths.has(JSON.stringify(change.path)), label + ': schema field cannot be overridden');
        assert.equal(change.field, 'JSON-LD/' + change.path.join('/'), label + ': inconsistent schema label');
        assert.equal(schema[0]['@type'], 'WebPage', label + ': archived WebPage required');
        assert.equal(schema[1]['@type'], 'BreadcrumbList', label + ': archived breadcrumb required');
        let parent = schema;
        for (const key of change.path.slice(0, -1)) {
          assert(parent && Object.hasOwn(parent, key), label + ': archived schema path missing');
          parent = parent[key];
        }
        const key = change.path.at(-1);
        assert(Object.hasOwn(parent, key), label + ': archived schema leaf missing');
        assert.equal(parent[key], change.baseline, label + ': old baseline value drifted');
        parent[key] = change.expected;
        schemaChanged = true;
      }
    }
    assert.equal(page.route, entry.page, 'Expected route does not match override page: ' + entry.page);
    if (schemaChanged) scripts[0].set_content(JSON.stringify(schema).replaceAll('<', String.fromCharCode(92) + 'u003c'));
    page.canonical = document.querySelector('link[rel="canonical"]').getAttribute('href');
    page.html = document.toString();
    return page;
  });
  assert.equal(prepared.length, archive.length, 'Overrides must not add or remove pages.');
  assert.equal(new Set(prepared.map(page => page.route)).size, 34, 'Expected routes must remain unique.');
  assert.equal(new Set(prepared.map(page => page.relative)).size, 34, 'Expected HTML paths must remain unique.');
  return prepared;
}
