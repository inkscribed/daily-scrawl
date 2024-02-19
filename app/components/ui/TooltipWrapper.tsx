import { Tooltip } from "@mantine/core";
import { FC } from "react";

export const ToolTipWrapper: FC<{ label: string; children: JSX.Element }> = ({
	label,
	children,
}) => {
	return (
		<Tooltip
			position="bottom"
			label={label}
			withArrow
			classNames={{
				tooltip:
					"bg-background dark:bg-text text-text dark:text-background font-semibold",
			}}
		>
			{children}
		</Tooltip>
	);
};
