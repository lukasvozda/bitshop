/** @type {import('tailwindcss').Config} */
import DaisyUI from "daisyui";
import Form from "@tailwindcss/forms";

module.exports = {
  plugins: [
    Form
  ],
  content: ['./src/**/*.{svelte,js,ts}'],
}
