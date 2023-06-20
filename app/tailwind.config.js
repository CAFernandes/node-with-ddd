/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'layout': 'minContent 1fr',
      }
    },
  },
  plugins: [],
}

