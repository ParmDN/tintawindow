# Tint A Window

Source code, content references, and review evidence for the Tint A Window website. The site presents residential and commercial window films, service locations, project photography, FAQs, and enquiry forms.

The website uses a custom Node.js static-site generator with JavaScript modules, HTML templates, CSS, and browser JavaScript. Python scripts check the generated content and structure. The package is private and currently identifies itself as version `7.20.0`.

## Getting started

### Requirements

- Node.js 22 or later and npm.
- Python 3, available as `python3` for the npm build and check scripts.

Run these commands from the repository root:

```sh
cd website
npm ci
npm run build
npm run dev
```

Open [the local preview](http://localhost:4325). Stop the server with `Ctrl+C`.

`npm run dev` serves the existing `website/dist/` directory. It does not build the site or watch source files. After editing, rebuild and refresh the browser.

If Windows exposes Python as `python` rather than `python3`, build and run the same checks explicitly from `website/`:

```sh
node build.mjs
python check-content.py
python check-site.py
python check-design.py
python check-final.py
```

To use another preview port in PowerShell:

```powershell
$env:PORT = "4326"
npm run dev
```

The server binds to `127.0.0.1`. The HTTP check script expects port `4325`.

## File structure

The tree below highlights the main files and groups repetitive assets, reports, and rendering modules.

```text
Tint-A-Window/
|-- README.md                         # Project overview and development guide
|-- README-FIRST.md                   # Original source-handover instructions
|-- HANDOFF-NOTES-2026-11-05.md        # Dated feedback and handover context
|-- BUILD-VERIFICATION.md             # Historical build-verification record
|-- MANIFEST.sha256                   # Handover file checksums
|-- .gitignore                        # Local environment/dependency exclusions
|-- package-lock.json                 # Root lockfile; app commands run in website/
|-- Changes/
|   |-- Aditya_05-11-26.md             # Dated change notes
|   |-- Aditya_10-11-26.md             # Forms review and implementation proposals
|   |-- Final_QA_05-11-26.md           # QA findings
|   |-- final-qa-evidence/            # Audit scripts, logs, and evidence
|   `-- screenshots/                 # Responsive screenshots and baselines
|-- page-copy/
|   |-- README.md                     # Editorial export notes
|   |-- home.md                       # Readable homepage copy
|   |-- about.md                      # Readable About copy
|   `-- *.md                          # Service, location, contact, gallery, FAQ copy
|-- reference/
|   |-- CLIENT-INPUTS.md              # Client input reference
|   |-- DESIGN-DIRECTION.md           # Design guidance
|   |-- PRODUCTION-HANDOFF.md          # Production handover context
|   |-- SOURCES.md                    # Source references
|   |-- latest-qa/                    # QA notes and screenshots
|   `-- ...                           # Dated reviews and provenance records
`-- website/
    |-- package.json                  # Application scripts and dependencies
    |-- package-lock.json             # Application dependency lockfile
    |-- .env.example                  # Optional Sanity environment variable names
    |-- README.md                     # Pointer to the original handover guide
    |-- build.mjs                     # Static page generation and asset copying
    |-- server.mjs                    # Local static preview server
    |-- src/
    |   |-- site-data.mjs              # Page definitions, routes, and shared data
    |   |-- final-proof-copy.json      # Final copy data used by proofing layer
    |   |-- final-proof.mjs            # Final copy rendering helpers
    |   |-- editorial-review.mjs       # Shared editorial transformations
    |   |-- customer-polish.mjs        # Final page refinements
    |   |-- homepage-refinement.mjs    # Homepage refinement helpers
    |   |-- footer.mjs                # Shared footer rendering
    |   |-- quote-form.mjs            # Quote form and dialog markup
    |   |-- thank-you.mjs             # Confirmation page markup
    |   |-- image-manifest.json        # Image metadata and responsive variants
    |   |-- media-map-717.mjs          # Page-to-photo mapping
    |   |-- social-links.json         # Social destination data
    |   |-- keyword-map*.json          # Keyword mapping snapshots
    |   |-- lib/forms/
    |   |   |-- config.js             # Supported form configuration
    |   |   |-- date.js               # Submission date helper
    |   |   `-- saveSubmission.js      # Optional server-side Sanity logging helper
    |   |-- sanity/
    |   |   |-- lib/writeClient.js     # Server-only Sanity client configuration
    |   |   |-- schemas/               # Form submission schema and exports
    |   |   `-- structure/             # Form submission Studio structure helper
    |   `-- ...                       # Additional content and rendering modules
    |-- public/
    |   |-- assets/                   # Images, fonts, logos, videos, and captions
    |   |-- site.js                   # Shared browser interactions
    |   |-- enquiry-flow.js           # Local preview enquiry completion flow
    |   |-- style.css                 # Base styles
    |   |-- placement-polish-720.css   # Later photo placement/spacing refinements
    |   `-- ...                       # Additional CSS, scripts, and favicon
    |-- dist/                         # Generated site; created by build.mjs
    |-- audit-text/                   # Generated page-text audit extracts
    |-- check-content.py              # Content and keyword audit
    |-- check-site.py                 # Generated HTML, links, and asset checks
    |-- check-design.py               # Design structure checks
    |-- check-final.py                # Final regression checks
    |-- check-http.py                 # Local HTTP response checks
    |-- check-enquiry-flow.mjs         # Preview enquiry attribution checks
    |-- package-vercel-review.py      # Static Vercel review-package generator
    |-- package-review.py             # Legacy offline review-package utility
    `-- ...                           # Other verification tools and CSV/JSON reports
```

`node_modules/`, `dist/`, and review-package output are installed or generated directories. Source content lives in `website/src/` and `website/public/`. Files in `page-copy/` are readable editorial references; editing them does not update the rendered website.

## Available commands

Run these commands inside `website/`:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies from the application lockfile, including `@sanity/client`. |
| `npm run build` | Generate `dist/`, copy public assets, then run the four Python checks. |
| `npm run dev` | Serve the generated site at `http://localhost:4325`. |
| `npm run check` | Run the four Python checks against an existing build. |
| `npm run check:links` | Check local HTTP responses while the preview server runs on port `4325`. |
| `node check-enquiry-flow.mjs` | Check preview form origins, one-time attribution, receipt expiry, and blocked storage. |
| `python3 package-vercel-review.py` | Generate a static review bundle under `website/vercel-review/`; does not deploy it. |
| `npm run package:review` | Run the legacy offline packaging utility; review/update its older labels before release use. |

The build also writes route, keyword, migration, content, and QA reports into `website/`. Some checks update report files, so inspect the working-tree diff after running them.

## Editing the website

| Task | Main source files |
| --- | --- |
| Routes, page data, contact details | `website/src/site-data.mjs` |
| Metadata and keyword ownership | `website/src/site-data.mjs`, `website/src/enhancements.mjs`, `website/src/keyword-map*.json` |
| Service and location wording | `website/src/final-proof-copy.json`, `website/src/final-proof.mjs` |
| Shared wording and final refinements | `website/src/editorial-review.mjs`, `website/src/customer-polish.mjs` |
| Layout and page generation | `website/build.mjs`, rendering modules in `website/src/` |
| Homepage and team media | `website/src/homepage-refinement.mjs`, `website/src/shoot-media.mjs` |
| Photography | `website/src/media-map-717.mjs`, `website/src/client-media.mjs`, `website/src/image-manifest.json` |
| Browser behavior and styling | `website/public/*.js`, `website/public/*.css` |
| Footer and social links | `website/src/footer.mjs`, `website/src/social-links.json` |
| Enquiry preview | `website/src/quote-form.mjs`, `website/src/thank-you.mjs`, `website/public/enquiry-flow.js` |

The build applies multiple content and design layers. Later transformations can override earlier edits. If a change does not appear, inspect the final proof, editorial review, and customer polish modules, along with stylesheet order in `build.mjs`.

Edit source files and rebuild. Changes made directly to generated pages can be overwritten. Review Home, service pages, location pages, About, the gallery, navigation, and forms at desktop, tablet, and phone widths after relevant changes.

## Forms and optional Sanity integration

The Home, Contact, and quote-popup forms currently demonstrate local selection and a thank-you journey. They do not send enquiries or upload selected photos. The preview server supports only `GET` and `HEAD`; no submission API is wired into it.

Server-side Sanity logging helpers, a submission schema, and a Studio structure helper exist under `website/src/`. These are integration building blocks: there is no configured Studio application or connected form endpoint in this repository.

The optional write helper reads these environment variables:

| Variable | Purpose |
| --- | --- |
| `SANITY_PROJECT_ID` | Target project; falls back to `NEXT_PUBLIC_SANITY_PROJECT_ID`. |
| `SANITY_SUBMISSIONS_DATASET` | Target dataset; falls back to `NEXT_PUBLIC_SANITY_DATASET`. |
| `SANITY_WRITE_TOKEN` | Server-side write token; falls back to `SANITY_API_TOKEN`. |

See [`website/.env.example`](website/.env.example) for the variable names. Credentials are unnecessary for the static build and preview. The helper skips writes without a token and disables its client if the project or dataset is missing. Adding credentials alone does not enable submissions: a server endpoint must validate data and call the helper.

Keep write tokens in the server environment. The current build and preview commands do not automatically load `.env` files. Do not put tokens in browser scripts, generated HTML, or public assets.

## Review packaging and launch status

The generated site is a **noindex review build**. The local server adds `X-Robots-Tag: noindex, nofollow`; the Vercel review packager creates additional review headers and configuration. The production sitemap draft is an output for review, not an instruction to enable indexing.

To prepare a review bundle, first complete `npm run build`, then run:

```sh
python3 package-vercel-review.py
```

The packager recreates the generated `website/vercel-review/public/` directory. It does not deploy the site or supply hosting credentials. The original handover identifies [the isolated review site](https://tint-a-window-review.vercel.app) as the review destination.

Production launch remains a separate step requiring the approval described in the handover, working enquiry delivery, server-side validation, spam protection, private photo handling, privacy/retention decisions, confirmed social destinations, and migration checks.

## Further documentation

- [Original handover guide](README-FIRST.md)
- [Handover notes, 5 November 2026](HANDOFF-NOTES-2026-11-05.md)
- [Forms review, 10 November 2026](Changes/Aditya_10-11-26.md)
- [Final QA record](Changes/Final_QA_05-11-26.md)
- [Production handover reference](reference/PRODUCTION-HANDOFF.md)
- [Editorial copy notes](page-copy/README.md)

Dated handover and review documents describe their respective snapshots. For example, older notes predate the Sanity dependency and helper files now present. Check the current source and `website/package.json` when those records differ from the implementation.
