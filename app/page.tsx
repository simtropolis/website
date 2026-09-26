import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Gamepad2, Orbit as OrbitIcon } from 'lucide-react'
import { CopperDemo } from '@/components/copper-demo'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { documentation } from '@/lib/content'
import { products } from '@/lib/product-catalog'

export const metadata: Metadata = {
  title: 'Simtropolis | Focused development tools',
  description:
    'Simtropolis builds focused development tools on Made. Copper is available for Rust development; Orbit and Forge are planned.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Simtropolis | Focused development tools',
    description:
      'Made supplies the shared editor and agent foundation behind Simtropolis products. Copper is available for Rust development.',
    url: '/',
    siteName: 'Simtropolis',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
    title: 'Simtropolis | Focused development tools',
    description:
      'Made supplies the shared foundation behind Simtropolis products. Copper is available for Rust development.',
  },
}

const productIcons = {
  rust: <Image src="/copper.svg" alt="" width={72} height={72} />,
  jvm: <OrbitIcon aria-hidden="true" />,
  game: <Gamepad2 aria-hidden="true" />,
}

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="home-hero wrap" aria-labelledby="hero-title">
          <div className="home-hero-grid" aria-hidden="true" />
          <p className="eyebrow">
            <span className="rule" /> Simtropolis
          </p>
          <h1 id="hero-title">
            Focused development
            <br />
            <em>tools.</em>
          </h1>
          <div className="home-hero-copy">
            <p>
              Simtropolis builds software for specific technical domains. Copper, our first
              available product, focuses on Rust.
            </p>
            <a className="text-link" href="#products">
              View the products <ArrowDown size={16} />
            </a>
          </div>
        </section>

        <section id="made" className="home-made wrap" aria-labelledby="made-title">
          <p className="eyebrow">01 / Made</p>
          <div>
            <h2 id="made-title">Made supplies the shared code behind our products.</h2>
            <p>
              It combines editor, language server, terminal, Git, debugger, and agent
              infrastructure. Product profiles select the tools, defaults, and release targets that
              ship together.
            </p>
            <a className="text-link" href={documentation}>
              Documentation <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section id="products" className="home-products wrap" aria-labelledby="products-title">
          <div className="home-section-heading">
            <p className="eyebrow">02 / Products</p>
            <h2 id="products-title">Products built on Made.</h2>
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
                      Copper details <ArrowUpRight size={15} />
                    </a>
                    <a href={product.releasesHref}>
                      Releases <ArrowUpRight size={15} />
                    </a>
                  </div>
                ) : (
                  <p className="home-product-boundary">No build or download is available.</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <CopperDemo />
      </main>
      <SiteFooter minimal />
    </>
  )
}
