"use client";
import { useState, useEffect } from "react";
import cyclopsDark from "@/public/cyclops_dark.svg";
import cyclopsLight from "@/public/cyclops_light.svg";

import Image from "next/image";

import { useTheme } from "next-themes";
import { Loader } from "@mantine/core";

export const Icon = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="h-[36px] w-10 rounded-full bg-white animate-spin" />;
	}

	return theme === "dark" ? (
		<Image src={cyclopsDark} alt="cyclops" width={40} height={40} />
	) : (
		<Image src={cyclopsLight} alt="cyclops" width={40} height={40} />
	);
};
