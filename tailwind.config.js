module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "system-ui"],
      },
      colors: {
        green: {
          light: "rgba(32, 72, 88, 0.7)",
          dark: "#365a69",
        },
        coral: {
          light: "#f5f5f5",
          dark: "#eaeaea",
        },
        gray: {
          light: "#ccc",
          dark: "#696969",
        },
      },
      inset: {
        "1/20": "5%",
      },
      fontSize: {
        xxs: ".65rem",
        xs: ".75rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
