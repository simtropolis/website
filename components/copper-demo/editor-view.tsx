'use client'

import { useState, type KeyboardEvent } from 'react'
import {
  Check,
  ChevronDown,
  ChevronRight,
  FileCode2,
  FolderOpen,
  Play,
  SquareTerminal,
} from 'lucide-react'
import {
  before,
  changedPaths,
  filePaths,
  recordedOutput,
  type FilePath,
  type Files,
} from '@/lib/copper-demo'
import CodeEditor from './code-editor'
import { Counts, DiffCard } from './diff-view'

type EditorPane = 'files' | 'work'
type EditorMode = 'code' | 'review'

function tabKeys(event: KeyboardEvent<HTMLElement>) {
  const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
  const index = tabs.indexOf(event.target as HTMLButtonElement)
  const next =
    event.key === 'ArrowRight'
      ? (index + 1) % tabs.length
      : event.key === 'ArrowLeft'
        ? (index + tabs.length - 1) % tabs.length
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? tabs.length - 1
            : -1
  if (next >= 0) {
    event.preventDefault()
    tabs[next]?.focus()
    tabs[next]?.click()
  }
}

export default function EditorView({
  files,
  path,
  mode,
  output,
  applied,
  recorded,
  onSelectFile,
  onModeChange,
  onChange,
  onApply,
  onOutputChange,
}: {
  files: Files
  path: FilePath
  mode: EditorMode
  output: boolean
  applied: boolean
  recorded: boolean
  onSelectFile: (path: FilePath) => void
  onModeChange: (mode: EditorMode) => void
  onChange: (path: FilePath, value: string) => void
  onApply: () => void
  onOutputChange: (open: boolean) => void
}) {
  const [pane, setPane] = useState<EditorPane>('work')
  const pristine = filePaths.every((file) => files[file] === before[file])

  const selectFile = (file: FilePath) => {
    onSelectFile(file)
    onModeChange('code')
    setPane('work')
  }

  return (
    <div className="cev-shell" data-pane={pane}>
      <div className="cev-mobile-tabs" role="tablist" aria-label="Editor panes" onKeyDown={tabKeys}>
        <button
          role="tab"
          aria-selected={pane === 'files'}
          tabIndex={pane === 'files' ? 0 : -1}
          onClick={() => setPane('files')}
        >
          Files
        </button>
        <button
          role="tab"
          aria-selected={pane === 'work' && mode === 'code'}
          tabIndex={pane === 'work' && mode === 'code' ? 0 : -1}
          onClick={() => {
            setPane('work')
            onModeChange('code')
          }}
        >
          Code
        </button>
        <button
          role="tab"
          aria-selected={pane === 'work' && mode === 'review'}
          tabIndex={pane === 'work' && mode === 'review' ? 0 : -1}
          onClick={() => {
            setPane('work')
            onModeChange('review')
          }}
        >
          Review
        </button>
      </div>

      <div className="cev-layout">
        <aside className="cev-files" aria-label="Rust workspace files">
          <header className="cw-bar">
            <FolderOpen size={16} aria-hidden="true" />
            <span>port-parser</span>
            <span className="cw-last cev-branch">main</span>
          </header>
          <div className="cev-file-list">
            <p className="cev-tree-label">Files</p>
            {filePaths.map((file) => (
              <button
                key={file}
                className={path === file ? 'is-selected' : ''}
                aria-current={path === file ? 'page' : undefined}
                onClick={() => selectFile(file)}
              >
                <FileCode2 size={15} aria-hidden="true" />
                <span>{file}</span>
                {files[file] !== before[file] && <span aria-label="Modified">●</span>}
              </button>
            ))}
            <div className="cev-file-note">
              <strong>{changedPaths.length} proposed files</strong>
              <Counts />
              <span>Edits stay in this browser tab.</span>
            </div>
          </div>
          <footer className="cw-bar">
            <span>Rust workspace</span>
            <span className="cw-last">Local fixture</span>
          </footer>
        </aside>

        <section className="cev-work" aria-label="Editable Rust workspace">
          <header className="cw-bar cev-work-bar">
            <div role="tablist" aria-label="Editor mode" onKeyDown={tabKeys}>
              <button
                role="tab"
                aria-selected={mode === 'code'}
                tabIndex={mode === 'code' ? 0 : -1}
                onClick={() => onModeChange('code')}
              >
                Code
              </button>
              <button
                role="tab"
                aria-selected={mode === 'review'}
                tabIndex={mode === 'review' ? 0 : -1}
                onClick={() => onModeChange('review')}
              >
                Review Changes <Counts />
              </button>
            </div>
            <button
              className="cw-last cev-run"
              aria-label="Show recorded test output"
              aria-expanded={output}
              onClick={() => onOutputChange(!output)}
            >
              <Play size={14} aria-hidden="true" /> Recorded test
            </button>
          </header>

          {mode === 'code' ? (
            <div className="cev-code-pane">
              <div
                className="cev-file-tabs"
                role="tablist"
                aria-label="Open files"
                onKeyDown={tabKeys}
              >
                {filePaths.map((file) => (
                  <button
                    role="tab"
                    aria-selected={path === file}
                    tabIndex={path === file ? 0 : -1}
                    key={file}
                    onClick={() => onSelectFile(file)}
                  >
                    {file.split('/').pop()}
                    {files[file] !== before[file] && <span aria-label="Modified">●</span>}
                  </button>
                ))}
              </div>
              <div className="cev-editor" role="tabpanel" aria-label={`Editing ${path}`}>
                <CodeEditor
                  key={path}
                  path={path}
                  value={files[path]}
                  onChange={(value) => onChange(path, value)}
                />
              </div>
              <div className="cev-diagnostic" role="status">
                <span className={recorded ? 'is-clear' : pristine ? 'is-recorded' : 'is-edited'} />
                {recorded
                  ? 'The files match the tested fixture: six recorded tests passed.'
                  : pristine
                    ? 'Recorded diagnostic: parse_port can panic at unwrap(). Review the proposed patch.'
                    : 'Visitor edits are not compiled. Recorded diagnostics describe the checked-in fixture.'}
              </div>
            </div>
          ) : (
            <div className="cev-review-pane" tabIndex={0} aria-label="Proposed Rust changes">
              <div className="cev-review-heading">
                <div>
                  <p className="cw-sample-label">Sample proposal</p>
                  <h3>{changedPaths.length} files ready for review</h3>
                </div>
                <button onClick={onApply} disabled={applied && recorded}>
                  {applied && recorded ? (
                    <>
                      <Check size={14} aria-hidden="true" /> Applied
                    </>
                  ) : (
                    'Apply sample patch'
                  )}
                </button>
              </div>
              {changedPaths.map((file) => (
                <article key={file}>
                  <button className="cw-review-file" onClick={() => selectFile(file)}>
                    <u>{file.split('/').pop()}</u>
                    <span>{file.slice(0, file.lastIndexOf('/') + 1)}</span>
                    <ChevronRight size={13} aria-hidden="true" />
                  </button>
                  <DiffCard path={file} />
                </article>
              ))}
            </div>
          )}

          <details
            className="cev-output"
            open={output}
            onToggle={(event) => onOutputChange(event.currentTarget.open)}
          >
            <summary>
              <SquareTerminal size={14} aria-hidden="true" />
              Output
              <span>Recorded cargo test</span>
              <ChevronDown className="cw-last" size={14} aria-hidden="true" />
            </summary>
            <div>
              <p>
                {recorded
                  ? 'These files match the tested fixture.'
                  : 'These results belong to the tested fixture, not your current edits.'}
              </p>
              <code>cargo test --offline --locked --test parser -- --test-threads=1</code>
              <pre>{recordedOutput}</pre>
            </div>
          </details>

          <footer className="cw-bar">
            <span>{path.endsWith('.rs') ? 'Rust' : 'TOML'} · UTF-8</span>
            <span className="cw-last">Editable · In memory</span>
          </footer>
        </section>
      </div>
      <p id="copper-editor-help" className="cw-editor-help">
        Editable code · Tab leaves the editor · ⌘/Ctrl Z to undo
      </p>
    </div>
  )
}
