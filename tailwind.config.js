/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        typewriter: 'typewriter 2s steps(18) forwards',
        caret: 'caret 1s infinite',
      },
      keyframes: {
        typewriter: {
          from: {
            width: '0',
          },
          to: {
            width: '100%',
          },
        },
        caret: {
          '50%': {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
