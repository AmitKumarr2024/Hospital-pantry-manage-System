/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Ensures the HTML file is included
    "./src/**/*.{js,ts,jsx,tsx}",  // This includes all .js, .ts, .jsx, and .tsx files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}