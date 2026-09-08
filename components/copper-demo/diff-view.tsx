import { useMemo } from 'react'
import { classHighlighter, highlightTree } from '@lezer/highlight'
import { rustLanguage } from '@codemirror/lang-rust'
import { changeStats, diffLines, type FilePath } from '@/lib/copper-demo'

export function Syntax({ code }: { code: string }) {
  const parts = useMemo(() => {
    const tokens: { from: number; to: number; className: string }[] = []
    highlightTree(rustLanguage.parser.parse(code), classHighlighter, (from, to, className) =>
      tokens.push({ from, to, className }),
    )
    let end = 0
    const parts = []
    for (const token of tokens) {
      if (token.from > end)
        parts.push(<span key={`plain-${end}`}>{code.slice(end, token.from)}</span>)
      parts.push(
        <span key={token.from} className={token.className}>
          {code.slice(token.from, token.to)}
        </span>,
      )
      end = token.to
    }
    if (end < code.length) parts.push(<span key={`plain-${end}`}>{code.slice(end)}</span>)
    return parts
  }, [code])
  return <>{parts}</>
}
export function Counts({ path }: { path?: FilePath }) {
  const stats = changeStats(path)
  return (
    <span className="cw-counts" aria-label={`${stats.added} additions, ${stats.removed} deletions`}>
      <span>+{stats.added}</span>
      <span>−{stats.removed}</span>
    </span>
  )
}
export function DiffCard({ path, compact = false }: { path: FilePath; compact?: boolean }) {
  const lines = diffLines(path)
  const shown = compact ? lines.slice(0, path === 'tests/parser.rs' ? 9 : 11) : lines
  return (
    <div className={`cw-code-card ${compact ? 'cw-inline-code' : ''}`}>
      <div className="cw-diff-lines" aria-label={`Proposed diff for ${path}`}>
        {shown.map((line, i) => (
          <div className={`cw-diff-line ${line.kind}`} key={i}>
            <span className="cw-line-number" aria-hidden="true">
              {line.kind === 'removed' ? line.oldLine : line.newLine}
            </span>
            <code>
              <span
                className="cw-diff-sign"
                aria-label={
                  line.kind === 'added' ? 'Added' : line.kind === 'removed' ? 'Removed' : undefined
                }
              >
                {line.kind === 'added' ? '+' : line.kind === 'removed' ? '−' : ' '}
              </span>
              <Syntax code={line.text || ' '} />
            </code>
          </div>
        ))}
      </div>
      {shown.length < lines.length && (
        <p className="cw-more-lines">
          … {lines.length - shown.length} more lines in the review pane
        </p>
      )}
    </div>
  )
}
