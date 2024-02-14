"use client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Affix } from "@mantine/core";
import { FC } from "react";
import { IconBooks } from "@tabler/icons-react";
import { Icon } from "../navigation/Icon";

export const Details: FC<{}> = ({}) => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				title={
					<ul className="flex items-center gap-4">
						<Icon />
						<h1 className="font-semibold text-lg">Daily Scrawl</h1>
					</ul>
				}
				transitionProps={{
					transition: "slide-right",
					duration: 200,
					timingFunction: "linear",
				}}
				overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				classNames={{
					body: "!rounded",
					header: "dark:!bg-hoverDark !bg-hoverLight",
					content: "dark:!bg-hoverDark !bg-hoverLight",
				}}
			>
				hi
			</Drawer>
			{!opened && (
				<Affix position={{ bottom: 20, left: 20 }}>
					<button
						className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out"
						type="button"
						onClick={open}
					>
						<IconBooks size={24} />
					</button>
				</Affix>
			)}
		</>
	);
};