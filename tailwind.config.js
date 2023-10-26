/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue50'    : '#C1D2DB',
      'blue100'   : '#ADC3CE',
      'blue200'   : '#95ADB8',
      'blue300'   : '#648298',
      'blue350'   : '#8399A4',
      'blue400'   : '#0A3452',
      'yellow100' : '#F0F0E8',
      'salmon100' : '#EFD7C9',
      'salmon200' : '#825048',
      'black100'  : '#4C4C4C',
      'black200'  : '#252525',
      'white100'  : '#f5f5f5',
      'red100'    : '#E85555'
    },
    screens: {
      'md': {'max': '700px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '600px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

