/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/index.html', './src/**/*.html', './src/**/*.ts'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        primaryHover: 'var(--primary-hover-color)',
      },
    },
  },
  plugins: [],
};
