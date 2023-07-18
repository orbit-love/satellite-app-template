/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        black: "#1E2124",
        white: "#FFFFFF",

        gray: {
          50: "#F8F9FB",
          100: "#F1F2F3",
          150: "#E2E4E7",
          200: "#D3D6DA",
          300: "#BABFC5",
          400: "#9BA3AB",
          500: "#68727D",
          600: "#4F565F",
          700: "#3A4045",
          800: "#2C3035",
          900: "#1E2124",
        },

        purple: {
          100: "#EBE7FE",
          200: "#BFB1FB",
          300: "#9F8AF9",
          400: "#8369F7",
          500: "#6C4DF6",
          600: "#5B41CF",
          700: "#4A35A8",
          800: "#392982",
          900: "#281D5C",
        },
      },
    },
  },
  plugins: [],
};
