/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Vibrant indigo for buttons and highlights
        secondary: "#10B981", // Green for accents
      },
    },
  },
  darkMode: "class", // Enable dark mode with 'class' strategy
  plugins: [],
};
