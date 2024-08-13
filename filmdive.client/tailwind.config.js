const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      textdrk: "#EEEEEE",
      base: "var(--base)",
      primary: "var(--primary)",
      callToAction: "var(--callToAction)",
      footer: "var(--footer)",
      secondaryText: "var(--secondaryText)",
      primaryText: "var(--primaryText)",
      transparentdrk: "var(--transparentdrk)",
      headerColor: "var(--headerColor)",
      imdb: "var(--imdb)",
    },
    fontFamily: {
      default: "Inter",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...colors,
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
