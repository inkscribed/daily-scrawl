"use client";
import cyclopsDark from "@/public/cyclops_dark.svg";
import cyclopsLight from "@/public/cyclops_light.svg";

import Image from "next/image";

import { useTheme } from "next-themes";

export const Icon = () => {
	const { theme } = useTheme();
	return theme === "dark" ? (
		<Image src={cyclopsDark} alt="cyclops" width={40} height={40} />
	) : (
		<Image src={cyclopsLight} alt="cyclops" width={40} height={40} />
	);
};
