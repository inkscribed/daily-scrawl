"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const ListWrapper = ({
	children,
	href,
}: {
	children: ReactNode;
	href: string;
}) => {
	const pathname = usePathname();
	return (
		<li
			className={`flex gap-1 justify-between hover:bg-text dark:hover:bg-background dark:text-textDark text-background duration-300 transition-all ease-in-out rounded-md px-3 py-1 ${
				pathname === href
					? "bg-text dark:bg-background dark:text-textDark text-background"
					: ""
			}`}
		>
			{children}
		</li>
	);
};
