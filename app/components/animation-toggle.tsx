'use client'

import { useEffect, useState } from 'react'

export default function AnimationToggle() {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stored = localStorage.getItem('animations')
    const initial = stored ? stored === 'on' : !media.matches
    setEnabled(initial)
    document.documentElement.dataset.animations = initial ? 'on' : 'off'
    window.dispatchEvent(new CustomEvent('animations:toggle', { detail: initial }))
    const onMedia = (e: MediaQueryListEvent) => {
      if (!stored) {
        const val = !e.matches
        setEnabled(val)
        document.documentElement.dataset.animations = val ? 'on' : 'off'
        window.dispatchEvent(new CustomEvent('animations:toggle', { detail: val }))
      }
    }
    media.addEventListener('change', onMedia)
    return () => media.removeEventListener('change', onMedia)
  }, [])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem('animations', next ? 'on' : 'off')
    document.documentElement.dataset.animations = next ? 'on' : 'off'
    window.dispatchEvent(new CustomEvent('animations:toggle', { detail: next }))
  }

  return (
    <button onClick={toggle} className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors underline">
      animations: {enabled ? 'on' : 'off'}
    </button>
  )
}
