/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors');
module.exports = {
  content: [],
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      width: {
        '74px': '74px'
      },
      screens: {
        miniplayer: '830px'
      }
    }
  },
  plugins: []
};
