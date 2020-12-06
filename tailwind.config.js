module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      gridTemplateRows: {
        layout: "auto 1fr 3fr 64px",
      },
      gridTemplateColumns: {
        appbar: "1fr auto auto",
        toolbar: "auto 1fr auto",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}