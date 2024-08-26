/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    styled: false,
  },
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        "brand": {
          DEFAULT: "#C3073F",
          "secondary": "#6F2232",
        },
        white: "#F1F1F1",
        "surface": "#1A1A1D",

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
}
