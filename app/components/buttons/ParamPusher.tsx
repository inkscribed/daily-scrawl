"use client";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ToolTipWrapper } from "../ui/TooltipWrapper";

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

	return (
		<ToolTipWrapper label="Help">
			<button
				onClick={() => router.push(`${path}${param}`)}
				className={className}
			>
				{children}
			</button>
		</ToolTipWrapper>
	);
};
