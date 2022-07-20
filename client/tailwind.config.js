/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2172E5",
        primaryVariant: "#172941",
        secondary: "#191B1F",
      },
    },
  },
  plugins: [],
};
