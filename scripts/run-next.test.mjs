import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { runNext } from './run-next.mjs'
import { generateReleases } from './generate-releases.mjs'
import { readSnapshot } from './release-snapshot.mjs'
import nextConfig from '../next.config.mjs'

test('legacy wrapper generates a release snapshot once when explicitly invoked', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'made-build-'))
  const cwd = process.cwd(),
    previousId = process.env.RELEASE_SNAPSHOT_ID
  let requests = 0,
    generations = 0,
    launches = 0
  try {
    process.chdir(directory)
    const result = await runNext('build', {
      env: { RELEASES_GITHUB_TOKEN: 'private-token', AMPLIFY_REBUILD_WEBHOOK: 'private-webhook' },
      runId: 'this-build',
      generate: async (options) => {
        generations++
        assert.equal(options.token, 'private-token')
        return generateReleases({
          ...options,
          fetcher: async () => {
            requests++
            return Response.json([])
          },
          requestOptions: { log: () => {} },
        })
      },
      launch: async (mode, args, env) => {
        launches++
        assert.equal(mode, 'build')
        assert.deepEqual(args, [])
        assert.equal(env.RELEASES_GITHUB_TOKEN, undefined)
        assert.equal(env.AMPLIFY_REBUILD_WEBHOOK, undefined)
        process.env.RELEASE_SNAPSHOT_ID = env.RELEASE_SNAPSHOT_ID
        assert.deepEqual(nextConfig, { images: { unoptimized: true } })
        const snapshot = await readSnapshot()
        assert.ok(!JSON.stringify(snapshot).includes('private-token'))
        assert.ok(!JSON.stringify(snapshot).includes('private-webhook'))
        return 0
      },
    })
    assert.equal(result, 0)
    assert.equal(requests, 1)
    assert.equal(generations, 1)
    assert.equal(launches, 1)
  } finally {
    process.chdir(cwd)
    if (previousId === undefined) delete process.env.RELEASE_SNAPSHOT_ID
    else process.env.RELEASE_SNAPSHOT_ID = previousId
    await rm(directory, { recursive: true, force: true })
  }
})
test('failed fetch never launches Next even if an older snapshot exists', async () => {
  let launches = 0
  await assert.rejects(
    runNext('build', {
      env: {},
      generate: async () => {
        throw new Error('HTTP 403')
      },
      launch: async () => {
        launches++
      },
    }),
    /403/,
  )
  assert.equal(launches, 0)
})
test('an Amplify build without a token still attempts the public API once', async () => {
  let generations = 0,
    launches = 0
  for (const token of [undefined, '', '   ']) {
    await runNext('build', {
      env: { AWS_APP_ID: 'existing-app', AWS_BRANCH: 'main', RELEASES_GITHUB_TOKEN: token },
      generate: async (options) => {
        generations++
        assert.equal(options.token, undefined)
      },
      launch: async () => {
        launches++
        return 0
      },
    })
  }
  assert.equal(generations, 3)
  assert.equal(launches, 3)
})
test('local development generates a fresh snapshot, forwards arguments and propagates exit status', async () => {
  let generated
  const result = await runNext('dev', {
    env: {},
    args: ['--port', '3100'],
    runId: 'development',
    generate: async (options) => {
      generated = options
    },
    launch: async (mode, args, env) => {
      assert.equal(mode, 'dev')
      assert.deepEqual(args, ['--port', '3100'])
      assert.equal(env.RELEASE_SNAPSHOT_ID, 'development')
      return 7
    },
  })
  assert.equal(result, 7)
  assert.equal(generated.runId, 'development')
})
test('direct builds and stale, absent or malformed snapshots fail explicitly', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'made-snapshot-')),
    path = join(directory, 'releases.json')
  try {
    await assert.rejects(readSnapshot({ path, runId: undefined }), /No release snapshot/)
    await assert.rejects(readSnapshot({ path, runId: 'current' }), /Missing or invalid/)
    await mkdir(directory, { recursive: true })
    await writeFile(
      path,
      JSON.stringify({
        repository: 'simtropolis/made',
        releases: [],
        platforms: [],
        snapshot: { runId: 'old', generatedAt: new Date().toISOString() },
      }),
    )
    await assert.rejects(readSnapshot({ path, runId: 'current' }), /stale or invalid/)
    await writeFile(path, 'not JSON')
    await assert.rejects(readSnapshot({ path, runId: 'current' }), /Missing or invalid/)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
