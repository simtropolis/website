import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { documentation } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Copper — Rust development on Made | Simtropolis',
  description:
    'Copper is the available Rust-focused product built on Made. Find release notes, downloads, and source guidance.',
  alternates: { canonical: '/copper' },
}

export default function CopperPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to Copper content
      </a>
      <SiteHeader />
      <main id="main" className="section wrap">
        <p className="eyebrow">
          <span className="status-dot" /> Copper / Available
        </p>
        <h1
          style={{
            fontSize: 'clamp(64px,9vw,140px)',
            lineHeight: '.95',
            letterSpacing: '-.06em',
            fontWeight: 400,
            margin: '30px 0',
          }}
        >
          Copper<em style={{ fontFamily: 'Georgia,serif' }}> for Rust.</em>
        </h1>
        <p style={{ maxWidth: 680, fontSize: 20, lineHeight: 1.6 }}>
          Copper is the available Made product for Rust development. Its standard build includes
          Rust tooling and native agent workflows. Made’s visual tooling remains opt-in and is not
          part of that release profile.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
            alignItems: 'center',
            margin: '35px 0 80px',
          }}
        >
          <Link className="pill" href="/releases" style={{ background: '#20211d' }}>
            View Copper releases ↗
          </Link>
          <a className="text-link" href={documentation}>
            Read Made documentation ↗
          </a>
        </div>
        <Image src="/copper.svg" alt="Copper application icon" width={100} height={100} />
      </main>
      <SiteFooter />
    </>
  )
}
