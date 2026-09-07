import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fetchReleases, diagnostics } from './github-releases.mjs'

const failed = (status, message, headers = {}) => Response.json({ message }, { status, headers })
function scenario(responses, overrides = {}) {
  const waits = [],
    logs = [],
    calls = []
  return {
    waits,
    logs,
    calls,
    run: () =>
      fetchReleases({
        fetcher: async (url, options) => {
          calls.push({ url, options })
          const response = responses[Math.min(calls.length - 1, responses.length - 1)]
          if (response instanceof Error) throw response
          return response.clone()
        },
        sleep: async (ms) => {
          waits.push(ms)
        },
        now: () => 1000000,
        log: (info) => logs.push(info),
        ...overrides,
      }),
  }
}

test('logs only allowlisted, sanitized response fields, never a body or credential', () => {
  const secret = 'ghp_never_print_this'
  const response = failed(403, 'unused', {
    'x-github-request-id': 'ABCD:1234:5678',
    'x-ratelimit-remaining': '0',
    'x-ratelimit-reset': '1002',
    'retry-after': '2',
    Authorization: 'Bearer ' + secret,
    'set-cookie': secret,
  })
  const info = diagnostics(
    response,
    'API rate limit exceeded for token=' + secret + ' at https://user:password@example.test',
    secret,
  )
  assert.deepEqual(info, {
    status: 403,
    message: 'GitHub API rate limit exceeded. (token supplied)',
    requestId: 'ABCD:1234:5678',
    'x-ratelimit-remaining': '0',
    'x-ratelimit-reset': '1002',
    'retry-after': '2',
  })
  assert.ok(!JSON.stringify(info).includes(secret))
  assert.equal(
    diagnostics(
      failed(403, '', { 'x-github-request-id': secret, 'retry-after': secret }),
      secret,
      secret,
    ).requestId,
    null,
  )
})
test('retries primary rate limits only after both reset and Retry-After permit it', async () => {
  const run = scenario([
    failed(403, 'API rate limit exceeded', {
      'x-ratelimit-remaining': '0',
      'x-ratelimit-reset': '1004',
      'retry-after': '2',
    }),
    Response.json([]),
  ])
  assert.deepEqual(await run.run(), [])
  assert.deepEqual(run.waits, [5000])
  assert.equal(run.calls.length, 2)
})
test('respects Retry-After seconds and HTTP dates for 429 and transient responses', async () => {
  for (const [header, expected] of [
    ['3', 3000],
    [new Date(1005000).toUTCString(), 5000],
  ]) {
    const run = scenario([
      failed(429, 'Too many requests', { 'retry-after': header }),
      Response.json([]),
    ])
    await run.run()
    assert.deepEqual(run.waits, [expected])
  }
  const run = scenario([failed(503, 'Unavailable', { 'retry-after': '7' }), Response.json([])])
  await run.run()
  assert.deepEqual(run.waits, [7000])
})
test('secondary limits wait at least one minute and stop at the total wait budget', async () => {
  const run = scenario([failed(403, 'You have exceeded a secondary rate limit')])
  await assert.rejects(run.run(), /retry budget/)
  assert.deepEqual(run.waits, [60000])
  assert.equal(run.calls.length, 2)
})
test('a reset beyond the budget fails without retrying before GitHub allows it', async () => {
  const run = scenario([
    failed(403, 'API rate limit exceeded', {
      'x-ratelimit-remaining': '0',
      'x-ratelimit-reset': '4600',
    }),
  ])
  await assert.rejects(run.run(), /retry budget/)
  assert.deepEqual(run.waits, [])
  assert.equal(run.calls.length, 1)
})
test('does not retry credentials, permissions, SSO, ordinary forbidden or inaccessible resources', async () => {
  for (const [status, message] of [
    [401, 'Bad credentials'],
    [403, 'Resource not accessible by personal access token'],
    [403, 'SAML SSO authorization required'],
    [403, 'Forbidden'],
    [404, 'Not Found'],
  ]) {
    const run = scenario([failed(status, message)])
    await assert.rejects(run.run(), /GitHub release request failed/)
    assert.equal(run.calls.length, 1)
    assert.deepEqual(run.waits, [])
  }
  const run = scenario([
    failed(403, 'Resource not accessible by integration', {
      'retry-after': '1',
      'x-ratelimit-remaining': '0',
    }),
  ])
  await assert.rejects(run.run())
  assert.equal(run.calls.length, 1)
})
test('bounds transient server/network retries and sanitizes exception details', async () => {
  for (const failure of [failed(502, 'Proxy failure'), new Error('Bearer ghp_hidden_secret')]) {
    const run = scenario([failure])
    await assert.rejects(run.run(), /retry attempts exhausted/)
    assert.equal(run.calls.length, 3)
    assert.deepEqual(run.waits, [1000, 2000])
    assert.ok(!JSON.stringify(run.logs).includes('ghp_hidden_secret'))
  }
})
test('retries only the failed pagination request and never appends error JSON as releases', async () => {
  const records = Array.from({ length: 100 }, (_, id) => ({ id }))
  const run = scenario([
    Response.json(records),
    failed(500, 'temporary'),
    Response.json([{ id: 100 }]),
  ])
  assert.equal((await run.run()).length, 101)
  assert.match(run.calls[0].url, /page=1$/)
  assert.match(run.calls[1].url, /page=2$/)
  assert.equal(run.calls[1].url, run.calls[2].url)
})
test('malformed successful responses fail instead of becoming an empty release list', async () => {
  for (const response of [
    new Response('<html>proxy error</html>'),
    Response.json({ message: 'unexpected' }),
  ]) {
    const run = scenario([response])
    await assert.rejects(run.run(), /invalid release JSON|release list/)
    assert.equal(run.calls.length, 1)
  }
})
