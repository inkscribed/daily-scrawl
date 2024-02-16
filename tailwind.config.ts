import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				background: "#151414",
				text: "#d0d0d0",
				border: "#222222",
				hr: "#b0b0b0",
				hrDark: "#2f2f2f",
				lightBorder: "#b0b0b0",
				hoverDark: "#1f1f1f",
				hoverLight: "#e0e0e0",
			},
		},
	},
	plugins: [],
};
export default config;
