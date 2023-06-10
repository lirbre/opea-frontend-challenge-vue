/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/**/*.{vue,ts}', './src/**/*.{vue,ts}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')]
}
