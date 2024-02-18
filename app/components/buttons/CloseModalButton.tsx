"use client";
import React, { FC } from "react";
import { usePathname, useRouter } from "next/navigation";

export const CloseModalButton: FC<{
	children?: React.ReactNode;
	className?: string;
}> = ({ children, className }) => {
	const router = useRouter();
	const path = usePathname();

	function close() {
		localStorage.setItem("notification-accepted", "true");
		router.push(path);
	}

	return (
		<button className={`rounded ${className}`} onClick={close}>
			{children}
		</button>
	);
};
