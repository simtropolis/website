export const repository = 'https://github.com/simtropolis/made'
export const documentation = `${repository}/blob/main/README.md`
export const sourceGuide = `${documentation}#build-and-run-copper`
export const license = `${repository}/blob/main/LICENSE-GPL`
export const sourceCommand = `git clone https://github.com/simtropolis/made.git
cd made
cargo run -p zed --no-default-features --features agentic-tools,rust-tools`

export const faqs = [
  {
    question: 'What are Made and Copper?',
    answer:
      'Made stands for Multiplayer Agentic Development Environment. It is the shared, Zed-derived platform developed by Simtropolis. Copper is the currently enabled product: a desktop development environment focused on Rust, with native agent workflows and Cargo tooling.',
  },
  {
    question: 'Which platforms can I download Copper for?',
    answer:
      'Published Copper releases include macOS on Apple silicon (ARM64), Windows x86_64, and Linux x86_64. The releases page lists the actual downloads for each version. Other architectures are not currently included in the release catalog.',
  },
  {
    question: 'Is multiplayer included in the download?',
    answer:
      'The default Copper release includes its inherited editor collaboration foundations. Made’s full multiplayer workspace is a separate, opt-in build feature and is not enabled in the standard Copper download. The same is true of the native visual workflow features.',
  },
  {
    question: 'Is the source available?',
    answer:
      'Yes. Made’s source is public on GitHub. It is primarily licensed under GPL-3.0-or-later, with Apache-2.0 components where marked. Review the repository’s license files and contribution guidance for details.',
  },
  {
    question: 'Will Copper update automatically?',
    answer:
      'Download the latest published version from the releases page. Copper’s updater requires a configured production update service; the project does not currently provide one by default.',
  },
  {
    question: 'What is next for Made?',
    answer:
      'Orbit, focused on JVM development, and Forge, focused on game development, are planned products. They are not currently available to run or download. Copper and the Made platform remain under active development.',
  },
]
