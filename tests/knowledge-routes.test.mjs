import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { after, before, test } from 'node:test'

const port = 3210
const baseUrl = `http://127.0.0.1:${port}`
let server

async function waitForServer() {
  const deadline = Date.now() + 30_000

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/api/knowledge`)
      if (response.ok) return
    } catch {
      // The development server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error('Next.js test server did not become ready in time')
}

before(async () => {
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: process.cwd(),
    detached: process.platform !== 'win32',
    stdio: 'ignore',
  })
  await waitForServer()
})

after(() => {
  if (!server || server.killed) return

  if (process.platform === 'win32') {
    server.kill()
  } else {
    process.kill(-server.pid, 'SIGTERM')
  }
})

test('knowledge endpoint returns versioned content and cache validators', async () => {
  const response = await fetch(`${baseUrl}/api/knowledge`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.match(response.headers.get('cache-control') ?? '', /max-age=300/)
  assert.equal(response.headers.get('etag'), `"knowledge-${body.metadata.version}"`)
  assert.equal(body.services.length, 3)
  assert.equal(body.faqs.length, 8)
})

test('knowledge endpoint honors If-None-Match', async () => {
  const initial = await fetch(`${baseUrl}/api/knowledge`)
  const etag = initial.headers.get('etag')
  const revalidation = await fetch(`${baseUrl}/api/knowledge`, {
    headers: { 'If-None-Match': etag },
  })

  assert.equal(revalidation.status, 304)
  assert.equal(await revalidation.text(), '')
  assert.equal(revalidation.headers.get('etag'), etag)
})

test('search endpoint returns grounded results and explicit no-answer', async () => {
  const found = await fetch(`${baseUrl}/api/knowledge/search?q=${encodeURIComponent('Wann ist offen?')}`)
  const foundBody = await found.json()
  const missing = await fetch(`${baseUrl}/api/knowledge/search?q=Quantenphysik`)
  const missingBody = await missing.json()

  assert.equal(found.status, 200)
  assert.equal(foundBody.results[0]?.id, 'opening-hours')
  assert.equal(foundBody.knowledgeVersion.length > 0, true)
  assert.deepEqual(missingBody.results, [])
})

test('search endpoint rejects oversized queries', async () => {
  const response = await fetch(`${baseUrl}/api/knowledge/search?q=${'x'.repeat(121)}`)
  assert.equal(response.status, 400)
})
