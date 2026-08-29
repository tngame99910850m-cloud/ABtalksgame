// Generates a cinematic 16:9 SVG placeholder as a data-URI.
// Deep, moody gradients + a soft portrait silhouette + film grain,
// so the app looks premium with zero external image requests.
// Replace the returned `src` with real ABtalks thumbnails to nail the vibe.

const palettes = [
  ['#1a1a1a', '#000000', '#3a0a0d'],
  ['#0d0d0d', '#000000', '#241012'],
  ['#111111', '#050505', '#2b0b0e'],
  ['#151515', '#000000', '#1a0a0b'],
  ['#0a0a0a', '#000000', '#33070c'],
  ['#141414', '#060606', '#20090c'],
]

export function cinematicThumb(seed = 0, label = '') {
  const [a, b, c] = palettes[seed % palettes.length]
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <radialGradient id="g" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="55%" stop-color="${b}"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <rect width="1280" height="720" fill="url(#g)"/>
  <rect width="1280" height="720" fill="url(#rim)"/>
  <!-- soft portrait silhouette -->
  <g filter="url(#soft)" opacity="0.9">
    <ellipse cx="640" cy="300" rx="115" ry="140" fill="#000000"/>
    <path d="M640 430 C 470 430 400 560 390 720 L 890 720 C 880 560 810 430 640 430 Z" fill="#000000"/>
  </g>
  <!-- key light rim -->
  <path d="M760 210 C 810 260 820 360 780 440" stroke="${c}" stroke-width="6" fill="none" opacity="0.5"/>
  <rect width="1280" height="720" fill="#000000" opacity="0.12"/>
  <text x="60" y="660" font-family="Helvetica, Arial, sans-serif" font-size="26"
        letter-spacing="6" fill="#ffffff" opacity="0.14">${label}</text>
</svg>`.trim()

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
