import TailwindForms from "@tailwindcss/forms";
import DaisyUI from "daisyui";

const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {}
	},
	plugins: [DaisyUI, TailwindForms],
	daisyui: {
		themes: ["light"]
	}
};

module.exports = config;
