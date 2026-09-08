import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'

const root = new URL('../fixtures/copper-demo/', import.meta.url)
export const paths = ['Cargo.toml', 'src/lib.rs', 'src/main.rs', 'tests/parser.rs']
export async function fixtureData() {
  const data = { before: {}, after: {}, recordedOutput: '' }
  for (const stage of ['before', 'after']) {
    for (const path of paths)
      data[stage][path] = await readFile(new URL(`${stage}/${path}`, root), 'utf8')
  }
  data.recordedOutput = await readFile(new URL('recorded-output.txt', root), 'utf8')
  return data
}
export function normalizeOutput(output) {
  return (
    output
      .split('\n')
      .filter((line) => /^running \d+ tests$|^test [a-z_]+ \.\.\. ok$/.test(line))
      .join('\n') + '\n'
  )
}
export function fixtureHash(data) {
  return createHash('sha256').update(JSON.stringify(data.after)).digest('hex')
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const data = await fixtureData()
  if (process.argv.includes('--rust')) {
    for (const stage of ['before', 'after']) {
      const result = spawnSync(
        'cargo',
        [
          'test',
          '--offline',
          '--locked',
          '--manifest-path',
          fileURLToPath(new URL(`${stage}/Cargo.toml`, root)),
          '--test',
          'parser',
          '--',
          '--test-threads=1',
        ],
        { encoding: 'utf8' },
      )
      if (result.status !== 0)
        throw new Error(result.stderr || result.error?.message || 'Rust validation failed')
      if (stage === 'after' && normalizeOutput(result.stdout) !== data.recordedOutput)
        throw new Error('Recorded output differs from the actual patched fixture test run')
      console.log(`${stage}: Rust tests passed`)
    }
  } else if (process.argv.includes('--write')) {
    await writeFile(new URL('workspace.json', root), JSON.stringify(data, null, 2) + '\n')
    await writeFile(
      new URL('recording.json', root),
      JSON.stringify(
        {
          sha256: fixtureHash(data),
          command: 'cargo test --offline --locked --test parser -- --test-threads=1',
          normalization:
            'Only test-count and individual test-result lines; no elapsed time or machine paths.',
        },
        null,
        2,
      ) + '\n',
    )
  }
}
