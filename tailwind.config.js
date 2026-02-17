/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],

  theme: {
    extend: {
      fontFamily: {
        display: "inter, Roboto, sans-serif",
        // Adds a new `font-display` class
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
      },
      colors: {
        "dark-purple-1": "#F4F3F7",
        "dark-purple-2": "#E9E7EF",
        "dark-purple-3": "#DDDAE7",
        "dark-purple-4": "#D2CEDF",
        "dark-purple-5": "#C7C1D7",
        "dark-purple-6": "#BCB4CF",
        "dark-purple-7": "#A69BBF",
        "dark-purple-8": "#9B8FB7",
        "dark-purple-9": "#9083AF",
        "dark-purple-10": "#8576A7",
        "dark-purple-11": "#7A6AA0",
        "dark-purple-12": "#705F95",
        "dark-purple-13": "#675889",
        "dark-purple-14": "#5D507C",
        "dark-purple-15": "#544870",
        "dark-purple-16": "#4A4064",
        "dark-purple-17": "#413857",
        "dark-purple-18": "#37304B",
        "dark-purple-19": "#2E283E",
        "dark-purple-20": "#251F32",
        "dark-purple-21": "#252032",
        "dark-purple-22": "#131019",
        "dark-purple-23": "#09080C",
      },
      typography: (theme) => ({
        // Light mode
        DEFAULT: {
          css: {
            color: theme("colors.gray.600"), // base text
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.green.500"),
              },
            },
            h1: { color: theme("colors.gray.900") },
            h2: { color: theme("colors.gray.800") },
            h3: { color: theme("colors.gray.600") },
            strong: { color: theme("colors.gray.900") },
          },
        },
        // Dark mode
        invert: {
          css: {
            color: theme("colors.gray.400"), // base text
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.green.500"),
              },
            },
            h1: { color: theme("colors.gray.100") },
            h2: { color: theme("colors.gray.200") },
            h3: { color: theme("colors.gray.400") },
            strong: { color: theme("colors.gray.100") },
          },
        },
      }),
      keyframes: {
        highlight: {
          "0%": {
            backgroundColor: "rgb(34 197 94 / 0.5)",
            borderColor: "rgb(34 197 94 / 0.6)",
          }, // Soft Green (green-500)
          "100%": {
            backgroundColor: "transparent",
          },
        },
      },
      animation: {
        "highlight-fade": "highlight 6s ease-out forwards",
      },
    },
  },
  plugins: [
    function addUtilities({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    },
    require("@tailwindcss/typography"),
  ],
};
