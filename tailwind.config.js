/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts, scss}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      oswald: ['Oswald', 'sans-serif']
    },
    fontSize: {
      '1.5xl': ['22px', { lineHeight: '28px' }],
      '2xl': ['32px', { lineHeight: '34px' }],
      '4.5xl': ['42px', { lineHeight: '34px' }],
      'ssm': ['15px', { lineHeight: '17px' }],
      'sm': ['14px', { lineHeight: '20px' }],
      'tiny': ['0.8125rem', { lineHeight: '0.75rem',}],
      'lg': ['18px', { lineHeight: '28px' }],
      'xxs': ['11px', { lineHeight: '18px' }],
    },
    extend: {
      maxWidth: {
        '1/2': '50%',
        '1400': '1400px',
        '1240': '1240px'
      },
      colors: {
        primary: {
          DEFAULT:  '#8AD038',
          hover: '#71B521'
        },
        secondary: {
          DEFAULT: '#3EB2FB',
          hover: '#159BEF'
        },
        light: {
          DEFAULT: '#FFFFFF',
          border: '#DDDDDD',
          hover: '#DDDDDD'
        },
        warning: {
          bg: '#FFB740',
          content: '#FFFFFF'
        },
        error: {
          bg: '#FF4949',
          content: '#FFFFFF'
        },
        info: {
          bg: '#00C853',
          content: '#FFFFFF'
        },
        success: {
          bg: '#00C853',
          content: '#FFFFFF'
        },
        link: {
          DEFAULT: '#000000',
          hover: '#000000'
        },
        border: {
          primary: '#8AD038',
          light: '#DDDDDD',
        },
        grey: {
          100: '#CCCCCC',
          200: '#8D929A',
          300: '#EEEEEE',
          400: '#8C9199',
          500: '#E4E4E4',
          600: '#DDDDDD',
          700: '#4A4A4A',
          800: '#222222',
          900: '#333333',
        },
        button: {
          background: '#45B3F8'
        }
      },
      lineHeight: {
        '0': '0',
        '3.25': '13px',
        '4.25': '17px',
        '4.5': '18px',
        '5.5': '22px',
        '8.5': '34px',
      },
      content: {
        empty: '""'
      },
      letterSpacing: {
        xsSpacing: '0.5px'
      }
    },
  },
  plugins: [],
}
