'use client'

import { useEffect, useReducer, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Archive,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileCode2,
  Folder,
  FolderOpen,
  Maximize2,
  MessageSquare,
  Minimize2,
  MoreHorizontal,
  PanelLeft,
  PanelRight,
  RotateCcw,
  Search,
} from 'lucide-react'
import {
  after,
  applyProposal,
  before,
  changedPaths,
  conflicts,
  filePaths,
  isRecordedWorkspace,
  recordedOutput,
  type FilePath,
  type Files,
} from '@/lib/copper-demo'
import { initialThreads, threadReducer, type DemoThread } from '@/lib/copper-threads'
import CodeEditor from './code-editor'
import { Counts, DiffCard } from './diff-view'
import EditorView from './editor-view'

type Pane = 'navigation' | 'conversation' | 'review'
type Experience = 'collaborative' | 'editor'
type Menu = { id: string; x: number; y: number; origin: HTMLElement } | null
const mainId = 'safety'
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

export default function Workspace() {
  const [files, setFiles] = useState<Files>({ ...before })
  const [threads, dispatch] = useReducer(
    threadReducer,
    initialThreads.map((t) => ({ ...t })),
  )
  const [selected, setSelected] = useState(mainId)
  const [path, setPath] = useState<FilePath>('src/lib.rs')
  const [experience, setExperience] = useState<Experience>('editor')
  const [editorMode, setEditorMode] = useState<'code' | 'review'>('code')
  const [mode, setMode] = useState<'threads' | 'files'>('threads')
  const [review, setReview] = useState(true)
  const [sidebar, setSidebar] = useState(true)
  const [project, setProject] = useState(true)
  const [archived, setArchived] = useState(false)
  const [view, setView] = useState<'review' | 'code'>('review')
  const [pane, setPane] = useState<Pane>('conversation')
  const [expanded, setExpanded] = useState(false)
  const [activity, setActivity] = useState(false)
  const [output, setOutput] = useState(false)
  const [applied, setApplied] = useState(false)
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState(false)
  const [menu, setMenu] = useState<Menu>(null)
  const [rename, setRename] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [confirm, setConfirm] = useState<'reset' | 'replace' | null>(null)
  const [notice, setNotice] = useState('Sample task loaded. Review the patch or edit a file.')
  const expandRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLButtonElement>(null)
  const resetRef = useRef<HTMLButtonElement>(null)
  const reviewToggle = useRef<HTMLButtonElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const keepRef = useRef<HTMLButtonElement>(null)
  const origin = useRef<HTMLElement | null>(null)
  const current = threads.find((t) => t.id === selected)!
  const exact = isRecordedWorkspace(files)
  const focus = (selector: string) =>
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(selector)
      if (el?.getClientRects().length) el.focus()
    })
  const closeMenu = (restore = true) => {
    if (restore && menu) {
      const el = menu.origin
      requestAnimationFrame(() =>
        el.isConnected ? el.focus() : focus('[aria-label="Show threads"]'),
      )
    }
    setMenu(null)
  }
  useEffect(() => {
    if (!menu) return
    menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
    const outside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenu(null)
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [menu])
  useEffect(() => {
    if (confirm) keepRef.current?.focus()
  }, [confirm])
  useEffect(() => {
    if (rename) {
      nameRef.current?.focus()
      nameRef.current?.select()
    }
  }, [rename])
  const openConfirm = (kind: 'reset' | 'replace') => {
    origin.current = document.activeElement as HTMLElement
    setConfirm(kind)
  }
  const restoreOrigin = () =>
    requestAnimationFrame(() => {
      if (origin.current?.isConnected) origin.current.focus()
      else resetRef.current?.focus()
    })
  const selectThread = (thread: DemoThread) => {
    setSelected(thread.id)
    if (thread.unread) dispatch({ type: 'read', id: thread.id })
    setPane('conversation')
    setNotice(`Opened sample thread: ${thread.title}`)
    conversationRef.current?.scrollTo({ top: 0 })
    focus('#cw-pane-conversation')
  }
  const openFile = (file: FilePath, code = false) => {
    setPath(file)
    setReview(true)
    setView(code ? 'code' : 'review')
    setPane('review')
    setNotice(`Opened ${file} in ${code ? 'Code' : 'Review Changes'}.`)
    requestAnimationFrame(() => {
      const item = document.getElementById(`review-${file.replaceAll('/', '-')}`)
      if (!code && item)
        item.parentElement?.scrollTo({ top: item.offsetTop - item.parentElement.offsetTop })
      const mobile = document.getElementById('cw-pane-review')
      if (mobile?.getClientRects().length) mobile.focus()
      else document.getElementById('cw-review-title')?.focus()
    })
  }
  const toggleReview = () => {
    setReview(!review)
    if (review) setPane('conversation')
    else setPane('review')
    requestAnimationFrame(() => reviewToggle.current?.focus())
  }
  const apply = () => {
    const next = applyProposal(files)
    if (!next) {
      openConfirm('replace')
      setNotice('Your edits conflict with the sample. No files were changed.')
      return
    }
    setFiles(next)
    setApplied(true)
    setNotice('Sample patch applied. Cargo.toml and its edits are preserved.')
  }
  const reset = () => {
    setFiles({ ...before })
    dispatch({ type: 'reset' })
    setSelected(mainId)
    setPath('src/lib.rs')
    setExperience('editor')
    setEditorMode('code')
    setMode('threads')
    setReview(true)
    setSidebar(true)
    setProject(true)
    setArchived(false)
    setView('review')
    setPane('conversation')
    setActivity(false)
    setOutput(false)
    setApplied(false)
    setQuery('')
    setSearch(false)
    setMenu(null)
    setRename(null)
    setConfirm(null)
    setNotice('Sample reset: files, threads, read states, pins, and panels restored.')
    conversationRef.current?.scrollTo({ top: 0 })
    requestAnimationFrame(() => resetRef.current?.focus())
  }
  const openMenu = (
    thread: DemoThread,
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => {
    event.preventDefault()
    const rect = event.currentTarget.getBoundingClientRect()
    const frameWidth = event.currentTarget.closest('.copper-workspace')!.clientWidth
    const menuWidth = Math.max(248, Math.min(410, frameWidth * 0.215))
    const pointer = 'clientX' in event && event.type === 'contextmenu'
    setMenu({
      id: thread.id,
      x: Math.max(
        8,
        Math.min(pointer ? event.clientX : rect.right - 10, window.innerWidth - menuWidth - 8),
      ),
      y: Math.max(
        8,
        Math.min(
          pointer ? event.clientY : rect.bottom,
          window.innerHeight - Math.max(310, Math.min(365, frameWidth * 0.19)),
        ),
      ),
      origin: event.currentTarget.matches('button')
        ? event.currentTarget
        : event.currentTarget.querySelector<HTMLButtonElement>('button')!,
    })
  }
  const archiveThread = (thread: DemoThread) => {
    dispatch({ type: 'archive', id: thread.id })
    setNotice(`${thread.title} ${thread.archived ? 'restored' : 'archived'} locally.`)
    if (!thread.archived) setArchived(true)
    focus('[aria-label="Show archived threads"]')
  }
  const row = (thread: DemoThread) => (
    <div
      className={`cw-thread-row ${selected === thread.id ? 'is-selected' : ''}`}
      key={thread.id}
      onContextMenu={(event) => openMenu(thread, event)}
    >
      <button
        className="cw-thread-select"
        aria-current={selected === thread.id ? 'true' : undefined}
        onClick={() => selectThread(thread)}
        onKeyDown={(event) => {
          if (event.key === 'F2') {
            origin.current = event.currentTarget
            setRename(thread.id)
            setName(thread.title)
          } else if ((event.shiftKey && event.key === 'F10') || event.key === 'ContextMenu')
            openMenu(thread, event)
        }}
        title={thread.title}
      >
        <span
          className={`cw-read-dot ${thread.unread ? 'unread' : ''}`}
          aria-label={thread.unread ? 'Unread' : 'Read'}
        />
        <span>{thread.title}</span>
      </button>
      <div className="cw-row-actions">
        <button
          aria-label={`Actions for ${thread.title}`}
          onClick={(event) => openMenu(thread, event)}
        >
          <MoreHorizontal size={15} />
        </button>
        <button
          aria-label={`${thread.archived ? 'Restore' : 'Archive'} ${thread.title}`}
          onClick={() => archiveThread(thread)}
        >
          <Archive size={14} />
        </button>
      </div>
    </div>
  )
  const visible = threads.filter(
    (t) => !t.archived && t.title.toLowerCase().includes(query.toLowerCase()),
  )
  const activeMenu = threads.find((t) => t.id === menu?.id)
  const menuAction = (action: 'pin' | 'read' | 'archive' | 'restore-title') => {
    if (activeMenu) {
      dispatch({ type: action, id: activeMenu.id })
      setNotice('Thread updated locally.')
      if (action === 'archive') setArchived(true)
    }
    closeMenu()
  }

  const navigation = (
    <aside className="cw-navigation" aria-label="Project and thread navigation">
      <header className="cw-bar cw-nav-bar">
        <span className="cw-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <button
          aria-label="Collapse sidebar"
          onClick={() => {
            setSidebar(false)
            focus('[aria-label="Expand sidebar"]')
          }}
        >
          <PanelLeft size={16} />
        </button>
        <button
          aria-label="Search threads"
          aria-expanded={search}
          onClick={() => {
            setSearch(!search)
            setMode('threads')
            if (!search) focus('#cw-search')
          }}
        >
          <Search size={16} />
        </button>
        <button
          aria-label="Show files"
          aria-pressed={mode === 'files'}
          onClick={() => setMode('files')}
        >
          <FolderOpen size={16} />
        </button>
        <button
          aria-label="Show threads"
          aria-pressed={mode === 'threads'}
          onClick={() => setMode('threads')}
        >
          <MessageSquare size={16} />
        </button>
        <button
          className="cw-last"
          aria-label="Show archived threads"
          aria-pressed={archived}
          onClick={() => {
            setArchived(!archived)
            setMode('threads')
          }}
        >
          <Clock3 size={16} />
        </button>
      </header>
      <div className="cw-nav-scroll">
        {mode === 'threads' ? (
          <>
            {search && (
              <label className="cw-search">
                <span className="sr-only">Filter threads</span>
                <input
                  id="cw-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a sample thread…"
                />
              </label>
            )}
            <h3>Pinned</h3>
            {visible.filter((t) => t.pinned).map(row)}
            {!visible.some((t) => t.pinned) && <p className="cw-empty">No pinned threads</p>}
            <h3>Projects</h3>
            <button
              className="cw-project"
              aria-expanded={project}
              onClick={() => setProject(!project)}
            >
              {project ? <FolderOpen size={16} /> : <Folder size={16} />} port-parser{' '}
              {project ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>
            {project && visible.filter((t) => !t.pinned && t.section === 'project').map(row)}
            <h3>Threads</h3>
            {visible.filter((t) => !t.pinned && t.section === 'threads').map(row)}
            {archived && (
              <>
                <h3>Archived</h3>
                {threads.filter((t) => t.archived).map(row)}
                {!threads.some((t) => t.archived) && (
                  <p className="cw-empty">No archived threads</p>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <h3>
              Files <span>{filePaths.length}</span>
            </h3>
            <p className="cw-file-project">
              <FolderOpen size={16} /> port-parser
            </p>
            {filePaths.map((file) => (
              <button
                key={file}
                className={`cw-file-row ${path === file ? 'is-selected' : ''}`}
                onClick={() => openFile(file, true)}
              >
                <FileCode2 size={15} />
                <span>{file}</span>
                {files[file] !== before[file] && <span aria-label="Modified">●</span>}
              </button>
            ))}
            <p className="cw-file-note">
              Edits stay in this browser tab.
              <br />
              The sample changes {changedPaths.length} files.
            </p>
            <button className="cw-back-threads" onClick={() => setMode('threads')}>
              ← Back to threads
            </button>
          </>
        )}
      </div>
      <footer className="cw-bar cw-nav-footer">
        <span className="cw-avatar" aria-hidden="true">
          Y
        </span>
        <span>
          You <small>Demo participant</small>
        </span>
        <span className="cw-last">Copper</span>
      </footer>
    </aside>
  )
  const conversation = (
    <section className="cw-conversation" aria-label="Agent conversation">
      <header className="cw-bar cw-conversation-bar">
        <span title={current.title}>{current.title}</span>
        <button
          className="cw-last"
          aria-label={review ? 'Close review pane' : 'Open review pane'}
          ref={reviewToggle}
          onClick={toggleReview}
        >
          <PanelRight size={16} />
        </button>
      </header>
      <div
        className="cw-conversation-scroll"
        ref={conversationRef}
        tabIndex={0}
        aria-label="Scrollable guided conversation"
        key={selected}
      >
        <div className="cw-message">
          <span className="cw-avatar" aria-label="You, demo participant">
            Y
          </span>
          <div>
            <p className="cw-sample-label">Sample request</p>
            <p>
              {selected === mainId
                ? 'Make this port parser return an error instead of panicking. Keep whitespace handling, update the caller, and add tests for bad input.'
                : current.title}
            </p>
          </div>
        </div>
        {selected === mainId ? (
          <>
            <div className="cw-message">
              <span className="cw-ai" aria-label="Scripted agent">
                AI
              </span>
              <div>
                <details
                  className="cw-activity"
                  open={activity}
                  onToggle={(e) => setActivity(e.currentTarget.open)}
                >
                  <summary>
                    Read 2 files, prepared {changedPaths.length} changes <ChevronRight size={13} />
                  </summary>
                  <p>
                    Inspected{' '}
                    <button onClick={() => openFile('src/lib.rs', true)}>src/lib.rs</button> and{' '}
                    <button onClick={() => openFile('src/main.rs', true)}>src/main.rs</button>.
                    Found the unwrap call and checked the existing whitespace test.
                  </p>
                </details>
                <p>
                  The panic comes from <code>unwrap()</code>. I’ll return{' '}
                  <code>Result&lt;u16, ParseIntError&gt;</code> and let the caller handle a parsing
                  error.
                </p>
                <button className="cw-file-reference" onClick={() => openFile('src/lib.rs')}>
                  Edit <u>src/lib.rs</u> <ChevronDown size={13} />
                </button>
                <button
                  className="cw-inline-patch"
                  aria-label="Review src/lib.rs change"
                  onClick={() => openFile('src/lib.rs')}
                >
                  <DiffCard path="src/lib.rs" compact />
                </button>
                <p>
                  The parser still trims whitespace. Invalid input now returns <code>Err</code>{' '}
                  instead of stopping the program.
                </p>
              </div>
            </div>
            <div className="cw-message">
              <span className="cw-avatar" aria-label="You, demo participant">
                Y
              </span>
              <div>
                <p>Keep the caller simple. Show a useful message when parsing fails.</p>
              </div>
            </div>
            <div className="cw-message">
              <span className="cw-ai" aria-label="Scripted agent">
                AI
              </span>
              <div>
                <p className="cw-activity-label">Recorded activity · updated the caller</p>
                <button className="cw-file-reference" onClick={() => openFile('src/main.rs')}>
                  Edit <u>src/main.rs</u> <ChevronDown size={13} />
                </button>
                <button
                  className="cw-inline-patch"
                  aria-label="Review src/main.rs change"
                  onClick={() => openFile('src/main.rs')}
                >
                  <DiffCard path="src/main.rs" compact />
                </button>
                <p>
                  The <code>match</code> keeps the successful message and reports errors to stderr.
                  No extra dependency is needed.
                </p>
              </div>
            </div>
            <div className="cw-message">
              <span className="cw-avatar" aria-label="You, demo participant">
                Y
              </span>
              <div>
                <p>What happens with empty input, letters, or a number outside the range?</p>
              </div>
            </div>
            <div className="cw-message">
              <span className="cw-ai" aria-label="Scripted agent">
                AI
              </span>
              <div>
                <p className="cw-activity-label">Recorded activity · added four error cases</p>
                <button className="cw-file-reference" onClick={() => openFile('tests/parser.rs')}>
                  Edit <u>tests/parser.rs</u> <ChevronDown size={13} />
                </button>
                <button
                  className="cw-inline-patch"
                  aria-label="Review tests/parser.rs change"
                  onClick={() => openFile('tests/parser.rs')}
                >
                  <DiffCard path="tests/parser.rs" compact />
                </button>
                <details
                  className="cw-terminal"
                  open={output}
                  onToggle={(e) => setOutput(e.currentTarget.open)}
                >
                  <summary>
                    <span>$</span> cargo test <ChevronRight size={13} />
                    <small>Recorded output</small>
                  </summary>
                  <div>
                    <p>
                      {exact
                        ? 'These files match the tested fixture.'
                        : 'These results belong to the tested fixture, not your current edits.'}
                    </p>
                    <code>cargo test --offline --locked --test parser -- --test-threads=1</code>
                    <pre>{recordedOutput}</pre>
                  </div>
                </details>
                <p>
                  The tested fixture passes six tests: two success cases and four invalid-input
                  cases. It parses the <code>u16</code> range rather than enforcing every
                  network-port policy.
                </p>
                <p className="cw-task-status">
                  {applied
                    ? 'Sample applied locally. You can keep exploring the code.'
                    : 'The proposal is ready for review. Your files are unchanged until you apply it.'}
                </p>
                <button className="cw-apply" onClick={apply} disabled={applied && exact}>
                  {applied && exact ? (
                    <>
                      <Check size={14} /> Sample applied
                    </>
                  ) : (
                    'Apply sample patch'
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="cw-message">
              <span className="cw-ai" aria-label="Scripted agent">
                AI
              </span>
              <div>
                <p className="cw-activity-label">Recorded explanation</p>
                <p>{current.note}</p>
                <button
                  className="cw-file-reference"
                  onClick={() =>
                    openFile(
                      selected === 'caller' || selected === 'cli'
                        ? 'src/main.rs'
                        : selected === 'manifest'
                          ? 'Cargo.toml'
                          : selected === 'invalid' || selected === 'tests'
                            ? 'tests/parser.rs'
                            : 'src/lib.rs',
                      true,
                    )
                  }
                >
                  Open the related file <ChevronRight size={13} />
                </button>
                <p>Return to the parser task for the complete patch and recorded test output.</p>
                <button
                  className="cw-apply"
                  onClick={() => selectThread(threads.find((t) => t.id === mainId)!)}
                >
                  Open parser task
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <footer className="cw-bar cw-conversation-footer">
        <button
          onClick={() => {
            setSidebar(true)
            setMode('files')
            setPane('navigation')
            focus('#cw-pane-navigation')
          }}
          title="Browse workspace files"
        >
          <Folder size={14} /> <span>port-parser / main</span>
        </button>
        <button aria-label="Open sample changes" onClick={() => openFile('src/lib.rs')}>
          <Counts />
        </button>
        <span className="cw-last cw-guided-label">Sample task</span>
      </footer>
    </section>
  )
  const reviewPane = (
    <section className="cw-review" aria-label="Code and changes">
      <header className="cw-bar cw-review-bar">
        <div role="tablist" aria-label="Review pane mode" onKeyDown={tabKeys}>
          <button
            role="tab"
            aria-selected={view === 'review'}
            tabIndex={view === 'review' ? 0 : -1}
            onClick={() => setView('review')}
          >
            Review Changes
          </button>
          <button
            role="tab"
            aria-selected={view === 'code'}
            tabIndex={view === 'code' ? 0 : -1}
            onClick={() => setView('code')}
          >
            Code
          </button>
        </div>
        <button
          className="cw-last"
          aria-label="Close code and review pane"
          onClick={() => {
            setReview(false)
            setPane('conversation')
            focus('#cw-pane-conversation')
            requestAnimationFrame(() => reviewToggle.current?.focus())
          }}
        >
          <PanelRight size={16} />
        </button>
      </header>
      <div className="cw-review-body">
        <div className="cw-review-toolbar" id="cw-review-title" tabIndex={-1}>
          <span>{view === 'review' ? 'Sample proposal' : path}</span>
          <Counts />
          <button className="cw-apply-small" disabled={applied && exact} onClick={apply}>
            {applied && exact ? 'Applied' : 'Apply'}
          </button>
        </div>
        {view === 'review' ? (
          <div className="cw-review-scroll" tabIndex={0} aria-label="Scrollable proposed changes">
            <p className="cw-proposal-note">
              {changedPaths.length} files · Proposed patch against the original fixture.
            </p>
            {changedPaths.map((file) => (
              <article
                id={`review-${file.replaceAll('/', '-')}`}
                className={file === path ? 'cw-active-file' : ''}
                key={file}
              >
                <button className="cw-review-file" onClick={() => openFile(file, true)}>
                  <u>{file.split('/').pop()}</u>
                  <span>{file.slice(0, file.lastIndexOf('/') + 1)}</span>
                  <ChevronDown size={13} />
                </button>
                <DiffCard path={file} />
              </article>
            ))}
          </div>
        ) : (
          <>
            <div
              className="cw-file-tabs"
              role="tablist"
              aria-label="Open files"
              onKeyDown={tabKeys}
            >
              {filePaths.map((file) => (
                <button
                  role="tab"
                  aria-selected={file === path}
                  tabIndex={file === path ? 0 : -1}
                  key={file}
                  onClick={() => setPath(file)}
                >
                  {file.split('/').pop()}
                  {files[file] !== before[file] && <span aria-label="Modified">●</span>}
                </button>
              ))}
            </div>
            <div className="cw-editor-content" role="tabpanel" aria-label={path}>
              <CodeEditor
                key={path}
                path={path}
                value={files[path]}
                onChange={(value) => setFiles((old) => ({ ...old, [path]: value }))}
              />
            </div>
            <p id="copper-editor-help" className="cw-editor-help">
              Editable · Tab leaves the editor · ⌘/Ctrl Z to undo
            </p>
          </>
        )}
      </div>
      <footer className="cw-bar cw-review-footer">
        <span>{view === 'review' ? 'Before / after fixture' : 'Rust / TOML · UTF-8'}</span>
        <span className="cw-last">In memory</span>
      </footer>
    </section>
  )

  const content = (
    <div
      className="copper-workspace"
      data-sidebar={sidebar}
      data-review={review}
      data-pane={pane}
      data-experience={experience}
    >
      <div className="cw-experience-switch cw-experience-static">
        <strong>Editor</strong>
        <span>Editable local Rust fixture</span>
      </div>
      <div id="cw-experience-panel" aria-label="Copper editor demo" className="cw-experience-panel">
        {experience === 'collaborative' ? (
          <>
            <div
              className="cw-mobile-tabs"
              role="tablist"
              aria-label="Collaborative panes"
              onKeyDown={tabKeys}
            >
              {(['navigation', 'conversation', 'review'] as Pane[]).map((id) => (
                <button
                  role="tab"
                  id={`cw-pane-${id}`}
                  aria-selected={pane === id}
                  tabIndex={pane === id ? 0 : -1}
                  key={id}
                  onClick={() => {
                    setPane(id)
                    if (id === 'review') setReview(true)
                    if (id === 'navigation') setSidebar(true)
                  }}
                >
                  {id === 'navigation'
                    ? 'Threads / Files'
                    : id === 'conversation'
                      ? 'Conversation'
                      : 'Review / Code'}
                </button>
              ))}
            </div>
            <div className="cw-layout">
              {sidebar ? (
                navigation
              ) : (
                <aside className="cw-collapsed">
                  <button
                    aria-label="Expand sidebar"
                    onClick={() => {
                      setSidebar(true)
                      focus('[aria-label="Collapse sidebar"]')
                    }}
                  >
                    <PanelLeft size={17} />
                  </button>
                </aside>
              )}
              {conversation}
              {review && reviewPane}
            </div>
          </>
        ) : (
          <EditorView
            files={files}
            path={path}
            mode={editorMode}
            output={output}
            applied={applied}
            recorded={exact}
            onSelectFile={setPath}
            onModeChange={setEditorMode}
            onChange={(file, value) => setFiles((old) => ({ ...old, [file]: value }))}
            onApply={apply}
            onOutputChange={setOutput}
          />
        )}
      </div>
      <div className="cw-demo-controls">
        <span>
          Guided local demo ·{' '}
          {experience === 'collaborative'
            ? 'Recorded agent activity'
            : 'Editable files and recorded output'}
        </span>
        <div>
          <button ref={resetRef} aria-label="Reset demo" onClick={() => openConfirm('reset')}>
            <RotateCcw size={13} /> Reset
          </button>
          <button
            ref={expanded ? collapseRef : expandRef}
            aria-label={expanded ? 'Collapse demo' : 'Expand demo'}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      {menu && activeMenu && (
        <div
          className="cw-context-menu"
          ref={menuRef}
          role="menu"
          aria-label={`Thread actions: ${activeMenu.title}`}
          style={{ left: menu.x, top: menu.y }}
          onKeyDown={(event) => {
            const items = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'),
            )
            const i = items.indexOf(document.activeElement as HTMLButtonElement)
            const n =
              event.key === 'ArrowDown'
                ? (i + 1) % items.length
                : event.key === 'ArrowUp'
                  ? (i + items.length - 1) % items.length
                  : event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? items.length - 1
                      : -1
            if (n >= 0) {
              event.preventDefault()
              items[n]?.focus()
            } else if (event.key === 'Escape' || event.key === 'Tab') {
              event.preventDefault()
              event.stopPropagation()
              closeMenu()
            }
          }}
        >
          <button role="menuitem" onClick={() => menuAction('pin')}>
            {activeMenu.pinned ? 'Unpin' : 'Pin'}
          </button>
          <button
            role="menuitem"
            onClick={() => {
              origin.current = menu.origin
              setRename(activeMenu.id)
              setName(activeMenu.title)
              setMenu(null)
            }}
          >
            Rename <span>F2</span>
          </button>
          <button role="menuitem" onClick={() => menuAction('restore-title')}>
            Restore sample title
          </button>
          <button role="menuitem" onClick={() => menuAction('read')}>
            Mark as {activeMenu.unread ? 'Read' : 'Unread'}
          </button>
          <hr />
          <button
            role="menuitem"
            onClick={() => {
              selectThread(activeMenu)
              closeMenu(false)
            }}
          >
            Open thread
          </button>
          <button role="menuitem" onClick={() => menuAction('archive')}>
            {activeMenu.archived ? 'Restore from archive' : 'Archive'}
          </button>
          <p>Changes stay in this browser session</p>
        </div>
      )}
      {rename && (
        <div
          className="cw-local-prompt"
          role="dialog"
          aria-label="Rename sample thread"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation()
              setRename(null)
              restoreOrigin()
            }
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!name.trim()) return
              dispatch({ type: 'rename', id: rename, title: name })
              setRename(null)
              restoreOrigin()
              setNotice('Thread renamed locally.')
            }}
          >
            <label htmlFor="cw-thread-name">Rename sample thread</label>
            <input
              id="cw-thread-name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              required
            />
            <div>
              <button
                type="button"
                onClick={() => {
                  setRename(null)
                  restoreOrigin()
                }}
              >
                Cancel
              </button>
              <button type="submit" disabled={!name.trim()}>
                Save name
              </button>
            </div>
          </form>
        </div>
      )}
      {confirm && (
        <div
          className="cw-local-prompt"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation()
              setConfirm(null)
              restoreOrigin()
            }
          }}
          role="alertdialog"
          aria-label={
            confirm === 'reset' ? 'Reset sample task' : 'Sample conflicts with your edits'
          }
        >
          <div>
            <strong>
              {confirm === 'reset'
                ? 'Reset files, thread changes, and panel settings?'
                : 'Your edits need a decision.'}
            </strong>
            <p>
              {confirm === 'reset'
                ? 'Restore original files, thread names, pins, read states, and panels. Your local edits will be discarded.'
                : `The sample conflicts with ${conflicts(files).join(', ')}. Nothing has changed. Replace the three sample files explicitly, or keep your edits. Cargo.toml is preserved.`}
            </p>
            <div>
              <button
                ref={keepRef}
                onClick={() => {
                  setConfirm(null)
                  restoreOrigin()
                }}
              >
                Keep my edits
              </button>
              <button
                onClick={() => {
                  if (confirm === 'reset') reset()
                  else {
                    setFiles({
                      ...files,
                      ...Object.fromEntries(changedPaths.map((f) => [f, after[f]])),
                    })
                    setApplied(true)
                    setConfirm(null)
                    restoreOrigin()
                    setNotice('Replaced the sample files after your confirmation.')
                  }
                }}
              >
                {confirm === 'reset' ? 'Discard and reset' : 'Replace sample files'}
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {notice}
      </p>
    </div>
  )
  return (
    <>
      <div className="demo-inline-slot">{!expanded && content}</div>
      <Dialog.Root
        open={expanded}
        onOpenChange={(open) => {
          setMenu(null)
          setExpanded(open)
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="demo-overlay" />
          <Dialog.Content
            className="demo-expanded"
            onEscapeKeyDown={(event) => {
              if (menu) {
                event.preventDefault()
                closeMenu()
              } else if (rename || confirm) {
                event.preventDefault()
                setRename(null)
                setConfirm(null)
                restoreOrigin()
              }
            }}
            onOpenAutoFocus={(e) => {
              e.preventDefault()
              collapseRef.current?.focus()
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault()
              requestAnimationFrame(() => expandRef.current?.focus())
            }}
          >
            <Dialog.Title className="sr-only">Copper browser demo</Dialog.Title>
            <Dialog.Description className="sr-only">
              Local interface demo with recorded agent and test activity. Escape closes the expanded
              view.
            </Dialog.Description>
            {expanded && content}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
