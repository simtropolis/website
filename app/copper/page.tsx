import type { Metadata } from 'next'
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Cpu,
  Eye,
  FileCheck2,
  GitBranch,
  GitCompareArrows,
  Layers,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { CopperDemo } from '@/components/copper-demo'
import { CopperMascot } from '@/components/copper-mascot'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { documentation, license, repository } from '@/lib/content'
import './copper.css'

export const metadata: Metadata = {
  title: 'Copper — The Integral Rust Development Experience',
  description:
    'Copper brings Rust editing, Cargo, tests, diagnostics, agents, evidence, and human review into one native development experience by Simtropolis.',
  alternates: { canonical: '/copper' },
  openGraph: {
    title: 'Copper — Serious Rust. A softer side.',
    description:
      'An integral Rust development experience where tools and agents work together—with you in control.',
    url: '/copper',
    siteName: 'Simtropolis',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/copper/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Copper, a Rust development experience by Simtropolis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copper — The Integral Rust Development Experience',
    description: 'Rust at the core. Evidence in view. You stay in control.',
    images: ['/copper/social-card.png'],
  },
}

const workflow = [
  {
    number: '01',
    icon: Braces,
    title: 'Understand the code.',
    text: 'A native editor, Tree-sitter, language servers, and rust-analyzer keep symbols, diagnostics, and navigation close to the source.',
  },
  {
    number: '02',
    icon: Terminal,
    title: 'Run the Rust loop.',
    text: 'Cargo and Tests panels organise builds, checks, tests, benchmarks, documentation, formatting, Clippy, and debugging through visible tasks.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Bring in an agent.',
    text: 'Use native agent workflows, skills, model providers, or an Agent Client Protocol integration without leaving the project context.',
  },
  {
    number: '04',
    icon: GitCompareArrows,
    title: 'Review the evidence.',
    text: 'Inspect tool activity, terminal output, diagnostics, and file diffs. Keep or reject individual hunks, then make the final call.',
  },
]

const controls = [
  {
    icon: Eye,
    title: 'Work stays visible.',
    text: 'Agent tool activity, commands, output, diagnostics, and changed files remain inspectable instead of disappearing behind a summary.',
  },
  {
    icon: ShieldCheck,
    title: 'Permission is a setting.',
    text: 'Tool permissions can allow, deny, or ask for confirmation. The selected agent and profile determine the exact tools available.',
  },
  {
    icon: RotateCcw,
    title: 'Edits stay reversible.',
    text: 'Checkpoints and hunk-level review give you a way back when an agent takes the work in the wrong direction.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Choose the intelligence.',
    text: 'Copper’s inherited provider layer supports configurable model providers, external agents, and local model paths where their integrations support the task.',
  },
]

const productStates = [
  {
    label: 'Available',
    className: 'is-available',
    title: 'Copper',
    text: 'Rust and rust-analyzer defaults, toolchain onboarding, Cargo and test workflows, native agents, ACP, terminal, Git, debugger, remote development, and extensions.',
  },
  {
    label: 'Opt-in source build',
    className: 'is-optional',
    title: 'Broader Made capabilities',
    text: 'The full multiplayer workspace and native visual workflow crates exist behind separate features. They are not part of the standard Copper release.',
  },
  {
    label: 'Planned',
    className: 'is-planned',
    title: 'Orbit and Forge',
    text: 'JVM and game-development products are catalogued for the future. They are not currently runnable products or downloads.',
  },
]

const faqs = [
  {
    question: 'What makes the experience “integral”?',
    answer:
      'The parts of development reinforce one another: editor context informs agents, Cargo and tests produce evidence, diagnostics lead back to source, and diffs return the decision to you. Integral describes the connected workflow, not a promise that every tool runs automatically.',
  },
  {
    question: 'Does Copper automatically approve agent changes?',
    answer:
      'No. Copper surfaces changed files and line counts, supports diff review with keep or reject controls, and exposes permission settings for tools. Exact behaviour depends on the selected agent, model, profile, and permissions.',
  },
  {
    question: 'Can I use a different or local model?',
    answer:
      'Copper inherits Made’s model-provider and agent integrations. Provider selection, external ACP agents, and local model paths are configurable where the chosen integration supports them. Model availability and authentication remain provider-specific.',
  },
  {
    question: 'Is Copper available now?',
    answer:
      'Published release metadata currently lists macOS ARM64, Windows x86_64, and Linux x86_64 artifacts. The releases page links to the exact uploaded GitHub assets. GitHub still enforces the Made repository’s access settings on every download.',
  },
  {
    question: 'Are multiplayer and visual workflows included?',
    answer:
      'Not in the standard Copper download. Both areas exist in Made behind opt-in source-build features and should be treated separately from the current Copper release profile.',
  },
  {
    question: 'Is the workspace demo running Copper?',
    answer:
      'No. It is a guided browser demonstration built from validated local Rust fixtures. Editing happens in browser memory; the agent conversation and test output are recorded and clearly labelled.',
  },
]

const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Copper',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows, Linux',
  description:
    'A Rust-focused development environment with Cargo tooling, native agent workflows, and a Zed-derived editor foundation.',
  url: 'https://simtropolis.ai/copper',
  downloadUrl: 'https://simtropolis.ai/releases',
  author: { '@type': 'Organization', name: 'Simtropolis, Inc.', url: 'https://simtropolis.ai' },
  codeRepository: repository,
  license,
}

export default function CopperPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="copper-page">
        <section className="cp-hero cp-wrap" aria-labelledby="copper-hero-title">
          <div className="cp-hero-top">
            <p className="eyebrow">
              <span className="cp-plus" aria-hidden="true">
                +
              </span>{' '}
              A development experience for Rust
            </p>
            <span className="eyebrow">By Simtropolis / 001</span>
          </div>
          <div className="cp-hero-grid">
            <div className="cp-hero-copy">
              <p className="cp-kicker">Building the Integral Development Experience</p>
              <h1 id="copper-hero-title">
                Serious Rust.
                <br />A softer side<span>.</span>
              </h1>
              <p className="cp-lede">
                Copper brings your editor, Rust intelligence, Cargo, tests, terminal, source
                control, debugging, agents, and review into one native workspace.
              </p>
              <p className="cp-positioning">
                An open platform for agentic software development — with you in control.
              </p>
              <div className="cp-actions">
                <Button asChild className="pill cp-primary-action">
                  <a href="/releases">
                    Download Copper <ArrowUpRight size={17} />
                  </a>
                </Button>
                <a className="text-link" href="#workflow">
                  See the whole loop <ArrowDown size={16} />
                </a>
              </div>
            </div>
            <CopperMascot />
          </div>
          <div className="cp-hero-baseline">
            <span className="mono">Native by nature. Rust at heart.</span>
            <span>Tools and agents work together. You decide what ships.</span>
            <a className="mono" href="#workflow">
              Take a look <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <div className="cp-ticker" aria-label="Copper principles">
          <div>
            <span>Rust first</span>
            <b>✳</b>
            <span>Evidence in view</span>
            <b>✳</b>
            <span>Native at heart</span>
            <b>✳</b>
            <span>Developer in control</span>
            <b>✳</b>
            <span aria-hidden="true">Rust first</span>
            <b aria-hidden="true">✳</b>
            <span aria-hidden="true">Evidence in view</span>
            <b aria-hidden="true">✳</b>
          </div>
        </div>

        <section id="workflow" className="cp-section cp-wrap" aria-labelledby="workflow-title">
          <div className="cp-section-heading">
            <p className="eyebrow">01 — The integral loop</p>
            <h2 id="workflow-title">
              One environment.
              <br />
              Every part of the work.
            </h2>
            <p>
              Copper connects the context, execution, evidence, and review that normally fragment a
              Rust development session.
            </p>
          </div>
          <div className="cp-workflow-grid">
            {workflow.map(({ number, icon: Icon, title, text }) => (
              <article key={number}>
                <div>
                  <span className="mono">{number}</span>
                  <Icon size={23} strokeWidth={1.45} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="cp-status is-available">Available</span>
              </article>
            ))}
          </div>
        </section>

        <section className="cp-evidence" aria-labelledby="evidence-title">
          <div className="cp-wrap cp-evidence-inner">
            <div className="cp-evidence-copy">
              <p className="eyebrow">02 — Evidence, not theatre</p>
              <h2 id="evidence-title">See the work behind the answer.</h2>
              <p>
                Agentic development is useful when you can inspect how the result was reached.
                Copper keeps tools, command output, diagnostics, and diffs in the same working
                context.
              </p>
              <p className="cp-evidence-note">
                The sequence shown here is illustrative. Copper exposes these capabilities; it does
                not claim every task automatically runs every check.
              </p>
            </div>
            <ol className="cp-evidence-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Ask for a concrete change.</strong>
                  <p>The thread keeps the request beside the project context.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Watch the tools being used.</strong>
                  <p>Reads, edits, searches, and terminal activity appear as visible steps.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Inspect the evidence.</strong>
                  <code>$ cargo check &amp;&amp; cargo test</code>
                  <p>Tasks keep their real output in terminals and diagnostics.</p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <strong>Review before you keep it.</strong>
                  <p>Open the diff, keep or reject hunks, or restore a checkpoint.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <CopperDemo />

        <section className="cp-section cp-control cp-wrap" aria-labelledby="control-title">
          <div className="cp-section-heading">
            <p className="eyebrow">03 — Your direction</p>
            <h2 id="control-title">Agentic, without giving up the wheel.</h2>
            <p>
              Copper’s agent layer is designed around visible work, configurable tools, and a
              reviewable path back to the code.
            </p>
          </div>
          <div className="cp-control-grid">
            {controls.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={26} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cp-section cp-state-section cp-wrap" aria-labelledby="state-title">
          <div className="cp-section-heading">
            <p className="eyebrow">04 — The platform boundary</p>
            <h2 id="state-title">What ships. What is separate. What comes later.</h2>
            <p>
              Made is the open, Zed-derived platform. Copper is its currently enabled Rust product.
              The distinctions below follow the current product manifest and README.
            </p>
          </div>
          <div className="cp-state-list">
            {productStates.map((state, index) => (
              <article key={state.title}>
                <span className="mono">0{index + 1}</span>
                <div>
                  <span className={`cp-status ${state.className}`}>{state.label}</span>
                  <h3>{state.title}</h3>
                  <p>{state.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="cp-foundation">
            <Cpu size={28} strokeWidth={1.35} />
            <div>
              <h3>Made provides the shared foundation.</h3>
              <p>
                A GPU-accelerated GPUI editor, language servers, Tree-sitter, terminal, Git,
                debugger, remote development, extensions, agents, skills, and model-provider
                infrastructure—assembled into focused development experiences.
              </p>
            </div>
            <a className="text-link" href={repository}>
              Explore the source <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section className="cp-section cp-questions cp-wrap" aria-labelledby="questions-title">
          <div>
            <p className="eyebrow">05 — Good questions</p>
            <h2 id="questions-title">A few things to know.</h2>
            <p>Copper and Made remain under active development.</p>
          </div>
          <div className="cp-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cp-closing cp-wrap" aria-labelledby="copper-closing-title">
          <p className="eyebrow">
            <CheckCircle2 size={14} /> Published builds catalogued
          </p>
          <div>
            <h2 id="copper-closing-title">Build with the whole loop in view.</h2>
            <div className="cp-closing-actions">
              <Button asChild className="pill cp-primary-action">
                <a href="/releases">
                  Download Copper <ArrowUpRight size={17} />
                </a>
              </Button>
              <a className="text-link" href={documentation}>
                Read the documentation <ArrowUpRight size={16} />
              </a>
              <a className="text-link" href={`${repository}/blob/main/CONTRIBUTING.md`}>
                Contribute <GitBranch size={16} />
              </a>
            </div>
          </div>
          <div className="cp-closing-meta">
            <span>
              <FileCheck2 size={16} /> macOS ARM64 · Windows x86_64 · Linux x86_64
            </span>
            <span>
              <Layers size={16} /> GPL-3.0-or-later · Apache-2.0 components
            </span>
            <span>Mascot artwork supplied by Simtropolis</span>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
    </>
  )
}
