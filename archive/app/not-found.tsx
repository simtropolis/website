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
      <p>Return to Simtropolis or browse published Copper releases.</p>
      <Link className="text-link" href="/">
        Simtropolis home →
      </Link>
      <a className="text-link" href="/releases">
        View releases ↗
      </a>
    </main>
  )
}
