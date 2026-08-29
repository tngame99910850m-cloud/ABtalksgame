import { episodes } from '../data/episodes'
import EpisodeCard from './EpisodeCard'

export default function EpisodesGrid({ onPlay }) {
  return (
    <section id="episodes" className="relative border-t border-white/5 bg-ink-950 py-20 sm:py-28">
      <div className="mx-auto max-w-8xl px-5 sm:px-8">
        {/* Section header */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">The Archive</p>
            <h2 className="text-3xl font-black tracking-tightest sm:text-5xl">
              Every episode is a<br className="hidden sm:block" /> confession.
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-white/50">
            One guest. One camera. One question repeated until the truth
            surfaces. Choose a conversation to sit inside.
          </p>
        </div>

        {/* Grid: 1 col mobile → 2 tablet → 3 desktop */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} onPlay={onPlay} />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-16 flex justify-center">
          <button className="rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-white/80 transition-all duration-300 ease-cinematic hover:border-white hover:text-white">
            Load more episodes
          </button>
        </div>
      </div>
    </section>
  )
}
