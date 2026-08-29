import { useLang } from '../i18n.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-8xl flex-col items-start justify-between gap-4 px-5 py-10 text-xs text-white/40 sm:flex-row sm:items-center sm:px-8">
        <p>
          <span dir="ltr" className="font-black text-white/70">
            <span className="text-ab-red">#</span>ABtalks
          </span>{' '}
          {t('foot.text')}
        </p>
        <p>© {new Date().getFullYear()} · {t('foot.play')}</p>
      </div>
    </footer>
  )
}
