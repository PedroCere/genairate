/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06B6D4",
        accent: "#C084FC",
        background: "#1E293B",
        text: "#FFFFFF",
        secondary: "#94A3B8",
      },
    },
  },
  plugins: [],
}
