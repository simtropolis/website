export type ProductStatus = 'Available' | 'Planned'

export type Product = {
  id: 'rust' | 'jvm' | 'game'
  name: 'Copper' | 'Groovy' | 'Sim'
  area: string
  status: ProductStatus
  shortDescription: string
  description: string
  productHref?: string
  releasesHref?: string
}

// Made's catalog at d2c855f475539656852526dee8b0f60bccb02c00 names the planned
// game product Forge; this site uses the requested public name Sim. Stable main calls the
// planned JVM product Orbit; dev calls it Groovy. Neither planned product has release targets.
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
    name: 'Sim',
    area: 'Game development and native visual workflows',
    status: 'Planned',
    shortDescription: 'A planned Made product for game development and native visual work.',
    description: 'The planned game product has no enabled build or public download.',
    productHref: '/sim',
  },
] as const
