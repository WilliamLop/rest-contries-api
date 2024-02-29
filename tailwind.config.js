/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "hsl(209, 23%, 22%)",
        veryDark: " hsl(207, 26%, 17%)",
        darkGray: "hsl(0, 0%, 52%)",
        veryLight: "hsl(0, 0%, 98%)"
      }
    },
  },
  plugins: [],
};
