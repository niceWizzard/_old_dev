/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue",
      "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
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
      },
    },
    plugins: [],
  }
  
  