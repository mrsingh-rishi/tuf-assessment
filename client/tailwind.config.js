/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#bb86fc",
        secondary: "#03dac6",
        "background-default": "#121212",
        "background-paper": "#1e1e1e",
        "text-primary": "#e0e0e0",
        "text-secondary": "#b0b0b0",
      },
      spacing: {
        drawer: "240px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
