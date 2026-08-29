# #ABtalks — The Card Game

A modern, fully responsive web version of a **#ABtalks-style conversation card
game** — one card, one question, the kind you'd normally avoid. Built with
**React + Vite + Tailwind CSS** in the cinematic, minimalist, emotionally-raw
aesthetic of #ABtalks by Anas Bukhash.

> **Note:** Independent design tribute for demonstration. Not affiliated with,
> endorsed by, or an official product of #ABtalks or Anas Bukhash. All question
> cards are original writing.

## How it plays

1. **Pick a deck** — choose the depth you're ready for.
2. **Draw a card** — tap the face-down card to flip and reveal the question.
3. **Write your reply** (optional) — jot your answer; it's saved on your device.
4. **Answer honestly**, then draw the next. Deck auto-shuffles when exhausted.

Keyboard: **Space / →** reveal & advance · **Esc** back to decks.

## Bilingual — English & Arabic (RTL)

#ABtalks lives in two languages, so this does too. Toggle **EN | ع** in the
navbar and the whole app switches — UI strings and every card — and the layout
flips to full **right-to-left** with a matching Arabic typeface (Tajawal). Your
language choice is remembered.

## Your replies

Each card has an optional **reply** box. What you write is saved to
`localStorage` (keyed per deck + card), so it's private to your device and
still there when you come back to that card — a little journal of your honest
answers. Clearing the text removes it.

## Decks

| Deck          | Vibe                                        |
| ------------- | ------------------------------------------- |
| The Self      | Introspective — meet the person you avoid   |
| Love & Bonds  | The people who shaped your heart            |
| Roots         | Where you come from never leaves            |
| The Shadow    | Fears, regrets, and the road not taken      |
| Purpose       | Why you're really here                      |
| Wildcard      | Lighter, but never shallow                  |

Each deck has its own accent color and 15 original cards. Edit them in
`src/data/decks.js`.

## Design system

- **Palette:** deep black `#000000` / `#0a0a0a`, stark white, signature AB red `#e50914`, plus a per-deck accent.
- **Type:** Inter, very bold tracked-in headings, thin elegant subtext.
- **Motion:** 3D card flip, cinematic `cubic-bezier(0.16, 1, 0.3, 1)` easing, ambient deck glows, grayscale-to-color hovers.

## Getting started

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Structure

```
src/
  App.jsx                 # deck-select ↔ game-table state
  main.jsx                # React entry
  index.css               # Tailwind layers + base theme
  data/decks.js           # decks + question cards
  components/
    Navbar.jsx
    DeckSelect.jsx        # landing + deck picker + how-to-play
    GameTable.jsx         # the flipping card, shuffle, progress
    Footer.jsx
```
