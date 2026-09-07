import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

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
  return JSON.parse(await readFile(join(process.cwd(), '.generated/releases.json'), 'utf8'))
}
