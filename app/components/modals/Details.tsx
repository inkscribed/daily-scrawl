"use client";
import { Drawer } from "@mantine/core";
import { FC, useEffect } from "react";
import { Icon } from "../navigation/Icon";
import { usePathname, useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { IconBooks } from "@tabler/icons-react";
import { Affix } from "@mantine/core";

export const Details: FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const path = usePathname();
	const fullPath = useRouter();

	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		close();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [path]);

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
					inner: "!p-2",
					header: "dark:!bg-hoverDark !bg-hoverLight",
					content: "dark:!bg-hoverDark !bg-hoverLight !rounded-md",
					close:
						"hover:dark:!bg-background !hover:bg-text !text-background dark:!text-text",
				}}
			>
				{children}
			</Drawer>
			<Affix position={{ bottom: 20, left: 20 }} zIndex={1}>
				<button
					className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark dark:bg-background bg-text duration-300 transition-all ease-in-out"
					type="button"
					onClick={open}
				>
					<IconBooks size={22} />
				</button>
			</Affix>
		</>
	);
};
