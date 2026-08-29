import { useState } from 'react'

const socials = ['YouTube', 'Instagram', 'X', 'TikTok', 'Spotify']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
  }

  return (
    <footer id="about" className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-8xl px-5 py-20 sm:px-8">
        {/* Newsletter */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-tightest sm:text-5xl">
              Never miss a<br /> conversation.
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/50">
              New episodes, raw moments, and behind-the-scenes — delivered
              quietly to your inbox. No noise.
            </p>
          </div>

          <form onSubmit={submit} className="w-full max-w-md">
            {sent ? (
              <p className="rounded-full border border-ab-red/40 bg-ab-red/10 px-6 py-4 text-sm text-white">
                You’re in. Watch your inbox.
              </p>
            ) : (
              <div className="flex items-center gap-2 border-b border-white/20 pb-3 transition-colors focus-within:border-ab-red">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-transparent text-base text-white placeholder-white/30 outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:text-ab-red"
                >
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Links row */}
        <div className="flex flex-col gap-10 py-14 md:flex-row md:justify-between">
          <div>
            <span className="text-2xl font-black tracking-tightest">
              <span className="text-ab-red">#</span>ABtalks
            </span>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/45">
              Discover the human behind the title. Hosted by Anas Bukhash.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                className="group relative text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                {s}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ab-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} #ABtalks. A design tribute. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="#shop" className="transition-colors hover:text-white">Shop</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
