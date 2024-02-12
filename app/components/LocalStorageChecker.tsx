"use client";
import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
export const LocalStorageChecker: FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		const notification =
			localStorage.getItem("notification-accepted") ||
			localStorage.setItem("notification-accepted", "false");

		if (notification === "false") {
			router.push("/?show=true&step=1");
		}
	}, [router]);

	return <>{children}</>;
};
