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
  title: 'Simtropolis — Building the Integral Development Experience',
  description:
    'Made is an open platform for agentic software development. Meet Copper, its Rust-focused development experience, with you in control.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Simtropolis — Building the Integral Development Experience',
    description:
      'Made is an open platform for agentic software development. Meet Copper, its Rust-focused development experience, with you in control.',
    url: '/',
    siteName: 'Simtropolis',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
    title: 'Simtropolis — Building the Integral Development Experience',
    description: 'Made is an open platform for agentic development. Meet Copper for Rust.',
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
