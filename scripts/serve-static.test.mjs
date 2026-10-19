import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createStaticServer } from './serve-static.mjs'

test('static preview serves files and real 404s without an SPA fallback', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'pages-preview-'))
  const server = createStaticServer(directory)
  try {
    await mkdir(join(directory, '_next'))
    await writeFile(join(directory, 'index.html'), '<h1>Home</h1>')
    await writeFile(join(directory, '404.html'), '<h1>Not found</h1>')
    await writeFile(join(directory, '_next/app.js'), 'export default 1')
    await writeFile(join(directory, 'robots.txt'), 'User-agent: *')
    await writeFile(join(directory, 'example.html'), '<h1>Example</h1>')
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
    const base = `http://127.0.0.1:${server.address().port}`
    for (const [path, status, type, body] of [
      ['/', 200, 'text/html', '<h1>Home</h1>'],
      ['/example', 200, 'text/html', '<h1>Example</h1>'],
      ['/robots.txt', 200, 'text/plain', 'User-agent: *'],
      ['/_next/app.js', 200, 'text/javascript', 'export default 1'],
      ['/missing', 404, 'text/html', '<h1>Not found</h1>'],
      ['/nested/missing', 404, 'text/html', '<h1>Not found</h1>'],
    ]) {
      const result = await fetch(base + path)
      assert.equal(result.status, status, path)
      assert.ok(result.headers.get('content-type').startsWith(type), path)
      assert.equal(await result.text(), body, path)
    }
    const head = await fetch(base, { method: 'HEAD' })
    assert.equal(head.status, 200)
    assert.equal(await head.text(), '')
    assert.equal((await fetch(base, { method: 'POST' })).status, 405)
    assert.equal((await fetch(base + '/%ZZ')).status, 400)
    assert.equal((await fetch(base + '/..%2Foutside')).status, 403)
  } finally {
    await new Promise((resolve) => server.close(resolve))
    await rm(directory, { recursive: true, force: true })
  }
})
