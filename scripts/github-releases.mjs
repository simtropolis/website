const endpoint = 'https://api.github.com/repos/simtropolis/made/releases?per_page=100&page='
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Classify rather than print arbitrary response text, which could echo a credential,
// URL, account information, or HTML. No response/exception object is logged.
function safeMessage(message, status) {
  if (/bad credentials/i.test(message)) return 'GitHub rejected the credentials.'
  if (/resource not accessible|permission|requires authentication/i.test(message))
    return 'GitHub authentication or repository permission is required.'
  if (/saml|single sign.on|sso/i.test(message))
    return 'GitHub organization SSO authorization is required.'
  if (/secondary rate limit|abuse detection/i.test(message))
    return 'GitHub secondary rate limit exceeded.'
  if (/rate limit/i.test(message)) return 'GitHub API rate limit exceeded.'
  if (status === 404) return 'GitHub resource not found or inaccessible.'
  if (status === 401) return 'GitHub rejected the credentials.'
  if (status === 429) return 'GitHub rate limit exceeded.'
  if (status >= 500) return 'GitHub service temporarily unavailable.'
  if (status >= 200 && status < 300) return 'GitHub release request succeeded.'
  return 'GitHub denied the release request.'
}

function safeHeader(response, name, pattern, token) {
  const value = response.headers.get(name)
  if (!value || (token && value.includes(token)) || !pattern.test(value)) return null
  return value
}

export function diagnostics(response, message = '', token = '') {
  const retryValue = response.headers.get('retry-after')
  const retryDate =
    retryValue &&
    (!token || !retryValue.includes(token)) &&
    /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(retryValue) &&
    Number.isFinite(Date.parse(retryValue))
      ? new Date(retryValue).toUTCString()
      : null
  return {
    status: response.status,
    message:
      safeMessage(message, response.status) +
      (token ? ' (token supplied)' : ' (no token configured)'),
    requestId: safeHeader(response, 'x-github-request-id', /^[a-fA-F0-9:-]{1,128}$/, token),
    'x-ratelimit-remaining': safeHeader(response, 'x-ratelimit-remaining', /^\d{1,16}$/, token),
    'x-ratelimit-reset': safeHeader(response, 'x-ratelimit-reset', /^\d{1,16}$/, token),
    'retry-after': safeHeader(response, 'retry-after', /^\d{1,10}$/, token) ?? retryDate,
  }
}

function retryDelay(info, attempt, now) {
  if (info.status === 401 || info.status === 404 || /credentials|permission|SSO/.test(info.message))
    return null
  const rateLimited =
    info.status === 429 ||
    (info.status === 403 &&
      (info['x-ratelimit-remaining'] === '0' ||
        info['retry-after'] !== null ||
        /rate limit/.test(info.message)))
  const transient = [408, 500, 502, 503, 504].includes(info.status) || info.status === null
  if (!rateLimited && !transient) return null
  const waits = []
  if (info['retry-after'] !== null) {
    waits.push(
      /^\d+$/.test(info['retry-after'])
        ? Number(info['retry-after']) * 1000
        : Date.parse(info['retry-after']) - now,
    )
  }
  if (info['x-ratelimit-remaining'] === '0' && info['x-ratelimit-reset'] !== null)
    waits.push(Number(info['x-ratelimit-reset']) * 1000 - now + 1000)
  if (waits.length) return Math.max(1000, ...waits)
  // GitHub requires at least a minute for a secondary limit without timing headers.
  return (rateLimited ? 60000 : 1000) * 2 ** attempt
}

export async function fetchReleases({
  token = process.env.RELEASES_GITHUB_TOKEN,
  fetcher = fetch,
  sleep = delay,
  now = Date.now,
  maxAttempts = 3,
  maxWaitMs = 120000,
  log = (info) => console.info('GitHub releases: ' + JSON.stringify(info)),
} = {}) {
  if (
    !Number.isInteger(maxAttempts) ||
    maxAttempts < 1 ||
    maxAttempts > 3 ||
    !Number.isFinite(maxWaitMs) ||
    maxWaitMs < 0 ||
    maxWaitMs > 120000
  )
    throw new Error('Invalid GitHub retry bounds')
  token = token?.trim()
  const releases = []
  let waited = 0
  for (let page = 1; ; page++) {
    let batch
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const headers = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'simtropolis-website',
      }
      if (token) headers.Authorization = 'Bearer ' + token
      let response
      try {
        response = await fetcher(endpoint + page, {
          headers,
          cache: 'no-store',
          redirect: 'error',
          signal: AbortSignal.timeout(30000),
        })
      } catch {
        // Network exception messages can contain request URLs and headers.
      }
      let info
      if (!response) {
        info = {
          status: null,
          message:
            'GitHub release network request failed.' +
            (token ? ' (token supplied)' : ' (no token configured)'),
          requestId: null,
          'x-ratelimit-remaining': null,
          'x-ratelimit-reset': null,
          'retry-after': null,
        }
      } else if (response.ok) {
        log(diagnostics(response, '', token))
        try {
          batch = await response.json()
        } catch {
          throw new Error('GitHub returned invalid release JSON')
        }
        if (!Array.isArray(batch)) throw new Error('GitHub did not return a release list')
        break
      } else {
        let message = ''
        try {
          const body = await response.json()
          if (typeof body.message === 'string') message = body.message
        } catch {
          /* Ignore non-JSON error bodies. */
        }
        info = diagnostics(response, message, token)
      }
      log(info)
      const wait = retryDelay(info, attempt, now())
      const failure =
        'GitHub release request failed' +
        (info.status === null ? '' : ' (HTTP ' + info.status + ')')
      if (wait === null) throw new Error(failure + ': ' + info.message)
      if (attempt + 1 === maxAttempts) throw new Error(failure + ': retry attempts exhausted')
      // Never shorten GitHub's requested wait to fit the budget or retry early.
      if (wait > maxWaitMs - waited)
        throw new Error(
          failure +
            ': required wait exceeds the 120-second retry budget; retry after the recorded reset time',
        )
      waited += wait
      await sleep(wait)
    }
    releases.push(...batch)
    if (batch.length < 100) return releases
  }
}
