/** @type {import('tailwindcss').Config} */
import Form from "@tailwindcss/forms";
import DaisyUI from "daisyui";

module.exports = {
  plugins: [Form, DaisyUI],
  content: ["./src/**/*.{svelte,js,ts}"]
};
