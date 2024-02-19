"use client";

import { Skeleton } from "@mantine/core";
import { IconSunFilled, IconMoonStars } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ToolTipWrapper } from "./ui/TooltipWrapper";

export const ThemeToggler = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="flex flex-row items-center justify-center gap-2">
				<button className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out">
					<Skeleton width={22} height={22} animate />
				</button>
			</div>
		);
	}

	return (
		<ToolTipWrapper label={`Toggle ${theme === "light" ? "dark" : "light"}`}>
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
		</ToolTipWrapper>
	);
};
