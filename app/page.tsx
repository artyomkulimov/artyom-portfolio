import AnimatedProject from './components/animated-project'
import EmailCopy from './components/email-copy'
import Link from 'next/link'
import SkillTags from './components/skill-tags'

export default function Page() {
  return (
    <>
      <section className="relative z-10">
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
          <a href="https://github.com/artyomkulimov" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
            github
          </a>
          <EmailCopy />
          <a href="https://www.linkedin.com/in/artyom-kulimov-7a5032265/" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
            linkedin
            </a> 
          <a href="https://x.com/artyomkulimov" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
            x
          </a>
        </div>
      </div>

      <div className="relative mb-16">
        <div className="absolute left-0 top-0 w-8 h-px bg-neutral-300 dark:bg-neutral-600"></div>
        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-8">projects</h2>
        
        <div className="space-y-8">
          <AnimatedProject>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200">invoice tracker</h3>
              <a href="https://github.com/artyomkulimov/invoicetracker" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors text-xs">
                github
              </a>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              shipment and invoice tracker built for my dad: tracks GTD records, costs, multi-currency profit, edit history, admin views, and XLSX invoice exports. 
              built with next.js app router, typescript, workos auth, drizzle orm, neon postgres, tailwind/shadcn ui.
            </p>
            <SkillTags
              skills={[
                'server actions/auth',
                'database schema design',
                'currency calculations',
                'spreadsheet exports',
              ]}
            />
          </AnimatedProject>

          <AnimatedProject>
            <Link href="/showcase/study-lens" className="block cursor-grab active:cursor-grabbing">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-medium text-neutral-800 transition-colors hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white">study lens</h3>
                <span className="text-xs text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                  showcase
                </span>
              </div>
              <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">private prototype</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                ai study companion that turns screenshots into guided feedback for reviewing problems, checking reasoning, and understanding mistakes. 
                built with a python desktop hotkey agent, websocket relay, and next.js chat ui.
              </p>
              <SkillTags
                skills={[
                  'desktop automation',
                  'websocket architecture',
                  'multimodal ai',
                  'python + next.js integration',
                ]}
              />
            </Link>
          </AnimatedProject>

          <AnimatedProject>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/showcase/taptm" className="inline-flex cursor-grab items-center gap-2 active:cursor-grabbing">
                <h3 className="font-medium text-neutral-800 transition-colors hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white">tap.tm</h3>
                <span className="text-xs text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                  showcase
                </span>
              </Link>
              <a href="https://github.com/artyomkulimov/tap.tm" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors text-xs">
                github
              </a>
            </div>
            <Link href="/showcase/taptm" className="block cursor-grab active:cursor-grabbing">
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                real-estate mobile app built with expo router and react native, with kinde auth, property search/filtering, saved listings, image uploads, and a multi-step posting flow. 
                built with three-language i18n for english, russian, and turkmen.
              </p>
              <SkillTags
                skills={[
                  'expo router',
                  'kinde auth',
                  'i18n (en/ru/tk)',
                  'property flows',
                ]}
              />
            </Link>
          </AnimatedProject>

          <AnimatedProject>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200">smac khalifa university app</h3>
              <a href="https://github.com/danielarbabian/martab" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors text-xs">
                github
              </a>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              waste-sorting app that used a fine-tuned google vision model trained on a hugging face dataset and hosted for inference on runpod. 
              included internationalisation and tracked saved carbon emissions from correct disposal.
            </p>
            <SkillTags
              skills={[
                'computer vision',
                'hugging face datasets',
                'runpod inference',
                'internationalisation',
              ]}
            />
          </AnimatedProject>

          <AnimatedProject>
            <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">self-hosted linux homelab</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              linux server running a 16 TB siacoin node and private media stack with jellyfin, radarr, sonarr, prowlarr, and transmission. 
              hands-on with storage, services, networking, ssh, tailscale vpn, and keeping self-hosted apps running.
            </p>
          </AnimatedProject>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-8 h-px bg-neutral-300 dark:bg-neutral-600"></div>
        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-8">experience</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">nebuladevs</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              experimented co-founding <strong>nebuladevs</strong>, built client sites, learned real dev + delivery.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">examvault</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              then co-founded <strong>examvault</strong>, where ai and education meet to help students learn smarter.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
