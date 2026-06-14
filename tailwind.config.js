/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1b1b1d",
        ink2: "#222225",
        ink3: "#2a2a2e",
        paper: "#ECECEC",
        terra: "#C4502D",
        terra2: "#D9663F",
        navy: "#13203a",
        muted: "#8d8d92",
        faint: "#56565c",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
