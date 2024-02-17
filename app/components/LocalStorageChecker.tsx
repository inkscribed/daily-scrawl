"use client";
import React, { FC, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
export const LocalStorageChecker: FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const router = useRouter();
	const path = usePathname();

	useEffect(() => {
		const notification =
			localStorage.getItem("notification-accepted") ||
			localStorage.setItem("notification-accepted", "false");

		if (notification === "false") {
			router.push(`${path}?show=true&step=1`);
		}
	}, [router, path]);

	return <>{children}</>;
};
