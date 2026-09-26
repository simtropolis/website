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
  title: 'Simtropolis | Focused development tools',
  description:
    'Simtropolis builds focused development tools on Made. Copper is the currently available Rust product.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Simtropolis | Focused development tools',
    description:
      'Made supplies the shared code behind Simtropolis products. Copper is available for Rust development.',
    url: '/',
    siteName: 'Simtropolis',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
    title: 'Simtropolis | Focused development tools',
    description:
      'Made supplies the shared code behind Simtropolis products. Copper is available for Rust development.',
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
