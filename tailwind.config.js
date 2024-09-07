/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/views/**/*.edge', './inertia/**/*.vue'],
  theme: {
    extend: {},
  },
  plugins: [
    '@tailwindcss/forms',
  ],
}
