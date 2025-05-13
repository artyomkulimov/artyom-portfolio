'use client'
import Link from 'next/link'
import Image from 'next/image'
import Typewriter from 'typewriter-effect'
import './typewriter.css'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between rounded-lg border border-zinc-200 p-8 dark:border-zinc-800">
      <div>
        <Link
          href="/"
          className="text-3xl font-medium text-black dark:text-white"
        >
          Artyom Kulimov
        </Link>
        <div className="mt-1 flex flex-col font-mono text-lg text-zinc-600 dark:text-zinc-500">
          <Typewriter
            options={{
              loop: false,
              cursor: '|',
              delay: 20,
              wrapperClassName: 'typewriter-wrapper',
              cursorClassName: 'typewriter-cursor',
              autoStart: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(300)
                .typeString('> Fullstack Developer')
                .pauseFor(800)
                .typeString('<br>> ')
                .typeString(
                  'Focused on creating intuitive and performant web experiences.',
                )
                .start()
            }}
          />
        </div>
      </div>
      <div className="h-24 w-24 overflow-hidden rounded-full">
        <Image
          src="/headshot.jpeg"
          alt="Artyom Kulimov"
          width={1024}
          height={1024}
          className="h-full w-full transform-gpu object-cover will-change-transform"
          quality={100}
          priority
          sizes="96px"
        />
      </div>
    </header>
  )
}
