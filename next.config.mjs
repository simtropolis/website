import constants from 'next/constants.js'
import { generateReleases } from './scripts/generate-releases.mjs'

export default async function nextConfig(phase) {
  // Always fetch before prerendering, including direct `next build` invocations.
  // Keeping this outside Next's fetch cache prevents stale releases on rebuilds.
  if ([constants.PHASE_PRODUCTION_BUILD, constants.PHASE_DEVELOPMENT_SERVER].includes(phase)) {
    await generateReleases()
  }
  return {
    images: { unoptimized: true },
  }
}
