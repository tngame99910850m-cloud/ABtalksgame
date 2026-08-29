import { cinematicThumb } from '../data/placeholder'

const heroBg = cinematicThumb(4, '')

export default function Hero({ onWatch }) {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Cinematic background (replace src with a real interview shot) */}
      <img
        src={heroBg}
        alt="Cinematic portrait of an interview subject"
        className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
      />

      {/* Layered gradients for depth + legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.9)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-8xl flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow mb-6 animate-fade-in">The #ABtalks Experience</p>

        <h1 className="max-w-4xl animate-fade-up text-4xl font-black leading-[0.95] tracking-tightest sm:text-6xl md:text-7xl lg:text-8xl">
          Discover the human
          <br />
          <span className="text-white/40">behind the</span>{' '}
          <span className="relative whitespace-nowrap">
            title
            <span className="absolute -bottom-2 left-0 h-1.5 w-full bg-ab-red" />
          </span>
          .
        </h1>

        <p className="mt-8 max-w-xl animate-fade-up text-base font-light leading-relaxed text-white/60 [animation-delay:120ms] sm:text-lg">
          Unfiltered conversations that strip away the persona — hosted by
          Anas Bukhash. No scripts. No masks. Just the person.
        </p>

        <div className="mt-10 flex animate-fade-up flex-col items-center gap-4 [animation-delay:240ms] sm:flex-row">
          <button
            onClick={onWatch}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 ease-cinematic hover:bg-ab-red hover:text-white"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-white transition-colors duration-300 group-hover:bg-white group-hover:text-ab-red">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch Latest Episode
          </button>

          <a
            href="#episodes"
            className="text-sm font-medium text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Browse all episodes
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  )
}
