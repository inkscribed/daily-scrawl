"use client";
import { IconSun } from "@tabler/icons-react";
import { useEffect } from "react";

export const ThemeToggler = () => {
	useEffect(() => {
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
			.matches
			? "dark"
			: "light";

		const savedTheme = localStorage?.getItem("theme");

		if (savedTheme) {
			document.documentElement.classList.add(savedTheme);
		} else {
			document.documentElement.classList.add(systemTheme);
		}
	}, []);

	const toggleTheme = () => {
		const dark = document.documentElement.classList.toggle(`dark`);

		if (dark) {
			localStorage?.setItem("theme", "dark");
		} else {
			localStorage?.setItem("theme", "light");
		}
	};

	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<button
				onClick={toggleTheme}
				className="flex flex-row items-center justify-center gap-2 font-semibold border-border rounded-md px-4 py-2"
			>
				<IconSun size={20} />
			</button>
		</div>
	);
};
