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
      },
      colors: {
        gray: '#8D929A',
        gray1: '#8C9199',
        gray2: '#333'
      },
      fontSize: {
        '0': '0',
        convert: '62.5%',
        'xxs': ['0.6875rem', {       // 11px
            lineHeight: '0.8125rem',
        }],
        'ssm': ['0.75rem', {
            lineHeight: '0.75rem',
        }],
        'tiny': ['0.8125rem', {
            lineHeight: '0.75rem',
        }],
        'mmd': ['0.9375rem', {
          lineHeight: '1.1875rem',
      }]
      }
    },
  },
  plugins: [],
}

