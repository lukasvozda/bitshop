/** @type {import('tailwindcss').Config} */
import DaisyUI from "daisyui";
import Form from "@tailwindcss/forms";

module.exports = {
  plugins: [
    Form, DaisyUI
  ],
  content: ['./src/**/*.{svelte,js,ts}'],
}
