import assert from 'node:assert/strict'
import { readFile, readdir, lstat } from 'node:fs/promises'
import { resolve, relative } from 'node:path'
import { createStaticServer } from './serve-static.mjs'
import { spawn } from 'node:child_process'

const root = resolve('out')
let bytes = 0
let files = 0
async function walk(directory) {
  for (const name of await readdir(directory)) {
    const path = resolve(directory, name)
    const info = await lstat(path)
    assert.ok(!info.isSymbolicLink(), `Pages artifact must not contain symlinks: ${path}`)
    if (info.isDirectory()) await walk(path)
    else {
      assert.equal(info.nlink, 1, `Pages artifact must not contain hard links: ${path}`)
      bytes += info.size
      files++
    }
  }
}
await walk(root)
assert.ok(bytes < 1_000_000_000, 'Pages published site must be smaller than 1 GB')
for (const file of ['index.html', '404.html', 'robots.txt', 'sitemap.xml']) {
  assert.ok((await readFile(resolve(root, file))).length, `Missing export: ${file}`)
}
const home = await readFile(resolve(root, 'index.html'), 'utf8')
for (const match of home.matchAll(/(?:src|href)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
  const path = resolve(root, `.${match[1]}`)
  assert.ok(!relative(root, path).startsWith('..'), match[1])
  const file = match[1] === '/' ? resolve(root, 'index.html') : path
  assert.ok((await lstat(file)).isFile(), `Missing local homepage asset: ${match[1]}`)
}
const notFound = await readFile(resolve(root, '404.html'), 'utf8')
assert.match(notFound, /404/)
assert.doesNotMatch(notFound, /Sim brings scenes, assets/)
const server = createStaticServer(root)
try {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  await new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, ['scripts/smoke.mjs', base], { stdio: 'inherit' })
    child.once('error', reject)
    child.once('exit', (code) =>
      code === 0 ? resolveRun() : reject(new Error(`Smoke exit ${code}`)),
    )
  })
} finally {
  await new Promise((resolve) => server.close(resolve))
}
console.log(`Static Pages artifact verified: ${files} files, ${bytes} bytes`)
