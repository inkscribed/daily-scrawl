"use client";
import { useState, useEffect } from "react";
import cyclopsLight from "@/public/cyclops_light.svg";
import cyclopsDark from "@/public/cyclops_dark.svg";

import Image from "next/image";

import { useTheme } from "next-themes";
import { Skeleton } from "@mantine/core";

export const Icon = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <Skeleton width={40} height={36.3} />;
	}

	return theme === "dark" ? (
		<Image src={cyclopsDark} alt="cyclops" width={40} height={36.3} />
	) : (
		<Image src={cyclopsLight} alt="cyclops" width={40} height={36.3} />
	);
};
