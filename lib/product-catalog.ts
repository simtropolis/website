export type ProductStatus = 'Available' | 'Planned'

export type Product = {
  id: 'rust' | 'jvm' | 'game'
  name: 'Copper' | 'Orbit' | 'Forge'
  area: string
  status: ProductStatus
  description: string
  productHref?: string
  releasesHref?: string
}

// Verified against simtropolis/made products/flavors.toml on 26 September 2026.
// Runtime release details continue to come from the build-time GitHub snapshot.
export const products: readonly Product[] = [
  {
    id: 'rust',
    name: 'Copper',
    area: 'Rust development',
    status: 'Available',
    description:
      'Rust defaults, rust-analyzer, Cargo actions, tests, terminal, Git, debugging, and agent tools in the standard build.',
    productHref: '/copper',
    releasesHref: '/releases',
  },
  {
    id: 'jvm',
    name: 'Orbit',
    area: 'JVM development',
    status: 'Planned',
    description: 'A JVM-focused product reserved in the Made catalog.',
  },
  {
    id: 'game',
    name: 'Forge',
    area: 'Game development',
    status: 'Planned',
    description: 'A game-development product reserved in the Made catalog.',
  },
] as const
