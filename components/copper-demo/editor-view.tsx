'use client'

import { useState, useRef, type KeyboardEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  ChevronRight,
  Maximize2,
  Minimize2,
  PanelLeft,
  PanelRight,
  Search,
} from 'lucide-react'
import CodeEditor from './code-editor'
import type { FilePath } from '@/lib/copper-demo'

type Pane = 'navigation' | 'conversation' | 'review'
type Tab = 'scheduler.tsx' | 'catware.rs' | 'uncommit'

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

const SCHEDULER_FIXTURE = `/**
 * MeetingScheduler - Because your calendar wasn't full enough
 * @description Helps you schedule meetings about scheduling
 */

export function MeetingScheduler({
    defaultDuration = 60,
    maxAttendees = 100,
    requiresSnacks = true,
    onMeetingCreate,
    onEscapeAttempt,
}: MeetingSchedulerProps): React.ReactElement {
  const [meetings, setMeetings] = React.useState<Meeting[]>([])
  const [excuseIndex, setExcuseIndex] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const formRef = React.useRef<HTMLFormElement>(null)
  const sanityRef = React.useRef<number>(100)

  // Memoized excuse rotation
  const currentExcuse = React.useMemo(() => {
    return MEETING_EXCUSES[excuseIndex % MEETING_EXCUSES.length]
  }, [excuseIndex])
`

const CATWARE_FIXTURE = `use std::collections::HashMap;

pub struct CatWare {
    cats: HashMap<String, Cat>,
}

impl CatWare {
    pub fn new() -> Self {
        Self { cats: HashMap::new() }
    }

    pub fn register(&mut self, name: &str, breed: &str) {
        self.cats.insert(name.to_string(), Cat::new(breed));
    }

    pub fn lookup(&self, name: &str) -> Option<&Cat> {
        self.cats.get(name)
    }
}
`

const TOOL_CALLS = [
  'Read crates/gpui/src/element.rs',
  'Search "accessibility" in crates/gpui/',
  'List crates/gpui/src/platform/',
]

type BranchRow = {
  id: string
  title: string
  meta: string
  active?: boolean
  section: 'zed' | 'cloud' | 'zed.dev'
}

const branches: BranchRow[] = [
  { id: 'accesskit', title: 'Add AccessKit support to GPUI elements', meta: 'gpu-accesskit · main · 4m', active: true, section: 'zed' },
  { id: 'rope-panic', title: 'Fix panic in buffer rope on large p…', meta: 'rope-panic-fix · 12m', section: 'zed' },
  { id: 'vim-motion', title: 'Add vim motion for surround pairs', meta: '+23 −2 · 48m', section: 'zed' },
  { id: 'close-button', title: 'Workspace close button hidden wi…', meta: '2h', section: 'zed' },
  { id: 'text-shaping', title: 'GPUI text shaping perf regression', meta: 'text-shaping-opt · 5h', section: 'zed' },
  { id: 'lsp-hover', title: 'LSP hover tooltip positioning off-s…', meta: '1d', section: 'zed' },
  { id: 'tree-diff', title: 'Refactor project panel tree diffing', meta: 'tree-diff-refactor · 2d', section: 'zed' },
  { id: 'multicursor', title: 'Add multicursor support in search …', meta: '4d', section: 'zed' },
  { id: 'axum-billing', title: 'Migrate billing endpoints to axum …', meta: 'axum-billing · +43 −11 · 8m', section: 'cloud' },
  { id: 'tanstack', title: 'Add TanStack query keys for team…', meta: '+2 −127 · 1h', section: 'cloud' },
  { id: 'stale-cache', title: 'Fix stale cache on org membershi…', meta: '6h', section: 'cloud' },
  { id: 'sdk-pagination', title: 'Rust SDK pagination for collab ses…', meta: 'sdk-pagination · first-pass · 1d', section: 'cloud' },
  { id: 'table-sort', title: 'Dashboard table sorting with TanS…', meta: '3d', section: 'cloud' },
  { id: 'page-sections', title: 'Break out page sections into comp…', meta: '5d', section: 'zed.dev' },
]

function BranchList({ section }: { section: BranchRow['section'] }) {
  return (
    <>
      {branches
        .filter((b) => b.section === section)
        .map((b) => (
          <div className={`cw-thread-row cw-branch-row ${b.active ? 'is-selected' : ''}`} key={b.id}>
            <button
              className="cw-thread-select"
              aria-current={b.active ? 'true' : undefined}
              title={b.title}
            >
              <span
                className={`cw-read-dot ${b.active ? 'unread' : ''}`}
                aria-hidden="true"
              />
              <span>
                <span>{b.title}</span>
                <small className="cw-branch-meta">{b.meta}</small>
              </span>
            </button>
          </div>
        ))}
    </>
  )
}

export default function EditorView() {
  const [sidebar, setSidebar] = useState(true)
  const [pane, setPaneState] = useState<Pane>('conversation')
  const [expanded, setExpanded] = useState(false)
  const [activity, setActivity] = useState(false)
  const [tab, setTab] = useState<Tab>('scheduler.tsx')
  const expandRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLButtonElement>(null)

  const focus = (selector: string) =>
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(selector)
      if (el?.getClientRects().length) el.focus()
    })

  const setPane = (next: Pane) => {
    setPaneState(next)
    if (next === 'navigation') setSidebar(true)
  }

  const navigation = (
    <aside className="cw-navigation" aria-label="Project and branch navigation">
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
        <button aria-label="Search branches" className="cw-last">
          <Search size={16} />
        </button>
      </header>
      <div className="cw-nav-scroll">
        <h3>zed</h3>
        <BranchList section="zed" />
        <h3>cloud</h3>
        <BranchList section="cloud" />
        <h3>zed.dev</h3>
        <BranchList section="zed.dev" />
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
        <span title="Add AccessKit support to GPUI elements">
          Add AccessKit support to GPUI elements
        </span>
        <button
          className="cw-last"
          aria-label="Toggle code pane"
          onClick={() => setPane(pane === 'review' ? 'conversation' : 'review')}
        >
          <PanelRight size={16} />
        </button>
      </header>
      <div
        className="cw-conversation-scroll"
        tabIndex={0}
        aria-label="Scrollable guided conversation"
      >
        <div className="cw-message">
          <span className="cw-avatar" aria-label="You, demo participant">
            Y
          </span>
          <div>
            <p className="cw-sample-label">You · sample request</p>
            <p>
              I want to add AccessKit support to GPUI so screen readers can traverse the element
              tree. Can you start by figuring out where the accessibility tree should be built and
              how elements currently expose their roles?
            </p>
          </div>
        </div>
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
                Read crates/gpui/src/element.rs <ChevronRight size={13} />
              </summary>
              <p>
                {TOOL_CALLS.map((call) => (
                  <span key={call} style={{ display: 'block' }}>
                    {call}
                  </span>
                ))}
              </p>
            </details>
            <p>
              Let me look at the GPUI element trait and the window&apos;s paint cycle to
              understand where we can hook into the tree. I&apos;ll also check if there&apos;s
              any existing accessibility scaffolding.
            </p>
          </div>
        </div>
      </div>
      <footer className="cw-bar cw-conversation-footer">
        <span>zed · gpu-accesskit / main</span>
        <span className="cw-last cw-guided-label">Guided demo · local only</span>
      </footer>
    </section>
  )

  const reviewPane = (
    <section className="cw-review" aria-label="Code view">
      <header className="cw-bar cw-review-bar">
        <div role="tablist" aria-label="Open files" onKeyDown={tabKeys}>
          {(['scheduler.tsx', 'catware.rs', 'uncommit'] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
            >
              {t === 'uncommit' ? 'Uncommit' : t}
            </button>
          ))}
        </div>
        <button className="cw-last" aria-label="Search in file">
          <Search size={16} />
        </button>
      </header>
      <div className="cw-review-body">
        {tab === 'uncommit' ? (
          <div className="cw-review-scroll">
            <p className="cw-proposal-note">No uncommitted changes in this workspace.</p>
          </div>
        ) : (
          <div className="cw-editor-content" role="tabpanel" aria-label={tab}>
            <CodeEditor
              key={tab}
              path={`src/components/${tab}` as unknown as FilePath}
              value={tab === 'scheduler.tsx' ? SCHEDULER_FIXTURE : CATWARE_FIXTURE}
              onChange={() => {}}
            />
          </div>
        )}
      </div>
      <footer className="cw-bar cw-review-footer">
        <span>{tab === 'catware.rs' ? 'Rust · UTF-8' : 'TypeScript · UTF-8'}</span>
        <span className="cw-last">In memory</span>
      </footer>
    </section>
  )

  const content = (
    <div
      className="copper-workspace"
      data-sidebar={sidebar}
      data-review={true}
      data-pane={pane}
    >
      <div
        className="cw-mobile-tabs"
        role="tablist"
        aria-label="Workspace panes"
        onKeyDown={tabKeys}
      >
        {(['navigation', 'conversation', 'review'] as Pane[]).map((id) => (
          <button
            role="tab"
            id={`cev-pane-${id}`}
            aria-selected={pane === id}
            tabIndex={pane === id ? 0 : -1}
            key={id}
            onClick={() => setPane(id)}
          >
            {id === 'navigation' ? 'Branches' : id === 'conversation' ? 'Conversation' : 'Code'}
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
        {reviewPane}
      </div>
      <div className="cw-demo-controls">
        <span>Editor demo · Scripted conversation. No live agent or compiler.</span>
        <div>
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
    </div>
  )

  return (
    <>
      <div className="demo-inline-slot">{!expanded && content}</div>
      <Dialog.Root open={expanded} onOpenChange={setExpanded}>
        <Dialog.Portal>
          <Dialog.Overlay className="demo-overlay" />
          <Dialog.Content
            className="demo-expanded"
            onOpenAutoFocus={(e) => {
              e.preventDefault()
              collapseRef.current?.focus()
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault()
              requestAnimationFrame(() => expandRef.current?.focus())
            }}
          >
            <Dialog.Title className="sr-only">Copper editor demo</Dialog.Title>
            <Dialog.Description className="sr-only">
              Editor browser demonstration. Escape closes the expanded view. No live agent or
              compiler is connected.
            </Dialog.Description>
            {expanded && content}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
