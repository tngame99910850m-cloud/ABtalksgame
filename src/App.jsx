import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GuestsMarquee from './components/GuestsMarquee'
import EpisodesGrid from './components/EpisodesGrid'
import VideoPlayer from './components/VideoPlayer'
import Footer from './components/Footer'
import { featured } from './data/episodes'

export default function App() {
  const [active, setActive] = useState(null)

  const play = (episode) => setActive(episode)
  const close = () => setActive(null)

  return (
    <div className="min-h-screen bg-ink-950 text-white antialiased">
      <Navbar />

      <main>
        <Hero onWatch={() => play(featured)} />
        <GuestsMarquee />
        <EpisodesGrid onPlay={play} />
      </main>

      <Footer />

      <VideoPlayer episode={active} onClose={close} />
    </div>
  )
}
