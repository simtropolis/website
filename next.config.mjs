import constants from 'next/constants.js'
import { readSnapshot } from './scripts/release-snapshot.mjs'

export default async function nextConfig(phase) {
  if ([constants.PHASE_PRODUCTION_BUILD, constants.PHASE_DEVELOPMENT_SERVER].includes(phase)) {
    // Validation is read-only; the wrapper generates exactly once before launching Next.
    await readSnapshot()
  }
  return { images: { unoptimized: true } }
}
