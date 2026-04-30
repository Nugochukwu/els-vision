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
        sans: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        obsidian: '#0A0A0A',
        charcoal: '#111111',
        graphite: '#1A1A1A',
        pearl: '#F5F0E8',
        gold: '#D4AF37',
        'gold-light': '#E8D175',
        'gold-dark': '#A88B1E',
        mist: '#8A8580',
        border: 'rgba(212,175,55,0.15)',
      },
    },
  },
  plugins: [],
}
