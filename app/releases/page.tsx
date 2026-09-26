import './releases.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ReleaseList } from '@/components/release-list'
import { readReleases } from '@/lib/releases'
import { sourceGuide } from '@/lib/content'

export const dynamic = 'force-static'
const title = 'Copper releases | Simtropolis'
const description =
  'Download published Copper builds for macOS, Windows, and Linux, and read the release history.'
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/releases' },
  openGraph: { title, description, url: '/releases', type: 'website', siteName: 'Simtropolis' },
  twitter: { card: 'summary', title, description },
}

export default async function ReleasesPage() {
  const data = await readReleases()
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to releases
      </a>
      <SiteHeader />
      <main id="main" className="releases-page">
        <section className="release-hero wrap">
          <p className="eyebrow">
            <span className="rule" />
            Copper / Downloads
          </p>
          <h1>
            Copper <em>releases.</em>
          </h1>
          <div className="release-hero-bottom">
            <p>Download a published build and read its notes, including previous versions.</p>
            <Image
              src="/copper.svg"
              alt="Copper application icon"
              width={76}
              height={76}
              priority
            />
          </div>
        </section>
        <ReleaseList {...data} />
        <section className="release-source wrap">
          <div>
            <p className="eyebrow">Source build</p>
            <h2>
              Build <em>Copper.</em>
            </h2>
            <p>The setup guide lists the Rust toolchain and platform dependencies.</p>
          </div>
          <a className="pill" href={sourceGuide}>
            Documentation ↗
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
