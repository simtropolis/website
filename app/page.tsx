import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  FileDiff,
  Gamepad2,
  Orbit as OrbitIcon,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react'
import { CopperDemo } from '@/components/copper-demo'
import { HeroWorkspacePreview } from '@/components/hero-workspace-preview'
import { PlatformDiagram } from '@/components/platform-diagram'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { documentation, repository } from '@/lib/content'
import { products } from '@/lib/product-catalog'

export const metadata: Metadata = {
  title: 'Simtropolis | Focused development tools',
  description:
    'Simtropolis builds focused development tools on Made. Copper is available for Rust development; Orbit and Forge are planned.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Simtropolis | Focused development tools',
    description:
      'Made supplies the shared editor and development foundation behind Simtropolis products. Copper is available for Rust development.',
    url: '/',
    siteName: 'Simtropolis',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Simtropolis builds focused development tools on Made',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simtropolis | Focused development tools',
    description:
      'Made supplies the shared foundation behind Simtropolis products. Copper is available for Rust development.',
    images: ['/social-card.png'],
  },
}

const productIcons = {
  rust: <Image src="/copper.svg" alt="" width={72} height={72} />,
  jvm: <OrbitIcon aria-hidden="true" />,
  game: <Gamepad2 aria-hidden="true" />,
}

const evidence = [
  {
    icon: ShieldCheck,
    label: 'Before execution',
    title: 'Permission requests name the action.',
    text: 'Protected tool actions wait for the decision required by the active permission profile.',
  },
  {
    icon: TerminalSquare,
    label: 'During the task',
    title: 'Commands and output stay attached.',
    text: 'Tool calls, terminal output, and failures remain visible in the task history.',
  },
  {
    icon: CircleCheck,
    label: 'Evidence',
    title: 'Diagnostics and tests show what passed.',
    text: 'Results can be inspected beside the files and task that produced them.',
  },
  {
    icon: FileDiff,
    label: 'Before keeping edits',
    title: 'Proposed changes open as a diff.',
    text: 'Review individual hunks, then keep, reject, or restore the edited files.',
  },
] as const

const paths = [
  { label: 'Releases', text: 'Published Copper builds and release notes.', href: '/releases' },
  { label: 'Documentation', text: 'Build, configure, and work with Made.', href: documentation },
  { label: 'Source', text: 'Read the Made code and product catalog.', href: repository },
  {
    label: 'Contribute',
    text: 'Development setup and contribution guidance.',
    href: `${repository}/blob/main/CONTRIBUTING.md`,
  },
] as const

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="home-hero-shell wrap" aria-labelledby="hero-title">
          <div className="home-hero-frame">
            <div className="home-hero-copy">
              <p className="eyebrow">
                <span className="rule" /> Simtropolis / Development tools
              </p>
              <h1 id="hero-title">
                Focused <em>development tools.</em>
              </h1>
              <p className="home-hero-lede">
                Simtropolis builds products on Made, a shared editor and development foundation.
                Copper is the available Rust product.
              </p>
              <div className="home-hero-actions">
                <Button asChild className="pill home-primary-action">
                  <a href="/releases">
                    Download Copper <ArrowUpRight size={16} />
                  </a>
                </Button>
                <a className="pill home-secondary-action" href="/copper">
                  Explore Copper <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <HeroWorkspacePreview />
            <span className="home-hero-coordinate mono" aria-hidden="true">
              51.5072° N / 0.1276° W
            </span>
          </div>
        </section>

        <section id="made" className="home-made wrap" aria-labelledby="made-title">
          <div className="home-section-copy">
            <p className="eyebrow">01 / Product model</p>
            <h2 id="made-title">Made supplies the common parts.</h2>
            <p>
              The editor, language intelligence, terminal, Git, debugger, and agent infrastructure
              live in one codebase. Product profiles select the tools, defaults, and release targets
              that ship together.
            </p>
            <a className="text-link" href={documentation}>
              Read the documentation <ArrowUpRight size={16} />
            </a>
          </div>
          <PlatformDiagram />
        </section>

        <section id="products" className="home-products wrap" aria-labelledby="products-title">
          <div className="home-section-heading">
            <p className="eyebrow">02 / Products</p>
            <div>
              <h2 id="products-title">Products built on Made.</h2>
              <p>One product is available today. Two remain catalogued for future work.</p>
            </div>
          </div>
          <div className="home-product-grid">
            {products.map((product, index) => (
              <article
                className={`home-product-card ${product.status === 'Available' ? 'is-available' : 'is-planned'}`}
                key={product.id}
              >
                <div className="home-product-top">
                  <span className="mono">0{index + 1}</span>
                  <span className={`home-product-status ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </div>
                <div className="home-product-icon">{productIcons[product.id]}</div>
                <p className="home-product-area">{product.area}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                {product.productHref && product.releasesHref ? (
                  <div className="home-product-actions">
                    <a href={product.productHref}>
                      Explore Copper <ArrowUpRight size={15} />
                    </a>
                    <a href={product.releasesHref}>
                      Releases <ArrowUpRight size={15} />
                    </a>
                  </div>
                ) : (
                  <p className="home-product-boundary">
                    Planned. No build or download is available.
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="home-evidence" aria-labelledby="evidence-title">
          <div className="wrap">
            <div className="home-evidence-heading">
              <p className="eyebrow">03 / Inspectable work</p>
              <h2 id="evidence-title">See the actions, output, and proposed diff.</h2>
              <p>
                Copper keeps agent activity close to the code it affects. Failures and missing
                evidence remain visible, and proposed edits stay open for review.
              </p>
            </div>
            <div className="home-evidence-grid">
              {evidence.map(({ icon: Icon, label, title, text }, index) => (
                <article key={title}>
                  <div>
                    <span className="mono">0{index + 1}</span>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <p className="mono">{label}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="home-demo-stage">
          <CopperDemo />
        </div>

        <section className="home-paths wrap" aria-labelledby="paths-title">
          <div className="home-section-heading">
            <p className="eyebrow">05 / Project</p>
            <h2 id="paths-title">Download, read, or contribute.</h2>
          </div>
          <div className="home-path-grid">
            {paths.map(({ label, text, href }, index) => (
              <a href={href} key={label}>
                <span className="mono">0{index + 1}</span>
                <div>
                  <h3>{label}</h3>
                  <p>{text}</p>
                </div>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter minimal />
    </>
  )
}
