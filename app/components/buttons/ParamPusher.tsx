"use client";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

export const ParamPusher = ({
	children,
	param,
	className,
}: {
	children: ReactNode;
	param: string;
	className: string;
}) => {
	const router = useRouter();
	const path = usePathname();

	console.log(path);

	return (
		<button
			onClick={() => router.push(`${path}/${param}`)}
			className={className}
		>
			{children}
		</button>
	);
};
