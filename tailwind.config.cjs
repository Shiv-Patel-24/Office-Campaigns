module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px", letterSpacing: "0px" }],
        sm: ["14px", { lineHeight: "20px", letterSpacing: "0px" }],
        base: ["16px", { lineHeight: "24px", letterSpacing: "0px" }],
        lg: ["18px", { lineHeight: "28px", letterSpacing: "0px" }],
        xl: ["20px", { lineHeight: "28px", letterSpacing: "0px" }],
        "2xl": ["24px", { lineHeight: "32px", letterSpacing: "0px" }],
        "3xl": ["30px", { lineHeight: "36px", letterSpacing: "0px" }],
      },
      colors: {
        figmaBlue: {
          100: "#5B8EDC",
          300: "#8D9EB8",
          400: "#BDD2F1",
        },
        figmaWhite: {
          100: "#FFFFFF",
          200: "#F9F9F9",
          300: "#EFEEED",
          400: "#EFF4FB",
          500: "#DFDEDE",
        },
        figmaBlack: {
          100: "#000000",
        },
        figmaGray: {
          100: "#464646",
          200: "#666666",
          300: "#B6B6B6",
          400: "#8d9Eb8",
        },
        figmaRed: {
          100: "#B1271C",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
