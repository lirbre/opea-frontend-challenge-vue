/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/**/*.{vue,ts}', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        'white-brand': '#f7f7f7',
        'gray-brand': '#959799',
        'gray-text': 'rgba(0, 0, 0, 0.3)',
        'gray-input': '#DDDDDD',
        'gray-button': '#C7C9CC',
        'wine-brand': '#630A37',
        'gray-helper': '#797979',
        'gray-font': '#616161'
      },
      borderRadius: {
        opea: '4px'
      }
    }
  },
  plugins: [require('daisyui')]
}
