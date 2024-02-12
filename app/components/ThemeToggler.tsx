"use client";

import { IconSunFilled, IconMoonStars } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export const ThemeToggler = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<button
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				className="flex flex-row items-center justify-center gap-2 font-semiboldrounded-md px-2 py-1 "
			>
				{theme === "dark" ? (
					<IconMoonStars size={20} className="text-sky-500" />
				) : (
					<IconSunFilled size={20} className="text-yellow-600" />
				)}
			</button>
		</div>
	);
};
