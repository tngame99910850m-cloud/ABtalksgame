import { useEffect, useState } from 'react'
import { quoteOfDay, msUntilTomorrow } from '../data/quotes'
import { useLang } from '../i18n.jsx'

export default function QuoteOfDay() {
  const { t, tr } = useLang()
  const [quote, setQuote] = useState(() => quoteOfDay())

  // Auto-advance at the next midnight so a tab left open overnight updates too.
  useEffect(() => {
    let timer
    const schedule = () => {
      timer = setTimeout(() => {
        setQuote(quoteOfDay())
        schedule()
      }, msUntilTomorrow() + 500)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [])

  return (
    <figure className="mx-auto mt-12 max-w-2xl animate-fade-up rounded-2xl border border-white/10 bg-ink-900/50 px-6 py-7 [animation-delay:180ms] sm:px-10 sm:py-8">
      <figcaption className="eyebrow mb-4 flex items-center justify-center gap-2 text-ab-red/80">
        <span className="h-1.5 w-1.5 rounded-full bg-ab-red" />
        {t('land.quote')}
      </figcaption>
      <blockquote
        key={tr(quote)}
        className="animate-fade-in text-balance text-xl font-light italic leading-relaxed text-white/85 sm:text-2xl"
      >
        “{tr(quote)}”
      </blockquote>
    </figure>
  )
}
