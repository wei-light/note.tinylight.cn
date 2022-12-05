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
        100: 'var(--neutral-color-lightest)',
        200: 'var(--neutral-color-lighter)',
        300: 'var(--neutral-color-light)',
        400: 'var(--neutral-color-midst)',
        500: 'var(--neutral-color-heavy)',
        600: 'var(--neutral-color-heavier)',
        700: 'var(--neutral-color-heaviest)',
      },
      primary: 'var(--primary-color)',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
