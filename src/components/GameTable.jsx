import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLang } from '../i18n.jsx'

// Fisher–Yates shuffle → an order of indices for the deck.
function shuffled(n) {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const replyKey = (deckId, cardIdx) => `abtalks:reply:${deckId}:${cardIdx}`

function loadReply(deckId, cardIdx) {
  try {
    return localStorage.getItem(replyKey(deckId, cardIdx)) ?? ''
  } catch {
    return ''
  }
}

export default function GameTable({ deck, onExit }) {
  const { t, tr } = useLang()
  const [order, setOrder] = useState(() => shuffled(deck.cards.length))
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [reply, setReply] = useState('')

  const accent = deck.accent
  const total = deck.cards.length
  const drawn = pos + 1
  const cardIdx = order[pos]
  const card = deck.cards[cardIdx]
  const done = pos >= total - 1

  // Load this card's saved reply whenever the visible card changes.
  useEffect(() => {
    setReply(loadReply(deck.id, cardIdx))
    setShowReply(false)
  }, [deck.id, cardIdx])

  const saveReply = useCallback(
    (value) => {
      setReply(value)
      try {
        if (value.trim()) localStorage.setItem(replyKey(deck.id, cardIdx), value)
        else localStorage.removeItem(replyKey(deck.id, cardIdx))
      } catch {
        /* ignore quota / private mode */
      }
    },
    [deck.id, cardIdx],
  )

  const reshuffle = useCallback(() => {
    setFlipped(false)
    setOrder(shuffled(total))
    setPos(0)
  }, [total])

  const next = useCallback(() => {
    if (done) return reshuffle()
    setFlipped(false)
    setTimeout(() => setPos((p) => p + 1), 180)
  }, [done, reshuffle])

  // Keyboard: Space/→ advance, Esc exit. (Ignore while typing a reply.)
  useEffect(() => {
    const onKey = (e) => {
      const typing = ['TEXTAREA', 'INPUT'].includes(e.target.tagName)
      if (e.key === 'Escape') return onExit()
      if (typing) return
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        flipped ? next() : setFlipped(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, next, onExit])

  const progress = useMemo(() => Math.round((drawn / total) * 100), [drawn, total])
  const hasReply = reply.trim().length > 0

  return (
    <section className="relative flex min-h-[100svh] flex-col px-5 pb-10 pt-24 sm:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: accent }}
      />

      {/* Top bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between">
        <button
          onClick={onExit}
          className="group flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current transition-transform group-hover:-translate-x-0.5 rtl:rotate-180">
            <path d="M11 5L4 12l7 7 1.4-1.4L7.8 13H20v-2H7.8l4.6-4.6z" />
          </svg>
          {t('game.decks')}
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold" style={{ color: accent }}>
            {tr(deck.name)}
          </span>
          <span dir="ltr" className="text-sm tabular-nums text-white/40">
            {drawn} / {total}
          </span>
        </div>
      </div>

      {/* progress */}
      <div className="relative z-10 mx-auto mt-4 h-0.5 w-full max-w-3xl overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-500 ease-cinematic"
          style={{ width: `${progress}%`, backgroundColor: accent }}
        />
      </div>

      {/* Card stage */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 py-8">
        <div className="[perspective:2000px]">
          <button
            onClick={() => (flipped ? next() : setFlipped(true))}
            aria-label={flipped ? t('game.next') : t('game.reveal')}
            className="group relative h-[26rem] w-[19rem] rounded-[1.75rem] transition-transform duration-700 ease-cinematic [transform-style:preserve-3d] sm:h-[30rem] sm:w-[22rem]"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* BACK */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-ink-900 [backface-visibility:hidden]">
              <div
                className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-25"
                style={{ background: `radial-gradient(120% 80% at 50% 0%, ${accent}55, transparent 60%)` }}
              />
              <span dir="ltr" className="text-3xl font-black tracking-tightest">
                <span style={{ color: accent }}>#</span>AB
              </span>
              <span className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/40">
                talks
              </span>
              <span className="absolute bottom-8 text-xs font-medium text-white/40 transition-colors group-hover:text-white">
                {t('game.tapReveal')}
              </span>
            </div>

            {/* FRONT */}
            <div
              className="absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border p-7 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-8"
              style={{ borderColor: `${accent}59`, backgroundColor: '#0c0c0c' }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-30"
                style={{ background: `radial-gradient(100% 60% at 100% 0%, ${accent}40, transparent 55%)` }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ backgroundColor: `${accent}26`, color: accent }}
                >
                  {tr(deck.name)}
                </span>
                <span className="h-2.5 w-2.5 rotate-45" style={{ backgroundColor: accent }} />
              </div>

              <p className="relative text-start text-2xl font-bold leading-snug sm:text-[1.7rem]">
                {tr(card)}
              </p>

              <div className="relative flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/35">
                <span dir="ltr">#{String(cardIdx + 1).padStart(2, '0')}</span>
                <span className="flex items-center gap-1.5">
                  {hasReply && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />}
                  {t('game.answer')}
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Reply system — appears once the question is revealed */}
        {flipped && (
          <div className="w-full max-w-md animate-fade-up">
            {!showReply ? (
              <button
                onClick={() => setShowReply(true)}
                className="mx-auto flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition-all duration-300 hover:border-white hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M4 4h16v12H7l-3 3V4z" />
                </svg>
                {t('game.reply')}
                {hasReply && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />}
              </button>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-3 backdrop-blur">
                <textarea
                  autoFocus
                  value={reply}
                  onChange={(e) => saveReply(e.target.value)}
                  rows={3}
                  placeholder={t('game.replyPlaceholder')}
                  className="w-full resize-none bg-transparent text-sm leading-relaxed text-white placeholder-white/30 outline-none"
                />
                <div className="mt-1 flex items-center justify-between px-1">
                  <span className="flex items-center gap-1.5 text-[0.65rem] font-medium text-white/40">
                    {hasReply && (
                      <>
                        <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" style={{ color: accent }}>
                          <path d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2l-1.5-1.5z" />
                        </svg>
                        {t('game.saved')}
                      </>
                    )}
                  </span>
                  <button
                    onClick={() => setShowReply(false)}
                    className="text-[0.65rem] font-medium text-white/50 transition-colors hover:text-white"
                  >
                    {t('game.hideReply')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (flipped ? next() : setFlipped(true))}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 ease-cinematic hover:bg-ab-red hover:text-white"
          >
            {!flipped ? t('game.reveal') : done ? t('game.restart') : t('game.next')}
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current rtl:rotate-180">
              <path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6z" />
            </svg>
          </button>
          <button
            onClick={reshuffle}
            aria-label={t('game.restart')}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-white hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M17 3l4 4-4 4V8h-2.5l-2.9 2.9-1.4-1.4L13.1 6H21V4l-4 .01V3zM3 6h4.6l2.9 2.9 1.4 1.4L8.9 8H3V6zm18 12h-5.6l-2.9-2.9-1.4 1.4L14.1 18H21v2l-4-.01V21l4-4-4-4v3H3v-2h11.1z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-white/30">{t('game.hint')}</p>
      </div>
    </section>
  )
}
