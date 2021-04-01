module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          light: "rgba(32, 72, 88, 0.7)",
          dark: "#365a69",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
