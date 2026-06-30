/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/@kindryl/tinka-ui/fesm2022/*.mjs',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {
      fontFamily: {
        display: ['Yolo Text', 'Aller Display', 'Arial', 'sans-serif'],
        body: ['Duplet', 'Aller', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
