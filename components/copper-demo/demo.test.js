import { describe, expect, test } from 'bun:test'
import {
  after,
  applyProposal,
  before,
  changedPaths,
  changeStats,
  conflicts,
  diffLines,
  filePaths,
  isRecordedWorkspace,
} from '@/lib/copper-demo'

import { initialThreads, threadReducer } from '@/lib/copper-threads'
import { products } from '@/lib/product-catalog'

describe('Made product catalog', () => {
  test('exposes one available product and keeps planned products non-actionable', () => {
    expect(products.map(({ name, status }) => ({ name, status }))).toEqual([
      { name: 'Copper', status: 'Available' },
      { name: 'Orbit', status: 'Planned' },
      { name: 'Forge', status: 'Planned' },
    ])
    expect(products[0].productHref).toBe('/copper')
    expect(products[0].releasesHref).toBe('/releases')
    for (const product of products.slice(1)) {
      expect(product.productHref).toBeUndefined()
      expect(product.releasesHref).toBeUndefined()
      expect(product.description).toContain('reserved in the Made catalog')
    }
  })
})

describe('guided patch safety', () => {
  test('applies all three changes and leaves the original immutable', () => {
    expect(changedPaths).toHaveLength(3)
    expect(applyProposal(before)).toEqual(after)
    expect(before['src/lib.rs']).toContain('.unwrap()')
  })
  test('preserves edits to an unaffected manifest and marks output as unrelated', () => {
    const files = { ...before, 'Cargo.toml': before['Cargo.toml'] + '\n# My project\n' }
    const result = applyProposal(files)
    expect(result['Cargo.toml']).toEqual(files['Cargo.toml'])
    expect(isRecordedWorkspace(result)).toBe(false)
  })
  test('conflicting edits stop the whole patch instead of silently replacing a file', () => {
    for (const path of changedPaths) {
      const files = { ...before, [path]: before[path] + '\n// Visitor edit' }
      expect(conflicts(files)).toEqual([path])
      expect(applyProposal(files)).toBeNull()
      expect(files[path]).toContain('Visitor edit')
    }
  })
  test('already-applied files can coexist with original files', () => {
    const files = { ...before, 'src/lib.rs': after['src/lib.rs'] }
    expect(applyProposal(files)).toEqual(after)
    expect(applyProposal(after)).toEqual(after)
  })
  test('every edited file invalidates the recorded-workspace match', () => {
    expect(isRecordedWorkspace(after)).toBe(true)
    for (const path of filePaths)
      expect(isRecordedWorkspace({ ...after, [path]: after[path] + ' ' })).toBe(false)
  })
  test('diffs reconstruct the exact before and after lines', () => {
    for (const path of filePaths) {
      const lines = diffLines(path)
      expect(
        lines
          .filter((line) => line.kind !== 'added')
          .map((line) => line.text)
          .join('\n'),
      ).toBe(before[path].trimEnd())
      expect(
        lines
          .filter((line) => line.kind !== 'removed')
          .map((line) => line.text)
          .join('\n'),
      ).toBe(after[path].trimEnd())
    }
  })
})

describe('minimal fixture diffs', () => {
  test('counts only actual changed lines, retaining shared test scaffolding', () => {
    expect(changeStats()).toEqual({ added: 31, removed: 7 })
    expect(changeStats('Cargo.toml')).toEqual({ added: 0, removed: 0 })
    expect(changeStats('tests/parser.rs')).toEqual({ added: 22, removed: 2 })
    expect(
      diffLines('tests/parser.rs')
        .filter((line) => line.kind === 'removed')
        .every((line) => line.text.includes('assert_eq!')),
    ).toBe(true)
  })
  test('line gutters enumerate both versions without gaps or duplicate numbers', () => {
    for (const path of filePaths) {
      const lines = diffLines(path)
      for (const field of ['oldLine', 'newLine']) {
        const numbers = lines.map((line) => line[field]).filter((number) => number !== undefined)
        expect(numbers).toEqual(numbers.map((_, i) => i + 1))
      }
    }
  })
})

describe('local thread actions', () => {
  test('pin, unread and archive are reversible and preserve other threads', () => {
    for (const type of ['pin', 'read', 'archive']) {
      const next = threadReducer(initialThreads, { type, id: 'safety' })
      expect(next.find((t) => t.id === 'safety')).not.toEqual(
        initialThreads.find((t) => t.id === 'safety'),
      )
      expect(next.filter((t) => t.id !== 'safety')).toEqual(
        initialThreads.filter((t) => t.id !== 'safety'),
      )
      expect(threadReducer(next, { type, id: 'safety' })).toEqual(initialThreads)
    }
  })
  test('rename rejects blank names, trims and bounds text, and restores the sample title', () => {
    expect(threadReducer(initialThreads, { type: 'rename', id: 'safety', title: '  ' })).toEqual(
      initialThreads,
    )
    const next = threadReducer(initialThreads, {
      type: 'rename',
      id: 'safety',
      title: '  My parser  ',
    })
    expect(next.find((t) => t.id === 'safety').title).toBe('My parser')
    expect(threadReducer(next, { type: 'restore-title', id: 'safety' })).toEqual(initialThreads)
    expect(
      threadReducer(next, { type: 'rename', id: 'safety', title: 'a'.repeat(120) }).find(
        (t) => t.id === 'safety',
      ).title,
    ).toHaveLength(80)
  })
  test('reset restores every thread property without reusing mutable seed objects', () => {
    let next = threadReducer(initialThreads, { type: 'rename', id: 'safety', title: 'Changed' })
    for (const type of ['pin', 'read', 'archive'])
      next = threadReducer(next, { type, id: 'safety' })
    const reset = threadReducer(next, { type: 'reset' })
    expect(reset).toEqual(initialThreads)
    expect(reset[0]).not.toBe(initialThreads[0])
  })
})
