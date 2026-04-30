/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['var(--font-outfit)',   'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        urbanist: ['var(--font-urbanist)', 'sans-serif'],
      },
      colors: {
        obsidian: '#0A0A0A',
        pearl:    '#F5F0E8',
        gold: {
          DEFAULT: '#D4AF37',
          light:   '#E8CC5A',
          dark:    '#B8960C',
          muted:   '#8B7320',
        },
        smoke:  '#1A1A1A',
        ash:    '#2A2A2A',
        muted:  '#6B6560',
        border: '#2A2520',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}
