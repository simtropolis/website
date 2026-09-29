import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://simtropolis.ai', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://simtropolis.ai/copper', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://simtropolis.ai/sim', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://simtropolis.ai/releases', changeFrequency: 'daily', priority: 0.9 },
  ]
}
