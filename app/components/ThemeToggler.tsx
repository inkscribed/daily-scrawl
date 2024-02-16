"use client";

import { Skeleton } from "@mantine/core";
import { IconSunFilled, IconMoonStars } from "@tabler/icons-react";
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
					<Skeleton width={22} height={22} animate />
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<button
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out"
			>
				{theme === "dark" ? (
					<IconMoonStars size={22} className="text-sky-500" />
				) : (
					<IconSunFilled size={22} className="text-yellow-600" />
				)}
			</button>
		</div>
	);
};
