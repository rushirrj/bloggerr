/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./Screens/**/*.{js,ts,jsx,tsx,html}",
    "./cards/**/*.{js,ts,jsx,tsx,html}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    extend: {
      colors:{
        "navBlue":"rgb(19,88,192)",
      },
      height: {
        'monitor': '78vh',
      }
    },
  },
  plugins: [],
}

