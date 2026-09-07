import { readSnapshot } from '@/scripts/release-snapshot.mjs'

export interface ReleaseAsset {
  name: string
  url: string
  size: number
  target: string | null
}
export interface Release {
  tag: string
  version: string
  prerelease: boolean
  publishedAt: string
  date: string
  url: string
  body: string
  assets: ReleaseAsset[]
}
export interface Platform {
  target: string
  name: string
  architecture: string
  extension: string
}

export async function readReleases(): Promise<{ releases: Release[]; platforms: Platform[] }> {
  return readSnapshot()
}
