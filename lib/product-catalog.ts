export type ProductStatus = 'Available' | 'Planned'

export type Product = {
  id: 'rust' | 'jvm' | 'game'
  name: 'Copper' | 'Groovy' | 'Forge'
  area: string
  status: ProductStatus
  shortDescription: string
  description: string
  productHref?: string
  releasesHref?: string
}

// Copper and Forge were verified against simtropolis/made main at
// 5c824980796c0896c6f5cf3067fbcb206af1d835. Groovy is the planned JVM product in
// dev at d2c855f475539656852526dee8b0f60bccb02c00. The stable main branch still says Orbit;
// the public site follows the requested product rename while preserving Groovy's planned state.
// Runtime release details continue to come from the build-time GitHub snapshot.
export const products: readonly Product[] = [
  {
    id: 'rust',
    name: 'Copper',
    area: 'Rust development',
    status: 'Available',
    shortDescription: 'Rust editing, Cargo, tests, diagnostics, and review.',
    description:
      'Rust defaults, rust-analyzer, Cargo tasks, tests, terminal, Git, debugging, and agent tools in the standard build.',
    productHref: '/copper',
    releasesHref: '/releases',
  },
  {
    id: 'jvm',
    name: 'Groovy',
    area: 'JVM and Groovy development',
    status: 'Planned',
    shortDescription: 'A planned Made product for JVM and Groovy development.',
    description:
      'A planned JVM product under development in Made. It has no release target or public download.',
  },
  {
    id: 'game',
    name: 'Forge',
    area: 'Game development',
    status: 'Planned',
    shortDescription: 'A planned Made product for game development.',
    description: 'A game-development product reserved in the Made catalog.',
  },
] as const
