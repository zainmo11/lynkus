import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          background: "#FFFFFF",
          secondaryBackground: "#F0F8FF",
          primaryText: "#004D4D",
          secondaryText: "#008080",
          accent: "#7FFFD4",
        },
        // Dark theme colors
        dark: {
          background: "#003333",
          secondaryBackground: "#004D4D",
          primaryText: "#F0F8FF",
          secondaryText: "#7FFFD4",
          accent: "#00CED1",
        },
        // Button theme colors
        button: {
          default: "#008080",
          hover: "#00CED1",
          error: "#EC221F",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [flowbitePlugin],
  darkMode: "class",
};
