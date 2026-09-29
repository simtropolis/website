import Image from 'next/image'
import { Check, ChevronRight, FileCode2, TerminalSquare } from 'lucide-react'

export function HeroWorkspacePreview() {
  return (
    <div className="hero-workspace" aria-label="Illustration of inspectable work in Copper">
      <div className="hero-workspace-bar">
        <span className="hero-workspace-lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>port-parser / handle invalid input</span>
        <Image src="/copper.svg" alt="" width={24} height={24} />
      </div>
      <div className="hero-workspace-grid">
        <aside>
          <p className="mono">TASK</p>
          <strong>Return an error instead of panicking.</strong>
          <div className="hero-workspace-step is-done">
            <Check size={13} /> Read src/lib.rs
          </div>
          <div className="hero-workspace-step is-done">
            <Check size={13} /> Edit parser
          </div>
          <div className="hero-workspace-step">
            <ChevronRight size={13} /> Review changes
          </div>
        </aside>
        <div className="hero-workspace-code" aria-hidden="true">
          <div className="hero-workspace-tab">
            <FileCode2 size={14} /> src/lib.rs <span>Modified</span>
          </div>
          <pre>
            <code>
              <span>12</span> {'pub fn parse_port(input: &str)'}
              {' {\n'}
              <span className="is-removed">13</span>{' '}
              <del>{'    input.trim().parse::<u16>().unwrap()'}</del>
              {'\n'}
              <span className="is-added">13</span> <ins>{'    input.trim().parse::<u16>()'}</ins>
              {'\n'}
              <span>14</span> {'}'}
            </code>
          </pre>
          <div className="hero-workspace-output">
            <TerminalSquare size={14} /> Recorded output <b>4 passed</b>
          </div>
        </div>
      </div>
      <p className="hero-workspace-note mono">Guided local example · proposed change</p>
    </div>
  )
}
