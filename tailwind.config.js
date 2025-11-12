/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/static/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        display: ["Almendra", "Georgia", "serif"],
        subheading: ["Comfortaa", "Arial", "sans-serif"],
        body: ["CrimsonPro", "Times New Roman", "serif"],
      },
      fontSize: {
        base: ["2.5rem", { lineHeight: "4rem" }],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#A67264",
          "base-100": "#F5E8E5",
          "base-200": "#f3e0d9",
          "base-300": "#edd3cb",
          "content-dark": "#8D5B4D",
          "base-content": "#A67264",
          "primary-content": "#F5E8E5"
        },
      },
    ],
  },
};
