import { useState } from 'react'
import Navbar from './components/Navbar'
import DeckSelect from './components/DeckSelect'
import GameTable from './components/GameTable'
import Footer from './components/Footer'

export default function App() {
  const [deck, setDeck] = useState(null)

  const goHome = () => {
    setDeck(null)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-ink-950 text-white antialiased">
      <Navbar onHome={goHome} inGame={!!deck} />

      <main className="flex-1">
        {deck ? (
          <GameTable deck={deck} onExit={goHome} />
        ) : (
          <DeckSelect onPick={setDeck} />
        )}
      </main>

      {!deck && <Footer />}
    </div>
  )
}
