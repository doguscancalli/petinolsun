// const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // colors,
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        background: '#F4F3EF',
        black: {
          DEFAULT: '#000000',
          900: '#181817',
          800: '#313030',
          700: '#484847',
          600: '#61615F',
          500: '#797977',
          400: '#939290',
          300: '#ABAAA7',
          200: '#C3C3BF',
          100: '#DBDAD7',
          50: '#E8E7E3',
        },
        white: {
          DEFAULT: '#FFFFFF',
          800: '#FDFCFC',
          600: '#FAFAF8',
        },
        red: {
          DEFAULT: '#FF2771',
          600: '#FA78A2',
          400: '#F9A1BD',
          200: '#F6CAD5',
        },
        green: {
          DEFAULT: '#49EF8C',
          600: '#8CF0B3',
          400: '#B0F2C8',
          200: '#D1F3DB',
        },
        yellow: {
          DEFAULT: '#F5F175',
          600: '#F4F1A5',
          400: '#F5F2BF',
          200: '#F4F3D6',
        },
      },
    },
  },
  plugins: [],
}
