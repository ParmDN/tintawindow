# Approved capitalization changes — completed

Date: 11 November 2026. No publication, CMS write, dependency/configuration change or Git command.

## Result

- All **34 current source renders** and **34 freshly exported HTML documents** have **zero capitalized Window/Windows occurrences outside the approved exceptions**.
- Original 131 proposals: **101 lowercased**, **30 retained as titles/eyebrows under Option A**. The first scan classified those 30 by tag path without recognizing hero-title spans, eyebrow paragraphs and two page-title cells in the review keyword table. Their complete locations/text are logged as OPTION-A-RETAINED in migration/verify/window-copy-assertions.log.
- Also corrected the gallery aria label: “Enlarge Window film at building scale” → “Enlarge window film at building scale”. Its visible title “Window film at building scale” remains capitalized.
- All **142 original sentence/heading-start exceptions** remain capitalized. All existing h1–h6, hero-title spans, eyebrows, meta values, title values and JSON-LD were verified unchanged against the pre-patch source render.
- Current capitalized runtime occurrences: **458 protected brands + 173 approved title occurrences + 59 other approved sentence starts = 690**. Many of the original 142 starts are now classified under the title category; none was removed.
- Total changed DOM values: **101 text nodes and one aria-label**, across the full route set. Their complete before/after values are in the assertion log.

## Application files changed

| File | Change |
| --- | --- |
| content/customer-polish.ts | Added a small ordinary-copy normalization step after the existing service-copy formatter. Equal-length brand masking protects Tint A Window, Tint-A-Window and TintAWindow. Sentence starts and Microsoft Windows are retained. A lightweight tag-context stack exempts headings, hero titles and eyebrows; only visible alt/aria-label/placeholder attributes are considered. Existing URL/key/identifier attributes and script/style content remain untouched. Five phrase replacement outputs use lowercase window in their source literals; replacement match keys are unchanged. |
| lib/layout-markup.ts | Ordinary header overview links now say “Explore Residential window films” / “Explore Commercial window films”. |
| lib/render-site.ts | Same overview-link wording in the pure document renderer, keeping source previews and the actual shared header consistent. |
| content/design-review-final.ts | Approved body-copy casing exception to the frozen snapshot: “Residential-owned House Window Tinting phrase” → “Residential-owned house window tinting phrase”. The two keyword-map page titles remain Title Case. No structure, inline style, ID or other snapshot content changed. |

For natural ordinary copy, “window films” in the two nav links and “house window tinting” in the review paragraph are lowercased as phrases, rather than producing “window Films” or “House window Tinting”. This does not change any Title Case heading or page title.

No stylesheet, baseline, asset, route/slug, filename, dependency, hosting file, schema key or code identifier was changed. Source-render comparison checked **26,340 DOM nodes**, preserving element order/count, protected attributes, URLs and brand occurrences. The immutable migration/baseline SHA-256 manifest still matches all **34 files**; before/after evidence is in migration/verify/window-copy-baseline-check.log and window-copy-before/baseline.sha256.

## Before / after — About and three service pages

| Page / location | Before | After |
| --- | --- | --- |
| About: ordinary Residential overview nav link | Explore Residential Window Films | Explore Residential window films |
| About: ordinary Commercial overview nav link | Explore Commercial Window Films | Explore Commercial window films |
| About: story section | Already corrected in source to 1987 → Late 1980s → 1992 → Mid-1990s → Mid to late 1990s → 2026 | Same order, now included in the fresh Next export. Eyebrow is “From the beginning to today”; endpoint highlights remain dark. |
| Residential privacy: introductory body, FAQ answer and closing body | For Window privacy film installation in Christchurch, … | For window privacy film installation in Christchurch, … |
| Residential privacy: hero title | Privacy Window Film Across New Zealand | Unchanged under Option A |
| Residential heat control: hero title | Heat Control Window Film Across New Zealand | Unchanged under Option A; ordinary overview nav links lowercased as above. Existing body copy already used lowercase window. |
| Commercial anti-glare: h1 | Commercial Anti-Glare Window Film Christchurch | Unchanged under Option A; ordinary overview nav links lowercased as above. Existing body copy already used lowercase window. |

About body copy needed no further capitalization changes. The Mid-1990s label/caption still agree; no date was guessed or changed.

Focused desktop comparison images (before = saved pre-patch source HTML, after = fresh Next export):

| Page | Before | After |
| --- | --- | --- |
| About: first timeline card | [Before](</D:/Aditya Digital Neighbour/Tint-A-Window/migration/verify/window-copy-before_about-detail.png>) | [After](</D:/Aditya Digital Neighbour/Tint-A-Window/migration/verify/window-copy-after_about-detail.png>) |
| Residential privacy: introductory section | [Before](</D:/Aditya Digital Neighbour/Tint-A-Window/migration/verify/window-copy-before_residential-window-tinting_privacy-window-films-detail.png>) | [After](</D:/Aditya Digital Neighbour/Tint-A-Window/migration/verify/window-copy-after_residential-window-tinting_privacy-window-films-detail.png>) |
| Residential heat control: introductory section | [Before](</D:/Aditya Digital Neighbour/Tint-A-Window/migration/verify/window-copy-before_residential-window-tinting_heat-control-window-films-detail.png>) | [After](</D:/Aditya Digital Neighbour/Tint-A-Window/migration/verify/window-copy-after_residential-window-tinting_heat-control-window-films-detail.png>) |
| Commercial anti-glare: introductory section | [Before](</D:/Aditya Digital Neighbour/Tint-A-Window/migration/verify/window-copy-before_commercial-window-tinting_anti-glare-window-films-detail.png>) | [After](</D:/Aditya Digital Neighbour/Tint-A-Window/migration/verify/window-copy-after_commercial-window-tinting_anti-glare-window-films-detail.png>) |

The focused after images were visually inspected. Full-page after screenshots also exist for these four routes at 360px and 1440px, listed in migration/verify/window-copy-browser.log. Before screenshots are source previews using the existing public styles/assets, not a separately rebuilt old Next artifact; no pixel-identical comparison is claimed for a copy-changing task.

## Build and checks

| Verification | Result / evidence |
| --- | --- |
| Read-only rescan | PASS; WINDOW-COPY-AFTER.md. Original WINDOW-COPY-DRY-RUN.md retained. |
| Source render and formatter assertions | PASS; all 34 routes, 26,340 DOM nodes; no protected value changes; all original starts and Option A titles retained. migration/verify/window-copy-assertions.log. |
| First Node22 build | Compiled and passed type checks, then failed during page-data collection: `Cannot find module for page: /_document` (`ENOENT`). Complete output: migration/verify/window-copy-build.log. |
| Conflict diagnosis | A project Next dev process and its server child were writing the same .next directory. Observed app-path manifest contained only About and pages manifest was empty. Stopped only verified project child PID 12464; its parent PID 29260 had already exited when rechecked. Unrelated processes were not stopped. |
| Build retry | PASS, exit 0; no code/config/dependency fix between attempts. migration/verify/window-copy-build-retry.log. |
| Export arrangement | 34 audited HTML documents arranged as directory indexes plus 404.html (33 documents + 404). |
| node scripts/check.mjs | PASS: 34 HTML documents, baseline head/schema values, native structure, classic scripts, 22-sheet equivalent CSS and 4262 internal references (160 unique files). migration/verify/window-copy-check.log. Checker unchanged. |
| Fresh export scan | PASS: 34 exported documents; 690 approved capitalized occurrences; remaining non-exceptions = 0. migration/verify/window-copy-export-scan.log. |
| Four-route source vs fresh export main | PASS; About, residential privacy, residential anti-glare and commercial anti-glare. migration/verify/window-copy-assertions.log. |
| Actual-export browser checks | PASS: About, residential privacy, residential heat control and commercial anti-glare at 360/1440px; titles/nav/casing, single h1, chronological About timeline, no page overflow, browser errors or hydration warnings. Gallery aria label also checked after initialization. migration/verify/window-copy-browser.log. |
| Vitest | Not available: no Vitest dependency, configuration or test command in this checkout. No package was installed; focused assertions ran with plain Node. |

Build runtime: retained Node **v22.23.4**, npm CLI via that runtime, NEXT_TEST_WASM=1 and NEXT_TEST_WASM_DIR pointing to node_modules/next/wasm/@next/swc-wasm-nodejs. Build and browser execution ran outside the sandbox as previously required. Next **15.5.29** still prints its existing warning that experimental.useWasmBinary is ignored on win32/x64; it did not prevent the successful build. The stopped dev server was not automatically restarted; out/ is the newly verified export.

## Scanner / verification files

- Updated scripts/audit-window-copy.mjs to recognize approved semantic title contexts, JSON-LD names and meta titles. Its default report now reflects the approved policy; it remains read-only and writes only to stdout. It does not silently whitelist arbitrary remaining body copy. --legacy-classification is available for comparison with the original heuristic classifications.
- Added scripts/verify-window-copy.mjs: pre/post DOM, title/schema/brand/URL invariants, all original proposal/start locations and focused formatter assertions; optional --export checks fresh output.
- Added scripts/verify-window-copy-browser.mjs: local static export browser checks.
- Added migration/verify/window-copy-compare.mjs: local before/after screenshot crops.
- Created WINDOW-COPY-AFTER.md and this report. Temporary screenshots, logs, selected source backups and pre-patch source renders are only in migration/verify/ under window-copy names; previous logs were retained.

## Remaining capitalized words and limits

**No rendered/exported non-exception remains.** Every retained uppercase Window/Windows occurrence and its field/DOM path is in WINDOW-COPY-AFTER.md: protected brands, approved title contexts or approved sentence starts. The 30 retained original proposals are fully listed in the assertion log so the Option A override is reviewable.

The source inventory still reports **1,717 capitalized source occurrences**, including **731 heuristic lowercase proposals**, **136 heading/label/alt review rows** and one protected-path/identifier review row. These are raw template fragments, historical source units, exact replacement inputs, source titles and intermediate data; they overlap rendered output and are **not 731 current visible violations**. They were not globally rewritten: doing that would alter unapproved archived strings/match keys and lose title context. The approved change targets the 131 rendered proposals with the newer Option A policy and guarantees final output through the formatter. The complete source inventory is retained rather than claiming every historical literal is normalized.

There is still no Sanity connection, dataset or content-archive in this checkout. No remote audit/export/patch/revalidation was possible or attempted. This static export has no revalidation API; changes are built locally only. No hosted cache, external dataset, production behavior, exhaustive form suite or full-site pixel-parity run was tested in this copy task. No publication occurred.
