"use client";
import { Drawer } from "@mantine/core";
import { FC } from "react";
import { Icon } from "../navigation/Icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Details: FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const path = usePathname();
	const details = useSearchParams().get("details");
	const router = useRouter();

	return (
		<Drawer
			opened={Boolean(details)}
			onClose={() => router.push(path)}
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
	);
};
