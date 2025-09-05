'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function AnimatedProject({ children }: { children: ReactNode }) {
  return (
    <motion.div className="relative group pb-4" whileHover="hover" initial="initial">
      <motion.div
        className="absolute -left-4 -top-2 w-0.5 bg-neutral-800 dark:bg-neutral-200"
        variants={{ initial: { height: 0 }, hover: { height: 'calc(100% + 1rem)' } }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute -left-4 -top-2 h-0.5 bg-neutral-800 dark:bg-neutral-200"
        variants={{ initial: { width: 0 }, hover: { width: 'calc(100% + 1rem)' } }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      />
      <div>{children}</div>
    </motion.div>
  )
}
