"use client";
import { YYYYMMDD } from "@/app/lib/dayJs";
import { Scrawl } from "@prisma/client";
import { IconNotes, IconPencil } from "@tabler/icons-react";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { ToolTipWrapper } from "../ui/TooltipWrapper";
import { useState } from "react";
import { renameScrawl } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

export const ScrawlName = ({ scrawl }: { scrawl: Scrawl }) => {
	const [editable, setEditable] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const { theme } = useTheme();

	async function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value === scrawl.name) {
			setEditable(false);
			return;
		}

		setIsSaving(true);
		await renameScrawl(scrawl.id, e.target.value)
			.then(() => {
				toast.success("Scrawl name updated!", {
					style: {
						fontSize: "0.75rem",
						background: theme === "light" ? "#151414" : "#d0d0d0",
						color: theme === "light" ? "#d0d0d0" : "#151414",
					},
				});
			})
			.catch(() => {
				toast.error("Something went wrong! Please try again.", {
					style: {
						fontSize: "0.75rem",
						background: theme === "light" ? "#151414" : "#d0d0d0",
						color: theme === "light" ? "#d0d0d0" : "#151414",
					},
				});
			});

		setEditable(false);
		setIsSaving(false);
	}

	return (
		<section className="flex justify-between w-full grow">
			<div className="flex gap-2 items-center">
				<IconNotes size={20} />
				{editable ? (
					<input
						type="text"
						className="text-sm font-semibold bg-transparent"
						defaultValue={
							scrawl.name ? scrawl.name : YYYYMMDD(scrawl.completedAt)
						}
						autoFocus
						onBlur={handleNameChange}
						disabled={isSaving}
					/>
				) : (
					<p className="text-sm font-semibold">
						{scrawl.name ? scrawl.name : YYYYMMDD(scrawl.completedAt)}
					</p>
				)}
			</div>
			<ToolTipWrapper label="Edit Scrawl Name">
				<ButtonWrapper
					onClick={() => {
						setEditable(!editable);
					}}
				>
					<IconPencil size={16} />
				</ButtonWrapper>
			</ToolTipWrapper>
		</section>
	);
};
