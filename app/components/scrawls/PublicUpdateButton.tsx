"use client";
import { FC } from "react";
import { IconShare, IconShareOff } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { togglePublic } from "@/app/lib/actions";

export const PublicUpdateButton: FC<{
	isPublic: boolean;
	scrawlId: string;
	userId: string;
}> = ({ isPublic, scrawlId, userId }) => {
	const handleTogglePublic = () => {
		togglePublic(scrawlId, userId, isPublic);
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
				className={`p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out`}
			>
				{isPublic ? (
					<IconShare size={18} className="dark:text-sky-600 text-blue-600" />
				) : (
					<IconShareOff
						size={18}
						className="dark:text-yellow-600 text-yellow-600"
					/>
				)}
			</button>
		</Tooltip>
	);
};
