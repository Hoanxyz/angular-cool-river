/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts, scss}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%',
        '1400': '1400px',
      }
    },
  },
  plugins: [],
}

