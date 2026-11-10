# v7.20 content regression check

Checked on 27 October 2026. Read-only comparison of current generated HTML and reports against `qa-client-7.19/content-audit.json`. No website or deployment files changed by this check.

## Results

- Current content audit is exactly equal to the v7.19 audit: all 29 audited pages, word counts, 37 keyword assignments, natural-match counts, exact-match counts, method and empty issue list are unchanged.
- Independently recalculated the main-content text, word count and both keyword-count methods from current `dist` HTML using the existing parser/matcher definitions without running their file-writing code. Mismatches: **0**. H1 failures across these 29 pages: **0**.
- Total audited main-content words: **34,971**. Total natural keyword occurrences reported: **140**.
- **27 quantity-checked pages** are within 1,000–1,500 words, ranging from **1,011 to 1,444**; their assigned targets have **3–5 natural occurrences each**. These include the 25 main SEO landing pages plus Contact and FAQ.
- About remains intentionally concise at **478 words** and Projects at **580 words**, as previously approved. The Locations directory is a navigation page, excluded from the keyword/word quota.
- Important interpretation: the audit counts grammatical forms such as “window tinting in Christchurch”, service hyphens, and “and”/“&” equivalents. **32 of 37 assignments have zero literal exact-phrase matches.** The result supports three natural variants per assigned term, not a claim that every literal sheet string occurs three times. No new keyword stuffing was introduced for this visual revision.

## Build and static reports

| Check | Current result |
| --- | --- |
| `qa-client-7.20/build.txt` | Build completed; all four static check stages report no issues |
| `site-audit.json` | 34 HTML files; 243 source sections reviewed; 0 issues |
| `design-audit.json` | 30 customer pages; 0 placeholder project slots; 0 issues |
| `qa-final.json` | 30 customer pages; 333 top-level sections; 2,397 content blocks; unique metadata; 0 issues |
| Report freshness | SHA-256 hashes in `qa-final.json` match all 32 manifest HTML files currently on disk; 0 mismatches |
| Cached keyword source comparison | 36 sheet targets; 37 assignments; 0 unexplained differences |

The keyword source comparison retains the previously recorded Project spelling correction and the user-added “house window tinting christchurch” assignment to Residential. It compares the stored source snapshot, not a newly fetched live Drive sheet. `qa-final.json` contains a hard-coded `checked_on: 2026-10-23`; the current build log and independent hash comparison above establish this run’s freshness. This check does not change that field.

## Route count

**32 manifest routes** comprise **30 customer routes** and **2 internal design-review routes**. A separate thank-you page and standalone `404.html` bring the generated output to **34 HTML files**. The 30 customer routes are Home, 2 service hubs, 11 individual services, 11 local service-area pages, Locations directory, About, Contact, FAQ and Projects.

## Unchanged page counts

| Page | Route | Main-content words | Assigned targets | Natural occurrences, in assigned-target order |
| --- | --- | ---: | ---: | --- |
| Home | `/` | 1426 | 3 | 4, 3, 3 |
| Residential | `/residential-window-tinting-services` | 1423 | 2 | 4, 3 |
| Fade reduction | `/residential-window-tinting/fade-reduction-window-films` | 1442 | 2 | 4, 3 |
| Privacy | `/residential-window-tinting/privacy-window-films` | 1382 | 2 | 3, 4 |
| Heat control | `/residential-window-tinting/heat-control-window-films` | 1444 | 1 | 5 |
| Anti-glare | `/residential-window-tinting/anti-glare-window-films` | 1413 | 1 | 5 |
| Frosted & opaque | `/residential-window-tinting/frosted-opaque-window-films` | 1359 | 2 | 4, 4 |
| Safety & security | `/residential-window-tinting/safety-security-window-films` | 1351 | 1 | 5 |
| Commercial | `/commercial-window-tinting-services` | 1430 | 1 | 5 |
| Heat & solar control | `/commercial-window-tinting/heat-rejection-solar-protection-window-films` | 1418 | 2 | 4, 4 |
| Anti-glare | `/commercial-window-tinting/anti-glare-window-films` | 1389 | 1 | 4 |
| Anti-graffiti | `/commercial-window-tinting/anti-graffiti-window-films` | 1321 | 1 | 4 |
| Frosted & decorative | `/commercial-window-tinting/frosted-opaque-decorative-window-films` | 1367 | 2 | 3, 5 |
| Safety & security | `/commercial-window-tinting/safety-security-window-films` | 1270 | 1 | 5 |
| Christchurch | `/locations/christchurch` | 1110 | 1 | 3 |
| Ashburton | `/locations/ashburton` | 1102 | 1 | 4 |
| Timaru | `/locations/timaru` | 1102 | 1 | 4 |
| Oamaru | `/locations/oamaru` | 1094 | 1 | 4 |
| Queenstown | `/locations/queenstown` | 1109 | 1 | 4 |
| Wanaka | `/locations/wanaka` | 1111 | 1 | 4 |
| Cromwell | `/locations/cromwell` | 1117 | 1 | 4 |
| Lake Tekapo | `/locations/lake-tekapo` | 1085 | 1 | 4 |
| Arrowtown | `/locations/arrowtown` | 1082 | 1 | 4 |
| Temuka | `/locations/temuka` | 1109 | 1 | 4 |
| Geraldine | `/locations/geraldine` | 1106 | 1 | 4 |
| Our story | `/about` | 478 | 1 | 1 |
| Contact | `/contact-for-window-tinting` | 1011 | 1 | 4 |
| FAQs | `/window-tinting-faq` | 1340 | 1 | 3 |
| Projects | `/window-tinting-gallery` | 580 | 1 | 1 |

## Scope and remaining checks

This regression verifies unchanged copy measurements and static report consistency. It does not establish Google ranking, prove absence of search cannibalisation, or replace a fresh editorial review against the live keyword sheet. Root owns the current browser sweep, image placement, functional checks and hosted noindex verification. Preserve the review-only enquiry forms, static Home hero and vertical About timeline.
