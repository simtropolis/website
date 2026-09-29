import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Coffee,
  FileDiff,
  Gamepad2,
  ShieldCheck,
  TerminalSquare,
  TriangleAlert,
} from 'lucide-react'
import { CopperDemo } from '@/components/copper-demo'
import { MadeInterfaceImage } from '@/components/made-interface-image'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { documentation, repository } from '@/lib/content'
import { products } from '@/lib/product-catalog'

export const metadata: Metadata = {
  title: 'Simtropolis | Focused development tools built on Made',
  description:
    'Simtropolis builds focused development tools on Made. Copper is available for Rust development; Groovy and Sim are planned.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Simtropolis | Focused development tools built on Made',
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
    title: 'Simtropolis | Focused development tools built on Made',
    description:
      'Made supplies the shared foundation behind Simtropolis products. Copper is available for Rust development.',
    images: ['/social-card.png'],
  },
}

const organisation = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Simtropolis, Inc.',
  url: 'https://simtropolis.ai',
  description: 'Simtropolis builds focused development tools on Made.',
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'SoftwareApplication',
      name: 'Copper',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Windows, Linux',
      url: 'https://simtropolis.ai/copper',
      downloadUrl: 'https://simtropolis.ai/releases',
    },
  },
}

const productIcons = {
  rust: <Image src="/copper.svg" alt="" width={72} height={72} />,
  jvm: <Coffee aria-hidden="true" />,
  game: <Gamepad2 aria-hidden="true" />,
}

const evidence = [
  {
    className: 'is-wide',
    icon: ShieldCheck,
    label: 'Requested action',
    title: 'The command is visible before it runs.',
    text: 'Permission-sensitive tools show the requested action and wait for the decision required by the active profile.',
    visual: (
      <div className="bento-permission" aria-label="Example recorded permission request">
        <span className="mono">Run command</span>
        <code>cargo test -p parser</code>
        <span className="bento-state">Decision required</span>
      </div>
    ),
  },
  {
    className: '',
    icon: TerminalSquare,
    label: 'Recorded output',
    title: 'Output stays with the task.',
    text: 'Commands, stdout, and failures remain available for inspection.',
    visual: (
      <pre className="bento-terminal" aria-label="Example recorded terminal output">
        <span>$ cargo test</span>
        {'\n'}
        <b>test result: ok. 4 passed</b>
      </pre>
    ),
  },
  {
    className: '',
    icon: Braces,
    label: 'Diagnostics',
    title: 'Compiler evidence stays attached.',
    text: 'Diagnostics and test results show what was checked and what still needs work.',
    visual: (
      <div className="bento-diagnostic">
        <TriangleAlert size={16} aria-hidden="true" />
        <span>
          <code>src/parser.rs:18</code>
          <small>return type must be Result&lt;_, ParseError&gt;</small>
        </span>
      </div>
    ),
  },
  {
    className: 'is-wide',
    icon: FileDiff,
    label: 'Proposed diff',
    title: 'Review the change before keeping it.',
    text: 'Open the proposed patch, inspect each hunk, then keep, reject, or restore the file.',
    visual: (
      <div className="bento-diff" aria-label="Example proposed Rust diff">
        <code className="removed">- fn parse(input: &str) -&gt; Config</code>
        <code className="added">
          + fn parse(input: &str) -&gt; Result&lt;Config, ParseError&gt;
        </code>
        <span>
          <CheckCircle2 size={15} aria-hidden="true" /> Evidence: recorded tests passed
        </span>
      </div>
    ),
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
    <div className="pointer-home">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />
        <section className="pointer-hero wrap" aria-labelledby="hero-title">
          <div className="pointer-hero-frame">
            <div className="pointer-hero-grid" aria-hidden="true" />
            <div className="pointer-hero-copy">
              <p className="eyebrow">
                <span className="rule" /> Simtropolis / Made
              </p>
              <h1 id="hero-title">Focused tools for serious development.</h1>
              <p>
                Simtropolis builds development products on Made. Copper is the available Rust
                product, with editing, Cargo, tests, terminal, Git, debugging, and review in one
                desktop application.
              </p>
              <div className="pointer-hero-actions">
                <Button asChild className="pill pointer-primary-action">
                  <a href="/releases">
                    Download Copper <ArrowUpRight size={16} />
                  </a>
                </Button>
                <a className="pill pointer-secondary-action" href="/copper">
                  Explore Copper <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <MadeInterfaceImage />
          </div>
        </section>

        <section id="products" className="pointer-products wrap" aria-labelledby="products-title">
          <div className="pointer-section-heading">
            <p className="eyebrow">01 / Products</p>
            <div>
              <h2 id="products-title">Three focused products. One available today.</h2>
              <p>Copper ships for Rust development. Groovy and Sim remain planned.</p>
            </div>
          </div>
          <div className="pointer-product-grid">
            {products.map((product, index) => (
              <article
                className={`pointer-product-card is-${product.status.toLowerCase()}`}
                key={product.id}
              >
                <div className="pointer-product-top">
                  <span className="mono">0{index + 1}</span>
                  <span className={`pointer-status ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </div>
                <div className="pointer-product-icon">{productIcons[product.id]}</div>
                <p className="pointer-product-area">{product.area}</p>
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
                {product.productHref && product.releasesHref ? (
                  <div className="pointer-product-actions">
                    <a href={product.productHref}>
                      Explore Copper <ArrowUpRight size={15} />
                    </a>
                    <a href={product.releasesHref}>
                      Download <ArrowUpRight size={15} />
                    </a>
                  </div>
                ) : product.productHref ? (
                  <div className="pointer-product-actions">
                    <a href={product.productHref}>
                      Explore {product.name} <ArrowUpRight size={15} />
                    </a>
                    <p className="pointer-product-boundary">Planned. No download is available.</p>
                  </div>
                ) : (
                  <p className="pointer-product-boundary">
                    Planned. No release or download is available.
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="features" className="pointer-evidence wrap" aria-labelledby="evidence-title">
          <div className="pointer-section-heading">
            <p className="eyebrow">02 / Product features</p>
            <div>
              <h2 id="evidence-title">Evidence stays close to the change.</h2>
              <p>
                Requested actions, recorded output, diagnostics, and proposed edits remain visible.
              </p>
            </div>
          </div>
          <div className="pointer-bento-grid">
            {evidence.map(({ className, icon: Icon, label, title, text, visual }) => (
              <article className={className} key={title}>
                <div className="pointer-bento-label">
                  <span className="mono">{label}</span>
                  <Icon size={19} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                {visual}
              </article>
            ))}
          </div>
        </section>

        <section id="demo" className="pointer-demo-stage" aria-label="Copper guided demo">
          <CopperDemo sectionLabel="03 / Guided editor" />
        </section>

        <section className="pointer-paths wrap" aria-labelledby="paths-title">
          <div className="pointer-section-heading">
            <p className="eyebrow">04 / Project paths</p>
            <h2 id="paths-title">Download, read, or contribute.</h2>
          </div>
          <div className="pointer-path-grid">
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
    </div>
  )
}
