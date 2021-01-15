module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        full: "100%",
      },
      gridTemplateRows: {
        // Simple 10 row grid
        10: "repeat(10, minmax(0, 1fr))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
