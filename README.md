# #ABtalks — Web App

A modern, fully responsive single-page app that replicates the cinematic,
minimalist, emotionally-raw aesthetic of **#ABtalks**, the interview show by
Anas Bukhash. Built with **React + Vite + Tailwind CSS**.

> **Note:** This is an independent design tribute for demonstration. It is not
> affiliated with, endorsed by, or an official product of #ABtalks or Anas
> Bukhash. All guest names, quotes, and imagery are placeholders.

## Design system

| Token        | Value                                   |
| ------------ | --------------------------------------- |
| Background   | Deep black `#000000` / `#0a0a0a`        |
| Text         | Stark white `#ffffff`                   |
| Accent       | Signature AB red `#e50914`              |
| Typography   | Inter (geometric sans), very bold heads |
| Motion       | `cubic-bezier(0.16, 1, 0.3, 1)` easing  |
| Imagery      | Grayscale → color on hover, slow zoom   |

## Components

- **Navbar** — transparent → blurred-black on scroll, animated underlines, mobile menu.
- **Hero** — full-viewport cinematic background, tagline *"Discover the human behind the title,"* and a **Watch Latest Episode** CTA.
- **Guests marquee** — continuous scrolling guest names (pauses on hover).
- **Episodes grid** — responsive (1 → 2 → 3 columns) cards with 16:9 thumbnails, episode number, guest name, and a thought-provoking quote.
- **Video player** — theater-mode modal: large 16:9 stage, title, view count, faux transport bar, and clickable chapters/timestamps.
- **Footer** — newsletter signup, social links, and copyright.

The cinematic thumbnails are generated as inline SVG data-URIs
(`src/data/placeholder.js`) so the app looks premium with **zero external
image requests**. Swap them for real thumbnails/portraits to nail the vibe.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  App.jsx                 # composes the page + player state
  main.jsx                # React entry
  index.css               # Tailwind layers + base theme
  data/
    episodes.js           # sample episodes + chapters
    placeholder.js        # cinematic SVG thumbnail generator
  components/
    Navbar.jsx
    Hero.jsx
    GuestsMarquee.jsx
    EpisodesGrid.jsx
    EpisodeCard.jsx
    VideoPlayer.jsx
    Footer.jsx
```
