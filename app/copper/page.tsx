import type { Metadata } from 'next'
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Cpu,
  Eye,
  FileCheck2,
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

const title = 'Copper | Rust development environment by Simtropolis'
const description =
  'Copper combines Rust tooling, Cargo tasks, agent activity, and code review in a desktop editor built on Made.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/copper' },
  openGraph: {
    title,
    description,
    url: '/copper',
    siteName: 'Simtropolis',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/copper/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Copper, the Rust development environment from Simtropolis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/copper/social-card.png'],
  },
}

const workflow = [
  {
    number: '01',
    icon: Braces,
    title: 'Edit and navigate Rust.',
    text: 'The editor uses Tree-sitter and rust-analyzer for syntax, symbols, navigation, and diagnostics.',
  },
  {
    number: '02',
    icon: Terminal,
    title: 'Run Cargo tasks.',
    text: 'Cargo and Tests panels cover builds, checks, tests, benchmarks, documentation, formatting, Clippy, and debugging.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Work with agents.',
    text: 'Native agent workflows, skills, model providers, and Agent Client Protocol integrations use the current project context.',
  },
  {
    number: '04',
    icon: GitCompareArrows,
    title: 'Inspect the result.',
    text: 'Tool calls, terminal output, diagnostics, and file diffs remain available for review before you keep a change.',
  },
]

const controls = [
  {
    icon: Eye,
    title: 'Tool activity',
    text: 'Reads, searches, edits, commands, output, and failures appear in the task history.',
  },
  {
    icon: ShieldCheck,
    title: 'Tool permissions',
    text: 'Profiles can allow a tool, deny it, or require confirmation. Available tools depend on the selected agent.',
  },
  {
    icon: RotateCcw,
    title: 'Review and restore',
    text: 'Checkpoints and hunk review let you inspect, keep, reject, or restore agent edits.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Model configuration',
    text: 'Made supports configurable providers, external ACP agents, and local model paths where the chosen integration supports them.',
  },
]

const productStates = [
  {
    label: 'Available',
    className: 'is-available',
    title: 'Copper',
    text: 'The standard release sets Rust and rust-analyzer defaults and includes toolchain onboarding, Cargo and test tools, native agents, ACP, terminal, Git, debugger, remote development, and extensions.',
  },
  {
    label: 'Optional source build',
    className: 'is-optional',
    title: 'Additional Made features',
    text: 'Multiplayer tools and native visual workflow crates use separate build features. They are absent from the standard Copper release.',
  },
  {
    label: 'Planned',
    className: 'is-planned',
    title: 'Groovy and Forge',
    text: 'Groovy is planned for JVM and Groovy development, and Forge is planned for game development. Neither has a release target or download.',
  },
]

const faqs = [
  {
    question: 'Can I choose an agent or model provider?',
    answer:
      'Made includes provider configuration and Agent Client Protocol support. Available models, authentication, local execution, and tool support depend on the provider or agent you configure.',
  },
  {
    question: 'How are agent commands controlled?',
    answer:
      'The selected profile defines the tools an agent can use. Tool permissions can allow, deny, or ask for confirmation, and the task history records tool calls and their output.',
  },
  {
    question: 'How do downloads and updates work?',
    answer:
      'The releases page links to the exact assets attached to Made releases on GitHub. Repository access rules still apply. Copper does not provide a production update service by default, so install newer releases from the release list.',
  },
]

const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Copper',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows, Linux',
  description,
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
              Copper / Built on Made
            </p>
            <span className="eyebrow">By Simtropolis / 001</span>
          </div>
          <div className="cp-hero-grid">
            <div className="cp-hero-copy">
              <p className="cp-kicker">Rust development with reviewable agent work</p>
              <h1 id="copper-hero-title">
                Copper is a Rust
                <br />
                development <span>environment.</span>
              </h1>
              <p className="cp-lede">
                Write code, run Cargo tasks, inspect requested actions, and review proposed changes
                in one desktop application.
              </p>
              <p className="cp-positioning">
                Output, diagnostics, and diffs stay visible. The active tool profile decides which
                actions run and which require confirmation.
              </p>
              <div className="cp-actions">
                <Button asChild className="pill cp-primary-action">
                  <a href="/releases">
                    Download Copper <ArrowUpRight size={17} />
                  </a>
                </Button>
                <a className="text-link" href="#workflow">
                  Current capabilities <ArrowDown size={16} />
                </a>
              </div>
            </div>
            <CopperMascot />
          </div>
          <div className="cp-hero-baseline">
            <span className="mono">macOS ARM64 · Windows x86_64 · Linux x86_64</span>
            <span>Made and Copper are under active development.</span>
            <a className="mono" href={documentation}>
              Documentation <ArrowUpRight size={13} />
            </a>
          </div>
        </section>

        <div className="cp-ticker" aria-label="Copper components">
          <div>
            <span>rust-analyzer</span>
            <b>✳</b>
            <span>Cargo</span>
            <b>✳</b>
            <span>Agent tasks</span>
            <b>✳</b>
            <span>Diff review</span>
            <b>✳</b>
            <span aria-hidden="true">rust-analyzer</span>
            <b aria-hidden="true">✳</b>
            <span aria-hidden="true">Cargo</span>
            <b aria-hidden="true">✳</b>
          </div>
        </div>

        <section id="workflow" className="cp-section cp-wrap" aria-labelledby="workflow-title">
          <div className="cp-section-heading">
            <p className="eyebrow">01 — Current capabilities</p>
            <h2 id="workflow-title">Keep the Rust toolchain close to the code.</h2>
            <p>
              “Integral” describes how editing, language intelligence, project tools, agents, and
              review share context. Each part remains visible and usable on its own.
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

        <CopperDemo />

        <section className="cp-section cp-control cp-wrap" aria-labelledby="control-title">
          <div className="cp-section-heading">
            <p className="eyebrow">02 — Agent controls</p>
            <h2 id="control-title">Set the boundaries for agent work.</h2>
            <p>
              Agent behaviour follows the profile, provider, and permissions you select. Copper
              keeps the resulting activity attached to the task and code.
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
            <p className="eyebrow">03 — Release scope</p>
            <h2 id="state-title">Current release scope.</h2>
            <p>
              The current product manifest separates the standard Copper build from optional Made
              features and future products.
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
              <h3>Made is derived from Zed.</h3>
              <p>
                Copper uses Made’s Zed-derived editor foundation. The repository retains upstream
                attribution and the applicable GPL and Apache licence notices.
              </p>
            </div>
            <a className="text-link" href={repository}>
              Source <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section className="cp-section cp-questions cp-wrap" aria-labelledby="questions-title">
          <div>
            <p className="eyebrow">04 — Details</p>
            <h2 id="questions-title">Using Copper.</h2>
            <p>Practical notes about agent configuration and releases.</p>
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
            <FileCheck2 size={14} /> Published builds
          </p>
          <div>
            <h2 id="copper-closing-title">Download the current Copper release.</h2>
            <div className="cp-closing-actions">
              <Button asChild className="pill cp-primary-action">
                <a href="/releases">
                  Download Copper <ArrowUpRight size={17} />
                </a>
              </Button>
              <a className="text-link" href={documentation}>
                Documentation <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="cp-closing-meta">
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
