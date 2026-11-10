# Tint A Window — Final QA — 05-11-26

Verdict: **Ready for review**, with the accepted link-check exception and pre-existing responsive film-card defects listed below. Copy, scope and build checks pass; this is not a clean visual/launch sign-off. No fixes were applied in this final QA pass.

## Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Clean build | PASS | Content/site/design/final: zero issues each; exit 0. |
| HTTP links | FAIL — accepted pre-existing assertion only | 34/35; trailing-slash residential hub resolves to 200 after redirect instead of exposing raw 308. |
| DOCX exact wording and tags | PASS | Original DOCX parsed as OOXML: 14 tables, 61 exact-wording rows; 100 element assertions including shared labels and retained final H2s. |
| Original H2s, metadata, actions, images, URLs | PASS | All fourteen routes compared against original baseline. |
| Excluded HTML, footers, route manifest | PASS | 19 strictly identical excluded HTML files; report exception only; 34/34 identical footers. |
| Visible copy outside DOCX | PASS | Exactly one accepted homepage question; all other visible-text differences explained. |
| Keywords / word counts | PASS | All fourteen within 1,000–1,500 words; every assigned natural keyword count ≥3. |
| Visual regression / hero review | PASS within inspected static states | 42 final full-page renders, matching 42 original renders; no document overflow or new hero/changed-copy defect observed. |
| Responsive film cards | FAIL — pre-existing | Pages 2, 4, 5, 9 and 10 at 768px and 375px; baseline reproduces the same collapsed-card geometry. |
| Protected checks/maps | PASS | Original check scripts, matching rules, maps and thresholds unchanged. Existing standalone verifiers also unedited in final QA. |

## Baseline provenance and method

Original build retained at `C:\Users\Aditya\AppData\Local\Temp\tint-window-readonly-7b3f54ed1d544b439cbc91ac23ada2e8\website`. It is the untouched copy created during the first read-only investigation, before implementation, with its own fresh build output. This QA did not substitute a recent implementation-stage baseline.

Authenticated **209 original source/public/check/build/package/matcher files** against the supplied `MANIFEST.sha256`. The original project had 289 files: 286 manifest entries plus the manifest itself and two package-lock files. Reconstructing the originally recorded whole-tree hash using those 286 original hashes and the current three unmanifested originals yields `7dd79bf366602728605bd29f5645a84265b4bf00f0dde984df0b5380544e9c60`, exactly the initial recorded hash. Those three files are unchanged too. Proof: [Changes/final-qa-evidence/original-tree-proof.json](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/final-qa-evidence/original-tree-proof.json>).

Baseline server logs created only inside the temporary baseline directory are not original project files and are not counted as deletions. Original project-file changes are compared to all 289 original hashes; generated `dist` changes are compared to the original fresh build, so byte-identical generated assets are not falsely listed as changed. New files under Changes are all included individually.

Deleted only the generated `website/dist` directory and ran the unchanged build chain. The existing temporary `python3.cmd` runtime shim was placed on PATH because the Windows python3 alias is unavailable; no package/check script was edited. Python bytecode writes were disabled. No proof-content, package/deployment/hosting script or form submission was run. Local read-only preview servers were stopped after rendering/checks.

Audit logic reads original DOCX XML, uses decoded case-sensitive DOM text, and checks tags independently. Service paragraph tests compare the complete raw paragraph with the original rendered paragraph plus one space and the DOCX appendix, including the existing editorial transformations. Whitespace normalization for visible-body comparison does not erase case or punctuation. All titles/meta values/canonicals, anchors/buttons and images are compared as ordered attribute/text lists. Original H2 lists and order are compared directly.

Evidence: [Changes/final-qa-evidence/audit.json](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/final-qa-evidence/audit.json>), [Changes/final-qa-evidence/docx-extraction.json](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/final-qa-evidence/docx-extraction.json>), [Changes/final-qa-evidence/visible-text-replacements.json](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/final-qa-evidence/visible-text-replacements.json>).

## Fresh checks

| Check | Counts | Issues / exit |
| --- | --- | --- |
| Content | 29 measured page rows; About/Gallery exempt from quota; all 14 scoped pages meet quota and keywords | 0 / build exit 0 |
| Site | 34 HTML files; 243 source-section dispositions reviewed | 0 |
| Design | 30 customer pages; 0 project placeholders | 0 |
| Final | 30 customer pages; 333 top-level sections; 2,383 content blocks; unique metadata; 36 source targets / 37 assigned, with existing explained correction/addition | 0; no unexplained keyword-source differences |
| Links | 2,718 internal occurrences; 32 unique paths; 35 responses checked | 34 pass / 1 accepted failure; exit 1 |

The sole HTTP failure is `/residential-window-tinting-services/`: the checker receives final status 200 and canonical URL without the slash after following the existing 308. There are no additional link-check issues. The final-check report retains its existing `checked_on: 2026-10-23` field; the command was freshly executed on 05-11-26, and no report-date/check logic was changed.

Raw logs: [Changes/final-qa-evidence/build.log](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/final-qa-evidence/build.log>), [Changes/final-qa-evidence/links.log](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/final-qa-evidence/links.log>).

## DOCX line-by-line audit

Original file: `C:/Users/Aditya/Downloads/Tint A Window Final Developer Instructions.docx`; SHA-256 `1b1c1b9885e7858e8c44be2575c1c17bb618095f382963066ffb539162e54a2d`. Parsed all fourteen tables and shared-rule paragraphs programmatically. In service paragraph rows the DOCX column is the exact sentence to append; the built column deliberately shows the full retained paragraph plus appendix. PASS requires both parts and their single-space join to match. Shared film/closing rules apply to service pages only; Home has its own three section eyebrows/sentences.

### Page 0: Homepage — `/`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Window Tinting Christchurch | Window Tinting Christchurch | h1 | PASS |
| Hero large headline | Window Film Solutions Across New Zealand | Window Film Solutions Across New Zealand | span | PASS |
| Hero paragraph | Based in Christchurch, Tint A Window provides residential and commercial window film solutions across New Zealand, helping reduce heat and glare and improve privacy in homes and businesses. | Based in Christchurch, Tint A Window provides residential and commercial window film solutions across New Zealand, helping reduce heat and glare and improve privacy in homes and businesses. | p | PASS |
| possibilities: eyebrow | Christchurch Window Films | Christchurch Window Films | p | PASS |
| possibilities: replaced sentence | We fit window film in Christchurch homes and businesses, with service also available across New Zealand. | We fit window film in Christchurch homes and businesses, with service also available across New Zealand. | p | PASS |
| choose-your-space: eyebrow | Christchurch Window Tinting | Christchurch Window Tinting | p | PASS |
| choose-your-space: replaced sentence | Explore residential and commercial window film solutions for properties in Christchurch and across New Zealand. | Explore residential and commercial window film solutions for properties in Christchurch and across New Zealand. | p | PASS |
| home-enquiry: eyebrow | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| home-enquiry: replaced sentence | Talk to us about window tinting in Christchurch and across New Zealand. | Talk to us about window tinting in Christchurch and across New Zealand. | p | PASS |

### Page 1: Residential window tinting — `/residential-window-tinting-services`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Residential Window Tinting Christchurch | Residential Window Tinting Christchurch | h1 | PASS |
| Hero large headline | Residential Window Tinting Across New Zealand | Residential Window Tinting Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide residential window tinting for homes in Christchurch and across New Zealand. | Less heat, less glare and more privacy. Make the rooms you love more comfortable, with film chosen for your home and existing glass. We provide residential window tinting for homes in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Residential Window Tinting | Christchurch Residential Window Tinting | p | PASS |
| Film-options label | Christchurch Residential Tinting | Christchurch Residential Tinting | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 2: Fade reduction and UV film — `/residential-window-tinting/fade-reduction-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Fade-Reducing and UV Window Film Christchurch | Fade-Reducing and UV Window Film Christchurch | h1 | PASS |
| Hero large headline | Fade-Reducing and UV Window Film Across New Zealand | Fade-Reducing and UV Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide fade-reducing and UV window film for homes in Christchurch and across New Zealand. | Help care for your carpets, furniture and artwork. Reduce sunlight exposure with film that balances protection, daylight and the outlook. We provide fade-reducing and UV window film for homes in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch UV Protection Window Films | Christchurch UV Protection Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 3: Privacy window film — `/residential-window-tinting/privacy-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Privacy Window Film Christchurch | Privacy Window Film Christchurch | h1 | PASS |
| Hero large headline | Privacy Window Film Across New Zealand | Privacy Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide privacy window film for homes in Christchurch and across New Zealand. | Feel less overlooked without keeping the curtains closed all day. Compare privacy finishes that suit your rooms and the times you use them. We provide privacy window film for homes in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Privacy Window Films | Christchurch Privacy Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 4: Heat control window film — `/residential-window-tinting/heat-control-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Heat Control Window Film Christchurch | Heat Control Window Film Christchurch | h1 | PASS |
| Hero large headline | Heat Control Window Film Across New Zealand | Heat Control Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide heat control window film for homes in Christchurch and across New Zealand. | Make a sunny lounge or bedroom more comfortable. Reduce solar heat through suitable glass while considering the daylight and view you want to keep. We provide heat control window film for homes in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Heat Control Window Films | Christchurch Heat Control Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 5: Anti-glare window film — `/residential-window-tinting/anti-glare-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Anti-Glare Window Film Christchurch | Anti-Glare Window Film Christchurch | h1 | PASS |
| Hero large headline | Anti-Glare Window Film Across New Zealand | Anti-Glare Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide anti-glare window film for homes in Christchurch and across New Zealand. | Read, relax and see your screens with less harsh brightness. Choose a comfortable level of light without covering the view all day. We provide anti-glare window film for homes in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Anti-Glare Window Films | Christchurch Anti-Glare Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 6: Frosted and opaque window film — `/residential-window-tinting/frosted-opaque-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Frosted and Opaque Window Film Christchurch | Frosted and Opaque Window Film Christchurch | h1 | PASS |
| Hero large headline | Frosted and Opaque Window Film Across New Zealand | Frosted and Opaque Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide frosted and opaque window film for homes in Christchurch and across New Zealand. | Create privacy in bathrooms, entrances and internal glass. Compare full or partial coverage and a finish that keeps the space inviting. We provide frosted and opaque window film for homes in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Frosted Window Films | Christchurch Frosted Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 7: Safety and security window film — `/residential-window-tinting/safety-security-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Safety and Security Window Film Christchurch | Safety and Security Window Film Christchurch | h1 | PASS |
| Hero large headline | Safety and Security Window Film Across New Zealand | Safety and Security Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide safety and security window film for homes in Christchurch and across New Zealand. | Explore film that can help hold broken glass together. We assess your windows and the protection you need before recommending a product. We provide safety and security window film for homes in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Safety Window Films | Christchurch Safety Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 8: Commercial window tinting — `/commercial-window-tinting-services`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Commercial Window Tinting Christchurch | Commercial Window Tinting Christchurch | h1 | PASS |
| Hero large headline | Commercial Window Tinting Across New Zealand | Commercial Window Tinting Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide commercial window tinting for businesses in Christchurch and across New Zealand. | Give staff and customers a more comfortable space. Explore films for heat, glare, privacy and suitable glass protection, planned around your business. We provide commercial window tinting for businesses in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Commercial Window Tinting | Christchurch Commercial Window Tinting | p | PASS |
| Film-options label | Christchurch Commercial Tinting | Christchurch Commercial Tinting | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 9: Heat and solar control window film — `/commercial-window-tinting/heat-rejection-solar-protection-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Commercial Heat Control Window Film Christchurch | Commercial Heat Control Window Film Christchurch | h1 | PASS |
| Hero large headline | Commercial Heat Control and Solar Protection Window Film Across New Zealand | Commercial Heat Control and Solar Protection Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide heat control and solar protection window film for commercial properties in Christchurch and across New Zealand. | Help reduce solar heat in offices, shops and shared spaces. Compare films that balance heat control, daylight and the appearance of your building. We provide heat control and solar protection window film for commercial properties in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Solar Control Window Films | Christchurch Solar Control Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 10: Commercial anti-glare window film — `/commercial-window-tinting/anti-glare-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Commercial Anti-Glare Window Film Christchurch | Commercial Anti-Glare Window Film Christchurch | h1 | PASS |
| Hero large headline | Commercial Anti-Glare Window Film Across New Zealand | Commercial Anti-Glare Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide anti-glare window film for commercial properties in Christchurch and across New Zealand. | Make bright offices, classrooms and customer areas easier to use. Ease harsh sunlight around screens, work surfaces and seating. We provide anti-glare window film for commercial properties in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Anti-Glare Window Films | Christchurch Anti-Glare Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 11: Anti-graffiti window film — `/commercial-window-tinting/anti-graffiti-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Anti-Graffiti Window Film Christchurch | Anti-Graffiti Window Film Christchurch | h1 | PASS |
| Hero large headline | Anti-Graffiti Window Film Across New Zealand | Anti-Graffiti Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide anti-graffiti window film for commercial properties in Christchurch and across New Zealand. | Add a replaceable protective layer to suitable exposed glass. Help care for the shopfront or entrance that customers see every day. We provide anti-graffiti window film for commercial properties in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Anti-Graffiti Window Films | Christchurch Anti-Graffiti Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 12: Frosted opaque and decorative film — `/commercial-window-tinting/frosted-opaque-decorative-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Commercial Frosted, Opaque and Decorative Window Film Christchurch | Commercial Frosted, Opaque and Decorative Window Film Christchurch | h1 | PASS |
| Hero large headline | Commercial Frosted, Opaque and Decorative Window Film Across New Zealand | Commercial Frosted, Opaque and Decorative Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide frosted, opaque and decorative window film for commercial properties in Christchurch and across New Zealand. | Give meeting rooms, partitions and reception glass a purposeful finish. Plan privacy, daylight and decorative detail together. We provide frosted, opaque and decorative window film for commercial properties in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Decorative Window Films | Christchurch Decorative Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

### Page 13: Commercial safety and security film — `/commercial-window-tinting/safety-security-window-films`

| Element | DOCX exact string | Built string | Tag | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Hero small eyebrow | Commercial Safety and Security Window Film Christchurch | Commercial Safety and Security Window Film Christchurch | h1 | PASS |
| Hero large headline | Commercial Safety and Security Window Film Across New Zealand | Commercial Safety and Security Window Film Across New Zealand | span | PASS |
| Hero paragraph: baseline + appendix | We provide safety and security window film for commercial properties in Christchurch and across New Zealand. | Assess the glass and the risk before choosing protection. Discuss suitable products, system requirements and clear installation arrangements. We provide safety and security window film for commercial properties in Christchurch and across New Zealand. | p | PASS |
| Overview eyebrow | Christchurch Safety Window Films | Christchurch Safety Window Films | p | PASS |
| Film-options label | Christchurch Film Options | Christchurch Film Options | p | PASS |
| Closing label | Christchurch Tinting Advice | Christchurch Tinting Advice | p | PASS |
| Final H2 (retained) | Tell us what you would like to change. | Tell us what you would like to change. | h2 | PASS |

## Final-check items per page

| Page | Sole H1 = eyebrow | Headline SPAN + New Zealand | Section labels P/SPAN | Original H2s (count) | Meta/title/canonical/URL | Actions + images | Manifest H1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | PASS | PASS | PASS | PASS (16) | PASS | PASS | PASS |
| 1 | PASS | PASS | PASS | PASS (16) | PASS | PASS | PASS |
| 2 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 3 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 4 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 5 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 6 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 7 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 8 | PASS | PASS | PASS | PASS (16) | PASS | PASS | PASS |
| 9 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 10 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 11 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 12 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |
| 13 | PASS | PASS | PASS | PASS (17) | PASS | PASS | PASS |

H1s also retain class `hero-eyebrow`; headline role is `span.hero-headline`. All service final titles “Tell us what you would like to change.” remain H2. All eleven per-page boolean checks are true in the machine evidence.

## Replaced old strings and legitimate retained uses

No old target remains in its replaced element. “For your home”, “For your workplace”, “Made for your space”, “Your next step”, old homepage eyebrows and old replaced homepage sentences are absent from visible page text. There are **30 legitimate remaining occurrences** of “Residential Services”/“Commercial Services”: unchanged form service-picker legends, not film-options labels. Each exact DOM location is listed below. No old-label exemption was applied to a film-options section.

| Page | Old string | Legitimate location |
| --- | --- | --- |
| / | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < div.form-panel < section#home-enquiry.section.home-enquiry < main#main < body.fresh.page-home < html |
| / | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-home < html |
| / | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < div.form-panel < section#home-enquiry.section.home-enquiry < main#main < body.fresh.page-home < html |
| / | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-home < html |
| /residential-window-tinting-services | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-hub < html |
| /residential-window-tinting-services | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-hub < html |
| /residential-window-tinting/fade-reduction-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/fade-reduction-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/privacy-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/privacy-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/heat-control-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/heat-control-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/anti-glare-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/anti-glare-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/frosted-opaque-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/frosted-opaque-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/safety-security-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /residential-window-tinting/safety-security-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-residential < html |
| /commercial-window-tinting-services | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-hub < html |
| /commercial-window-tinting-services | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-hub < html |
| /commercial-window-tinting/heat-rejection-solar-protection-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/heat-rejection-solar-protection-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/anti-glare-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/anti-glare-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/anti-graffiti-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/anti-graffiti-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/frosted-opaque-decorative-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/frosted-opaque-decorative-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/safety-security-window-films | Residential Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |
| /commercial-window-tinting/safety-security-window-films | Commercial Services | legend < fieldset < details.service-picker < form.quick-quote-form < dialog.quote-dialog < body.fresh.page-commercial < html |

## Scope integrity against the original build

| Excluded HTML | Result |
| --- | --- |
| 404.html | PASS — byte-identical |
| about/index.html | PASS — byte-identical |
| contact-for-window-tinting/index.html | PASS — byte-identical |
| design-review/index.html | PASS — only allowed cells below differ |
| design-review/project-story/index.html | PASS — byte-identical |
| locations/arrowtown/index.html | PASS — byte-identical |
| locations/ashburton/index.html | PASS — byte-identical |
| locations/christchurch/index.html | PASS — byte-identical |
| locations/cromwell/index.html | PASS — byte-identical |
| locations/geraldine/index.html | PASS — byte-identical |
| locations/index.html | PASS — byte-identical |
| locations/lake-tekapo/index.html | PASS — byte-identical |
| locations/oamaru/index.html | PASS — byte-identical |
| locations/queenstown/index.html | PASS — byte-identical |
| locations/temuka/index.html | PASS — byte-identical |
| locations/timaru/index.html | PASS — byte-identical |
| locations/wanaka/index.html | PASS — byte-identical |
| thank-you/index.html | PASS — byte-identical |
| window-tinting-faq/index.html | PASS — byte-identical |
| window-tinting-gallery/index.html | PASS — byte-identical |

All **34/34 footer HTML chunks are byte-identical**, including the fourteen edited pages, all excluded pages and generated reports. All excluded route-manifest records are identical; the fourteen included records differ only in H1 and now match the actual rendered eyebrow H1. Route paths and all other fields remain identical.

### Every changed design-review cell

| Page | Field | Before → after |
| --- | --- | --- |
| 0 / | keyword count | 4 → 3 |
| 0 / | word count | 1426 → 1433 |
| 1 /residential-window-tinting-services | word count | 1423 → 1439 |
| 2 /residential-window-tinting/fade-reduction-window-films | word count | 1442 → 1462 |
| 3 /residential-window-tinting/privacy-window-films | word count | 1382 → 1396 |
| 4 /residential-window-tinting/heat-control-window-films | word count | 1444 → 1461 |
| 5 /residential-window-tinting/anti-glare-window-films | word count | 1413 → 1427 |
| 6 /residential-window-tinting/frosted-opaque-window-films | word count | 1359 → 1378 |
| 7 /residential-window-tinting/safety-security-window-films | word count | 1351 → 1370 |
| 8 /commercial-window-tinting-services | word count | 1430 → 1446 |
| 9 /commercial-window-tinting/heat-rejection-solar-protection-window-films | word count | 1418 → 1443 |
| 10 /commercial-window-tinting/anti-glare-window-films | word count | 1389 → 1406 |
| 11 /commercial-window-tinting/anti-graffiti-window-films | word count | 1321 → 1337 |
| 12 /commercial-window-tinting/frosted-opaque-decorative-window-films | word count | 1367 → 1392 |
| 13 /commercial-window-tinting/safety-security-window-films | word count | 1270 → 1292 |

These are exactly fifteen cells: fourteen word counts and one Home keyword count. Replacing only these cells reconstructs the original report byte for byte. No header, other count, excluded row, markup or footer difference remains.

## Complete copy changes outside the DOCX

| Page / element | Original → final | Final controlling source / key | Revert |
| --- | --- | --- | --- |
| Home, benefits help question (.home-outcome-help > p) | Not sure where to start? → Not sure about window film in Christchurch? | website/src/homepage-refinement.mjs — homepageRefinement().benefits | Replace ${exactCopy(esc('Not sure about window film in Christchurch?'))} with the original literal Not sure where to start? and rebuild; this restores the pre-existing keyword shortfall caused by the DOCX replacements. |

This is the complete list, established by diffing visible-body text on all fourteen pages against the original build. The evidence records every DOCX replacement, including unchanged paragraph remainders and shared labels. After masking/reversing those replacements, all thirteen service bodies match the original visible text exactly; on Home, reversing only the question above produces the original text exactly. No service page needed an additional keyword-copy fix. The question was previously accepted; **Not in DOCX: review needed** remains its provenance.

## Final keyword and word-count summary

| Page | Words | Assigned natural keyword counts | Min 3 / 1,000–1,500 |
| --- | --- | --- | --- |
| 0 / | 1433 | window tinting christchurch: 3; window tint christchurch: 3; window film christchurch: 3 | PASS |
| 1 /residential-window-tinting-services | 1439 | residential window tinting christchurch: 4; house window tinting christchurch: 3 | PASS |
| 2 /residential-window-tinting/fade-reduction-window-films | 1462 | fade reducing & uv window film christchurch: 4; fade reducing window film christchurch: 3 | PASS |
| 3 /residential-window-tinting/privacy-window-films | 1396 | window privacy film installation christchurch: 3; privacy window film christchurch: 4 | PASS |
| 4 /residential-window-tinting/heat-control-window-films | 1461 | heat control window film christchurch: 5 | PASS |
| 5 /residential-window-tinting/anti-glare-window-films | 1427 | Anti Glare Window Film Christchurch: 5 | PASS |
| 6 /residential-window-tinting/frosted-opaque-window-films | 1378 | frosted and opaque window film christchurch: 4; opaque window film christchurch: 4 | PASS |
| 7 /residential-window-tinting/safety-security-window-films | 1370 | safety & security window film christchurch: 5 | PASS |
| 8 /commercial-window-tinting-services | 1446 | commercial window tinting christchurch: 5 | PASS |
| 9 /commercial-window-tinting/heat-rejection-solar-protection-window-films | 1443 | commercial heat control window film christchurch: 4; solar protection window films christchurch: 4 | PASS |
| 10 /commercial-window-tinting/anti-glare-window-films | 1406 | Commercial Anti-Glare Window Films Christchurch: 4 | PASS |
| 11 /commercial-window-tinting/anti-graffiti-window-films | 1337 | anti graffiti window films christchurch: 4 | PASS |
| 12 /commercial-window-tinting/frosted-opaque-decorative-window-films | 1392 | commercial frosted and opaque window film christchurch: 3; decorative window film christchurch: 5 | PASS |
| 13 /commercial-window-tinting/safety-security-window-films | 1292 | commercial safety & security window film christchurch: 5 | PASS |

## Visual QA and open issues

Chrome rendered **42 final full pages** (all fourteen × 1440/768/375px), plus the corresponding **42 original-baseline full pages**. All image requests/fonts were awaited; console/page/network errors were captured: zero. All 84 document scroll widths equal the viewport width: no whole-document horizontal overflow. Full-page layouts were inspected using overview sheets; every final hero and every service overview/closing section was also inspected using larger region sheets, plus the three changed Home sections. Original/final film-options captures and card geometry confirm the defects below. Native full-resolution PNGs remain available; overview inspection does not claim native-size proofreading of every unchanged lower-page sentence.

No new hero or changed-eyebrow/paragraph clipping, collision or spacing defect was observed. Each small H1 is readable at 375px (12px/18px line height). Headlines/paragraphs stack normally on mobile, with a clear divider and separated buttons. Pages 9 and 12 are taller because of their copy, but the headline/paragraph/actions do not collide. Both have H1/headline line counts **1/4 at 1440px, 1/3 at 768px, and 2/5 at 375px**. No forced overflow; balanced wrapping remains plausible despite the long mobile headline.

| Pages | Width | Original → final measurement | Issue / classification |
| --- | --- | --- | --- |
| 2, 4, 5, 9, 10 | 768px | First two card widths 48px → 48px on each page | Text/icons overlap and clip inside collapsed cards; pre-existing. |
| 2, 4, 5, 9, 10 | 375px | First card width 44px → 44px on each page | Text wraps into narrow fragments and clips; pre-existing. |
| 1, 3, 6, 7, 8, 11, 12, 13 | 768px / 375px | Normal scroll cards approximately 340px / 278px | No same collapsed-card defect observed; partial next-card visibility is the existing horizontal-scroller crop. |
| All service pages | 1440px | Normal desktop cards | No same collapsed-card defect observed. |

**Page 5 is the additional affected page found in final QA.** Original and final region captures show the same defect there too; it is not introduced by the accepted copy changes. No fixes were attempted. The existing mobile/tablet fixed quote/call bar is present in full-page screenshots near the initial viewport bottom; it can cross a stitched image region. It is an existing viewport overlay, not evidence that the section is permanently clipped. No additional new layout failure was found in the reviewed static states.

Screenshot directory: [Changes/screenshots/final-qa-05-11-26](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/screenshots/final-qa-05-11-26>). Final full pages: `page-NN-WIDTH.png`; original full pages: `baseline/`; hero/Home/film detail: `regions/`; original film detail: `baseline-regions/`; overview and side-by-side inspection sheets: `inspection/`. Geometry/errors: [Changes/screenshots/final-qa-05-11-26/render-results.json](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/screenshots/final-qa-05-11-26/render-results.json>).

Checked static page layout, heroes, changed Home intro/audience/enquiry sections, service overview/film/closing regions, full-page continuity, overflow metrics and resource errors at the three requested widths. Did not click menus, accordions, carousel arrows, quote dialogs, telephone links, upload controls or form actions; did not submit forms, test keyboard/screen-reader interaction, other browsers/devices/widths, live hosting or deployment. HTTP links were checked separately by the existing checker. No interactive-QA pass is claimed.

## Complete changed-file inventory

450 changed/added files are individually listed below, including every prior task artifact under Changes and this final QA evidence. **Removed original files: 0.** Unchanged generated dist assets are omitted after original-build byte comparison. Original audit/report files are compared to the supplied original project hashes, so regeneration is visible even when metadata values themselves are protected and unchanged. Machine inventory: [Changes/final-qa-evidence/changed-files.json](<D:/Aditya Digital Neighbour/Tint-A-Window/Changes/final-qa-evidence/changed-files.json>).

| File | Status | One-line reason |
| --- | --- | --- |
| Changes/Aditya_05-11-26.md | Added | Requested task change map, changelog, verification evidence or QA report. |
| Changes/Final_QA_05-11-26.md | Added | Requested task change map, changelog, verification evidence or QA report. |
| Changes/final-qa-evidence/audit.json | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/audit_final.py | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/build.log | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/changed-files.json | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/docx-extraction.json | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/links.log | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/original-tree-proof.json | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/prove-original.mjs | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/render_final.cjs | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/source-guard.json | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/visible-text-replacements.json | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/final-qa-evidence/write_report.py | Added | Final read-only QA evidence, audit/report helper or complete inventory; not part of the build chain. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-01-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-01-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-01-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-02-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-02-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-02-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-03-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-03-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-03-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-04-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-04-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-04-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-05-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-05-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-05-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-06-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-06-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-06-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-07-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-07-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-07-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-08-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-08-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-08-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-09-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-09-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-09-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-10-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-10-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-10-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-11-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-11-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-11-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-12-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-12-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-12-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-13-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-13-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline-regions/page-13-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-00-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-00-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-00-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-01-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-01-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-01-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-02-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-02-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-02-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-03-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-03-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-03-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-04-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-04-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-04-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-05-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-05-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-05-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-06-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-06-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-06-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-07-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-07-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-07-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-08-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-08-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-08-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-09-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-09-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-09-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-10-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-10-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-10-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-11-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-11-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-11-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-12-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-12-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-12-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-13-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-13-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/baseline/page-13-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-01.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-02.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-03.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-04.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-05.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-06.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-07.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-08.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-09.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-10.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-11.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-12.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/closing-13.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-02-375.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-02-768.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-04-375.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-04-768.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-05-375.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-05-768.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-09-375.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-09-768.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-10-375.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/film-10-768.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/full-pages-1440.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/full-pages-375.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/full-pages-768.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-00.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-01.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-02.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-03.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-04.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-05.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-06.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-07.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-08.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-09.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-10.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-11.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-12.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/hero-13.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/home-audience.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/home-enquiry.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/home-intro.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-01.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-02.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-03.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-04.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-05.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-06.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-07.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-08.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-09.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-10.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-11.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-12.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/inspection/overview-13.jpg | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-00-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-00-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-00-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-01-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-01-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-01-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-02-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-02-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-02-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-03-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-03-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-03-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-04-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-04-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-04-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-05-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-05-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-05-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-06-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-06-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-06-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-07-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-07-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-07-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-08-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-08-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-08-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-09-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-09-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-09-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-10-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-10-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-10-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-11-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-11-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-11-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-12-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-12-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-12-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-13-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-13-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/page-13-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-1440-audience.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-1440-enquiry.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-1440-intro.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-375-audience.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-375-enquiry.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-375-intro.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-768-audience.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-768-enquiry.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-00-768-intro.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-01-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-01-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-01-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-01-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-01-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-01-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-02-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-02-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-02-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-02-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-02-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-02-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-03-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-03-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-03-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-03-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-03-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-03-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-04-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-04-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-04-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-04-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-04-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-04-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-05-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-05-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-05-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-05-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-05-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-05-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-06-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-06-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-06-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-06-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-06-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-06-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-07-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-07-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-07-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-07-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-07-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-07-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-08-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-08-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-08-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-08-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-08-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-08-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-09-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-09-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-09-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-09-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-09-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-09-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-10-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-10-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-10-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-10-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-10-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-10-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-11-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-11-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-11-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-11-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-11-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-11-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-12-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-12-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-12-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-12-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-12-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-12-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-13-1440-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-13-1440-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-13-375-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-13-375-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-13-768-film-options.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/regions/page-13-768-hero.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/final-qa-05-11-26/render-results.json | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/homepage-05-11-26/hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/homepage-05-11-26/hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/homepage-05-11-26/hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/homepage-05-11-26/layout.json | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/service-1-05-11-26/film-options-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/service-1-05-11-26/film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/service-1-05-11-26/film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/service-1-05-11-26/hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/service-1-05-11-26/hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/service-1-05-11-26/hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/service-1-05-11-26/layout.json | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/baseline/page-2-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/baseline/page-2-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/baseline/page-4-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/baseline/page-4-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/layout.json | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-2-film-options-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-2-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-2-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-2-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-2-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-2-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-3-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-3-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-3-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-4-film-options-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-4-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-4-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-4-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-4-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-4-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-5-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-5-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-5-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-6-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-6-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-6-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-7-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-7-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-2-7-05-11-26/page-7-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-10-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-10-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-11-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-11-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-12-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-12-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-13-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-13-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-8-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-8-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-9-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/baseline/page-9-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/layout.json | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-10-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-10-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-10-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-10-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-10-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-11-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-11-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-11-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-11-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-11-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-12-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-12-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-12-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-12-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-12-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-13-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-13-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-13-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-13-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-13-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-8-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-8-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-8-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-8-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-8-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-9-film-options-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-9-film-options-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-9-hero-1440.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-9-hero-375.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| Changes/screenshots/services-8-13-05-11-26/page-9-hero-768.png | Added | Saved QA screenshot, visual inspection sheet or render measurements for the named page/viewport and baseline. |
| website/SECTION-REVIEW.csv | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/about.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/commercial-window-tinting-services.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/commercial-window-tinting__anti-glare-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/commercial-window-tinting__anti-graffiti-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/commercial-window-tinting__frosted-opaque-decorative-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/commercial-window-tinting__heat-rejection-solar-protection-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/commercial-window-tinting__safety-security-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/contact-for-window-tinting.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/home.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__arrowtown.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__ashburton.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__christchurch.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__cromwell.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__geraldine.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__lake-tekapo.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__oamaru.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__queenstown.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__temuka.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__timaru.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/locations__wanaka.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/residential-window-tinting-services.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/residential-window-tinting__anti-glare-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/residential-window-tinting__fade-reduction-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/residential-window-tinting__frosted-opaque-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/residential-window-tinting__heat-control-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/residential-window-tinting__privacy-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/residential-window-tinting__safety-security-window-films.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/window-tinting-faq.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/audit-text/window-tinting-gallery.txt | Added | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/build.mjs | Modified | Record the actual rendered H1 on the fourteen scoped routes. |
| website/content-audit.csv | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/content-audit.json | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/content-review.txt | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/design-audit.json | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/dist/client-polish.css | Generated changed | Generated copy of the corresponding changed public stylesheet. |
| website/dist/commercial-window-tinting-services/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/commercial-window-tinting/anti-glare-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/commercial-window-tinting/anti-graffiti-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/commercial-window-tinting/frosted-opaque-decorative-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/commercial-window-tinting/heat-rejection-solar-protection-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/commercial-window-tinting/safety-security-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/design-review/index.html | Generated changed | Generated report: only the fifteen listed allowed measurement cells differ from the original build. |
| website/dist/film-guide.css | Generated changed | Generated copy of the corresponding changed public stylesheet. |
| website/dist/fresh.css | Generated changed | Generated copy of the corresponding changed public stylesheet. |
| website/dist/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/launch-polish-717.css | Generated changed | Generated copy of the corresponding changed public stylesheet. |
| website/dist/refinement.css | Generated changed | Generated copy of the corresponding changed public stylesheet. |
| website/dist/residential-window-tinting-services/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/residential-window-tinting/anti-glare-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/residential-window-tinting/fade-reduction-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/residential-window-tinting/frosted-opaque-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/residential-window-tinting/heat-control-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/residential-window-tinting/privacy-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/residential-window-tinting/safety-security-window-films/index.html | Generated changed | Generated HTML from the accepted scoped copy/hero changes. |
| website/dist/routes.json | Generated changed | Generated build asset; added relative to the supplied project, compared separately to the original built baseline. |
| website/dist/signature.css | Generated changed | Generated copy of the corresponding changed public stylesheet. |
| website/dist/style.css | Generated changed | Generated copy of the corresponding changed public stylesheet. |
| website/keyword-audit.csv | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/keyword-source-check.json | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/metadata-review.json | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/public/client-polish.css | Modified | Retarget affected hero headline/eyebrow styling while retaining excluded-layout selectors and responsive rules. |
| website/public/film-guide.css | Modified | Retarget affected hero headline/eyebrow styling while retaining excluded-layout selectors and responsive rules. |
| website/public/fresh.css | Modified | Retarget affected hero headline/eyebrow styling while retaining excluded-layout selectors and responsive rules. |
| website/public/launch-polish-717.css | Modified | Retarget affected hero headline/eyebrow styling while retaining excluded-layout selectors and responsive rules. |
| website/public/refinement.css | Modified | Retarget affected hero headline/eyebrow styling while retaining excluded-layout selectors and responsive rules. |
| website/public/signature.css | Modified | Retarget affected hero headline/eyebrow styling while retaining excluded-layout selectors and responsive rules. |
| website/public/style.css | Modified | Retarget affected hero headline/eyebrow styling while retaining excluded-layout selectors and responsive rules. |
| website/qa-final.json | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/qa-http-polish.json | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/route-manifest.json | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/site-audit.json | Modified | Generated build/check report reflecting the accepted copy, rendered H1s or fresh check results; not a check implementation. |
| website/src/brand-pages.mjs | Modified | Read scoped headline data at the banner-title controlling layer. |
| website/src/customer-polish.mjs | Modified | Protect exact-copy segments and apply scoped rendered-lead overrides without changing other polish behaviour. |
| website/src/final-content.mjs | Modified | Use scoped national-copy hero-lead data at its controlling layer. |
| website/src/fresh-design.mjs | Modified | Render scoped eyebrow H1/headline SPAN and the accepted homepage audience copy. |
| website/src/homepage-refinement.mjs | Modified | Apply exact homepage introduction copy and the accepted additional keyword question. |
| website/src/national-copy.mjs | Added | New exact-copy configuration/helper for Home, service indexes 1–13 and shared labels. |
| website/src/quote-form.mjs | Modified | Apply exact homepage enquiry eyebrow and first sentence. |
| website/src/revised-content.mjs | Modified | Apply scoped overview eyebrows and the shared closing label. |
| website/verify-homepage.py | Added | New standalone homepage exact-copy and scope verifier; outside the build chain. |
| website/verify-service-pages.py | Added | New standalone data-driven service-copy and scope verifier; outside the build chain. |
| website/verify-shared-mechanism.py | Added | New standalone shared-structure, labels and scope verifier; outside the build chain. |

### Protected implementations

No original check script, threshold, keyword assignment/map, keyword-matching implementation, final-proof-copy.json, package script, deployment script or proof-content.py was modified. All original changes are the accepted rendering/data/CSS files and regenerated reports listed above; all three standalone verifier scripts are new relative to the original project and were **not edited in this QA pass**. This final pass wrote generated build/check output and new Changes evidence only, plus the specifically requested changelog pointer.

## Verdict

**Ready for review.** The fourteen accepted pages match the DOCX exactly, scope integrity holds against the authenticated original build, and all four internal checks pass. Open items are the accepted 34/35 link assertion and the pre-existing film-card readability failures on pages 2, 4, 5, 9 and 10 at 768px/375px. Visual QA is therefore not an unconditional PASS or launch sign-off. No source fix, check bypass, deployment or hosting action was taken. Stopped for review.
