/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media", // or 'media' or 'class'
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "bumblebee", "cupcake"],
  },
}

