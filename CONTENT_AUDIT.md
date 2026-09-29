# Website content audit

Reviewed 29 September 2026. The audit covers the homepage, `/copper`, the editor demo, `/releases`, navigation, footer, loading/error/no-JavaScript states, metadata, structured data, and the README’s public-message guidance. The subsequent Sim merge adds `/sim` and uses Sim as the public name for Made's planned Forge catalog entry.

## Before and after

| Before                                                                                                    | Revision                                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| The homepage separately explained the company, Made foundation, product hierarchy, and optional profiles. | The hero establishes the company and Made once. Product cards and feature panels carry the rest of the homepage.             |
| A large foundation diagram repeated the same hierarchy shown in the product cards.                        | The diagram and its documentation link were removed. Products now follow the hero directly.                                  |
| The public demo offered Collaborative and Editor modes.                                                   | The homepage presents only the editable Rust fixture. Dormant collaborative code remains internal to reduce regression risk. |
| Product names drifted between Orbit and Groovy.                                                           | Shared typed catalog data uses Copper Available, Groovy Planned, and Sim Planned across navigation and cards.                |
| Several sections repeated abstract claims about evidence and developer control.                           | Feature panels show a requested command, recorded output, a diagnostic, and a proposed diff.                                 |

## Content hierarchy

- The hero names Simtropolis, Made, and available Copper.
- Product cards distinguish Copper from planned Groovy and Sim.
- Feature panels demonstrate inspectable development work.
- The editor demo provides the hands-on Rust example.
- `/copper` holds technical detail; `/releases` owns downloads and history.
- The footer provides Releases, Documentation, Source, Contribute, licences, and Zed attribution.

## Verified claims

| Claim                                                                                                                     | Source checked                                                            |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Copper is the enabled Rust product; the planned JVM and game entries have no release targets.                             | Made `dev` product catalog at `d2c855f475539656852526dee8b0f60bccb02c00`  |
| Stable `main` still names the planned JVM product Orbit.                                                                  | Made `main` product catalog at `5c824980796c0896c6f5cf3067fbcb206af1d835` |
| Copper enables `agentic-tools,rust-tools`.                                                                                | Made product catalog and build features                                   |
| Rust editing, language intelligence, Cargo tasks, tests, terminal, Git, debugging, diagnostics, and review exist in Made. | Made README, documentation, product manifest, and relevant crates         |
| Tool permissions can allow, deny, or request confirmation; requested activity and changes remain inspectable.             | Made agent permissions, activity, checkpoint, and review code             |
| Optional Made profiles are outside the standard Copper release.                                                           | Made feature manifests and development documentation                      |
| Copper 1.16.6 is the latest stable release with Linux x86_64, macOS ARM64, and Windows x86_64 assets.                     | GitHub release `rust-v1.16.6` and the build snapshot                      |
| The browser demo is local and deterministic.                                                                              | `components/copper-demo`, `fixtures/copper-demo`, and Rust fixture tests  |
| Made is derived from Zed and includes GPL-3.0-or-later and marked Apache-2.0 code.                                        | Made README and licence files                                             |

The source naming mismatch is stated in project documentation. Public copy uses Groovy and Sim as requested and keeps both Planned. Made's source still names the planned game entry Forge.

## Brand-writer scorecard

| Criterion            | Score | Notes                                                                      |
| -------------------- | ----: | -------------------------------------------------------------------------- |
| Technical grounding  |   5/5 | Copy names commands, diagnostics, diffs, products, and release boundaries. |
| Natural syntax       |   5/5 | Headlines are direct; supporting sentences vary in length and structure.   |
| Quiet confidence     |   5/5 | No hype, superlatives, or unmeasured outcomes.                             |
| Developer respect    |   5/5 | The copy assumes familiarity with Rust, Cargo, Git, and review.            |
| Information priority |   5/5 | Company, available product, and planned products appear in order.          |
| Specificity          |   5/5 | Every capability and status is concrete.                                   |
| Voice consistency    |   5/5 | Navigation, product, demo, and release copy share one restrained voice.    |
| Earned claims        |   5/5 | Product and release statements trace to source or GitHub metadata.         |

The taboo scan found no uses of autonomous, seamless, revolutionary, best-in-class, generic AI-platform language, or claims that agents replace developers.

## Humanizer findings

The final pass removed repeated definitions, slogan fragments, forced three-part rhythms, generic closing claims, and synonym cycling around platform, workflow, environment, and control. The remaining repetition is functional: Copper’s Available status appears in navigation and product cards, while Download Copper appears in the hero and Copper card so both product-entry points remain usable.
