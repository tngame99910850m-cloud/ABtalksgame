import { episodes } from '../data/episodes'

// Continuous cinematic name-scroll for the "Guests" anchor.
const names = [...episodes, ...episodes]

export default function GuestsMarquee() {
  return (
    <section id="guests" className="border-y border-white/5 bg-black py-10 overflow-hidden">
      <div className="group flex items-center">
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {names.map((ep, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="whitespace-nowrap text-2xl font-black tracking-tight text-white/25 transition-colors hover:text-white sm:text-4xl">
                {ep.guest}
              </span>
              <span className="h-2 w-2 shrink-0 rotate-45 bg-ab-red/70" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
