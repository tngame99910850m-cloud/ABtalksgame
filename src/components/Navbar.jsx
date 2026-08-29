import { useEffect, useState } from 'react'

const links = ['Episodes', 'Guests', 'About', 'Shop']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-gradient-to-b from-black/70 to-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-2 select-none">
          <span className="text-xl font-black tracking-tightest">
            <span className="text-ab-red">#</span>ABtalks
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="group relative text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white"
              >
                {l}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ab-red transition-all duration-300 ease-cinematic group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#watch"
            className="hidden rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-ab-red hover:bg-ab-red sm:inline-block"
          >
            Watch
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-white transition-all duration-300 ${
                open ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition-all duration-300 ${
                open ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-ink-950/95 backdrop-blur-xl transition-all duration-500 ease-cinematic md:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 py-4 text-lg font-medium text-white/80 transition-colors hover:text-ab-red"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
