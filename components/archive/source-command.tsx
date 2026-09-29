'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { sourceCommand } from '@/lib/content'

export function SourceCommand() {
  const [status, setStatus] = useState('')
  async function copy() {
    try {
      await navigator.clipboard.writeText(sourceCommand)
      setStatus('Copied to clipboard')
    } catch {
      setStatus('Could not copy. Select the commands below to copy them.')
    }
  }
  return (
    <div className="command-panel">
      <div className="command-title">
        <span className="mono">Terminal / build from source</span>
        <button onClick={copy} aria-label="Copy source build commands">
          {status === 'Copied to clipboard' ? <Check size={16} /> : <Copy size={16} />}
          <span>Copy</span>
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{sourceCommand}</code>
      </pre>
      <p className="copy-status" role="status">
        {status}
      </p>
    </div>
  )
}
