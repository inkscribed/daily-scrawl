"use client";
import { FC, ReactNode } from "react";
import { Scrawl } from "@prisma/client";
// import { exportScrawlAsPDF } from "@/app/lib/actions";
import { jsPDF } from "jspdf";
import { YYYYMMDD } from "@/app/lib/dayJs";
import { ToolTipWrapper } from "../ui/TooltipWrapper";

export const DownloadPDFButton: FC<{
	children: ReactNode;
	scrawl: Scrawl;
}> = ({ children, scrawl }) => {
	function downloadScrawl() {
		const doc = new jsPDF();
		const parseAndRenderHtml = (
			html: string,
			x: number,
			startY: number
		): void => {
			let cursorY: number = startY;
			const pageWidth: number = doc.internal.pageSize.width;
			const maxWidth: number = pageWidth - x * 2; // Calculate max width of text

			const renderTextWithStyles = (
				text: string,
				x: number,
				y: number,
				isBold: boolean,
				isItalic: boolean,
				isUnderline: boolean
			) => {
				doc.setFont(
					"helvetica",
					isBold ? "bold" : isItalic ? "italic" : "normal"
				);
				const lines = doc.splitTextToSize(text, maxWidth);
				lines.forEach((line: string, index: number) => {
					doc.text(line, x, y + index * 7);
					if (isUnderline) {
						const lineWidth = doc.getTextWidth(line);
						doc.line(x, y + 2 + index * 7, x + lineWidth, y + 2 + index * 7); // Draw underline
					}
				});
				return lines.length * 7; // Return the height of the rendered text
			};

			// Extract content blocks and styles
			const regex = /<\/?([a-z1-6]+)>/gi; // Matches opening and closing tags
			let currentPos = 0;
			let match;

			while ((match = regex.exec(html)) !== null) {
				const tag = match[1].toLowerCase();
				let content = html.substring(currentPos, match.index).trim();
				if (content) {
					// Process and render the content before the tag
					cursorY +=
						renderTextWithStyles(content, x, cursorY, false, false, false) + 3; // Adjust spacing
				}

				// Adjust styling based on the current tag
				switch (tag) {
					case "h1":
						doc.setFontSize(22);
						break;
					case "h2":
						doc.setFontSize(20);
						break;
					case "h3":
						doc.setFontSize(18);
						break;
					case "h4":
						doc.setFontSize(16);
						break;
					case "p":
						doc.setFontSize(10);
						break;
					case "b":
						doc.setFont("bold");
						break;
					case "i":
						doc.setFont("italic");
						break;
					case "u":
						break;
					default:
						break;
				}

				currentPos = regex.lastIndex;
			}

			// Render any remaining content after the last tag
			let remainingContent = html.substring(currentPos).trim();
			if (remainingContent) {
				cursorY +=
					renderTextWithStyles(
						remainingContent,
						x,
						cursorY,
						false,
						false,
						false
					) + 10; // Adjust spacing
			}
		};
		parseAndRenderHtml(scrawl.content, 10, 10);
		doc.save(`${YYYYMMDD(scrawl.completedAt)}.pdf`);
	}

	return (
		<ToolTipWrapper label="Download">
			<button
				onClick={downloadScrawl}
				className={`p-1.5 rounded-md bg-primary-500 text-background dark:text-textDark dark:hover:bg-black transition-all ease-in-out duration-300 hover:bg-hoverLight `}
			>
				{children}
			</button>
		</ToolTipWrapper>
	);
};
