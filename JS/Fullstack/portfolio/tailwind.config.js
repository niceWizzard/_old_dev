import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00ADB5"
        },
        background: "#EEEEEE",
        secondary: "#393E46",
        surface : "#1E1E1E",
        on: {
          surface : "#EEEEEE",
          background: {
            DEFAULT: "#393E46",
            pop: "#00ADB5",
          },
          secondary: {
            DEFAULT: "#393E46",
            pop: "#00ADB5",
          },
          primary : "EEEEEE"
        }
      }
    },
    
  },
  plugins: [
    forms
  ],
}

