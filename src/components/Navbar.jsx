import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'

export default function Navbar({ onHome, inGame }) {
  const [scrolled, setScrolled] = useState(false)
  const { lang, toggle, t } = useLang()

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
      <nav className="mx-auto flex max-w-8xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <button
          onClick={onHome}
          className="flex min-w-0 shrink items-center gap-2 select-none text-lg font-black tracking-tightest sm:text-xl"
        >
          <span dir="ltr" className="whitespace-nowrap">
            <span className="text-ab-red">#</span>ABtalks
          </span>
          <span className="hidden truncate align-middle text-[0.6rem] font-medium uppercase tracking-[0.3em] text-white/40 sm:inline">
            {t('nav.suffix')}
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/80 transition-all duration-300 hover:border-white hover:text-white"
          >
            <span className={lang === 'en' ? 'text-ab-red' : 'text-white/40'}>EN</span>
            <span className="text-white/20">|</span>
            <span className={lang === 'ar' ? 'text-ab-red' : 'text-white/40'}>ع</span>
          </button>

          <button
            onClick={onHome}
            className="whitespace-nowrap rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-ab-red hover:bg-ab-red sm:px-5"
          >
            {inGame ? t('nav.changeDeck') : t('nav.decks')}
          </button>
        </div>
      </nav>
    </header>
  )
}
