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

        // Used as supplementary colours for different
        // degrees of text emphasis
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

        // Update this section with your branding colours
        brand: {
          // Accent: the brand colour used to highlight elements, for example the background colour on the signin button
          // Accent highlight: A colour similar to accent, used as the hover effect for buttons
          // Dark: gray-900 by default. This will be used for text on a light background, and will be the dark background
          // Light: White by default. This will be used for text on a dark background, and will be the light background

          // IMPORTANT: "accent" is duplicated in the email template,
          // See the variable brandColor in helpers/next-auth-helpers.js
          // If you update it here, be sure to update it there too
          accent: "#6C4DF6",
          "accent-highlight": "#5B41CF",

          dark: "#1E2124",
          light: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
