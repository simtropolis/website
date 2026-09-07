import { randomUUID } from 'node:crypto'
import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import nextEnv from '@next/env'
import { generateReleases } from './generate-releases.mjs'

function launchNext(mode, args, env) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', mode, ...args], {
      stdio: 'inherit',
      env,
    })
    const interrupt = (signal) => child.kill(signal)
    const onInterrupt = () => interrupt('SIGINT')
    const onTerminate = () => interrupt('SIGTERM')
    process.on('SIGINT', onInterrupt)
    process.on('SIGTERM', onTerminate)
    const cleanup = () => {
      process.off('SIGINT', onInterrupt)
      process.off('SIGTERM', onTerminate)
    }
    child.once('error', () => {
      cleanup()
      reject(new Error('Unable to start Next.js'))
    })
    child.once('exit', (code) => {
      cleanup()
      resolveRun(code ?? 1)
    })
  })
}

export async function runNext(
  mode,
  {
    args = [],
    env = process.env,
    generate = generateReleases,
    launch = launchNext,
    runId = randomUUID(),
  } = {},
) {
  if (!['build', 'dev'].includes(mode)) throw new Error('Expected build or dev')
  const token = env.RELEASES_GITHUB_TOKEN?.trim() || undefined
  await generate({ token, runId })
  const childEnv = { ...env, RELEASE_SNAPSHOT_ID: runId }
  delete childEnv.RELEASES_GITHUB_TOKEN
  delete childEnv.AMPLIFY_REBUILD_WEBHOOK
  return launch(mode, args, childEnv)
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const mode = process.argv[2]
  nextEnv.loadEnvConfig(process.cwd(), mode === 'dev')
  try {
    process.exitCode = await runNext(mode, { args: process.argv.slice(3) })
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
