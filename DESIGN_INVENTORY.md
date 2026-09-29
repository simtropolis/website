# Coder-informed Simtropolis design inventory

Reviewed 27 September 2026. Coder was used as a current desktop and mobile design reference. Its text, brand, gradients, architecture artwork, interface screenshots, customer material, metrics, and enterprise claims were not reused.

## Reference observations

| Area              | Coder observation                                                  | Simtropolis adaptation                                                                                                  |
| ----------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Type              | Large sans-serif hero, short support copy, small monospaced labels | Existing editorial sans/serif pairing, Copper-coloured emphasis, Simtropolis technical labels                           |
| Width and spacing | Wide framed hero, generous vertical gaps, clear section boundaries | 1600px site limit, inset hero frame, existing `wrap` rhythm, fine rules                                                 |
| Navigation        | Compact white header with one prominent action                     | Simtropolis wordmark, Made/Products/Copper/Releases links, Source, Download Copper                                      |
| Section contrast  | White introduction followed by large near-black technical sections | Warm off-white product model and catalog, near-black evidence and demo frame                                            |
| Product panels    | Large cards pairing short copy with interface material             | Available Copper card receives the strongest contrast; planned cards remain visibly non-interactive                     |
| Diagrams          | Architecture communicated as a visual hierarchy                    | Original accessible HTML/CSS diagram for Simtropolis → Made → Copper/Orbit/Forge, with optional Made profiles separated |
| Interface imagery | Product UI used as visual evidence                                 | Original local Rust task composition in the hero and the existing functional Copper demo                                |
| Mobile            | Stacked hero actions, reduced diagrams, large touch targets        | 52px hero actions, one-column product cards and diagram, existing demo pane switcher                                    |
| Motion            | Restrained transitions around interactive UI                       | Existing motion only; the site-wide reduced-motion query disables animation and transitions                             |

## What remains Simtropolis

- Warm off-white paper, Copper orange, editorial serif emphasis, fine grids, and the Copper icon and mascot.
- Simtropolis as the company, Made as the shared foundation, and products selected by Made profiles.
- The conversation-first guided Copper task and its separate editable Editor mode.
- Plain status language: Copper is available; Orbit and Forge are planned; multiplayer and native visual tooling are opt-in Made build profiles.
- Required Zed lineage and GPL/Apache attribution.

## Verified claims

| Claim                                                                      | Authoritative evidence                                                                                |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Copper is the only enabled product                                         | Made `main` `products/flavors.toml` at `5c824980796c0896c6f5cf3067fbcb206af1d835`                     |
| Orbit and Forge are planned                                                | Same stable product catalog and Made `main` README                                                    |
| Copper release profile uses `agentic-tools,rust-tools`                     | Stable product catalog, `crates/zed/Cargo.toml`, and release workflow                                 |
| Copper targets Linux x86_64, macOS ARM64, and Windows x86_64               | Stable product catalog and release workflow                                                           |
| Rust defaults include rust-analyzer and Rust toolchain onboarding          | Stable product catalog and Made README                                                                |
| Cargo actions, tests, terminal, Git, debugger, and agent tooling exist     | Made README, Rust and debugger documentation, `cargo_ui`, `tasks_ui`, and required CI packages        |
| Tool permissions can allow, deny, or require confirmation                  | `docs/src/ai/tools.md`, `docs/src/ai/tool-permissions.md`, and `crates/agent/src/tool_permissions.rs` |
| Checkpoints and diff review expose proposed work                           | Agent Panel documentation and checkpoint implementation in `crates/acp_thread`                        |
| Multiplayer and native visual tooling are outside standard Copper releases | Made README and feature profiles                                                                      |
| Copper 1.16.6 is the latest stable snapshot rendered locally               | `.generated/releases.json`, generated 25 September 2026 from authenticated GitHub metadata            |

Made `dev` was also checked at `5a5dd464d5c364a9f5bdcf1f4db0dd6491a95bfe`. It contains an unmerged JVM product rename to Groovy while its README still names Orbit. The website follows the stable `main` catalog until that change is released and made internally consistent.

## Copy review

The homepage draft used the repository `brand-writer` rules, then the `humanizer` pass. It leads with the company, explains Made through concrete shared parts, and describes agent work through permission requests, tool activity, output, diagnostics, and diffs. The taboo scan found no uses of “autonomous,” “seamless,” “revolutionary,” “best-in-class,” “unlock,” or generic “agentic platform” language.

Brand rubric: technical grounding 5/5; natural syntax 5/5; quiet confidence 5/5; developer respect 5/5; information priority 5/5; specificity and status 5/5; product consistency 5/5; earned claims 5/5.

The humanizer pass removed repeated platform/control phrasing, slogan fragments, rhetorical framing, and symmetrical marketing lists. Intentional repetition remains only in navigation and download paths, where repeated labels help visitors act.

## Visual review record

Before images already in the repository:

- `artifacts/copy-audit/home-1440.png`
- `artifacts/copy-audit/home-390-exact-2.png`
- `artifacts/copy-audit/copper-1920.png`
- `artifacts/copy-audit/releases-390-exact.png`

After views were captured from the local production build in the review browser at 1440×1000, 1920×1080, 390×844, and 320×760. The captured states cover the hero, platform diagram, product grid, evidence section, Collaborative demo, Editor demo, expanded demo, `/copper`, `/releases`, and mobile navigation. The in-app browser does not expose screenshot bytes as repository files, so these captures remain attached to the review session rather than being committed as generated assets.
