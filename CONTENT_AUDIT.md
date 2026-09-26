# Website content audit

Reviewed 25 September 2026. The audit covers the homepage, `/copper`, the browser demo, `/releases`, shared navigation and footer copy, error and loading states, metadata, structured data, and the README sections that describe public messaging.

## Before and after

| Before                                                                                                                                                                   | Revision                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The homepage hero, footnote, Copper page hero, ticker, evidence section, and closing block repeated the “integral development experience” and developer-control message. | The homepage establishes the proposition once. `/copper` explains the product through current capabilities, agent controls, and release scope.                                |
| Two browser demo modes covered similar editor and conversation concepts. The secondary mode used unrelated TypeScript, GPUI, and novelty Rust examples.                  | One conversation-first demo now carries the complete sample task, file editing, diff review, recorded output, conflict handling, reset, and expansion.                        |
| Homepage capability cards repeated the Copper page, while a second evidence section repeated the demo.                                                                   | The homepage keeps a concise Copper summary. The duplicate cards, evidence sequence, FAQ, and closing pitch were removed.                                                     |
| Phrases such as “Less friction. More flow,” “A capable starting point,” “Evidence, not theatre,” and “Let’s make something Made” supplied tone without product detail.   | Headings state the section’s subject. Supporting copy names the relevant editor, Rust, Cargo, agent, permission, and review behaviour.                                        |
| “Made’s source is public on GitHub” conflicted with the repository’s current private visibility.                                                                         | Copy says repository access follows the Simtropolis organisation’s settings. Release copy also explains that GitHub may require sign-in.                                      |
| Calls to action used Get Copper, Find your download, View releases, Explore Copper, Meet Copper, and Read the project documentation.                                     | Distribution uses **Download Copper** or **Releases**. Product navigation uses **Copper overview**. Repository actions use **Documentation**, **Source**, and **Contribute**. |
| Release copy explained build credentials and browser secret handling to visitors.                                                                                        | The page explains only where assets live, when GitHub sign-in may be required, signing variance, and how to install a newer version.                                          |
| The mascot used promotional banter and a “say hello” interaction.                                                                                                        | The control shows a short provenance note for the supplied artwork.                                                                                                           |

## Content hierarchy

- The homepage names Simtropolis, Made, and Copper and gives the main proposition.
- The browser demo shows a single, concrete Rust task and labels its recorded behaviour.
- `/copper` documents shipped capabilities, agent controls, optional source features, planned products, and practical FAQs.
- `/releases` owns downloads, release notes, history, access notes, and signing notes.
- The footer owns Zed attribution, licences, documentation, source, and contribution links.

## Removed or consolidated ideas

- Removed the duplicate homepage capability grid and closing download pitch.
- Removed the homepage FAQ; its useful release and scope details now live on `/copper` or `/releases`.
- Removed the Copper page’s separate four-step evidence section; the interactive demo demonstrates the same sequence.
- Removed the alternate demo mode and its unrelated fixtures.
- Replaced repeated control slogans with separate facts about tool activity, permissions, review, and model configuration.
- Reduced repeated demo warnings to the page disclosure plus the expanded demo’s own disclosure, where the page text is no longer visible.

## Verified claims

| Claim                                                                                                                                                                             | Source checked                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simtropolis develops Made; Copper is the enabled Rust product.                                                                                                                    | Made `README.md` and `products/flavors.toml` at default-branch commit `5c824980796c0896c6f5cf3067fbcb206af1d835`; local Made development commit `7c19425ff56e4816dabb5fa851c666a248d18a14`.       |
| Copper enables `agentic-tools` and `rust-tools`, defaults to rust-analyzer, and uses Rustup onboarding.                                                                           | `products/flavors.toml` and Made `README.md`.                                                                                                                                                     |
| Copper includes Cargo and test workflows plus the editor, terminal, Git, debugger, remote development, extensions, native agents, ACP, skills, and model-provider infrastructure. | Made `README.md`; `crates/cargo_ui`, `crates/tasks_ui`, `crates/agent*`, `crates/acp_*`, and `crates/language_model*`.                                                                            |
| Tool permissions can allow, deny, or request confirmation; agent work has activity and review state.                                                                              | Made agent profile, tool-permission, activity, checkpoint, and review code under `crates/agent*` and `crates/agent_ui`.                                                                           |
| Multiplayer tools and native visual workflows are optional source features, not standard Copper release features.                                                                 | Made `README.md`, Cargo feature definitions, and `docs/src/development/multiplayer-tools.md`.                                                                                                     |
| Orbit and Forge are planned and have no release targets.                                                                                                                          | `products/flavors.toml`.                                                                                                                                                                          |
| Published Copper assets currently cover Linux x86_64, macOS ARM64, and Windows x86_64.                                                                                            | GitHub release `rust-v1.16.6`, published 5 September 2026, and the fresh build-time release snapshot.                                                                                             |
| Made’s GitHub repository is currently private and its default branch is `main`.                                                                                                   | Authenticated GitHub repository metadata read on 25 September 2026.                                                                                                                               |
| The browser demo is local and deterministic.                                                                                                                                      | `components/copper-demo`, `fixtures/copper-demo`, and the Rust fixture validation script.                                                                                                         |
| Made is derived from Zed and carries GPL-3.0-or-later plus marked Apache-2.0 components.                                                                                          | Made `README.md`, `LICENSE-GPL`, and `LICENSE-APACHE`. GitHub’s repository licence field returns `NOASSERTION`, so the site links the repository licence files rather than relying on that field. |

## Brand-writer scorecard

| Criterion            |     Score | Notes                                                                                             |
| -------------------- | --------: | ------------------------------------------------------------------------------------------------- |
| Technical grounding  |       5/5 | Capability copy names concrete components, controls, and release boundaries.                      |
| Natural syntax       |       4/5 | Sentence length and structure vary; interface labels remain terse where required.                 |
| Quiet confidence     |       5/5 | No hype, superlatives, emotional appeals, or unmeasured benefits remain.                          |
| Developer respect    |       5/5 | The copy assumes familiarity with Rust, Cargo, diffs, providers, and source builds.               |
| Information priority |       5/5 | Company, platform, available product, and user control appear in the opening copy.                |
| Specificity          |       5/5 | Claims identify features, build profiles, targets, access constraints, and limitations.           |
| Voice consistency    |       4/5 | Editorial headings and compact application labels serve different contexts without changing tone. |
| Earned claims        |       5/5 | Product and release statements trace to Made source or GitHub release metadata.                   |
| **Total**            | **38/40** | Every criterion meets the required 4/5 threshold.                                                 |

The taboo-phrase scan found no marketing hype, empty enthusiasm, “not X, but Y” constructions, promotional exclamation points, or rhetorical headline hooks in public copy.

## Humanizer audit

The first draft still had slogan fragments, symmetrical lists, repeated definitions, and several headings that sounded like a landing-page template. The final pass:

- replaced slogans with direct technical statements;
- varied sentence structure and removed forced three-part rhythms;
- removed synonym cycling around “workspace,” “environment,” and “flow”;
- shortened release and demo caveats without weakening them;
- removed playful mascot dialogue and generic closing language;
- retained product names, platform labels, URLs, licence references, release access rules, and availability distinctions.

The remaining repetition is intentional. **Download Copper** appears at the first product decision and at the end of `/copper`. The demo disclosure appears outside the embed and inside the expanded dialog because those contexts are not visible at the same time. Platform and architecture names recur on `/releases` because each download must remain unambiguous.
