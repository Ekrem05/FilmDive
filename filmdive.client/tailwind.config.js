/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      textdrk: "#EEEEEE",
      bgdrk: "#1F1D36",
      secondarydrk: "#3F3351",
      accentdrk: "#864879",
      highlightdrk: "#E9A6A6",
      transparentdrk: "#eeeeee2e",
      headersdrk: "#F7DEDE",
      imdb: "#f5c518",
    },
    fontFamily: {
      default: "Inter",
    },
    extend: {},
  },
  plugins: [],
};
