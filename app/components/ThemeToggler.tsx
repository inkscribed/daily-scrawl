"use client";

import { IconSunFilled, IconMoonStars, IconFlare } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggler = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="flex flex-row items-center justify-center gap-2">
				<button className="flex flex-row items-center justify-center gap-2 font-semibold px-2 py-1 ">
					<IconFlare size={20} className="text-orange-500" />
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<button
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				className="flex flex-row items-center justify-center gap-2 font-semibold px-2 py-1 "
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
