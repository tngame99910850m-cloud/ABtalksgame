export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-8xl flex-col items-start justify-between gap-4 px-5 py-10 text-xs text-white/40 sm:flex-row sm:items-center sm:px-8">
        <p>
          <span className="font-black text-white/70">
            <span className="text-ab-red">#</span>ABtalks
          </span>{' '}
          — the card game. A design tribute. Discover the human behind the title.
        </p>
        <p>© {new Date().getFullYear()} · Play honestly.</p>
      </div>
    </footer>
  )
}
