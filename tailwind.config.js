/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Mont:["Mont"]
      },
      colors:{
        appblack:{
          500:"#1C1F22",
          600:"#282828",
          700:"#575757",
          800:"#F3F3F3",
          900:'#F8F8F8'

        },
        appblue:{
          500:"#004697"
        }
      }
    },
  },
  plugins: [],
}

