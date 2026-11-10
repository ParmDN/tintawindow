# A clearer view: version 7 design direction

Subject: architectural window film for people choosing how their home or workplace feels. The main job is to help a visitor identify a relevant film and start a well-informed quote enquiry.

Palette: logo-led yellow #FFBA32, charcoal glass #293C3A, white #FFFFFF, glass neutral #DDE8E5 and paper #F4F4EF. These are website colour tokens, not a supplied brand-manual specification. No ornamental lines on photographs.

Typography: Manrope for headings and body copy. Both lines of each customer-page H1 use the same font. Cormorant Garamond italic remains a short editorial accent within selected sections. Long service headings use a smaller display size.

Signature: the original logo, curved film edges, strong yellow and dark glass, with authentic photographs kept separate from labelled illustrations and project placeholders.

Hero: a large left-aligned heading, supporting copy and paired enquiry buttons on the right, with a broad curved photograph below. On phones the heading, explanation and actions stack in reading order. Use Get a Quote and Call Now consistently.

Film guide: eight tint-selection pages use five illustrated shades. Three privacy/frosting pages use four finish categories. These comparisons explain appearance only. Heat, UV, glare and glass suitability require the selected product's documentation. Protection-only services keep purpose-specific guidance.

Light study: a single labelled diagram beside plain explanatory copy. Modest animated rays and a slow glass glow stop off screen, with global pause and reduced-motion support. No new animation dependency.

Home flow: introduction and scope → homes/businesses with imagery → benefits → how film works → selection guidance → reasons to choose → project slots → supply and installation → customer feedback and references → quote.

Service flow: service and outcome → problem recognition → film choices → property/industry applications → decision guidance → project slots → why choose → installation → FAQs → quote. Repeated source introductions are merged into the opening answer; no back-to-back introduction sections.

Layout vocabulary: photographic choice cards; a warm photographic benefit composition; a dark labelled light study; an editorial image/text spread; a specification comparison; large numbered steps only for the installation sequence; quiet customer quotations; expandable answers. No two adjacent content sections share the same surface. Consistency comes from type, spacing, colour and components, not identical section composition.

Project slots: two consistent logo placeholders on Home, both service overviews and all 11 service detail pages. Marked as placeholders, with no fabricated project, location, product, quotation or result. Separate from the existing real-photo gallery.

Local pages: replace the repeated city-swapped introduction, problem and FAQ blocks with individual planning questions and decisions grounded in the property, while retaining honest regional availability wording. No invented local offices or case studies.

Review criteria: useful story order, 29 mapped-page content checks, keyword ownership, desktop/mobile fit, project placeholder labelling, distinct adjacent surfaces, accessible interaction, reduced motion, original logo and functioning local enquiry preview.

## Refinement: pointers, wayfinding and footer

Keep bullet points as semantic lists. A paired-pane marker relates the points to the glass-and-film subject. Home benefits group the ten original points into comfort, privacy and protection beside a gallery image. Reasons to choose use an installation portrait and the existing experience statement on yellow, alongside supporting details on charcoal. Installation alone uses sequence numbers, connected as a horizontal desktop sequence and vertical mobile sequence. Supply and installation retain image/text spreads. More open letter spacing and consistent body sizes keep detailed copy comfortable to read.

The footer is a complete wayfinding area: original logo, social profile spaces, separate residential/commercial service columns, company links, a charcoal phone/email/hours band and a compact South Island directory. Verified profile destinations are configured in `src/social-links.json`; pending profiles remain labelled, non-interactive spans. No invented profile links or dead `#` anchors.

Service-page breadcrumb trails and in-page shortcuts help readers move from the page topic to film choices, suitable spaces, projects and answers. Location-page service panels use imagery and contextual service links.

## Detailed section refinement

Service problem sections use glass-blue spreads with a relevant photograph, topic-specific line icons and open text rows. Film-choice cards use restrained motifs; property and industry descriptions have architectural icons. The guide chapter uses illustrated tint or privacy finishes where relevant; safety, security and anti-graffiti retain suitable photography. No artwork is added over photography.

Motion is progressive enhancement using IntersectionObserver: short one-time entrances, small icon arrivals, image magnification on linked choices and directional link feedback. No information starts hidden. No continuous bobbing, scroll hijacking, animation library or third-party network dependency. Reduced-motion preference disables movement and stops the observer; changing the preference during a session is handled.

The customer-quote heading now works for home and business readers. Published quotations are unchanged. Footer contents and pending social-profile configuration are retained.
