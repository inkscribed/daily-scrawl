"use client";
import { FC, ReactNode } from "react";
import { Scrawl } from "@prisma/client";
// import { exportScrawlAsPDF } from "@/app/lib/actions";
import { jsPDF } from "jspdf";
import { YYYYMMDD } from "@/app/lib/dayJs";

export const DownloadPDFButton: FC<{
	children: ReactNode;
	scrawl: Scrawl;
}> = ({ children, scrawl }) => {
	function downloadScrawl() {
		const doc = new jsPDF();

		// @ts-ignore
		const parseAndRenderHtml = (html, x, y) => {
			let cursorY = y;

			const lines = html
				.split(/<\/?p>/i)
				.filter((line: string) => line.trim() !== "");

			lines.forEach((line: string) => {
				let isBold = false;
				let isItalic = false;

				// Splitting by <br>, <b>, <i>, their closing tags, or combinations thereof
				const parts = line
					.split(/(<br>|<\/?b>|<\/?i>)/i)
					.filter((part) => part.trim() !== "");

				parts.forEach((part) => {
					if (part.toLowerCase() === "<br>") {
						cursorY += 10; // Move down for a line break
					} else if (part.toLowerCase() === "<b>") {
						isBold = true;
					} else if (part.toLowerCase() === "</b>") {
						isBold = false;
					} else if (part.toLowerCase() === "<i>") {
						isItalic = true;
					} else if (part.toLowerCase() === "</i>") {
						isItalic = false;
					} else {
						doc.setFont(
							// @ts-ignore
							undefined,
							isBold ? "bold" : isItalic ? "italic" : "normal"
						);
						doc.text(part, x, cursorY);
						cursorY += 7; // Adjust line spacing as needed
					}
				});

				cursorY += 10; // Space between paragraphs
			});
		};

		parseAndRenderHtml(scrawl.content, 10, 10);
		doc.save(`${YYYYMMDD(scrawl.completedAt)}.pdf`);
	}

	return (
		<button
			onClick={downloadScrawl}
			className={`p-1.5 rounded-md bg-primary-500 text-background dark:text-text dark:hover:bg-black transition-all ease-in-out duration-300 hover:bg-hoverLight `}
		>
			{children}
		</button>
	);
};
