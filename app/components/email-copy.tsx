'use client'

import { useState } from 'react'

const email = 'artyomkulimov@gmail.com'

export default function EmailCopy() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      aria-label={`copy ${email}`}
      className="min-w-[3.75rem] text-left text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
      onClick={copyEmail}
      title={email}
      type="button"
    >
      {copied ? 'copied' : 'email'}
    </button>
  )
}
