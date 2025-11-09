/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/static/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
