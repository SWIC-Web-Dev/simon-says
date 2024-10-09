import tailwindcssMotion from "tailwindcss-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssMotion],
};
