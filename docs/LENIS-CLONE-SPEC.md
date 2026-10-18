# Lenis.dev-inspired portfolio spec

Reference: [lenis.dev](https://lenis.dev/) and [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis).

## Evidence and limits

The reference page text and official repository documentation were available for inspection. I sampled the user-provided recording in Edge at approximately 5, 15, 28, 40, 53, and 66 seconds. Those frames confirm the black/pink wordmark hero with a sparse particle field, horizontal landscape showcase cards, a transition to a pale section with a metallic hand study, and a numbered overlapping feature sequence. The local Edge browser could launch, but network access to the live site returned `ERR_NETWORK_ACCESS_DENIED`; Playwright is not installed. Exact live CSS values, font file names, bundle implementation, WebGL model, easing curves, and breakpoint cutoffs therefore remain unverified.

## Page sequence and adaptation

1. **Intro and wordmark** — Brief pink full-screen title reveal, then a large name treatment on black. Implemented as a short CSS wipe and name reveal; portfolio content remains in the document from first paint.
2. **Hero** — Oversized two-line name/role hierarchy, scroll cue, portfolio CTAs, and existing animated neural-network orb. Hero content shifts up as page progress advances.
3. **About / “Why smooth scroll?” analogue** — Sticky large heading and four sequential story panels: the existing first bio paragraph followed by the existing Learning, Experimenting, and Building principles. Profile photo and verified interests remain visible in this section.
4. **Project showcase** — Horizontal, scroll-linked track of the five existing projects. Cards retain project title, subtitle, status, category, technologies, repository/live links, and the existing detail dialog. Cards without a screenshot use an original CSS cover treatment.
5. **Statement transition** — Oversized display typography presents the two existing headline lines. A center-out light panel opens into the light narrative section; no new slogan is introduced.
6. **Light narrative / hand analogue** — Existing second bio paragraph and technical interests, with a lightweight original metallic SVG study. This is a decorative stand-in, not a WebGL hand model or a third-party asset.
7. **Capability stack** — Nine existing skill categories as overlapping sticky cards, numbered 01–09, showing original category description, skill names, evidence, and repository links.
8. **Certificates and documents** — All existing certificates plus the letter of recommendation use the same restrained list/card system and retain direct view/download actions.
9. **GitHub, coding profiles, resume, contact, footer** — Existing activity, profiles, resume actions, and contact links remain available in the closing section and footer.

## Visual tokens and motion

- Palette follows the supplied recording: near-black hero, warm pink around `#F68DA6`, white/pale neutral paper, dark text, and thin low-contrast rules. The exact reference color was not sampled from the live site.
- Fonts selected as open Google Fonts approximations: **Pirata One** for the personal wordmark, **Syne** for wide display headings, **Anton** for condensed uppercase labels/numerals, and **Inter** for body text. These are not claimed to be the site's original licensed fonts.
- Large section spacing, editorial alignment, fine borders, sparse pink accents, pill CTAs, landscape project panels, and a dark-to-light change carry the visual rhythm.
- Lenis remains native-scroll based with the official stylesheet, `respectReducedMotion`, a single automatic RAF loop, internal anchor support, and modal scroll prevention. Scroll-derived CSS variables are updated from Lenis's scroll event; no second scroll RAF loop is added.
- Text reveals use IntersectionObserver. Project travel and the hero/statement movement are driven by the Lenis scroll event so the motion reverses when scrolling upward. CSS transitions are restricted to transforms/opacity where practical.
- The decorative metallic hand is an original SVG/CSS approximation because no suitably licensed model was verified or added. No reference logo, project thumbnail, video, or hand asset is reused.

## Responsive and accessibility behavior

- Header collapses into an accessible menu below desktop widths.
- Project track becomes touch-scrollable at narrow widths; the document remains in normal flow and retains the native scrollbar.
- Coarse pointer devices do not get a custom cursor. `prefers-reduced-motion` disables Lenis interpolation and decorative continuous motion, removes pinned/translated scroll effects, and leaves all content and actions in normal document flow.
- Content is present without JavaScript; motion styles do not hide essential text by default. Focus indicators, descriptive labels, and existing PDF/repository destinations are retained.

## Remaining differences from the live reference

The exact intro timing, source font files, measured sizes/spacing, real cursor behavior, particle/WebGL implementation, hand geometry/poses, card scroll ranges, and responsive breakpoints still require a live rendered browser comparison. This implementation adapts the visual and motion language to the portfolio's actual data; it is not a pixel-perfect copy claim.
