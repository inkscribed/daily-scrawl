"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";

export const CloseModalButton: FC<{
	children?: React.ReactNode;
	className?: string;
}> = ({ children, className }) => {
	const router = useRouter();

	function close() {
		localStorage.setItem("notification-accepted", "true");
		router.push("/");
	}

	return (
		<button className={`rounded ${className}`} onClick={close}>
			{children}
		</button>
	);
};
