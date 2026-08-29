import { useEffect, useState } from 'react'
import { chapters } from '../data/episodes'

export default function VideoPlayer({ episode, onClose }) {
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(0)

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!episode) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [episode, onClose])

  if (!episode) return null

  return (
    <div
      id="watch"
      className="fixed inset-0 z-[60] flex animate-fade-in items-start justify-center overflow-y-auto bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close player"
          className="group mb-6 ml-auto flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          Close
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-ab-red group-hover:bg-ab-red">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.7l-1.42-1.41L9.17 12 2.87 5.71 4.29 4.29l6.3 6.3 6.29-6.3z" />
            </svg>
          </span>
        </button>

        {/* Theater screen */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-ink-900 shadow-[0_40px_120px_-20px_rgba(229,9,20,0.25)] ring-1 ring-white/10">
          <img
            src={episode.thumb}
            alt={episode.guest}
            className={`h-full w-full object-cover transition-all duration-700 ${
              playing ? 'scale-105 grayscale-0' : 'grayscale'
            }`}
          />
          <div className="absolute inset-0 bg-black/30" />

          {!playing && (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 grid place-items-center"
              aria-label="Play episode"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full border border-white/40 bg-black/40 backdrop-blur-sm transition-all duration-500 ease-cinematic group-hover:scale-110 group-hover:border-ab-red group-hover:bg-ab-red">
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}

          {/* Faux transport bar */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-10">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="text-white/90 transition-colors hover:text-ab-red"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              <div className={`h-full bg-ab-red transition-all duration-1000 ${playing ? 'w-1/3' : 'w-0'}`} />
            </div>
            <span className="text-xs font-medium tabular-nums text-white/70">
              {episode.duration}
            </span>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">
              {episode.number} · {episode.date}
            </p>
            <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-4xl">
              {episode.guest}
              <span className="text-white/40"> — {episode.role}</span>
            </h2>
            <p className="mt-4 text-base font-light italic leading-relaxed text-white/60">
              {episode.quote}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/50">
              <span>{episode.views} views</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <button className="transition-colors hover:text-white">Share</button>
              <button className="transition-colors hover:text-white">Save</button>
              <button className="transition-colors hover:text-ab-red">♥ Like</button>
            </div>
          </div>

          {/* Chapters / timestamps */}
          <div className="w-full lg:max-w-sm">
            <p className="eyebrow mb-4">Chapters</p>
            <ul className="divide-y divide-white/5 border-y border-white/5">
              {chapters.map((c, i) => (
                <li key={c.t}>
                  <button
                    onClick={() => {
                      setActive(i)
                      setPlaying(true)
                    }}
                    className={`group flex w-full items-center gap-4 py-3 text-left transition-colors ${
                      active === i ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-16 shrink-0 font-mono text-xs tabular-nums transition-colors ${
                        active === i ? 'text-ab-red' : 'text-white/40 group-hover:text-ab-red'
                      }`}
                    >
                      {c.t}
                    </span>
                    <span className="text-sm font-light leading-snug">{c.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
