---
name: brand-writer
description: Write or review clear, developer-first content for Simtropolis, the Made platform, and Copper. Use for homepage and product copy, documentation introductions, releases, metadata, contribution pages, and announcements where product identity, capability status, agent behavior, or technical claims must be accurate.
metadata:
  short-description: Write grounded Simtropolis product copy
---

# Simtropolis brand writer

Write as a developer explaining a tool to another developer. Lead with the useful fact, describe the mechanism or observable behavior, and let the reader judge the benefit.

## Brand foundation

- **Simtropolis** is the company building focused development tools.
- **Made** is its open platform for agentic software development.
- **Copper** is the currently available Rust development environment built on Made.
- Developers remain responsible for what runs and which proposed changes they keep.
- Source access, inspectability, contribution paths, licensing, and upstream attribution must be described accurately.
- Available, opt-in, experimental, recorded, and planned capabilities are different states. Name the state that applies.

“Building the Integral Development Experience” may be used as a brand thesis. Explain _integral_ nearby through concrete behavior: editing, language intelligence, Cargo, tests, terminal output, source control, debugging, agent activity, evidence, and human review working in the same application. Do not leave it as an unsupported slogan.

Read [references/product-language.md](references/product-language.md) whenever copy identifies a product, describes agent behavior, states availability, mentions a release, or discusses source and licensing. Read [references/voice-examples.md](references/voice-examples.md) when drafting or reconstructing copy.

## Voice

- Developer-first and peer-to-peer.
- Technically grounded, calm, direct, and quietly confident.
- Open about limits, prerequisites, current status, and uncertainty.
- Interested in craft without romanticizing it.
- Natural when read aloud.

Prefer complete sentences and familiar verbs. Vary sentence length. Use the product name instead of cycling through synonyms such as “platform,” “environment,” and “workspace.” Use those category words only when they add meaning.

## Drafting rules

1. Put the essential fact or change first.
2. Describe the mechanism or observable behavior before the benefit.
3. Mark every factual claim with `[FACT: claim — source]` while drafting. This includes product status, features, versions, dates, platforms, architectures, signing, update behavior, repository access, URLs, attribution, and licensing.
4. Check each marker against an authoritative source. Prefer current source and generated configuration over prose that may have drifted.
5. State the capability boundary in the sentence or immediate context. Do not make a reader infer whether something ships in Copper, requires an opt-in Made build, remains experimental, appears only in a recorded demo, or is planned.
6. Remove the markers only after verification. Preserve the verified fact exactly unless the scope makes it irrelevant; record any intentional removal during review.

Do not turn an implementation detail into visitor copy unless it changes a developer’s decision or explains observable behavior.

## Agent behavior

- State whether activity is **live**, **recorded**, **local**, **remote**, or merely **proposed**.
- Describe visible actions precisely: a tool call was requested, a command ran, output was recorded, a diff was proposed, or a developer applied a change.
- Never say an agent ran code, changed a file, approved a command, or verified a result when it only suggested an action.
- Avoid anthropomorphism and unsupported claims of autonomy. Agents do not “understand,” “own,” “decide,” or “work while you sleep” unless the implementation and operating conditions establish that behavior.
- Explain developer control through the actual interaction: review a diff, inspect output, allow a tool, reject an edit, choose a provider, or change a setting.

## Releases and availability

- Verify the current GitHub release and its actual assets before naming a version, platform, architecture, file type, or download URL.
- Verify signing and update behavior from the release workflow and product configuration. Do not infer either from the presence of an installer.
- Describe roadmap entries in future tense. A catalog entry, design document, crate, feature flag, or test does not prove a capability ships in standard Copper.
- Do not call a repository public, a release generally accessible, or a feature open source without checking current access and license evidence.

## Attribution and licensing

- Describe Made as derived from Zed when technical lineage or licensing is relevant.
- Keep Zed’s identity separate from Simtropolis, Made, and Copper. Never transfer Zed performance, team, adoption, or product claims.
- Verify the applicable repository license files and marked component licenses. Do not reduce a mixed or file-specific license model to a broader claim.
- Preserve third-party attribution and contribution requirements. Link the authoritative files when practical.

## Validation

Read [references/rubric.md](references/rubric.md) and score all eight criteria. Every criterion must score at least 4/5. Then scan [references/taboo-phrases.md](references/taboo-phrases.md); any prohibited pattern fails the draft.

For homepage copy, product pages, announcements, release introductions, metadata, and other high-visibility writing, run the repository’s `humanizer` skill as the final editorial pass. Preserve every verified fact, status label, product name, URL, version, attribution, and license statement. Re-score after that pass because humanization must not weaken precision.

Before delivering copy, confirm:

- the company, platform, and product are not conflated;
- each agent action and capability has an explicit, accurate state;
- the lede contains the information the developer came for;
- each claimed benefit follows from a described mechanism;
- no slogan substitutes for explanation;
- no unsupported customer proof, performance figure, integration, certification, security promise, price, or availability claim was added;
- the copy reads naturally aloud.

## Review mode

When reviewing existing copy:

1. Inventory the claims and mark them with `[FACT]`.
2. Flag identity errors, ambiguous status, missing agent-state labels, and unsupported assertions before adjusting style.
3. Score the copy with the rubric and list taboo patterns with line references.
4. Reconstruct any section scoring below 4/5 while preserving verified facts.
5. Apply the humanizer pass when the surface is high visibility, then re-score.

Use [references/validation-exercises.md](references/validation-exercises.md) as calibration, not as reusable website copy.
