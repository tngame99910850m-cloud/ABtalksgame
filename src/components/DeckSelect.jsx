import { decks } from '../data/decks'

export default function DeckSelect({ onPick }) {
  return (
    <section className="mx-auto max-w-8xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
      {/* Intro */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-6 animate-fade-in">The #ABtalks Card Game</p>
        <h1 className="animate-fade-up text-4xl font-black leading-[0.95] tracking-tightest sm:text-6xl md:text-7xl">
          No small talk.
          <br />
          <span className="text-white/40">Just the</span>{' '}
          <span className="relative whitespace-nowrap">
            questions
            <span className="absolute -bottom-1.5 left-0 h-1.5 w-full bg-ab-red" />
          </span>
          .
        </h1>
        <p className="mx-auto mt-7 max-w-xl animate-fade-up text-base font-light leading-relaxed text-white/60 [animation-delay:120ms]">
          One card. One question. The kind you’d normally avoid. Pick a deck,
          gather your people, and discover the human behind the title.
        </p>
      </div>

      {/* Deck grid */}
      <div className="mt-16 grid animate-fade-up grid-cols-1 gap-5 [animation-delay:240ms] sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => onPick(deck)}
            className="group relative flex h-56 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-6 text-left transition-all duration-500 ease-cinematic hover:-translate-y-1 hover:border-white/25"
          >
            {/* accent glow */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: deck.accent }}
            />
            {/* faux stacked cards */}
            <div className="absolute inset-x-6 -bottom-3 h-24 rounded-xl border border-white/5 bg-white/[0.02]" />
            <div className="absolute inset-x-4 -bottom-6 h-24 rounded-xl border border-white/5 bg-white/[0.01]" />

            <div className="relative flex items-center justify-between">
              <span
                className="rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
                style={{ backgroundColor: `${deck.accent}1f`, color: deck.accent }}
              >
                {deck.cards.length} cards
              </span>
              <span
                className="h-2.5 w-2.5 rotate-45"
                style={{ backgroundColor: deck.accent }}
              />
            </div>

            <div className="relative">
              <h2 className="text-2xl font-black tracking-tight">{deck.name}</h2>
              <p className="mt-1 text-sm font-light text-white/50">{deck.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70 transition-colors group-hover:text-white">
                Start
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6z" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* How to play */}
      <div className="mx-auto mt-20 grid max-w-4xl gap-8 border-t border-white/10 pt-14 sm:grid-cols-3">
        {[
          ['01', 'Pick a deck', 'Choose the depth you’re ready for tonight.'],
          ['02', 'Draw a card', 'Read the question out loud. No skipping to look clever.'],
          ['03', 'Go first', 'Answer honestly before you pass. Vulnerability sets the tone.'],
        ].map(([n, t, d]) => (
          <div key={n}>
            <span className="text-3xl font-black text-ab-red">{n}</span>
            <h3 className="mt-3 text-base font-bold">{t}</h3>
            <p className="mt-1 text-sm font-light leading-relaxed text-white/50">{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
