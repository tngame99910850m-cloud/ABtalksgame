import { useEffect, useState } from 'react'

export default function Navbar({ onHome, inGame }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic ${
        scrolled || inGame
          ? 'border-b border-white/5 bg-ink-950/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-5 py-4 sm:px-8">
        <button onClick={onHome} className="select-none text-xl font-black tracking-tightest">
          <span className="text-ab-red">#</span>ABtalks
          <span className="ml-2 align-middle text-[0.6rem] font-medium uppercase tracking-[0.3em] text-white/40">
            the card game
          </span>
        </button>

        <button
          onClick={onHome}
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-ab-red hover:bg-ab-red"
        >
          {inGame ? 'Change deck' : 'Decks'}
        </button>
      </nav>
    </header>
  )
}
