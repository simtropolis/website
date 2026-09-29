# Simtropolis voice examples

Use these examples to calibrate reasoning and revision. Verify the underlying facts again before adapting them because product and release state can change.

## Company, platform, and product

Weak:

> Simtropolis is revolutionizing development with a powerful AI platform and a family of next-generation editors.

Stronger:

> Simtropolis builds focused development tools. Made is the shared platform behind them, and Copper is its currently available Rust product.

Why: the revision separates the company, platform, and product, then states current availability without prediction or hype.

## Explaining “integral”

Weak:

> Copper delivers the seamless, integral development experience developers have been waiting for.

Stronger:

> Copper keeps editing, `rust-analyzer`, Cargo, tests, terminal output, Git, debugging, and agent activity in one application. Commands, diagnostics, and proposed changes remain available for inspection.

Why: the revision explains the thesis through visible product behavior.

## Agent behavior and developer authority

Weak:

> Copper’s autonomous agent understands your codebase, runs everything, and ships the right fix while you stay in flow.

Stronger:

> Copper can expose agent tool calls alongside command output and proposed diffs. The developer reviews the evidence and decides which changes to keep.

Why: the revision names observable actions and does not assign judgment or authority to the agent.

## Capability status

Weak:

> Made includes multiplayer development and native visual tools.

Stronger:

> Made contains multiplayer and native visual tooling behind opt-in features. They are not part of the standard Copper release profile.

Why: the revision distinguishes code that exists from functionality that ships by default.

## Planned products

Weak:

> Use Groovy for JVM development and Sim for game development.

Stronger:

> Groovy and Sim are planned product entries. Neither has a release target or public download.

Why: the revision preserves roadmap status and names the evidence.

## Recorded demonstration

Weak:

> Ask the Copper agent to fix the parser and watch it run the tests.

Stronger:

> This guided browser demo uses local fixtures. Its diagnostics and test output are recorded; it does not run Copper, an agent, or a Rust compiler.

Why: the revision labels the interaction and its limits directly.

## Release announcement

Weak:

> We’re thrilled to ship our biggest Copper release yet, with seamless support everywhere.

Stronger:

> Copper 1.16.6 is available as release assets for Linux x86_64, macOS ARM64, and Windows x86_64. The release notes record a change to the macOS packaging job; they do not claim a new editor feature.

Why: the revision leads with verified availability and does not inflate a packaging change.

## Signing and updates

Weak:

> Copper ships secure, signed installers with automatic updates.

Stronger:

> The release workflow signs when the complete platform credential set is present. Otherwise macOS uses ad-hoc signing and Windows remains unsigned. In-app updates require a build-time update service URL.

Why: the revision follows the actual configuration boundary instead of treating installer presence as proof.

## Source and attribution

Weak:

> Made is Simtropolis’s original open-source editor platform.

Stronger:

> Made is derived from Zed. Its source is primarily GPL-3.0-or-later, with Apache-2.0 components where marked. Check current repository access before describing the source as publicly available.

Why: the revision preserves lineage, states the license model precisely, and separates licensing from access.

## Fact preservation

During drafting:

> Copper [FACT: enables `agentic-tools` and `rust-tools` in the standard product profile — `products/flavors.toml`] and [FACT: targets Linux x86_64, macOS ARM64, and Windows x86_64 — product catalog and release workflow].

Before delivery, verify both sources and remove only the markers:

> Copper enables `agentic-tools` and `rust-tools` in its standard product profile. Release automation targets Linux x86_64, macOS ARM64, and Windows x86_64.

Do not preserve a factual phrase merely because it appeared in the input. Preserve it only after verification, or flag it as unresolved.
