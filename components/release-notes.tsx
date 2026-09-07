import type { ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  return text
    .split(/(`[^`]+`|\[[^\]]+\]\(https:\/\/[^\s)]+\)|\*\*[^*]+\*\*|https:\/\/[^\s<>]+)/g)
    .map((part, index) => {
      if (index % 2 === 0) return part
      if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>
      if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
      let label = part
      let destination = part
      if (part.startsWith('[')) {
        const split = part.indexOf('](')
        label = part.slice(1, split)
        destination = part.slice(split + 2, -1)
      }
      try {
        const url = new URL(destination)
        if (url.protocol !== 'https:' || url.username || url.password) return part
        return (
          <a key={index} href={url.href} rel="nofollow noreferrer">
            {label}
          </a>
        )
      } catch {
        return part
      }
    })
}

export function ReleaseNotes({ text }: { text: string }) {
  const blocks: ReactNode[] = []
  let code: string[] | undefined
  let items: string[] = []
  function flushList() {
    if (items.length)
      blocks.push(
        <ul key={blocks.length}>
          {items.map((item, index) => (
            <li key={index}>{inline(item)}</li>
          ))}
        </ul>,
      )
    items = []
  }
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith('```')) {
      flushList()
      if (code) {
        blocks.push(
          <pre key={blocks.length}>
            <code>{code.join('\n')}</code>
          </pre>,
        )
        code = undefined
      } else code = []
      continue
    }
    if (code) {
      code.push(line)
      continue
    }
    const item = line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/)
    if (item) {
      items.push(item[1])
      continue
    }
    flushList()
    if (/^#{1,6}\s/.test(line))
      blocks.push(<h3 key={blocks.length}>{inline(line.replace(/^#+\s+/, ''))}</h3>)
    else if (line.trim()) blocks.push(<p key={blocks.length}>{inline(line)}</p>)
  }
  flushList()
  if (code)
    blocks.push(
      <pre key={blocks.length}>
        <code>{code.join('\n')}</code>
      </pre>,
    )
  // React escapes text and attributes. Raw HTML from release notes is never injected.
  return <div className="release-notes">{blocks}</div>
}
