/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Signature AB stark red
        ab: {
          red: '#e50914',
          'red-dim': '#b00610',
        },
        ink: {
          950: '#000000',
          900: '#0a0a0a',
          850: '#111111',
          800: '#161616',
          700: '#1c1c1c',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1.2s ease both',
        'slow-zoom': 'slow-zoom 20s ease-out both',
      },
    },
  },
  plugins: [],
}
