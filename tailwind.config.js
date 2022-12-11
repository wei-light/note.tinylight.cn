const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      light: 'rgb(var(--color-light))',
      dark: 'rgb(var(--color-dark))',
      neutral: {
        100: 'rgb(var(--neutral-color-lightest))',
        200: 'rgb(var(--neutral-color-lighter))',
        300: 'rgb(var(--neutral-color-light))',
        400: 'rgb(var(--neutral-color-midst))',
        500: 'rgb(var(--neutral-color-dark))',
        600: 'rgb(var(--neutral-color-darker))',
        700: 'rgb(var(--neutral-color-darkest))',
      },
      primary: 'rgb(var(--primary-color))',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
