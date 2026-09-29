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
    title: 'Simtropolis | Focused development tools',
    description:
      'Made supplies the shared code behind Simtropolis products. Copper is available for Rust development.',
    images: ['/social-card.png'],
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
