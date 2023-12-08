/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.vue", // Include Vue files for components and views
    "./src/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-import"),
          require("tailwindcss"),
          require("autoprefixer"),
        ],
      },
    },
  },
};
