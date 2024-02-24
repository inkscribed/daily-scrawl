"use client";
import { FC, ReactNode } from "react";
import { Scrawl } from "@prisma/client";
import { exportScrawlAsPDF } from "@/app/lib/actions";

export const DownloadPDFButton: FC<{
	children: ReactNode;
	scrawlId: Scrawl["id"];
}> = ({ children, scrawlId }) => {
	const handleTogglePublic = async () => {
		await exportScrawlAsPDF(scrawlId);
	};
	return (
		<button
			onClick={handleTogglePublic}
			className={`p-1.5 rounded-md bg-primary-500 text-background dark:text-text dark:hover:bg-black transition-all ease-in-out duration-300 hover:bg-hoverLight `}
		>
			{children}
		</button>
	);
};
