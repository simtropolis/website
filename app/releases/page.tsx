import './releases.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ReleaseList } from '@/components/release-list'
import { readReleases } from '@/lib/releases'
import { sourceGuide } from '@/lib/content'

export const dynamic = 'force-static'
const title = 'Copper releases — Made by Simtropolis'
const description =
  'Download Copper for macOS, Windows, and Linux. Find the latest stable release, release notes, and previous versions.'
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
            Made / Downloads &amp; releases
          </p>
          <h1>
            Copper <em>releases.</em>
          </h1>
          <div className="release-hero-bottom">
            <p>
              Downloads and release notes.
              <br />
              Your next step with Copper, the Rust environment from Made.
            </p>
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
            <p className="eyebrow">Made to be explored</p>
            <h2>
              Prefer the <em>source?</em>
            </h2>
            <p>Read the code, build Copper, or contribute to what comes next.</p>
          </div>
          <a className="pill" href={sourceGuide}>
            Build from source ↗
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
