import Link from 'next/link'
export default function NotFound() {
  return (
    <main className="section wrap not-found">
      <p className="eyebrow">404 / Not found</p>
      <h1>
        This page
        <br />
        isn’t here.
      </h1>
      <p>Head back to Made, or find your next Copper download.</p>
      <Link className="text-link" href="/">
        Back to the website →
      </Link>
      <a className="text-link" href="/releases">
        View releases ↗
      </a>
    </main>
  )
}
