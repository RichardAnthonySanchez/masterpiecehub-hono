/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/static/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
    themes: ["light"],
  },
};
