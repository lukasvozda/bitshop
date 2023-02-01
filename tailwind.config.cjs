const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {}
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ],
  daisyui: {
    themes: ["light"]
  }
};

module.exports = config;
