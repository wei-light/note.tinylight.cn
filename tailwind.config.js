const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      neutral: {
        100: 'rgb(var(--neutral-color-lightest))',
        200: 'rgb(var(--neutral-color-lighter))',
        300: 'rgb(var(--neutral-color-light))',
        400: 'rgb(var(--neutral-color-midst))',
        500: 'rgb(var(--neutral-color-heavy))',
        600: 'rgb(var(--neutral-color-heavier))',
        700: 'rgb(var(--neutral-color-heaviest))',
      },
      primary: 'rgb(var(--primary-color))',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
