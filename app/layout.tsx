import type { Metadata } from 'next'
import './globals.css'

const buildRevision = process.env.AWS_COMMIT_ID

export const metadata: Metadata = {
  // A public commit identifier lets operators verify the deployed revision without account access.
  other:
    buildRevision && /^[a-f0-9]{40}$/i.test(buildRevision)
      ? { 'simtropolis-build': buildRevision }
      : undefined,
  metadataBase: new URL('https://simtropolis.ai'),
  title: 'Made by Simtropolis — Focused tools for people who build',
  description:
    'Meet Copper: a Rust development environment with native agent workflows, Cargo tooling, and a Zed-derived editor. Built on Made by Simtropolis.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Made by Simtropolis',
    description:
      'Focused tools for people who build. Meet Copper, the Rust development environment with agents built in.',
    url: '/',
    siteName: 'Simtropolis',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
    title: 'Made by Simtropolis',
    description: 'Meet Copper, the Rust development environment with agents built in.',
  },
  icons: { icon: '/icon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
