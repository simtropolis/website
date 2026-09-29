'use client'

import { useEffect, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
  highlightActiveLine,
} from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import {
  bracketMatching,
  HighlightStyle,
  syntaxHighlighting,
  StreamLanguage,
} from '@codemirror/language'
import { rust } from '@codemirror/lang-rust'
import { toml } from '@codemirror/legacy-modes/mode/toml'
import { tags } from '@lezer/highlight'
import type { FilePath } from '@/lib/copper-demo'

const colors = HighlightStyle.define([
  { tag: [tags.keyword, tags.modifier], color: '#ad4eb7' },
  { tag: [tags.string, tags.special(tags.string)], color: '#60904e' },
  { tag: [tags.number, tags.bool], color: '#b47737' },
  { tag: [tags.typeName, tags.className], color: '#3589bb' },
  { tag: tags.comment, color: '#777b83', fontStyle: 'italic' },
  { tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], color: '#536fd7' },
])

export default function CodeEditor({
  path,
  value,
  onChange,
}: {
  path: FilePath
  value: string
  onChange: (value: string) => void
}) {
  const host = useRef<HTMLDivElement>(null)
  const view = useRef<EditorView | null>(null)
  const onEdit = useRef(onChange)
  onEdit.current = onChange
  const initial = useRef(value)
  useEffect(() => {
    if (!host.current) return
    const instance = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: initial.current,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightActiveLine(),
          history(),
          bracketMatching(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          path.endsWith('.rs') ? rust() : StreamLanguage.define(toml),
          syntaxHighlighting(colors),
          EditorView.lineWrapping,
          EditorView.contentAttributes.of({
            'aria-label': `Edit ${path}`,
            'aria-describedby': 'copper-editor-help',
            spellcheck: 'false',
            autocapitalize: 'off',
            autocorrect: 'off',
          }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) onEdit.current(update.state.doc.toString())
          }),
          EditorView.theme({
            '&': { height: '100%', color: '#3c3e42', backgroundColor: '#fafafa', fontSize: '13px' },
            '.cm-scroller': {
              fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace",
              lineHeight: '1.7',
            },
            '.cm-content': { padding: '22px 0', caretColor: '#697cdf' },
            '.cm-line': { padding: '0 20px 0 10px' },
            '.cm-gutters': {
              backgroundColor: '#fafafa',
              color: '#a2a4ac',
              border: 'none',
              padding: '0 3px 0 12px',
              minWidth: '42px',
            },
            '.cm-activeLineGutter, .cm-activeLine': { backgroundColor: '#eeeeef' },
            '&.cm-focused': { outline: '2px solid #697cdf', outlineOffset: '-2px' },
            '.cm-cursor': { borderLeftColor: '#697cdf' },
            '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
              backgroundColor: '#dae0f3',
            },
          }),
        ],
      }),
    })
    view.current = instance
    return () => {
      instance.destroy()
      view.current = null
    }
  }, [path])
  useEffect(() => {
    const instance = view.current
    if (instance && instance.state.doc.toString() !== value)
      instance.dispatch({ changes: { from: 0, to: instance.state.doc.length, insert: value } })
  }, [value])
  return <div className="demo-code-host" ref={host} />
}
