// require("@tailwindcss/forms");
// import DaisyUI from "daisyui";

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    themes: ["light"]
  }
};

module.exports = config;
