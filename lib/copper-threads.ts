export type DemoThread = {
  id: string
  title: string
  pinned: boolean
  unread: boolean
  archived: boolean
  section: 'project' | 'threads'
  note: string
}
export const initialThreads: DemoThread[] = [
  {
    id: 'panic',
    title: 'Explain the parser’s failure mode',
    pinned: true,
    unread: false,
    archived: false,
    section: 'threads',
    note: 'The original parser calls unwrap. A value such as copper cannot become a u16, so the original function panics. Returning Result lets the caller decide how to report that error.',
  },
  {
    id: 'caller',
    title: 'Review errors at the call site',
    pinned: true,
    unread: true,
    archived: false,
    section: 'threads',
    note: 'The sample caller matches Ok and Err. Valid input prints a port; invalid input prints a short message to stderr. Open src/main.rs to edit the caller.',
  },
  {
    id: 'invalid',
    title: 'Cover invalid port input',
    pinned: true,
    unread: false,
    archived: false,
    section: 'threads',
    note: 'The patched fixture adds cases for empty input, letters, a negative value, and a number greater than 65535. These are recorded tests, not browser execution.',
  },
  {
    id: 'whitespace',
    title: 'Check whitespace handling',
    pinned: true,
    unread: false,
    archived: false,
    section: 'threads',
    note: 'The parser still trims its input before parsing. The existing whitespace test is retained and updated to check the successful Result.',
  },
  {
    id: 'safety',
    title: 'Make port parsing return a Result',
    pinned: false,
    unread: false,
    archived: false,
    section: 'project',
    note: 'Replace the panic-prone parser, update the caller, and add tests for invalid input.',
  },
  {
    id: 'cli',
    title: 'Update the CLI error message',
    pinned: false,
    unread: true,
    archived: false,
    section: 'project',
    note: 'The sample uses eprintln! for the error branch. You can change that message in src/main.rs. Your edits stay in this browser session.',
  },
  {
    id: 'boundary',
    title: 'Understand the u16 boundary',
    pinned: false,
    unread: false,
    archived: false,
    section: 'project',
    note: 'u16 represents values from 0 through 65535. This example checks numeric parsing, not every networking policy. Port zero is a valid u16.',
  },
  {
    id: 'manifest',
    title: 'Keep the manifest dependency-free',
    pinned: false,
    unread: false,
    archived: false,
    section: 'project',
    note: 'ParseIntError comes from Rust’s standard library. No dependency is added. The proposal leaves Cargo.toml untouched, including your own edits.',
  },
  {
    id: 'recording',
    title: 'Read the recorded test output',
    pinned: false,
    unread: true,
    archived: false,
    section: 'project',
    note: 'The six passing test results were captured from the checked-in patched fixture. They do not validate visitor edits. Open the parser task to expand the recording.',
  },
  {
    id: 'review',
    title: 'Review the three-file proposal',
    pinned: false,
    unread: false,
    archived: false,
    section: 'project',
    note: 'The proposal changes src/lib.rs, src/main.rs, and tests/parser.rs. Its additions and deletions are calculated from the actual before and after fixtures.',
  },
  {
    id: 'ownership',
    title: 'Why borrow the input as &str?',
    pinned: false,
    unread: false,
    archived: false,
    section: 'threads',
    note: 'The function only needs to read the input. Borrowing &str avoids taking ownership of the caller’s string and works with both string literals and borrowed String values.',
  },
  {
    id: 'result',
    title: 'Read a Result type signature',
    pinned: false,
    unread: false,
    archived: false,
    section: 'threads',
    note: 'Result<u16, ParseIntError> describes two outcomes: a parsed number in Ok, or a parsing error in Err. The caller handles both explicitly.',
  },
  {
    id: 'tests',
    title: 'Explore the test module',
    pinned: false,
    unread: false,
    archived: false,
    section: 'threads',
    note: 'tests/parser.rs is an integration test file. It imports the public parse_port function from the port_parser library and checks behavior through its public API.',
  },
  {
    id: 'reset',
    title: 'Try an edit without losing the sample',
    pinned: false,
    unread: false,
    archived: false,
    section: 'threads',
    note: 'Select Files, edit a file, and switch tabs. Your text stays in memory. Reset restores the code, thread state, and panel layout after confirmation.',
  },
]
export type ThreadAction =
  | { type: 'pin' | 'read' | 'archive' | 'restore-title'; id: string }
  | { type: 'rename'; id: string; title: string }
  | { type: 'reset' }
export function threadReducer(threads: DemoThread[], action: ThreadAction): DemoThread[] {
  if (action.type === 'reset') return initialThreads.map((thread) => ({ ...thread }))
  return threads.map((thread) => {
    if (thread.id !== action.id) return thread
    if (action.type === 'pin') return { ...thread, pinned: !thread.pinned }
    if (action.type === 'read') return { ...thread, unread: !thread.unread }
    if (action.type === 'archive') return { ...thread, archived: !thread.archived }
    if (action.type === 'rename')
      return action.title.trim() ? { ...thread, title: action.title.trim().slice(0, 80) } : thread
    return { ...thread, title: initialThreads.find((item) => item.id === thread.id)!.title }
  })
}
