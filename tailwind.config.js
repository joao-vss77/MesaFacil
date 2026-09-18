/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage:   { DEFAULT: '#dfe0cf', deep: '#cfd1bc', line: '#c3c5ae' },
        cream:  { DEFAULT: '#f6f4ec', soft: '#faf8f2' },
        ink:    { DEFAULT: '#2f3227', soft: '#575b4a', muted: '#8b8f7d' },
        line:   '#d8d6c6',
        danger: '#a64b3a',
        ok:     '#5b7256',
      },
      fontFamily: {
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: { widest2: '.24em', ultra: '.32em' },
      boxShadow: {
        panel: '-30px 0 80px rgba(47,50,39,.08)',
        lift:  '0 12px 28px rgba(47,50,39,.12)',
      },
      keyframes: {
        fade: { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'none' } },
        pop:  { '0%': { opacity: 0, transform: 'scale(.96)' },      '100%': { opacity: 1, transform: 'none' } },
        up:   { '0%': { opacity: 0, transform: 'translate(-50%,16px)' }, '100%': { opacity: 1, transform: 'translate(-50%,0)' } },
      },
      animation: { fade: 'fade .3s ease', pop: 'pop .25s ease', up: 'up .3s ease' },
    },
  },
  plugins: [],
};
