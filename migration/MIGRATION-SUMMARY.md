# Migration summary

The working site is `./` (repository root): Next 15 App Router, React 19, TypeScript, Tailwind v4 without Preflight, Node **22.x**, static `output: 'export'`. **`D:/Aditya Digital Neighbour/Tint-A-Window-backups/root-legacy-before-flatten-20261111/website/` and `migration/baseline/` stay untouched as the reference until production launch.** No production launch or deployment has been authorized. See [the development guide](../README.md) and [cleanup decisions](DELETE-CANDIDATES.md).

## Rendering and URL contract

There are **33 normal documents plus `404.html`**. Public links use clean paths without non-root trailing slashes; `trailingSlash:false` export is rearranged into directory `index.html` files by `scripts/export-directories.mjs`. Keep `/_next` and the RSC `.txt` assets intact. Unknown paths must serve the 404 body with status 404 on the eventual host; literal `/404.html` was 200 on the reference server. The canonical exception remains `https://www.tintawindow.co.nz/404/`; thank-you canonical is `https://www.tintawindow.co.nz/thank-you`.

| URL | Page type |
| --- | --- |
| `/404.html` | missing |
| `/about` | about |
| `/commercial-window-tinting/anti-glare-window-films` | commercial |
| `/commercial-window-tinting/anti-graffiti-window-films` | commercial |
| `/commercial-window-tinting/frosted-opaque-decorative-window-films` | commercial |
| `/commercial-window-tinting/heat-rejection-solar-protection-window-films` | commercial |
| `/commercial-window-tinting/safety-security-window-films` | commercial |
| `/commercial-window-tinting-services` | hub |
| `/contact-for-window-tinting` | contact |
| `/design-review` | review |
| `/design-review/project-story` | review |
| `/` | home |
| `/locations/arrowtown` | location |
| `/locations/ashburton` | location |
| `/locations/christchurch` | location |
| `/locations/cromwell` | location |
| `/locations/geraldine` | location |
| `/locations` | locations |
| `/locations/lake-tekapo` | location |
| `/locations/oamaru` | location |
| `/locations/queenstown` | location |
| `/locations/temuka` | location |
| `/locations/timaru` | location |
| `/locations/wanaka` | location |
| `/residential-window-tinting/anti-glare-window-films` | residential |
| `/residential-window-tinting/fade-reduction-window-films` | residential |
| `/residential-window-tinting/frosted-opaque-window-films` | residential |
| `/residential-window-tinting/heat-control-window-films` | residential |
| `/residential-window-tinting/privacy-window-films` | residential |
| `/residential-window-tinting/safety-security-window-films` | residential |
| `/residential-window-tinting-services` | hub |
| `/thank-you` | confirmation |
| `/window-tinting-faq` | faq |
| `/window-tinting-gallery` | gallery |

Content lives in typed `content/*.ts`; `lib/render-site.ts` assembles it and `lib/pages.ts` exposes final pages. Actual precedence: site-data with enhancements applied early -> media mapping -> revised section selection with final-content/final-proof and editorial/render-time overrides -> homepage refinement -> assembly/surface assignment -> final customerPolish text pass. Do not import or execute the reference generator or revised-content source for extraction: they write reference reports.

The native document order is skip link, header, **one `main#main`**, footer, quote dialog, mobile enquiry bar (plus expected framework packaging). `MainRegion` puts immutable `mainHtml` on that main itself through dangerouslySetInnerHTML, with memoization and a hydration-warning boundary on main only. Keep native anchors and full-document navigation; do not introduce Next Link/prefetch or rerender imperative-script-owned descendants. Classic deferred scripts load once in this order: `/enquiry-flow.js`, `/site.js`, `/team-ui-715.js`. `/shoot-media-715.js` is intentionally unloaded and remains available with the original media.

`/design-review` alone uses frozen `content/design-review-final.ts`, inserted after general assembly: seven sections, five original inline backgrounds, **14,779 UTF-8 bytes**, SHA-256 `c1b3827fc821df6ba91714fe91f9c7811bbe38757323118161bdc276ffe391ff`. Project-story follows its separate renderer. Preserve exact copy, tags, hooks, attributes, asset URLs and section order from the retained baseline.

Next supplies the single charset and viewport (`width=device-width, initial-scale=1`). Required head contract: 180-character description, noindex/nofollow, canonical, theme colour, OG/Twitter, favicon and escaped JSON-LD array (WebPage; Organization on Home; breadcrumbs off root; Service on residential/commercial leaves). Home document title is `Window tinting in Christchurch | Tint A Window`, while social/schema title is `Window Tinting Christchurch | Tint A Window`. Framework resource/Flight tags and the extra 404 robots=noindex are expected packaging.

## CSS and future conversion constraints

**Zero sections have been converted to Tailwind utilities.** `app/legacy.css` remains the original 22 sheets, byte-preserved with source comments and charset relocation. Order: fonts -> style -> boutique -> brand -> surfaces -> revision -> fresh -> polish -> atelier -> signature -> film-guide -> refinement -> responsive-sections -> client-polish -> shoot-media-715 -> team-ui-715 -> story-717 -> service-layout-717 -> launch-polish-717 -> team-ui-718 -> photo-alignment-719 -> placement-polish-720 (all `.css`). The public originals remain checker inputs; do not discard them as unused assets.

`app/globals.css` imports theme/utilities only, disables automatic scanning with source(none), retains exact 800/801 and 1100/1101 boundaries plus 850 and other legacy breakpoints. Final yellow is #FFD43B, dark ink #293c3a; fonts are Cormorant Garamond / Manrope; --pad supplies exact gutters. Unlayered legacy rules outrank normal layered utilities. Any future conversion must preserve JS hooks, use explicitly sourced utilities with exact values, and remove every migrated legacy/state/media declaration without harming unconverted elements.

Phase 6 skipped all five candidates: surfaces/important typography block 404, thank-you and Locations cards; skip link uses fixed positioning; footer's shared cascade exceeds Low risk. Header/nav/forms/dialog/heroes, rails/reviews/logos, gallery/lightbox, Locations visit-frame, About history/team, Contact portrait, important/:has/body-type :is/sticky/scroll/JS-created/surface rules and frozen review content remain excluded. `scripts/check.mjs` currently demands the full 22-sheet concatenation, so genuine rule removal needs an explicitly approved migration-aware provenance check; it was not loosened. Keep [protected hooks](verify/protected-hooks-p6.log), [parsed hooks](verify/hooks-extracted-p6.log), [CSS rules](verify/css-rules-p6.log) and [region inventory](verify/section-inventory-p6.log).

## Verification and evidence retained

Phase 4 compiled but found review-content drift and 68 duplicate-charset/viewport failures. Phase 5 replaced only the review main snapshot and removed manual duplicate metas; no other content/head change was made. Phase 5 final results: **102/102 exact pixel matches**, **34/34 HTML regions**, **20/20 hydration/control**, **48/48 behavior**, checker zero issues. Phase 6 retained those results with no conversion. Captures used Chromium 158.0.8127.18, DPR1, 360/768/1440px, 900px viewport height, en-NZ, Pacific/Auckland, reduced motion; hydration also used 4x CPU and throttled network on five routes.

| Evidence | Phase 5 final | Phase 6 final |
| --- | --- | --- |
| Build / checker | [build](verify/build-p5.log), [check](verify/check-p5.log) | [build](verify/build-p6.log), [check](verify/check-p6.log) |
| Exact pixels, all 102 | [stable results](verify/pixel-results-stable-p5.log) | [painted results](verify/pixel-results-painted-p6.log) |
| HTML/head | [comparison](verify/html-comparison-p5.log) | [comparison](verify/html-comparison-p6.log) |
| Hydration / behavior | [results](verify/browser-results-p5.log) | [results](verify/browser-results-p6.log) |
| References unchanged | [SHA audit](verify/reference-comparison-p5.log) | [SHA audit](verify/reference-comparison-p6.log) |

The strict computed-style comparison is **not globally zero**: 935 pre-existing background-position representations differ (`0%` vs `0px`), with zero geometry/other-property differences across 35,995 instances. Ninety local-port URL artifacts were corrected without discarding real differences. See [totals](verify/computed-replayed-total-p6.log), [strict differences](verify/computed-replayed-differences-p6.log), [summary](verify/computed-replayed-summary-p6.log), [transport artifacts](verify/computed-replayed-transport-p6.log), [confirmed compilation](verify/background-serialization-p6.log) and [stylesheet continuity](verify/stylesheet-continuity-p6.log). The comparator retains exit 1 for strict differences.

Gallery full-page captures can have blank photos even after decode/sequential runs. The retained painted capture helper warms visible tiles equally on both sites; Phase 6 rerun had 102 exact pairs and [216 image interiors with no white blanks](verify/gallery-image-quality-p6.log). Pixel identity alone can hide shared blanks. Raw screenshots/normalized exports/superseded logs were approved for cleanup; final numeric evidence remains.

## Operations and pending launch checks

Use Node 22 (retained binary at `migration/verify/runtime/node_modules/node/bin/node.exe`) and the [README commands](../README.md). Windows Application Control blocked native SWC; the already cached binding `node_modules/next/wasm/@next/swc-wasm-nodejs` supports the tested per-shell NEXT_TEST_WASM / NEXT_TEST_WASM_DIR workaround. Do not change package versions or disable errors. Existing WASI/workspace-root warnings and prior dependency advisories were not remediated.

Forms are review-only: files are local, no enquiry/photo is sent. Receipt attribution is consumed once on thank-you; forms are not a production submission service. robots remains Disallow:/ and pages noindex/nofollow. The private `sitemap.production-draft.xml` has 30 URLs (29 primary + Locations; no review/thank-you/404), outside out/.

No real-host policy was verified. Later authorized hosting tests must cover noindex/nosniff on normal/error/redirects; 308 slash redirects preserving repeated/encoded queries; root/index aliases and loops; cleanUrls `/404.html` vs `/404`/`/404/` and unknown-path body/status; HTML no-store versus long asset cache; RSC/media MIME/range serving. Exact test targets under the separately approved ORIGIN: `/`, `/about`, `/about/?a=1&a=2&space=a%20b`, `/locations/wanaka/?ref=x%2Fy#content-7`, `/index.html`, `/about/index.html`, `/404.html`, `/404`, `/404/`, `/__host_verify_missing__`, `/assets/logo-large.webp`, `/assets/font-1.ttf`, `/locations/wanaka.txt`. No preview/deployment/production action is implied.
