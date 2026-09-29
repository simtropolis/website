# Product language and source model

Use this reference for product identity, capability status, releases, agent behavior, source access, attribution, and licensing.

## Product model

| Name            | Role                                                                  | Writing rule                                                                                                                                                                        |
| --------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simtropolis     | Company                                                               | Use as the actor that builds and maintains products. Do not use it as the application or codebase name.                                                                             |
| Made            | Open platform for agentic software development                        | Explain “open” through the relevant mechanism. Verify repository access separately. Made is the shared codebase and product foundation, not the downloadable Rust application name. |
| Copper          | Currently available Rust development environment built on Made        | Use for the application, downloads, release notes, and Rust-focused product behavior.                                                                                               |
| Groovy and Forge | Planned product entries unless current authoritative evidence changes | Use future-tense or roadmap language. Do not provide download or usage instructions.                                                                                               |
| Zed             | Upstream project and technical lineage                                | Mention for attribution, licensing, retained internal terminology, or upstream-derived behavior. Do not borrow Zed’s brand identity or claims.                                      |

“Building the Integral Development Experience” is a thesis, not evidence. When used, connect it to the functions present in the relevant build and to the evidence a developer can inspect.

## Capability states

Use the narrowest accurate state:

- **Available:** included in the current standard Copper release profile and supported by current release artifacts.
- **Opt-in:** implemented but requires an explicit Made build feature, configuration, service, provider, or credential.
- **Experimental:** present for development or evaluation without the stability or release evidence needed for an available claim.
- **Recorded:** deterministic fixture content or captured output; no live execution is occurring.
- **Planned:** catalogued or documented for future work but unavailable to build or download.

Avoid “supported” when “present,” “configurable,” “buildable,” or “published for these targets” is more exact.

## Current authoritative baseline

Treat this as a discovery map, not a permanent fact cache. Re-read the sources for each assignment.

- `products/flavors.toml`: product identity, enabled/planned state, standard features, targets, language server defaults, onboarding, and installer naming.
- `crates/zed/Cargo.toml`: feature composition, including `agentic-tools`, `rust-tools`, `multiplayer-tools`, and `comfy`.
- `README.md`: repository overview, current limitations, local build commands, release model, and licensing summary. Confirm important claims in source or generated configuration.
- `docs/src/development/product-flavors.md`: product packaging, signing behavior, update configuration, identity, and migration limits.
- `docs/src/development/multiplayer-tools.md`: standard and opt-in multiplayer build boundaries.
- `.github/workflows/release.yml` and its generator source: release triggers, targets, artifacts, publication behavior, signing inputs, and post-release actions. Generated YAML and generator definitions must agree.
- `CONTRIBUTING.md`: contribution process and human-review expectations. Some upstream terminology remains; distinguish inherited guidance from Simtropolis policy.
- `LICENSE-GPL`, `LICENSE-APACHE`, marked component licenses, and third-party notices: legal terms and attribution.
- Current GitHub repository metadata and published releases: visibility, default branch, stable/prerelease status, dates, asset names, and actual download URLs.

When sources disagree, prefer executable source, manifests, and generated workflows over narrative copy. Record the discrepancy rather than blending both versions.

## Verified product boundaries at the time this skill was revised

These facts were checked on 25 September 2026 and must be reverified before publication:

- Copper is the only enabled product in `products/flavors.toml`.
- Its standard profile enables `agentic-tools` and `rust-tools`, with Rust and `rust-analyzer` defaults, Cargo tooling, test exploration, and a Rust-focused agent profile.
- The editor platform contains terminal, Git, debugger, remote-development, extension, and agent infrastructure. Describe a capability as Copper behavior only when its standard product composition and current implementation support that claim.
- Multiplayer and native visual tooling are opt-in and absent from the standard Copper release profile.
- Groovy and Forge are planned and have no release targets. Groovy has a guarded development-only build path; that does not make it an available product.
- The current release workflow targets Linux x86_64, macOS ARM64, and Windows x86_64.
- Signing uses an automatic policy and depends on complete credential sets. The updater is disabled unless a build supplies its update service URL.
- Made is derived from Zed. The source is primarily GPL-3.0-or-later with Apache-2.0 components where marked.
- The GitHub repository was private, with `main` as its default branch. Licensing and “open platform” positioning do not by themselves prove public source access.
- The latest published stable release was Copper 1.16.6 (`rust-v1.16.6`), published 5 September 2026, with Linux x86_64, macOS ARM64, and Windows x86_64 assets.

## Agent-language checklist

Before describing an agent interaction, answer:

1. Is the activity live, recorded, local, remote, or proposed?
2. Which tool or command is visible to the developer?
3. Did execution occur, or was it only requested or suggested?
4. What evidence is inspectable: stdout, diagnostics, tests, a diff, tool status, or an error?
5. What decision remains with the developer?

If the implementation does not answer one of these questions, omit the associated claim or label it unresolved.

## “Open” checklist

Never use “open” as self-proving praise. Name the relevant property:

- licensed source and the applicable licenses;
- current repository access;
- contribution process;
- inspectable tool calls, output, and diffs;
- configurable providers or protocols;
- extension or build interfaces.

These properties can differ. A private repository can contain open-source-licensed code, but copy must not imply that any visitor can currently browse or clone it.
