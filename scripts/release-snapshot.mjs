import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export async function readSnapshot({
  runId = process.env.RELEASE_SNAPSHOT_ID,
  path = resolve('.generated/releases.json'),
} = {}) {
  if (!runId) throw new Error('No release snapshot for this run. Use bun run build or bun run dev.')
  let data
  try {
    data = JSON.parse(await readFile(path, 'utf8'))
  } catch {
    throw new Error(
      'Missing or invalid release snapshot. Restart with bun run build or bun run dev.',
    )
  }
  if (
    data.snapshot?.runId !== runId ||
    !Number.isFinite(Date.parse(data.snapshot?.generatedAt)) ||
    data.repository !== 'simtropolis/made' ||
    !Array.isArray(data.releases) ||
    !Array.isArray(data.platforms)
  ) {
    throw new Error(
      'Release snapshot is stale or invalid for this run. Restart with bun run build or bun run dev.',
    )
  }
  return data
}
