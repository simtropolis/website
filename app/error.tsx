'use client'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="route-state wrap" role="alert">
      <p className="eyebrow">Simtropolis / Page error</p>
      <h1>The page could not be loaded.</h1>
      <p>Try the request again. If it still fails, the source and releases remain available.</p>
      <div className="route-state-actions">
        <button className="pill" type="button" onClick={reset}>
          Try again
        </button>
        <a className="text-link" href="/releases">
          View releases ↗
        </a>
      </div>
    </main>
  )
}
