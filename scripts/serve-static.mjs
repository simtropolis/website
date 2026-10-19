import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
}

// Local preview of Pages-style file routing: never fall back to the homepage.
export function createStaticServer(directory = 'out') {
  const root = resolve(directory)
  return createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end()
      return
    }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
      const target = resolve(root, `.${pathname}`)
      if (target !== root && !target.startsWith(root + sep)) {
        response.writeHead(403).end()
        return
      }
      const candidates = pathname.endsWith('/')
        ? [resolve(target, 'index.html')]
        : [target, `${target}.html`, resolve(target, 'index.html')]
      let file
      for (const candidate of candidates) {
        try {
          if ((await stat(candidate)).isFile()) {
            file = candidate
            break
          }
        } catch (error) {
          if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error
        }
      }
      const status = file ? 200 : 404
      file ??= resolve(root, '404.html')
      const body = await readFile(file)
      response.writeHead(status, {
        'Content-Type': types[extname(file)] ?? 'application/octet-stream',
        'Content-Length': body.length,
        'Cache-Control': 'no-cache',
      })
      response.end(request.method === 'HEAD' ? undefined : body)
    } catch (error) {
      response.writeHead(error instanceof URIError ? 400 : 500).end()
    }
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT ?? 3000)
  await stat('out/index.html')
  createStaticServer().listen(port, '127.0.0.1', () => {
    console.log(`Static export preview: http://127.0.0.1:${port}`)
  })
}
