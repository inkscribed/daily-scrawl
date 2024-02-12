"use client";

import { IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export const ThemeToggler = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<button
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				className="flex flex-row items-center justify-center gap-2 font-semibold border-border rounded-md px-2 py-1"
			>
				{theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
			</button>
		</div>
	);
};
