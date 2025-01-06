/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/app/**/*.tsx"],
  theme: {
    colors: {
      red: colors.red,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,  // remove later
      green: colors.green,
      'facebook' : '#415ca0', 
      transparent: colors.transparent
    }
  },
  plugins: [],
}

