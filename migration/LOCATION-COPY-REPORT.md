# Location copy replacement report

Date: 11 November 2026. Branch: **content/location-pages-replacement**, created from a clean tracked working tree. The pasted request controls the changes; the Word document was read only as a cross-check. All 94 supplied replacement strings cross-check against the DOCX. No publication, push, dependency upgrade, hosting change or baseline edit. The checker expected values were subsequently updated under explicit follow-up authorization.

**Final Node22 build: PASS. Final source/export content checks: PASS. Baseline checker: PASS, 0 failures with reviewed intentional overrides.**

## Scope and files changed

| File | Change |
| --- | --- |
| content/location-page-copy.ts (new) | Typed final copy for all 11 towns, shared benefits/services/process/FAQs, overview copy and the two homepage replacements. |
| lib/location-pages.ts (new) | One seven-section location renderer reusing existing section classes/IDs/markup; replaces the old location composition. |
| lib/render-site.ts | Routes location pages into that renderer before the legacy content layers; neutral optional image alt override; overview cards/info replacement; FAQ helper opt-in uses the existing exact-copy mechanism after escaping. |
| content/fresh-design.ts | Exact location hero copy, breadcrumb names and neutral hero photo alt; overview lead protected from incidental editing. |
| content/homepage-refinement.ts | Only the requested second introduction paragraph and fourth FAQ answer changed. |
| content/site-data.ts | Active Waimate location definition, macron-safe Wānaka path/label handling, final regional display copy and descriptions. |
| content/routes.ts | Lake Tekapo route/static-parameter source replaced by Waimate; canonical/title pattern and final location/overview descriptions. Other existing titles and canonicals preserved. |
| content/navigation.ts | Waimate replaces Lake Tekapo; Wānaka display spelling preserved at /locations/wanaka. Header/footer share this data. |
| content/design-review-final.ts | User follow-up explicitly allowed only Lake Tekapo references to become Waimate. All other frozen HTML/styles/structure remain identical. |
| content/source-units.ts, content/team.ts | One matching service-area answer in each typed input changes Lake Tekapo to Waimate; no other old source units rewritten. |
| content/customer-polish.ts | Only its supported place-name list changes Lake Tekapo to Waimate. Normalization logic is byte-for-byte otherwise unchanged; no weakening. |
| scripts/export-directories.mjs | Arranges the 34 actual exported HTML documents instead of using obsolete baseline route names. Keeps path-boundary/symlink/refuse-overwrite checks and the 34-document assertion. |
| scripts/sitemap-draft.mjs | Reads canonical/type values from the fresh export, preserving the 30-route assertion and exclusions; writes only migration/. |
| scripts/verify-location-copy.mjs (new) | Focused exact-copy/count/order/unchanged-content checks without modifying or replacing scripts/check.mjs. |
| migration/sitemap.production-draft.xml (regenerated) | Exactly 30 distinct URLs; Waimate replaces Lake Tekapo; review/thank-you/404 excluded. |
| migration/LOCATION-COPY-REPORT.md (new) | This report. Local logs, original snapshots and screenshots remain ignored under migration/verify/. |

The copy implementation changed 12 pre-existing source files; the follow-up adds expected-value preparation to scripts/check.mjs only. SHA-256 checks confirm baseline/public/CSS/package/config inputs are unchanged. Every original checker byte is preserved after removing only the explicit import/expected-value preparation, as verified by both source comparison and the original checksum. The complete source snapshot and integrity log are local at migration/verify/location-copy-before.log and location-copy-integrity.log. Neither original generator nor its revised-content module was imported or executed. The existing local pure renderer port remains in use for unaffected routes.

## Per-page confirmation in the final export

Final order on every location page: **Hero → local introduction → benefits → residential/commercial services → how it works → FAQs → final CTA**. Exactly one h1 per page. No duplicate copy. The removed sections, travel/regional/owner/manager/approval/access-planning material are absent from each active location main, including collapsed panels.

| Page | Hero | Intro | Benefits | Services | Process | FAQ | CTA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Christchurch | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Ashburton | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Timaru | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Oamaru | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Queenstown | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Wānaka | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Cromwell | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Waimate | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Arrowtown | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Temuka | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |
| Geraldine | PASS | PASS | 4 PASS | 2 PASS | 3 PASS | 4 PASS | PASS |

Existing quote/call actions and both service destinations are preserved. Final paragraphs, questions, answers and punctuation match the request exactly. Existing exact-copy tokens protect supplied text during assembly, then disappear from the rendered DOM; the formatter remains intact. Retained hero/service photos use neutral property/glazing alt text. No separate local office, branch or town-specific team is claimed. Forms stay review-only; robots stay noindex/nofollow.

The overview has the exact new introduction, descriptions and closing information. Card order is Christchurch, Ashburton, Timaru, Oamaru, Queenstown, Wānaka, Cromwell, **Waimate**, Arrowtown, Temuka, Geraldine; Waimate region is South Canterbury. The final overview CTA and buttons are unchanged.

The homepage comparison verifies only the two requested main-content replacements. Its document title versus social-title exceptions were checked in the actual browser against the baseline and preserved. Existing Home/location JSON-LD has no FAQPage schema, so no stale FAQ schema existed to replace. Existing WebPage/BreadcrumbList descriptions follow the updated location metadata. The separate main FAQ page changes only its obsolete service-area town name.

## Lake Tekapo removal checklist

| Item | Result |
| --- | --- |
| Active route/static params | /locations/waimate present; old route removed; still 11 location pages. |
| Export | Exactly 33 directory-style documents + 404.html. No old Lake Tekapo output folder or HTML alias. |
| Header/footer/overview | Waimate replaces the old entry; overview placement and South Canterbury region correct. |
| Internal anchors | No old location URL in any of the 34 exported documents. |
| Review snapshot | Only the specifically authorized town/slug references changed. |
| Main FAQ area list | Updated to Waimate in both corresponding typed source inputs. |
| Canonical/schema | Waimate has the correct canonical; no Lake Tekapo canonical/JSON-LD reference in any exported document. |
| Sitemap | 30 unique URLs including Waimate, excluding Lake Tekapo. |
| Local HTTP | Removed URL returns status 404; no redirect was added. |
| Redirect/host config | vercel.json unchanged. A redirect could be added there later if wanted, with separate approval. |

## Build, installation and browser checks

- Retained Node v22.23.4, locked npm ci, installed Next 15.5.29. First npm ci hit EPERM on a Lightning CSS binary held by the project dev server. Stopped only verified project child PID 20388; parent 11320 exited before the next check. Retry installed successfully. The dev server was not restarted.
- npm ci reports two existing dependency audit findings (one moderate, one high). No audit fix, upgrade, lockfile or package change was performed.
- npm ci removed the old WASM binding. Restored its five files from the already-cached official 15.5.29 archive after matching its version to installed Next. No new package version or network browser download.
- First Next build compiled and generated pages but its postprocessor failed looking for out/locations/lake-tekapo.html. Fixed the allowed export helper to use current output. Second build passed. A full export scan then identified the old town in the general FAQ service-area answer; corrected only that reference, its matching typed input and the formatter town list. **Final build passes** including type checks/export arrangement. All three build outputs are retained in local location-copy-build*.log files.
- Final focused Node check passes on all 34 documents, all location exact copy/counts, unchanged unrelated mains, authorized review changes, protected inputs and the two-only homepage replacement constraint. Evidence: migration/verify/location-copy-export.log.
- Local Edge/Playwright checks at 360/1440px: Waimate, Wānaka, overview and Home have one h1, no horizontal overflow, console/page errors or hydration warnings. New location FAQ accordions open and close correctly. Final-build FAQ and Waimate smoke checks also pass. Evidence: location-copy-browser.log and location-copy-browser-final.log. No hosted preview or deployment.
- NEXT_TEST_WASM and NEXT_TEST_WASM_DIR are cleared in finally blocks after install/build commands.

## Remaining search hits and layout decision

There is **no Lake Tekapo text in the final out/ text scan**, including its HTML, RSC text and JavaScript. One old removal phrase remains in a JS bundle: “What helps us plan your visit”, an unused replacement-key literal in customer-polish, not displayed content. No banned old section appears in a location main.

A working-source/documentation scan, excluding .git, dependencies and migration/baseline and respecting .gitignore, found **263 matches in 17 files** before creating this report. These references are not all active location copy and were not globally rewritten. Exact file/line/match evidence is in migration/verify/location-copy-remaining-hits.log. The broader scan including ignored generated/cache/evidence files is in location-copy-full-scan.log; saved old snapshots, compiler/server bundles and log text naturally retain earlier strings. This report itself also mentions the old terms to document the changes.

| File | Matches | Interpretation |
| --- | ---: | --- |
| README.md | 2 | Historical documentation or reference-file inventory |
| content/customer-polish.ts | 1 | Unused old phrase replacement key; normalization logic preserved |
| content/editorial-review.ts | 1 | Old proper-name matcher, not emitted local copy |
| content/enhancements.ts | 2 | Historical source/layer input; bypassed for the replacement location pages |
| content/final-content.ts | 7 | Historical source/layer input; bypassed for the replacement location pages |
| content/final-local-stories.ts | 2 | Historical source/layer input; bypassed for the replacement location pages |
| content/final-proof.ts | 1 | Historical source/layer input; bypassed for the replacement location pages |
| content/local-stories.ts | 5 | Historical source/layer input; bypassed for the replacement location pages |
| content/page-copy.ts | 25 | Historical source/layer input; bypassed for the replacement location pages |
| content/proof-data.ts | 5 | Historical source/layer input; bypassed for the replacement location pages |
| content/revised-content.ts | 4 | Old location composition/cleaners; active location routes now bypass it |
| content/search-terms.ts | 2 | Historical source/layer input; bypassed for the replacement location pages |
| content/source-units.ts | 151 | Historical source/layer input; bypassed for the replacement location pages |
| content/team.ts | 34 | Historical source/layer input; bypassed for the replacement location pages |
| migration/MIGRATION-SUMMARY.md | 1 | Historical documentation or reference-file inventory |
| migration/PHASE-7-REPORT.md | 3 | Historical documentation or reference-file inventory |
| scripts/verify-location-copy.mjs | 17 | Verifier forbidden-pattern and comparison literals |


**CSS decision:** legacy desktop .revision-steps uses five fixed columns. The three required cards occupy the first three columns, leaving space on the right. JavaScript correctly ends the line at the third dot. At 360px the steps form one column with no page overflow. CSS and class hooks were not edited. A full-width three-column desktop arrangement needs a separately approved CSS/layout change; it was not silently applied. Screenshot: migration/verify/location-copy-process-desktop.png.

## Initial checker stop — historical, resolved by the approved overrides below

**STOPPED as required by Step 7.4.** The unchanged baseline checker exited 1. Its assertions still expect the removed Lake Tekapo document and previous descriptions/schema. No checker or baseline was edited; no commit or push was made. All failed assertions are reproduced verbatim below. Decide how the checker should represent the intentional route/copy changes before the requested commit.

```text
FAIL: 46 issue(s)
- Unexpected exported HTML document: locations/waimate/index.html
- /locations/arrowtown: baseline meta[name="description"] mismatch: "Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors." != "Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window."
- /locations/arrowtown: meta[property="og:description"] differs from baseline.
- /locations/arrowtown: meta[name="twitter:description"] differs from baseline.
- /locations/arrowtown: JSON-LD differs from baseline.
- /locations/ashburton: baseline meta[name="description"] mismatch: "Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy." != "Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window."
- /locations/ashburton: meta[property="og:description"] differs from baseline.
- /locations/ashburton: meta[name="twitter:description"] differs from baseline.
- /locations/ashburton: JSON-LD differs from baseline.
- /locations/christchurch: baseline meta[name="description"] mismatch: "Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business." != "Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property."
- /locations/christchurch: meta[property="og:description"] differs from baseline.
- /locations/christchurch: meta[name="twitter:description"] differs from baseline.
- /locations/christchurch: JSON-LD differs from baseline.
- /locations/cromwell: baseline meta[name="description"] mismatch: "Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy." != "Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window."
- /locations/cromwell: meta[property="og:description"] differs from baseline.
- /locations/cromwell: meta[name="twitter:description"] differs from baseline.
- /locations/cromwell: JSON-LD differs from baseline.
- /locations/geraldine: baseline meta[name="description"] mismatch: "Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy." != "Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window."
- /locations/geraldine: meta[property="og:description"] differs from baseline.
- /locations/geraldine: meta[name="twitter:description"] differs from baseline.
- /locations/geraldine: JSON-LD differs from baseline.
- /locations: baseline meta[name="description"] mismatch: "Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy." != "Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team."
- /locations: meta[property="og:description"] differs from baseline.
- /locations: meta[name="twitter:description"] differs from baseline.
- /locations: JSON-LD differs from baseline.
- Missing expected HTML: locations/lake-tekapo/index.html
- /locations/oamaru: baseline meta[name="description"] mismatch: "Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading." != "Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window."
- /locations/oamaru: meta[property="og:description"] differs from baseline.
- /locations/oamaru: meta[name="twitter:description"] differs from baseline.
- /locations/oamaru: JSON-LD differs from baseline.
- /locations/queenstown: baseline meta[name="description"] mismatch: "Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses." != "Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window."
- /locations/queenstown: meta[property="og:description"] differs from baseline.
- /locations/queenstown: meta[name="twitter:description"] differs from baseline.
- /locations/queenstown: JSON-LD differs from baseline.
- /locations/temuka: baseline meta[name="description"] mismatch: "Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading." != "Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window."
- /locations/temuka: meta[property="og:description"] differs from baseline.
- /locations/temuka: meta[name="twitter:description"] differs from baseline.
- /locations/temuka: JSON-LD differs from baseline.
- /locations/timaru: baseline meta[name="description"] mismatch: "Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading." != "Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window."
- /locations/timaru: meta[property="og:description"] differs from baseline.
- /locations/timaru: meta[name="twitter:description"] differs from baseline.
- /locations/timaru: JSON-LD differs from baseline.
- /locations/wanaka: baseline meta[name="description"] mismatch: "Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading." != "Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice."
- /locations/wanaka: meta[property="og:description"] differs from baseline.
- /locations/wanaka: meta[name="twitter:description"] differs from baseline.
- /locations/wanaka: JSON-LD differs from baseline.
```

Requested local commit message: `content: replace location page copy, add Waimate, update overview and homepage`.


## Approved expected-value follow-up

The user authorized scripts/check.mjs expected-value changes after reviewing the 44 original metadata/schema failures. No baseline archive was edited. The earlier stop and verbatim failures above remain as historical evidence; they are resolved, not ignored.

Before editing, the read-only inspection showed:

| Original failure group | Count | Actual approved difference |
| --- | ---: | --- |
| Meta description | 11 | Ten existing town hero paragraphs plus the overview introduction |
| OG description | 11 | Same final copy |
| Twitter description | 11 | Same final copy |
| Whole JSON-LD comparison | 11 | Eleven WebPage.description leaves, plus the Wānaka breadcrumb name correction within one block |
| Title/canonical/noindex/FAQ schema failures among those 44 | 0 | No unexpected changes |

Affected existing routes: Arrowtown, Ashburton, Christchurch, Cromwell, Geraldine, Oamaru, Queenstown, Temuka, Timaru, Wānaka and /locations. There are 45 changed leaves across the 44 comparisons because Wānaka's JSON-LD comparison contains two leaves. No schema block was lost or reordered. All 34 mapped pages had one h1 and the exact noindex/nofollow directive, with no conflicting index/follow. The approved location FAQ and homepage FAQ #4 changes concern visible copy; no FAQPage schema existed on those pages.

The old checker did not inspect Waimate after reporting the missing Lake Tekapo document. Waimate was separately compared to that archived page: the route/HTML path, document/social titles, canonical/social URL, descriptions, WebPage name/description/URL and final breadcrumb name/item changed exactly as approved. No unrelated canonical or title override was added.

### Implementation

- scripts/check-overrides.mjs contains independent literal records: current page, baseline page, field, exact old baseline value and exact new expected value. It never reads out/ or application content to decide expected values.
- There are 60 records: 41 head fields, 17 schema leaves and two route/path fields, across 12 page records. The full old/new table is below.
- The helper validates each archived old value, requires one exact head node, validates existing schema paths, and prepares a cloned expected document in memory. Archived HTML and parsed input documents remain unchanged.
- No original checker assertion was deleted, skipped, rewritten, relaxed or replaced. Only its import and expected-value initialization changed. It still compares the entire JSON-LD value, not just changed fields; schema loss/additions/type changes remain failures.
- Override guards reject stale old values, duplicate/unknown pages, no-op entries, unsupported fields, robots changes and schema-type changes. The document/path counts remain 34 unique files: 33 documents plus 404.html.
- scripts/verify-location-copy.mjs retains its checker integrity assertion. It removes only the exact authorized preparation text before hashing the rest against the original SHA-256; it does not skip the protected-checker check.

### Final validation

Node22 npm run build passed; its output is in migration/verify/location-copy-approved-build.log. NEXT_TEST_WASM and NEXT_TEST_WASM_DIR were cleared afterward. No install or dependency upgrade occurred in this follow-up.

```text
Expectations: 60 reviewed field overrides on 12 pages; immutable archive validated; 34 expected documents.
PASS: 34 HTML documents, baseline head/schema values, native structure, classic scripts, 22-sheet equivalent CSS and 4165 internal references (160 unique files).
```

Guard and assertion-preservation tests:

```text
PASS: original checker is byte-identical after removing only the import/expected-value preparation; no original assertion changed or removed.
PASS: parsed archive unchanged; 34 unique expected documents, Waimate mapped to archived Lake Tekapo.
PASS: 60 explicit literal field overrides across 12 pages; approved description values verified.
PASS: stale old values, duplicate/unknown pages, no-ops, robots changes and schema-type changes are rejected.
```

The fresh-export content verifier also passed again for every location, the two-only homepage changes, unchanged unrelated mains, authorized review/FAQ town changes and protected inputs. Baseline/public/assets/styles/config/lockfile bytes remain unchanged. The pre-existing five-column desktop process layout remains untouched; its optional CSS decision is still open.

### Full intentional override list

| Current page | Field | Archived baseline value | Approved expected value |
| --- | --- | --- | --- |
| /locations/arrowtown | meta[name="description"]@content | Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors. |
| /locations/arrowtown | meta[property="og:description"]@content | Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors. |
| /locations/arrowtown | meta[name="twitter:description"]@content | Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors. |
| /locations/arrowtown | JSON-LD/0/description | Window tinting in Arrowtown. Consider the appearance from both sides. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Arrowtown for less heat and glare, improved privacy and help reducing fading on home interiors. |
| /locations/ashburton | meta[name="description"]@content | Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy. |
| /locations/ashburton | meta[property="og:description"]@content | Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy. |
| /locations/ashburton | meta[name="twitter:description"]@content | Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy. |
| /locations/ashburton | JSON-LD/0/description | Window tinting in Ashburton. Start with the rooms you want to improve. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Ashburton, helping homes and businesses manage heat, glare, fading and privacy. |
| /locations/christchurch | meta[name="description"]@content | Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property. | Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business. |
| /locations/christchurch | meta[property="og:description"]@content | Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property. | Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business. |
| /locations/christchurch | meta[name="twitter:description"]@content | Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property. | Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business. |
| /locations/christchurch | JSON-LD/0/description | Arrange a Christchurch window-film assessment. Find out what to send, how samples and quotes are discussed, and how installation is planned for your property. | Local window tinting in Christchurch for cooler living spaces, less glare, improved privacy and help reducing fading in your home or business. |
| /locations/cromwell | meta[name="description"]@content | Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy. |
| /locations/cromwell | meta[property="og:description"]@content | Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy. |
| /locations/cromwell | meta[name="twitter:description"]@content | Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy. |
| /locations/cromwell | JSON-LD/0/description | Window tinting in Cromwell. Understand how the light moves. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Cromwell to help keep sunny rooms more comfortable, reduce fading and improve privacy. |
| /locations/geraldine | meta[name="description"]@content | Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy. |
| /locations/geraldine | meta[property="og:description"]@content | Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy. |
| /locations/geraldine | meta[name="twitter:description"]@content | Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy. |
| /locations/geraldine | JSON-LD/0/description | Window tinting in Geraldine. One building can need several solutions. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Geraldine for homes and businesses, helping reduce heat, glare and fading while improving privacy. |
| /locations | meta[name="description"]@content | Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team. | Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy. |
| /locations | meta[property="og:description"]@content | Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team. | Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy. |
| /locations | meta[name="twitter:description"]@content | Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team. | Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy. |
| /locations | JSON-LD/0/description | Explore our South Island service areas. Find planning advice for your property, then discuss assessment, travel and installation arrangements with the team. | Find your local window tinting service for homes and businesses across these South Island locations. Explore solutions for heat, glare, fading and privacy. |
| /locations/waimate | route | /locations/lake-tekapo | /locations/waimate |
| /locations/waimate | relative | locations/lake-tekapo/index.html | locations/waimate/index.html |
| /locations/waimate | title.text | Window tinting in Lake Tekapo \| Service Area \| Tint A Window | Window tinting in Waimate \| Service Area \| Tint A Window |
| /locations/waimate | link[rel="canonical"]@href | https://www.tintawindow.co.nz/locations/lake-tekapo | https://www.tintawindow.co.nz/locations/waimate |
| /locations/waimate | meta[name="description"]@content | Window tinting in Lake Tekapo. Plan for daylight and evenings. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Waimate for homes and businesses. Help reduce heat, glare and fading while adding privacy where you need it. |
| /locations/waimate | meta[property="og:title"]@content | Window Tinting Lake Tekapo \| Service Area \| Tint A Window | Window Tinting Waimate \| Service Area \| Tint A Window |
| /locations/waimate | meta[property="og:description"]@content | Window tinting in Lake Tekapo. Plan for daylight and evenings. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Waimate for homes and businesses. Help reduce heat, glare and fading while adding privacy where you need it. |
| /locations/waimate | meta[name="twitter:title"]@content | Window Tinting Lake Tekapo \| Service Area \| Tint A Window | Window Tinting Waimate \| Service Area \| Tint A Window |
| /locations/waimate | meta[name="twitter:description"]@content | Window tinting in Lake Tekapo. Plan for daylight and evenings. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Waimate for homes and businesses. Help reduce heat, glare and fading while adding privacy where you need it. |
| /locations/waimate | meta[property="og:url"]@content | https://www.tintawindow.co.nz/locations/lake-tekapo | https://www.tintawindow.co.nz/locations/waimate |
| /locations/waimate | JSON-LD/0/name | Window Tinting Lake Tekapo \| Service Area \| Tint A Window | Window Tinting Waimate \| Service Area \| Tint A Window |
| /locations/waimate | JSON-LD/0/description | Window tinting in Lake Tekapo. Plan for daylight and evenings. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Waimate for homes and businesses. Help reduce heat, glare and fading while adding privacy where you need it. |
| /locations/waimate | JSON-LD/0/url | https://www.tintawindow.co.nz/locations/lake-tekapo | https://www.tintawindow.co.nz/locations/waimate |
| /locations/waimate | JSON-LD/1/itemListElement/2/name | Lake Tekapo | Waimate |
| /locations/waimate | JSON-LD/1/itemListElement/2/item | https://www.tintawindow.co.nz/locations/lake-tekapo | https://www.tintawindow.co.nz/locations/waimate |
| /locations/oamaru | meta[name="description"]@content | Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading. |
| /locations/oamaru | meta[property="og:description"]@content | Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading. |
| /locations/oamaru | meta[name="twitter:description"]@content | Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading. |
| /locations/oamaru | JSON-LD/0/description | Window tinting in Oamaru. Consider the glazing already in place. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Oamaru for more comfortable rooms, less glare, improved privacy and reduced fading. |
| /locations/queenstown | meta[name="description"]@content | Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window. | Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses. |
| /locations/queenstown | meta[property="og:description"]@content | Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window. | Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses. |
| /locations/queenstown | meta[name="twitter:description"]@content | Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window. | Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses. |
| /locations/queenstown | JSON-LD/0/description | Window tinting for Queenstown homes and accommodation. Discuss glare, interior protection, samples and regional installation with Tint A Window. | Local window tinting in Queenstown to help reduce heat, glare and fading while improving privacy in homes and businesses. |
| /locations/temuka | meta[name="description"]@content | Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading. |
| /locations/temuka | meta[property="og:description"]@content | Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading. |
| /locations/temuka | meta[name="twitter:description"]@content | Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading. |
| /locations/temuka | JSON-LD/0/description | Window tinting in Temuka. Choose privacy by room. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Your local window tinting service in Temuka for privacy, heat control, glare reduction and help protecting interiors from fading. |
| /locations/timaru | meta[name="description"]@content | Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading. |
| /locations/timaru | meta[property="og:description"]@content | Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading. |
| /locations/timaru | meta[name="twitter:description"]@content | Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading. |
| /locations/timaru | JSON-LD/0/description | Window tinting in Timaru. Homes, shopfronts and working spaces. Discuss suitable films, photographs and assessment arrangements with Tint A Window. | Local window tinting in Timaru for homes and businesses. Reduce heat and glare, improve privacy and help protect interiors from fading. |
| /locations/wanaka | meta[name="description"]@content | Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice. | Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading. |
| /locations/wanaka | meta[property="og:description"]@content | Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice. | Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading. |
| /locations/wanaka | meta[name="twitter:description"]@content | Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice. | Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading. |
| /locations/wanaka | JSON-LD/0/description | Window tinting for Wānaka homes and businesses. Plan around views, glass suitability and property access, with regional assessment and installation advice. | Your local window tinting service in Wānaka for heat control, glare reduction, privacy and help protecting interiors from fading. |
| /locations/wanaka | JSON-LD/1/itemListElement/2/name | Wanaka | Wānaka |

### Commit

All verification gates passed. Authorized local branch: content/location-pages-replacement. Commit message: `content: replace location page copy, add Waimate, update overview and homepage`. The commit identifier is reported in chat after creation. No push or deployment is authorized or performed.
