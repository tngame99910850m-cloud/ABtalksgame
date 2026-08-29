import { useCallback, useEffect, useMemo, useState } from 'react'

// Fisher–Yates shuffle → an order of indices for the deck.
function shuffled(n) {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function GameTable({ deck, onExit }) {
  const [order, setOrder] = useState(() => shuffled(deck.cards.length))
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const accent = deck.accent
  const total = deck.cards.length
  const drawn = pos + 1
  const question = deck.cards[order[pos]]
  const done = pos >= total - 1

  const reshuffle = useCallback(() => {
    setFlipped(false)
    setOrder(shuffled(total))
    setPos(0)
  }, [total])

  const next = useCallback(() => {
    if (done) return reshuffle()
    setFlipped(false)
    // let the flip-back play before swapping the text
    setTimeout(() => setPos((p) => p + 1), 180)
  }, [done, reshuffle])

  // Keyboard: Space/→ advance, ← flip, Esc exit.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault()
        flipped ? next() : setFlipped(true)
      } else if (e.key === 'Escape') {
        onExit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, next, onExit])

  const progress = useMemo(() => Math.round((drawn / total) * 100), [drawn, total])

  return (
    <section className="relative flex min-h-[100svh] flex-col px-5 pb-10 pt-24 sm:px-8">
      {/* ambient deck glow */}
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
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current transition-transform group-hover:-translate-x-0.5">
            <path d="M11 5L4 12l7 7 1.4-1.4L7.8 13H20v-2H7.8l4.6-4.6z" />
          </svg>
          Decks
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-tight" style={{ color: accent }}>
            {deck.name}
          </span>
          <span className="text-sm tabular-nums text-white/40">
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
      <div className="relative z-10 flex flex-1 items-center justify-center py-10">
        <div className="[perspective:2000px]">
          <button
            onClick={() => (flipped ? next() : setFlipped(true))}
            aria-label={flipped ? 'Next card' : 'Reveal question'}
            className="group relative h-[26rem] w-[19rem] rounded-[1.75rem] transition-transform duration-700 ease-cinematic [transform-style:preserve-3d] sm:h-[30rem] sm:w-[22rem]"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* BACK (face-down) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-ink-900 [backface-visibility:hidden]">
              <div
                className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-25"
                style={{ background: `radial-gradient(120% 80% at 50% 0%, ${accent}55, transparent 60%)` }}
              />
              <span className="text-3xl font-black tracking-tightest">
                <span style={{ color: accent }}>#</span>AB
              </span>
              <span className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/40">
                talks
              </span>
              <span className="absolute bottom-8 text-xs font-medium text-white/40 transition-colors group-hover:text-white">
                Tap to reveal
              </span>
            </div>

            {/* FRONT (question) */}
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
                  {deck.name}
                </span>
                <span className="h-2.5 w-2.5 rotate-45" style={{ backgroundColor: accent }} />
              </div>

              <p className="relative text-2xl font-bold leading-snug tracking-tight sm:text-[1.7rem]">
                {question}
              </p>

              <div className="relative flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/35">
                <span>#{String(order[pos] + 1).padStart(2, '0')}</span>
                <span>Answer honestly</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (flipped ? next() : setFlipped(true))}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 ease-cinematic hover:bg-ab-red hover:text-white"
          >
            {!flipped ? 'Reveal' : done ? 'Shuffle & restart' : 'Next card'}
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6z" />
            </svg>
          </button>
          <button
            onClick={reshuffle}
            aria-label="Shuffle deck"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-white hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M17 3l4 4-4 4V8h-2.5l-2.9 2.9-1.4-1.4L13.1 6H21V4l-4 .01V3zM3 6h4.6l2.9 2.9 1.4 1.4L8.9 8H3V6zm18 12h-5.6l-2.9-2.9-1.4 1.4L14.1 18H21v2l-4-.01V21l4-4-4-4v3H3v-2h11.1z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-white/30">
          Space / → to reveal &amp; advance · Esc to leave
        </p>
      </div>
    </section>
  )
}
