import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { AsciiScene } from './ascii-scene'
import { documentation, repository } from '@/lib/content'

const process = [
  [
    '01',
    'Define the graph',
    'Nodes and connections describe the task. The Comfy-compatible node layer lives in Made.',
  ],
  [
    '02',
    'Validate the runtime',
    'The opt-in runtime checks the graph and its inputs before execution.',
  ],
  [
    '03',
    'Handle models and tensors',
    'Model, sampler, tensor, and media crates provide the data path used by the runtime.',
  ],
  [
    '04',
    'Select a worker or backend',
    'Worker and accelerator code is present behind explicit features. Device validation varies by backend.',
  ],
  [
    '05',
    'Inspect the result',
    'Runtime and UI code record outputs and evidence for review. This page is an illustration, not a running task.',
  ],
] as const

const status = [
  [
    'Implemented in Made',
    'Editor and language infrastructure, native agent surfaces, and the Comfy-compatible crate family exist in source.',
  ],
  [
    'Opt-in',
    'The native visual UI and runtime require the `comfy` feature. They are outside the standard Copper profile.',
  ],
  [
    'Experimental / under validation',
    'Accelerator backends and native visual behavior have focused tests and validation work; they are not a Sim release gate.',
  ],
  [
    'Planned for Sim',
    'A game-focused product that brings source work and native visual tasks into one Made-based application.',
  ],
  [
    'Unavailable',
    'Made’s current product catalog defines no enabled Sim build or release target. There is no Sim download on this site.',
  ],
] as const

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="sim-label">
      <span aria-hidden="true" />
      {children}
    </p>
  )
}

export function SimPage() {
  return (
    <main id="main" className="sim-page">
      <section className="sim-hero sim-dark" aria-labelledby="sim-title">
        <div className="sim-hero-grid" aria-hidden="true" />
        <Image
          className="sim-hero-art"
          src="/sim/whale.webp"
          alt=""
          width={1951}
          height={1257}
          priority
        />
        <div className="sim-container sim-hero-content">
          <SectionLabel>Sim / a planned Made product</SectionLabel>
          <h1 id="sim-title">
            Sim<span className="sim-accent">.</span>
            <br />
            <em>Game work,</em>
            <br />
            in development.
          </h1>
          <div className="sim-hero-copy">
            <p>
              Sim is the planned Made-based product for game development and native visual
              workflows. It has no runnable release yet.
            </p>
            <div className="sim-hero-actions">
              <a className="sim-button" href="#foundation">
                Explore the foundation <ArrowDownRight size={19} />
              </a>
              <a className="sim-text-link" href="#status">
                View current status <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="sim-hero-facts" aria-label="Product overview">
            <div>
              <span>01 / COMPANY</span>
              <strong>Simtropolis</strong>
            </div>
            <div>
              <span>02 / FOUNDATION</span>
              <strong>Made</strong>
            </div>
            <div>
              <span>03 / PRODUCT</span>
              <strong>Sim · Planned</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="sim-section sim-intent" id="intent" aria-labelledby="sim-intent-title">
        <div className="sim-container">
          <SectionLabel>01 / Intended composition</SectionLabel>
          <div className="sim-section-head">
            <h2 id="sim-intent-title">
              One place for
              <br />
              <em>the whole task.</em>
            </h2>
            <p>
              Sim is intended to bring source editing together with visual task definition. That
              composition is planned; the pieces described below have different states in Made
              today.
            </p>
          </div>
          <div className="sim-feature-grid">
            <article>
              <span>01</span>
              <h3>Source and language</h3>
              <p>
                Editing, language intelligence, diagnostics, diffs, and command output would sit
                beside game project work.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Native visual work</h3>
              <p>
                Node graphs and media previews would use Made’s opt-in Comfy-compatible UI and
                runtime as a foundation.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Project context</h3>
              <p>
                Assets, files, and task output would remain visible while a developer reviews a
                change.
              </p>
            </article>
            <article>
              <span>04</span>
              <h3>Agent activity</h3>
              <p>
                Proposed edits and tool output would be inspectable in the same application. The
                developer decides what to keep.
              </p>
            </article>
          </div>
          <div className="sim-wide-image">
            <Image src="/sim/bridge.webp" alt="" width={2000} height={1333} loading="lazy" />
            <span>COMPOSITION STUDY / ARCHIVE ART</span>
          </div>
        </div>
      </section>

      <section
        className="sim-section sim-process sim-dark"
        id="process"
        aria-labelledby="sim-process-title"
      >
        <div className="sim-container">
          <SectionLabel>02 / A visual task in Made</SectionLabel>
          <div className="sim-section-head">
            <h2 id="sim-process-title">
              Define.
              <br />
              <em>Run. Inspect.</em>
            </h2>
            <p>
              This is a source-grounded path through Made’s opt-in visual code. It is not a
              demonstration of a released Sim application.
            </p>
          </div>
          <div className="sim-process-grid">
            <div className="sim-process-list">
              {process.map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
            <AsciiScene />
          </div>
        </div>
      </section>

      <section
        className="sim-section sim-foundation"
        id="foundation"
        aria-labelledby="sim-foundation-title"
      >
        <div className="sim-container">
          <SectionLabel>03 / The foundation today</SectionLabel>
          <div className="sim-section-head">
            <h2 id="sim-foundation-title">
              Made has
              <br />
              <em>working parts.</em>
            </h2>
            <p>
              Made contains a Zed-derived editor and opt-in Comfy-compatible crates. The standard
              Copper release enables Rust and agent tooling; it does not enable the visual stack.
            </p>
          </div>
          <div className="sim-foundation-grid">
            <div className="sim-foundation-art">
              <Image src="/sim/permissions.webp" alt="" width={840} height={840} loading="lazy" />
              <span>ARCHIVE ILLUSTRATION / DECORATIVE</span>
            </div>
            <div className="sim-foundation-list">
              <article>
                <span>01 / NODE + RUNTIME</span>
                <h3>Graph definition and execution</h3>
                <p>Node contracts and a native runtime are present in Made source.</p>
              </article>
              <article>
                <span>02 / MODEL + MEDIA</span>
                <h3>Data along the graph</h3>
                <p>Model, sampler, tensor, and media crates handle the visual task’s data types.</p>
              </article>
              <article>
                <span>03 / UI + API</span>
                <h3>Native surfaces and interfaces</h3>
                <p>
                  Made has a GPUI visual UI, plugin and worker code, and an API crate behind
                  explicit build features.
                </p>
              </article>
              <article>
                <span>04 / BACKENDS</span>
                <h3>Device-specific paths</h3>
                <p>
                  Backend manifests list Metal, CUDA, DirectML, ROCm, XPU, NPU, MLU, and CoreX
                  features. A listed backend is not a claim of device-wide support.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div className="sim-art-gallery" aria-label="Decorative archive artwork">
        <Image src="/sim/isolated.webp" alt="" width={840} height={840} loading="lazy" />
        <Image src="/sim/encrypted.webp" alt="" width={840} height={840} loading="lazy" />
        <Image src="/sim/shield.webp" alt="" width={1118} height={1645} loading="lazy" />
        <p>Archive artwork / decorative. No product capability is shown.</p>
      </div>

      <section
        className="sim-section sim-direction sim-dark"
        id="direction"
        aria-labelledby="sim-direction-title"
      >
        <div className="sim-container">
          <SectionLabel>04 / Game-development direction</SectionLabel>
          <div className="sim-direction-layout">
            <div>
              <h2 id="sim-direction-title">
                A product
                <br />
                for <em>game work.</em>
              </h2>
              <p>
                The Made catalog reserves a game product identity, but marks it planned and gives it
                no release targets. Sim is the planned product for that work.
              </p>
              <p>
                Source editing, project navigation, visual graph work, assets, diagnostics, diffs,
                and command output are the intended composition. Engine-specific integrations are
                not part of this claim.
              </p>
            </div>
            <Image src="/sim/whale.webp" alt="" width={1951} height={1257} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sim-section sim-status" id="status" aria-labelledby="sim-status-title">
        <div className="sim-container">
          <SectionLabel>05 / Capability status</SectionLabel>
          <div className="sim-section-head">
            <h2 id="sim-status-title">
              Read the
              <br />
              <em>status first.</em>
            </h2>
            <p>
              A crate, feature flag, or test does not establish a released Sim feature. These labels
              describe the current boundary.
            </p>
          </div>
          <div className="sim-status-grid">
            {status.map(([label, copy], index) => (
              <article key={label}>
                <span className="sim-status-index">0{index + 1}</span>
                <h3>{label}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="sim-status-note">
            <Image src="/sim/audit.webp" alt="" width={840} height={840} loading="lazy" />
            <div>
              <span>ARCHIVE ILLUSTRATION / DECORATIVE</span>
              <h3>No Sim download yet.</h3>
              <p>
                Copper is the available Rust product. Groovy and Sim remain planned product names on
                this site.
              </p>
              <Link href="/releases">
                View Copper releases <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sim-section sim-source sim-dark"
        id="source"
        aria-labelledby="sim-source-title"
      >
        <div className="sim-container">
          <SectionLabel>06 / Development and contribution</SectionLabel>
          <div className="sim-section-head">
            <h2 id="sim-source-title">
              Follow the
              <br />
              <em>source.</em>
            </h2>
            <p>
              Made is derived from Zed. Its repository is currently access restricted. Source and
              documentation links may require permission to the repository.
            </p>
          </div>
          <div className="sim-source-grid">
            <a href={repository}>
              <span>01 / REPOSITORY</span>
              <strong>Made source</strong>
              <ArrowUpRight size={25} />
            </a>
            <a href={documentation}>
              <span>02 / DOCUMENTATION</span>
              <strong>Read the README</strong>
              <ArrowUpRight size={25} />
            </a>
            <a href={`${repository}/blob/main/CONTRIBUTING.md`}>
              <span>03 / CONTRIBUTION</span>
              <strong>Review the guidance</strong>
              <ArrowUpRight size={25} />
            </a>
          </div>
          <p className="sim-source-foot">
            Made source is primarily GPL-3.0-or-later, with Apache-2.0 components where marked. Its
            contribution file still contains upstream Zed wording; check the repository guidance
            before proposing a change.
          </p>
        </div>
      </section>

      <section className="sim-cta" aria-labelledby="sim-cta-title">
        <Image src="/sim/bridge.webp" alt="" width={2000} height={1333} loading="lazy" />
        <div className="sim-container">
          <SectionLabel>07 / What comes next</SectionLabel>
          <h2 id="sim-cta-title">
            Follow Sim’s
            <br />
            <em>development.</em>
          </h2>
          <p>
            Track the current status here. If you have Made repository access, you can inspect the
            source as the game product develops.
          </p>
          <a className="sim-button" href="#status">
            View current status <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
    </main>
  )
}
