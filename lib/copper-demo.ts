import fixture from '@/fixtures/copper-demo/workspace.json'

export const before = fixture.before
export const after = fixture.after
export const recordedOutput = fixture.recordedOutput
export type FilePath = keyof typeof before
export type Files = Record<FilePath, string>
export const filePaths = Object.keys(before) as FilePath[]
export const changedPaths = filePaths.filter((path) => before[path] !== after[path])

export function conflicts(files: Files) {
  return changedPaths.filter((path) => files[path] !== before[path] && files[path] !== after[path])
}

// Never partially apply a proposal. Unchanged files (including visitor edits) survive.
export function applyProposal(files: Files): Files | null {
  if (conflicts(files).length) return null
  return { ...files, ...Object.fromEntries(changedPaths.map((path) => [path, after[path]])) }
}

export function isRecordedWorkspace(files: Files) {
  return filePaths.every((path) => files[path] === after[path])
}

export type DiffLine = {
  kind: 'context' | 'removed' | 'added'
  text: string
  oldLine?: number
  newLine?: number
}

// A line-level LCS preserves unchanged lines and gives real, minimal fixture counts.
export function diffLines(path: FilePath): DiffLine[] {
  const old = before[path].trimEnd().split('\n')
  const next = after[path].trimEnd().split('\n')
  const lengths = Array.from({ length: old.length + 1 }, () =>
    new Array<number>(next.length + 1).fill(0),
  )
  for (let i = old.length - 1; i >= 0; i--)
    for (let j = next.length - 1; j >= 0; j--)
      lengths[i][j] =
        old[i] === next[j]
          ? 1 + lengths[i + 1][j + 1]
          : Math.max(lengths[i + 1][j], lengths[i][j + 1])
  const lines: DiffLine[] = []
  let i = 0,
    j = 0
  while (i < old.length || j < next.length) {
    if (i < old.length && j < next.length && old[i] === next[j]) {
      lines.push({ kind: 'context', text: old[i], oldLine: ++i, newLine: ++j })
    } else if (i < old.length && (j === next.length || lengths[i + 1][j] >= lengths[i][j + 1])) {
      lines.push({ kind: 'removed', text: old[i], oldLine: ++i })
    } else {
      lines.push({ kind: 'added', text: next[j], newLine: ++j })
    }
  }
  return lines
}
export function changeStats(path?: FilePath) {
  const lines = (path ? [path] : changedPaths).flatMap(diffLines)
  return {
    added: lines.filter((line) => line.kind === 'added').length,
    removed: lines.filter((line) => line.kind === 'removed').length,
  }
}
