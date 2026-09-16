// Approximates production hosting: keep-alive plus gzip, unlike python http.server.
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { createGzip } from 'node:zlib'

const root = new URL('./.output/public/', import.meta.url).pathname
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf' }
const compressible = new Set(['.html', '.js', '.css', '.json', '.svg'])

createServer((req, res) => {
  let path = join(root, normalize(decodeURI(req.url.split('?')[0])))
  if (!existsSync(path) || statSync(path).isDirectory()) path = join(path, 'index.html')
  if (!existsSync(path)) { res.writeHead(404); res.end('not found'); return }
  const ext = extname(path)
  const headers = { 'content-type': types[ext] ?? 'application/octet-stream', 'cache-control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable' }
  if (compressible.has(ext) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
    res.writeHead(200, { ...headers, 'content-encoding': 'gzip' })
    createReadStream(path).pipe(createGzip()).pipe(res)
  } else {
    res.writeHead(200, { ...headers, 'content-length': statSync(path).size })
    createReadStream(path).pipe(res)
  }
}).listen(4175, () => console.log('serving on 4175'))
