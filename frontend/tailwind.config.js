/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lexend': ['var(--font-lexend)', 'Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
};