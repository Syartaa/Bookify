/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}", // Include components
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Include Flowbite plugin
  ],
});
