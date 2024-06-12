/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      textdrk: "#EEEEEE",
      primarydrk: "#222831",
      secondarydrk: "#595959",
      accentdrk: "#76ABAE",
      highlightdrk: "#EEEEEE",
      transparentdrk: "#eeeeee2e",
      imdb: "#f5c518",
    },
    fontFamily: {
      default: "Inter",
    },
    extend: {},
  },
  plugins: [],
};
