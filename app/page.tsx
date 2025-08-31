'use client'

import { Github, Mail, Linkedin, MessageSquare, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <section>
      <div className="mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h1 className="mb-2 text-4xl font-semibold tracking-tighter text-neutral-700 dark:text-neutral-300">
            artyom kulimov
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 tracking-wide">
            developer - student
          </p>
        </div>
        <div className="mt-4 sm:mt-0 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <a href="https://github.com/wumpiee" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors flex items-center gap-1">
            <Github className="w-4 h-4" />
            github
          </a>
          <a href="mailto:artyomkulimov@gmail.com" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors flex items-center gap-1">
            <Mail className="w-4 h-4" />
            email
          </a>
          <a href="https://www.linkedin.com/in/artyom-kulimov-7a5032265/" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors flex items-center gap-1">
            <Linkedin className="w-4 h-4" />
            linkedin
          </a>
          <div className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            discord: wumpiee
          </div>
        </div>
      </div>

      <div className="relative mb-16">
        <div className="absolute left-0 top-0 w-8 h-px bg-neutral-300 dark:bg-neutral-600"></div>
        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-8">projects</h2>
        
        <div className="space-y-8">
          <motion.div
            className="relative group cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "100%" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="pl-4">
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">examvault</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">co‑founder & head of mobile engineering</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                ai‑powered revision assistant for a‑level students—learn where you're weak, get tailored questions, practice smart. 
                built with next.js, tailwind, drizzle orm, neon db. fine‑tuning models to help students level up.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "100%" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="pl-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-neutral-800 dark:text-neutral-200">svoitaxi</h3>
                <span className="px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded">high-wip</span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                localized ride‑hailing app for rostunovo, russia. inspired by yandex go—simple ui, next.js backend, bundled for ios. 
                targeting small towns, low friction.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "100%" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="pl-4">
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">tap.tm</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                real‑estate listing app in react native (expo). clean, intuitive browsing and posting. client project, not deployed yet—screenshots coming soon.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "100%" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="pl-4">
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">transfer ledger</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                lightweight hawala‑style transaction tracker in next.js. tracks transfers securely and simply.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "100%" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="pl-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-neutral-800 dark:text-neutral-200">smac khalifa university app</h3>
                <a href="https://github.com/danielarbabian/martab" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors flex items-center gap-1 text-xs">
                  <ExternalLink className="w-3 h-3" />
                  github
                </a>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                built for students—tracks resources and campus tools. built a quick edu‑tool to help fellow students.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "100%" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="pl-4">
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">sia node & media server</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                self‑hosted infra project—16 TB siacoin node for passive income + media stack (jellyfin, radarr, sonarr, prowlarr, transmission), all behind tailscale VPN.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-8 h-px bg-neutral-300 dark:bg-neutral-600"></div>
        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-8">experience</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">nebuladevs</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              experimented co‑founding <strong>nebuladevs</strong>, built client sites, learned real dev + delivery.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">examvault</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              then co‑founded <strong>examvault</strong>, where ai and education meet to help students learn smarter.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
