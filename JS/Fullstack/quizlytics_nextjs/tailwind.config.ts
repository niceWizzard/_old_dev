import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  jit: true,
  theme: {
    extend: {
      colors: {
        onBg: {
          DEFAULT: "#1A1A1A",
          dark: "#0A0A0A",
          lt: "#2c2c2c",
          ltr: "#DFDFDF",
        },
        onPrimary: {
          DEFAULT: "#FCFCFC",
        },
        primary: {
          DEFAULT: "#7B2CBF",
          dark: "#5A189A",
          lt: "#9D4EDD",
          ltr: "#E0AAFF",
        },
        neutral: {
          DEFAULT: "#FCFCFC",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
};
export default config;
