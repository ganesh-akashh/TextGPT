module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "dark": "#333333",
        "secondary": "#00afef"
      },
      screens: {
        mmd: "860px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "fade-in":{
          "0%":{
            opacity:0,
          },
          "100%":{
            opacity:1
          }
        },
      },
      animation: {
        "slide-in": "slide-in .3s ease-out",
        "fade-in":"fade-in .3s ease-out",
      },
    },
  },
  plugins: [
     require('tailwindcss-animated')
  ],
}