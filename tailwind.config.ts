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
				textDark: "#d0d0d0",
				text: "#f1f1f1",
				border: "#222222",
				hr: "#d2d2d2",
				hrDark: "#2f2f2f",
				lightBorder: "#d2d2d2",
				hoverDark: "#1f1f1f",
				hoverLight: "#fcfcfc",
			},
		},
	},
	plugins: [],
};
export default config;
