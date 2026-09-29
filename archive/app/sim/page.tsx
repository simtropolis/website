import type { Metadata } from 'next'
import { SiteHeader } from '@/components/archive/site-header'
import { SiteFooter } from '@/components/archive/site-footer'
import { SimPage } from '@/components/archive/sim/sim-page'
import './sim.css'

const title = 'Sim — planned game development product | Simtropolis'
const description =
  'Sim is the planned Made-based product for game development and native visual workflows. Explore the opt-in Made foundation and current capability status.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://simtropolis.ai/sim' },
  openGraph: {
    title,
    description,
    url: 'https://simtropolis.ai/sim',
    siteName: 'Simtropolis',
    type: 'website',
    images: [
      {
        url: '/sim/social-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Sim by Simtropolis. Planned game development and native visual workflows.',
      },
    ],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/sim/social-preview.jpg'] },
}

export default function SimRoute() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://simtropolis.ai/sim',
    about: {
      '@type': 'Thing',
      name: 'Sim',
      description: 'Planned game development product built on Made',
    },
    publisher: { '@type': 'Organization', name: 'Simtropolis', url: 'https://simtropolis.ai' },
  }
  return (
    <div className="sim-shell">
      <a className="skip-link" href="#main">
        Skip to Sim content
      </a>
      <SiteHeader />
      <SimPage />
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  )
}
