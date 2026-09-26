# Validation exercises

These exercises were completed while calibrating the skill on 25 September 2026. They demonstrate the process and are not canonical website or release copy. Reverify volatile facts before reuse.

## Exercise 1: homepage hero for Made and Copper

### Draft with fact markers

> **Building the Integral Development Experience**
>
> [FACT: Made is Simtropolis’s platform for agentic software development — requested brand foundation and Made README]. [FACT: Copper is the currently available Rust product built on Made — `products/flavors.toml` and published releases]. It keeps [FACT: editing, Rust language intelligence, Cargo, tests, terminal, Git, debugging, and agent tools in one application — Made README, product profile, and application composition]. [FACT: Tool calls, command output, diagnostics, and proposed changes remain available for developer inspection — agent UI, ACP permission, and diff implementations]. [FACT: Copper presents permission requests for tool calls that require approval — ACP permission implementation]. The developer decides which proposed edits to keep.

### Humanizer findings

- The initial version repeated “development environment” twice and ended with a polished three-item list.
- “Open” was removed from the hero because the repository is private and the available space did not support a precise explanation of licensing versus access.
- The final sentences name inspectable evidence and the permission mechanism instead of making a blanket control claim.

### Final copy

> **Building the Integral Development Experience**
>
> Made is Simtropolis’s platform for agentic software development. Copper is the available Rust product built on it. Editing, Rust language intelligence, Cargo, tests, terminal, Git, debugging, and agent tools live in one application. Tool calls, command output, diagnostics, and proposed changes remain inspectable. Copper asks for permission when a protected tool call requires approval, and you decide which proposed edits to keep.

### Scorecard

| Criterion                     |     Score | Notes                                                                                           |
| ----------------------------- | --------: | ----------------------------------------------------------------------------------------------- |
| Technical grounding           |         5 | Names the concrete development and evidence surfaces.                                           |
| Natural syntax                |         4 | The feature sentence is dense but reads cleanly.                                                |
| Quiet confidence              |         5 | No promotional qualifier or emotional appeal.                                                   |
| Developer respect             |         5 | States the developer’s actual review and execution role.                                        |
| Information priority          |         5 | Identifies Made and Copper immediately after the thesis.                                        |
| Specificity and status        |         5 | Copper is available; mechanisms are named.                                                      |
| Voice and product consistency |         5 | Company, platform, and product remain distinct.                                                 |
| Earned claims                 |         5 | Product, mechanism, permission, and status claims trace to current source and release evidence. |
| **Total**                     | **39/40** | All criteria pass.                                                                              |

Taboo scan: clear. Fact markers were removed only after source review.

## Exercise 2: Copper 1.16.6 release announcement

### Draft with fact markers

> [FACT: Copper 1.16.6 was published as a stable GitHub release on 5 September 2026 — GitHub release metadata]. [FACT: Assets are available for Linux x86_64, macOS ARM64, and Windows x86_64 — release assets]. [FACT: This release changes the macOS packaging job to reuse the pinned `cargo-bundle` dependency — release notes and linked pull request]. Download the files from the Copper releases page. [FACT: Repository access may be required because `simtropolis/made` is currently private — GitHub repository metadata].

### Humanizer findings

- “Was published as a stable GitHub release” sounded administrative; “is available” leads with what the reader can do.
- The packaging change should remain modest and must not be reframed as an editor improvement.
- The access note is useful because an anonymous download can otherwise fail without explanation.

### Final copy

> **Copper 1.16.6 is available**
>
> This release provides assets for Linux x86_64, macOS ARM64, and Windows x86_64. It updates the macOS packaging job to reuse the pinned `cargo-bundle` dependency; the release notes do not claim an editor feature change. Download the files from the Copper releases page. Access requires permission to the Made repository while it remains private.

### Scorecard

| Criterion                     |     Score | Notes                                                                    |
| ----------------------------- | --------: | ------------------------------------------------------------------------ |
| Technical grounding           |         5 | Names the exact packaging change and asset targets.                      |
| Natural syntax                |         5 | Direct sentences with varied length.                                     |
| Quiet confidence              |         5 | No launch hype or inflated significance.                                 |
| Developer respect             |         5 | Separates packaging work from user-facing functionality.                 |
| Information priority          |         5 | Version and availability lead.                                           |
| Specificity and status        |         5 | Stable asset targets and access condition are explicit.                  |
| Voice and product consistency |         5 | Copper is the release product; Made is the repository.                   |
| Earned claims                 |         5 | Every material claim traces to current GitHub metadata or release notes. |
| **Total**                     | **40/40** | All criteria pass.                                                       |

Taboo scan: clear. Fact markers were removed only after source review.
