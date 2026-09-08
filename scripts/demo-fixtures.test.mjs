import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fixtureData, fixtureHash } from './demo-fixtures.mjs'

test('browser fixture exactly matches checked-in Rust sources and recording', async () => {
  const data = await fixtureData()
  assert.deepEqual(JSON.parse(await readFile('fixtures/copper-demo/workspace.json', 'utf8')), data)
  const recording = JSON.parse(await readFile('fixtures/copper-demo/recording.json', 'utf8'))
  assert.equal(recording.sha256, fixtureHash(data))
  assert.equal(data.recordedOutput.match(/^test /gm).length, 6)
  assert.match(data.recordedOutput, /running 6 tests/)
})
