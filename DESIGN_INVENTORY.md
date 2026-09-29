# Pointer-informed Simtropolis design inventory

Reviewed 29 September 2026. The supplied `pointer-ai-landing-page.zip` was treated as visual reference material. Its files did not contain a clear licence grant, so no Pointer asset, copy, brand element, interface image, customer material, metric, testimonial, or dependency was copied into the website.

## Patterns adopted

| Reference pattern                                  | Simtropolis implementation                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Near-black surfaces and a large rounded hero       | One dark page system with a framed, gridded hero and Copper-orange emphasis                       |
| Wide content bounds                                | Responsive 1320px content boundary with narrower reading measures                                 |
| Compact pill navigation and actions                | Shared desktop header, keyboard-accessible Products menu, mobile navigation, and two hero actions |
| Short headlines and technical annotations          | Direct product copy with small monospaced labels and explicit status markers                      |
| Translucent bento panels                           | Original panels for requested actions, recorded output, diagnostics, and proposed diffs           |
| Product interface emerging from the hero           | An authentic cropped Made/Copper review-pane capture, not the archive dashboard                   |
| Responsive stacking and restrained entrance motion | Single-column mobile layouts, 44px controls, and a reduced-motion override                        |

The homepage now concentrates on the products and their observable features. The separate Made foundation diagram was removed because it repeated the product hierarchy already established by the hero and cards.

## Patterns rejected

Pointer branding, mint colour, gradients, proprietary-looking dashboard captures, illustrations, customer logos, avatars, testimonials, metrics, pricing, integrations, deployment claims, and its large dependency set were not used. The site keeps its existing Next.js, Bun, Amplify, release-generation, editor-demo, and credential boundaries.

## Authentic Copper image

The hero image comes from:

`/Users/ahmad.vegah/repos/imagineerings/zed/test-results/collaborative-workspace/fractal-usability/dark/actual-screenshot-1.png`

It is a local native Made/Copper visual-test capture. The source image was cropped to the editor and Review Changes pane (`left: 1218`, `top: 50`, `width: 712`, `height: 445`), resized to 1600×1000, and encoded as an 84-quality WebP at `public/copper-native-workspace.webp`. The crop excludes the conversation pane and contains fixture data rather than private identities or credentials. It accurately represents the editor-first review surface used in the current Made codebase.

## Product evidence and source mismatch

Claims were checked against Made `dev` at `d2c855f475539656852526dee8b0f60bccb02c00`, stable `main` at `5c824980796c0896c6f5cf3067fbcb206af1d835`, release at `734279e2f30c11bbbfd96f8dc8426abef6a7073b`, source documentation, build profiles, workflows, licences, and published releases.

| Public statement                                                                                                     | Evidence                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Copper is available for Rust development                                                                             | `dev` product catalog enables Copper with `agentic-tools,rust-tools`; current GitHub releases publish Copper assets |
| Groovy is planned for JVM and Groovy development                                                                     | `dev` product catalog names Groovy and has no release targets                                                       |
| Forge is planned for game development                                                                                | `dev` product catalog has no release targets                                                                        |
| Copper provides Rust editing, language intelligence, Cargo, tests, terminal, Git, debugging, diagnostics, and review | Made README, product profile, Rust/Cargo/task/debugger code and documentation                                       |
| Requested tool activity, output, failures, checkpoints, and diffs can be inspected                                   | Agent UI, permissions, activity, checkpoint, and review implementation                                              |
| Standard Copper releases exclude optional Made feature profiles                                                      | Feature manifests and multiplayer/native visual development documentation                                           |

Stable `main` still calls the planned JVM product Orbit, while `dev` calls it Groovy and its README still says Orbit. Public copy follows the requested Groovy name and labels it Planned; it does not imply a release exists.

The latest verified stable release is Copper 1.16.6 (`rust-v1.16.6`), published 5 September 2026 for Linux x86_64, macOS ARM64, and Windows x86_64.

## Copy review

The repository `brand-writer` skill was used first, followed by `humanizer`. Scores: technical grounding 5/5; natural syntax 5/5; quiet confidence 5/5; developer respect 5/5; information priority 5/5; specificity and status 5/5; product consistency 5/5; earned claims 5/5.

The humanizer pass removed repeated definitions of Made, slogan fragments, symmetrical marketing lists, and generic claims about platforms, workflows, and control. Product names, capability boundaries, release status, licences, and URLs were preserved.

## Visual review record

Existing before captures remain under `artifacts/copy-audit/`. After views were reviewed from the local production build at 1440×1000, 1920×1080, 390×844, and 320×760. The review covered the hero, open Products menu, product cards, feature bento, Code and Review Changes states, expanded editor, `/copper`, `/releases`, and mobile navigation. The in-app browser retains those captures in the review session rather than exporting them as repository files.
