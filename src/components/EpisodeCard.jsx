export default function EpisodeCard({ episode, onPlay }) {
  return (
    <article
      onClick={() => onPlay(episode)}
      className="group relative cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-ink-850">
        <img
          src={episode.thumb}
          alt={`${episode.guest} — ${episode.number}`}
          loading="lazy"
          className="h-full w-full scale-100 object-cover grayscale transition-all duration-700 ease-cinematic group-hover:scale-105 group-hover:grayscale-0"
        />
        {/* dark veil that lifts on hover */}
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/10" />

        {/* Play affordance */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="grid h-14 w-14 translate-y-2 place-items-center rounded-full border border-white/30 bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-500 ease-cinematic group-hover:translate-y-0 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>

        {/* Meta chips */}
        <span className="absolute left-3 top-3 rounded-sm bg-black/60 px-2 py-1 text-[0.65rem] font-semibold tracking-wider text-white backdrop-blur-sm">
          {episode.number}
        </span>
        <span className="absolute bottom-3 right-3 rounded-sm bg-black/60 px-2 py-1 text-[0.65rem] font-medium text-white/90 backdrop-blur-sm">
          {episode.duration}
        </span>

        {/* Red bottom reveal line */}
        <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-ab-red transition-all duration-500 ease-cinematic group-hover:w-full" />
      </div>

      {/* Text block */}
      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-ab-red">
            {episode.guest}
          </h3>
          <span className="shrink-0 text-xs font-medium text-white/40">
            {episode.views} views
          </span>
        </div>
        <p className="mt-0.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/40">
          {episode.role}
        </p>
        <p className="mt-3 text-sm font-light italic leading-relaxed text-white/55">
          {episode.quote}
        </p>
      </div>
    </article>
  )
}
