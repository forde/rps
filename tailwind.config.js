module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      small: "375px",
      medium: "768px",
      large: "1160px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
