/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      colors: {
        background: "#f1f7fe",
        hover: "#e7f4fd",
        primary: "#0090FF",
        secondary: "#1179C7"
      }
    }
  },
  plugins: []
}
