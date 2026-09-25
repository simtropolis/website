import Image from 'next/image'
import { CopperDemo } from '@/components/copper-demo'
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  GitBranch,
  Terminal,
  Sparkles,
  Layers,
  Cpu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { FAQ } from '@/components/faq'
import { SourceCommand } from '@/components/source-command'
import { repository, documentation, sourceGuide } from '@/lib/content'

const capabilities = [
  {
    number: '01',
    icon: Braces,
    title: 'Rust, right at home.',
    text: 'Built-in Rust support, rust-analyzer defaults, and toolchain onboarding. An environment that speaks your language.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Agents in the workflow.',
    text: 'Work with native agents, model providers, skills, and Agent Client Protocol integrations from inside your editor.',
  },
  {
    number: '03',
    icon: Terminal,
    title: 'Keep Cargo close.',
    text: 'A dedicated Cargo panel, build and run actions, and Rust test exploration. Less switching. More making.',
  },
  {
    number: '04',
    icon: GitBranch,
    title: 'The whole workspace.',
    text: 'A terminal, Git tools, a debugger, and remote development, built on the foundations of the Zed editor.',
  },
]

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index}>+</span>
            ))}
          </div>
          <p className="eyebrow">
            <span className="rule" /> Made by Simtropolis
          </p>
          <h1 id="hero-title">
            Building the Integral
            <br />
            Development <em>Experience.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Made stands for Multiplayer Agentic Development Environment — building focused
              development environments from a shared, Zed-derived editor platform.
            </p>
            <p>
              An open platform for agentic software development — with you in control. One workspace
              where people, tools, and specialised agents work together.
            </p>
            <div className="hero-actions">
              <Button asChild className="pill">
                <a href="/releases">
                  Get Copper <ArrowUpRight size={17} />
                </a>
              </Button>
              <a className="text-link" href="/copper">
                Meet Copper <ArrowDown size={16} />
              </a>
            </div>
          </div>
          <div className="hero-footnote mono">
            <span>Made / Multiplayer Agentic Development Environment</span>
            <span>Building the Integral Development Experience</span>
          </div>
        </section>
        <CopperDemo />
        <div className="product-strip wrap">
          <span className="eyebrow">
            <span className="status-dot" /> Copper is available
          </span>
          <p>Rust at the core. Agents by your side.</p>
          <span className="mono">macOS ARM64 · Windows x86_64 · Linux x86_64</span>
        </div>

        <section id="copper" className="section wrap" aria-labelledby="copper-title">
          <div className="section-heading">
            <p className="eyebrow">01 / Copper</p>
            <div>
              <h2 id="copper-title">
                Less friction.
                <br />
                More <em>flow.</em>
              </h2>
              <p className="section-intro">
                From the first line to the next commit.
                <br />
                Copper brings your Rust workflow together.
              </p>
            </div>
          </div>
          <div className="copper-panel">
            <div className="copper-intro">
              <div className="panel-label mono">
                <span>
                  <span className="status-dot" /> Currently enabled
                </span>
                <span>RUST / 001</span>
              </div>
              <div className="copper-name">
                <h3>
                  Copper<span>Built for your kind of work.</span>
                </h3>
                <Image src="/copper.svg" alt="Copper application icon" width={112} height={112} />
              </div>
              <p>
                A focused desktop environment.
                <br />A shared foundation. Room to build.
              </p>
              <a className="text-link light-link" href="/releases">
                Find your download <ArrowUpRight size={18} />
              </a>
              <a className="text-link light-link" href="/copper">
                Explore Copper <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="copper-tools">
              <span className="eyebrow">In your corner</span>
              <div>
                <Braces size={23} />
                <span>
                  rust-analyzer<small>Language intelligence</small>
                </span>
              </div>
              <div>
                <Terminal size={23} />
                <span>
                  Cargo tooling<small>Build, run, and explore tests</small>
                </span>
              </div>
              <div>
                <Sparkles size={23} />
                <span>
                  Native agents<small>Context, skills, and model providers</small>
                </span>
              </div>
            </div>
          </div>
          <div className="capabilities">
            {capabilities.map(({ number, icon: Icon, title, text }) => (
              <article key={number}>
                <div className="capability-top">
                  <span className="mono">{number}</span>
                  <Icon size={24} strokeWidth={1.3} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="platform"
          className="platform-section section wrap"
          aria-labelledby="platform-title"
        >
          <div className="section-heading">
            <p className="eyebrow">02 / The platform</p>
            <div>
              <h2 id="platform-title">
                One foundation.
                <br />
                Different <em>possibilities.</em>
              </h2>
              <p className="section-intro">
                Made is our Multiplayer Agentic Development Environment platform. We’re building
                focused tools on a shared, Zed-derived editor.
              </p>
            </div>
          </div>
          <div className="platform-grid">
            <article className="platform-card">
              <Cpu size={28} strokeWidth={1.3} />
              <h3>A capable starting point.</h3>
              <p>
                A GPU-accelerated GPUI editor, language servers, Tree-sitter, and WASM extensions.
                Proven editor foundations, carried forward into focused environments.
              </p>
              <a className="text-link" href={`${repository}/tree/main/crates`}>
                Explore the source <ArrowUpRight size={16} />
              </a>
            </article>
            <div className="product-catalog">
              <div className="catalog-row">
                <span className="catalog-index mono">01</span>
                <div>
                  <h3>Copper</h3>
                  <p>Rust development</p>
                </div>
                <span className="badge available">Available</span>
              </div>
              <div className="catalog-row">
                <span className="catalog-index mono">02</span>
                <div>
                  <h3>Orbit</h3>
                  <p>JVM development</p>
                </div>
                <span className="badge">Planned</span>
              </div>
              <div className="catalog-row">
                <span className="catalog-index mono">03</span>
                <div>
                  <h3>Forge</h3>
                  <p>Game development</p>
                </div>
                <span className="badge">Planned</span>
              </div>
            </div>
          </div>
          <div className="opt-in-note">
            <Layers size={21} />
            <p>
              <strong>More to explore, by choice.</strong> Made’s full multiplayer workspace and
              native visual workflows are opt-in features. They are not included in the standard
              Copper release.
            </p>
            <a href={`${repository}/blob/main/docs/src/development/multiplayer-tools.md`}>
              Build profiles <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        <section id="get-started" className="section wrap" aria-labelledby="start-title">
          <div className="section-heading">
            <p className="eyebrow">03 / Get started</p>
            <div>
              <h2 id="start-title">
                Open a project.
                <br />
                Make it <em>yours.</em>
              </h2>
            </div>
          </div>
          <div className="start-grid">
            <div className="steps">
              <article>
                <span className="mono">I</span>
                <div>
                  <h3>Choose your download.</h3>
                  <p>Find the latest Copper release for your operating system and architecture.</p>
                  <a className="text-link" href="/releases">
                    View releases <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
              <article>
                <span className="mono">II</span>
                <div>
                  <h3>Bring your Rust project.</h3>
                  <p>Open your workspace and follow Rust toolchain onboarding to get set up.</p>
                </div>
              </article>
              <article>
                <span className="mono">III</span>
                <div>
                  <h3>Build with your tools together.</h3>
                  <p>
                    Use Cargo, explore tests, and work with native agents in the same environment.
                  </p>
                </div>
              </article>
            </div>
            <div>
              <SourceCommand />
              <p className="source-prerequisites">
                Building from source requires Git, Rustup, and your platform’s native dependencies.{' '}
                <a href={sourceGuide}>
                  Read the setup guide <ArrowUpRight size={13} />
                </a>
              </p>
              <a className="text-link" href={documentation}>
                Read the project documentation <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section section wrap" aria-labelledby="faq-title">
          <div>
            <p className="eyebrow">A few details</p>
            <h2 id="faq-title">
              Good
              <br />
              <em>questions.</em>
            </h2>
            <p>
              Made is under active development.
              <br />
              Here’s where things stand.
            </p>
          </div>
          <FAQ />
        </section>

        <section className="closing-section wrap" aria-labelledby="closing-title">
          <p className="eyebrow">The next line is yours</p>
          <div>
            <h2 id="closing-title">
              Let’s make
              <br />
              something <em>Made.</em>
            </h2>
            <Button asChild className="pill">
              <a href="/releases">
                Get Copper <ArrowUpRight size={18} />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
