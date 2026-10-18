import type { Metadata } from 'next'
const title = 'simtropolis'
const description =
  'Sim is a visual development workspace in development. Make game worlds with scenes, assets, model inputs, code, and review in a Zed-derived workspace. Sim combines world foundation models with procedural, node-based creative tools for visual work and collaboration.'
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://simtropolis.ai/' },
  icons: { icon: '/icon.svg' },
  openGraph: {
    title,
    description,
    url: 'https://simtropolis.ai/',
    siteName: title,
    type: 'website',
    images: [
      {
        url: '/images/whale.png',
        width: 1951,
        height: 1257,
        alt: 'Glowing whale artwork for simtropolis, a visual development workspace in development.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: '/images/whale.png',
        alt: 'Glowing whale artwork for simtropolis, a visual development workspace in development.',
      },
    ],
  },
}

import './homepage.css'
import { Navigation } from '@/components/landing/navigation'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { InfrastructureSection } from '@/components/landing/infrastructure-section'
import { MetricsSection } from '@/components/landing/metrics-section'
import { IntegrationsSection } from '@/components/landing/integrations-section'
import { SecuritySection } from '@/components/landing/security-section'
import { DevelopersSection } from '@/components/landing/developers-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { CtaSection } from '@/components/landing/cta-section'
import { FooterSection } from '@/components/landing/footer-section'

export default function Home() {
  return (
    <div className="sim-homepage relative min-h-screen overflow-x-hidden">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InfrastructureSection />
        <MetricsSection />
        <IntegrationsSection />
        <SecuritySection />
        <DevelopersSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <FooterSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description,
            url: 'https://simtropolis.ai/',
            about: {
              '@type': 'Thing',
              name: 'Sim',
              description: 'Visual development workspace in development',
            },
          }),
        }}
      />
    </div>
  )
}
