export default function Loading() {
  return (
    <main className="route-state wrap" aria-busy="true" aria-live="polite">
      <p className="eyebrow">Simtropolis / Loading</p>
      <div className="route-state-rule" aria-hidden="true" />
      <p>Preparing the page…</p>
    </main>
  )
}
