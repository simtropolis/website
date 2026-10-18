# Homepage design restoration review

## Result and isolation

The target remains `/`. Original imagery, video, typography, color/opacity, grids, spacing, borders and normal-motion treatment have been restored. Verified Sim copy and exact `simtropolis` wordmark/metadata identity are retained. The October 18 request restores the rotating hero headline separately. Changes are uncommitted and unpushed. No merge or deployment occurred.

- Worktree: `/Users/ahmad.vegah/.codex/worktrees/sim-homepage-content/website`
- Branch: `codex/sim-homepage-content`
- Pinned website `origin/main`: **`13309b14c09deb6ce9fe2e566d2761543ea3971a`**
- Product evidence: `git@github.com:simtropolis/sim.git`, `origin/sim-dev` **`8efc2261ee9f1c00beff7d16908c4834ff9c34e3`**
- Live reference: `https://simtropolis.ai/`, inspected alongside the pinned local production build. The 12 section geometries match live/pinned at all four viewport sizes.
- Old `/sim` worktree and original checkouts preserved. Pre-correction changes backed up in ignored `artifacts/design-restoration/before-correction.zip`.

## Restoration

- Restored the exact 1920×1080 hero MP4, cover/center crop, 80% opacity, original gradients and grid. It plays normally and pauses for reduced motion.
- Restored every original section image in its original component and slot. Eight remote originals are now unchanged local files, including the tree, globe, landscapes, connection panorama and footer. Nothing needed substitution. [Inventory and SHA-256](artifacts/design-restoration/original-media.json).
- Removed the introduced Serif font, opacity/color overrides, heading-size overrides, mobile padding/grid adjustments, replacement WebPs and custom raster social card. The live/main font is Instrument Sans.
- Restored the original floating navigation, 48px mobile links, spacing, transitions and button visual sizes. Kept keyboard behavior, focus outlines and invisible 44px target extensions.
- Retained the original numbered/bordered grids, thin progress stripes, ASCII effects, dark/off-white alternation, oversized calls to action and footer panorama. All original normal class expressions are retained except the separate old `/ Sim` suffix removed for exact branding and the invisible progress-target class.
- Retained current features, opt-in resources/runtime boundaries, separate future-tense roadmap and pending public release. The requested hero phrase rotation returns without changing feature or release claims.

## Remaining visual differences

These are intentional content changes fitted to baseline styles, not pixel-identical copy:

- Wordmark and metadata retain `simtropolis`. At the user’s October 18 request, the hero again reads “Worlds to” on the first line and rotates “imagine.”, “build.” and “explore.” on the second, every 2.5 seconds, using the baseline letter-blur/gradient transition. Reduced motion keeps “imagine.” static. A stable accessible heading names all three phrases without repeated announcements.
- Every section has revised copy and labels. Original font sizes/line heights/tracking/colors are unchanged; wrapping changes heights and subsequent absolute positions. Original image crop rules are unchanged, but image positions within the page move with preceding copy. Some image containers follow the section's copy-driven height.
- The roadmap has four planned cards, matching the original four-state composition. Large labels are `Edit`, `Draw`, `Time`, `Files`; navigation remains Layers/Draw/Time/Export. Shorter labels prevent the original narrow-grid min-content clipping at 320px. All four revised states fit at 320/390. The decorative quote glyph remains; the text is future product direction, not a customer quote.
- Footer names/links are Sim-focused; the legal column has one local notices link instead of unrelated product/legal links. Column styles and panorama are unchanged.
- Focus outlines appear only during keyboard use; a skip link appears only when focused. Reduced motion freezes effects and pauses video. These intentionally differ only in accessibility states.
- Video frames, particles, ASCII orientation and automatically selected card/progress states can differ between captures. Normal timers, easing, transitions and layout remain baseline style. Screenshots do not claim synchronized animation frames.

### Measured copy reflow

Viewport dimensions and all 96 section screenshot scroll positions match exactly. Left in paired screenshots is pinned main; right is revised. Because both use identical absolute scroll positions, accumulated copy reflow is visible rather than hidden by section-relative captures.

| Viewport  | Pinned height | Revised height |  Change |
| --------- | ------------: | -------------: | ------: |
| 1920×1080 |        15,266 |         15,401 | +135 px |
| 1440×1000 |        14,955 |         15,090 | +135 px |
| 390×844   |        18,260 |         18,496 | +236 px |
| 320×740   |        19,940 |         20,066 | +126 px |

Section height deltas (pixels, revised minus pinned; includes the sampled carousel state):

| Section   |  1920 |  1440 |    390 |    320 |
| --------- | ----: | ----: | -----: | -----: |
| Hero      |  +0.0 |  +0.0 |  +10.6 |  -13.0 |
| Features  |  +0.0 |  +0.0 |  +70.5 | +129.0 |
| Workflow  | +26.0 | +26.0 | +130.0 | +104.0 |
| Nodes     | +44.0 | +44.0 |  +80.0 | +181.0 |
| Documents |  +0.0 |  +0.0 |   -8.0 | -105.0 |
| Execution | +65.0 | +65.0 | +113.0 |  +41.0 |
| Tools     | +20.0 | +20.0 |   -1.5 |  -65.5 |
| Limits    |  +0.0 |  +0.0 |  -10.0 |  -38.5 |
| Planned   |  +0.0 |  +0.0 |  -86.0 |  +16.0 |
| Status    | -20.0 | -20.0 |  -24.0 |  -60.0 |
| CTA       |  +0.0 |  +0.0 |   +0.0 |   -4.5 |
| Footer    |  +0.0 |  +0.0 |  -38.5 |  -58.5 |

All 12 sampled heading computed styles match pinned main exactly at each width: font family, size, line height, tracking and color. No heading/paragraph scroll-width overflow was found on the revised page. Document width stays within viewport; all four roadmap states fit both mobile widths. Full-page and section comparisons were reviewed for every major section at all four sizes.

## Checks and evidence

- Formatting, lint, TypeScript, 24/24 repository unit tests, production build and metadata/build assertions pass.
- Route smoke passes for `/`, robots, sitemap, media, icon and notices. Baseline-retired `/sim`, `/copper` and `/releases` remain 404; `/releases/` retains its existing 308 redirect. No retired route was recreated.
- Exact heading/title/social titles, canonical root, current/planned states and opt-in/pending boundaries verified. No public other-product names, external media hotlinks or credential patterns in homepage/generated client artifacts.
- Browser console/hydration: no warnings/errors observed in production preview.
- Mobile menu: Enter opens, Shift-Tab wraps to final CTA, Tab returns to close control, Escape closes and restores focus to opener with visible outline.
- Chrome reduced-motion emulation: preference true, original video paused, every heading letter visible/unblurred, rendered animations none and transitions 0s, scroll auto. Restoring normal preference resumes video. Emulation restored and temporary tab closed.
- Protected package/lock/Amplify/root CSS/layout/sitemap/release owners remain unchanged. No dependencies added.
- Next bundle: fresh pinned baseline 32.2 kB route / 135 kB first load; revised 37.8 / 140 kB (+5.6 / +5 kB). Shared 103 kB.
- [Source evidence, availability, capability table, brand-writer 38/40 and humanizer review](SIM_HOMEPAGE_REVIEW.md). Native Sim application/tests were inspected, not executed; this website check does not certify native parity or release availability.

## Screenshots

[All 48 side-by-side section pairs](artifacts/design-restoration/comparison/index.html), with raw viewport images, positions and measurements in the same directory.

- 1920px: [live full](artifacts/design-restoration/comparison/live-full-1920.jpg), [pinned full](artifacts/design-restoration/comparison/baseline-full-1920.jpg), [revised full](artifacts/design-restoration/comparison/revised-full-1920.jpg), [hero pair](artifacts/design-restoration/comparison/pair-1920-hero.jpg), [capability states](artifacts/design-restoration/comparison/pair-1920-status.jpg), [footer](artifacts/design-restoration/comparison/pair-1920-footer.jpg).
- 1440px: [live full](artifacts/design-restoration/comparison/live-full-1440.jpg), [pinned full](artifacts/design-restoration/comparison/baseline-full-1440.jpg), [revised full](artifacts/design-restoration/comparison/revised-full-1440.jpg), [hero pair](artifacts/design-restoration/comparison/pair-1440-hero.jpg), [capability states](artifacts/design-restoration/comparison/pair-1440-status.jpg), [footer](artifacts/design-restoration/comparison/pair-1440-footer.jpg).
- 390px: [live full](artifacts/design-restoration/comparison/live-full-390.jpg), [pinned full](artifacts/design-restoration/comparison/baseline-full-390.jpg), [revised full](artifacts/design-restoration/comparison/revised-full-390.jpg), [hero pair](artifacts/design-restoration/comparison/pair-390-hero.jpg), [capability states](artifacts/design-restoration/comparison/pair-390-status.jpg), [footer](artifacts/design-restoration/comparison/pair-390-footer.jpg).
- 320px: [live full](artifacts/design-restoration/comparison/live-full-320.jpg), [pinned full](artifacts/design-restoration/comparison/baseline-full-320.jpg), [revised full](artifacts/design-restoration/comparison/revised-full-320.jpg), [hero pair](artifacts/design-restoration/comparison/pair-320-hero.jpg), [capability states](artifacts/design-restoration/comparison/pair-320-status.jpg), [footer](artifacts/design-restoration/comparison/pair-320-footer.jpg).
- [Mobile menu 390](artifacts/design-restoration/comparison/revised-menu-390.jpg), [pinned mobile menu 390](artifacts/design-restoration/comparison/baseline-menu-390.jpg), [320 mobile menu](artifacts/design-restoration/comparison/revised-menu-320.jpg). Desktop navigation appears in every desktop hero/section capture.
- [Reduced motion](artifacts/design-restoration/comparison/reduced-motion.jpg), [original social preview](artifacts/design-restoration/comparison/social-preview.jpg).

No unavailable-asset or permissions limitation remains. The measured copy reflow and native-product verification boundaries above remain. Earlier comparison screenshots predate the October 18 hero-rotation restoration.

## October 18 hero correction

The requested words are `imagine`, `build`, `explore`. This supersedes the earlier requirement to use `simtropolis` as the main hero heading; the wordmark and page/social titles remain `simtropolis`. The original font, sizes, spacing, video and transition colors/timing are retained. No feature or availability claim was added. Brand-writer was applied first and humanizer last; the supplied phrase is preserved as requested. The factual product explanation remains directly below it.

Formatting, lint, type checking, all 24 tests, production build, build/metadata checks and route smoke pass. Next reports 37.9 kB for the homepage route and 140 kB first load (about +0.1 kB route versus the prior revision). Automated visual recheck/screenshots were blocked by Browser Use’s URL policy while the preview tab was on an internal connection-error page. The production HTTP smoke check succeeds and the preview server is running on port 3212; animation and four-width visual verification for this small correction are not claimed. The browser restriction was not bypassed. Changes remain uncommitted and unpushed.

## Publication approval — October 18

The user authorized committing and pushing this homepage branch after review. Earlier “uncommitted and unpushed” statements describe the review-stage handoff. The current page title is `simtropolis`; the production HTML title assertion has been updated to match. Formatting, lint, type checking, 24 unit tests, production build and metadata/build checks pass. The previously documented automated visual-verification limitation remains.
