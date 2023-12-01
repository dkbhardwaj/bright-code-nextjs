/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "xl-up": { min: "1280px" },
        // => @media (min-width: 1280px) { ... }

        "c-up": { min: "1205x" },
        // => @media (min-width: 1280px) { ... }  container up

        "c-down": { min: "1205x" },
        // => @media (max-width: 1280px) { ... } container down

        desktop: { min: "992px", max: "1279px" },
        // => @media (min-width: 992px and max-width: 1279px) { ... }

        lg: { max: "991px" },
        // => @media (max-width: 991px) { ... }

        "lg-up": { min: "992px" },
        // => @media (min-width: 1280px) { ... }

        tablet: { min: "768px", max: "991px" },
        // => @media (min-width: 768px and max-width: 991px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        "md-up": { min: "768px" },
        // => @media (min-width: 768px) { ... }

        phablet: { min: "596px", max: "767px" },
        // => @media (min-width: 596px and max-width: 767px) { ... }

        sm: { max: "595px" },
        // => @media (max-width: 595px) { ... }

        "sm-up": { min: "596px" },
        // => @media (min-width: 596px) { ... }

        xs: { max: "480px" },
        // => @media (max-width: 480px) { ... }
      },
      width: {
        mainContent: "calc(100% + 550px)",
        threeCardWrap: "calc(100% + 20px)",
        mainRow: "calc(100% + 20px)",
        threeCard: "calc(33.33% - 20px)",
        colFour: "calc(25% - 20px)",
        halfWidth: "calc(50% - 20px)",
        "one&half": "145%",
      },
      colors: {
        black: "#000",
        blue: "#0164d3",
        // brown: "#946c48",
        spaceBlack: "#263238",
        // darkBlue: "#00124D",
        darkGray: "#3e4555",
        lightGray: "#f4f8fa",
        gray: "#8d97ad",
        // oceanGreen: "#79F7C6",
        opalGreen: "#a3cac7",
        orange: "#ff6a5b",
        peach: "#fdbfa8",
        pink: "#ff4d7e",
        purple: "#607df9",
        skyblue: "#2c73cb",
        white: "#fff",
        // yello: "#FFCA36",
      },
    },
  },
  plugins: [],
};
