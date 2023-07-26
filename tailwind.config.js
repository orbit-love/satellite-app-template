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

        // Used very rarely (ie placeholder text) when typical brand colours are unsuitable
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
          // IMPORTANT: "accent" is duplicated in the email template,
          // See the variable brandColor in helpers/next-auth-helpers.js
          // If you update it here, be sure to update it there too

          // Accent:           the brand colour used to highlight elements, for example the background colour on the signin button
          // Accent highlight: A colour similar to accent, used as the hover effect for buttons
          accent: "#6C4DF6",
          "accent-highlight": "#5B41CF",

          // Dark:           gray-900 by default. This will be used for text on a light background, and will be the dark background
          // Dark highlight: gray-700 by default. Used for secondary text on light pages to add depth to page
          dark: "#1E2124",
          "dark-highlight": "#3A4045",

          // Light:           White by default. This will be used for text on a dark background, and will be the light background
          // Light highlight: gray-200 by default. Used for secondary text on dark pages to add depth to page
          light: "#FFFFFF",
          "light-highlight": "#D3D6DA",
        },
      },
    },
  },
  plugins: [],
};
