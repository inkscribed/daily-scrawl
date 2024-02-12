"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";

export const CloseModalButton: FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	const router = useRouter();

	function close() {
		localStorage.setItem("notification-accepted", "true");
		router.push("/");
	}

	return (
		<button className="bg-white rounded-sm" onClick={close}>
			{children}
		</button>
	);
};
