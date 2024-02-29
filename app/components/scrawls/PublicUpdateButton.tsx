"use client";
import { FC, useState } from "react";
import { IconShare, IconShareOff } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { togglePublic } from "@/app/lib/actions";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

export const PublicUpdateButton: FC<{
	isPublic: boolean;
	scrawlId: string;
	userId: string;
}> = ({ isPublic, scrawlId, userId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { theme } = useTheme();

	const handleTogglePublic = async () => {
		setIsLoading(true);
		await togglePublic(scrawlId, userId, isPublic)
			.then(() => {
				toast.success(`Scrawl is now ${isPublic ? "private" : "public"}`, {
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
		setIsLoading(false);
	};

	return (
		<Tooltip
			position="bottom"
			label={isPublic ? "Make private" : "Make public"}
			withArrow
			classNames={{
				tooltip:
					"bg-background dark:bg-text text-text dark:text-background font-semibold",
			}}
		>
			<button
				onClick={handleTogglePublic}
				disabled={isLoading}
				className={`p-1.5 rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out`}
			>
				{isPublic ? (
					<IconShare
						aria-disabled={isLoading}
						size={16}
						className="dark:text-sky-600 text-blue-600 disabled:text-gray-400"
					/>
				) : (
					<IconShareOff
						aria-disabled={isLoading}
						size={16}
						className="dark:text-yellow-600 text-yellow-600 disabled:text-gray-400"
					/>
				)}
			</button>
		</Tooltip>
	);
};
