"use client";
import { Drawer, Affix } from "@mantine/core";
import { FC } from "react";
import { IconBooks } from "@tabler/icons-react";
import { Icon } from "../navigation/Icon";
import { useRouter } from "next/navigation";

export const Details: FC<{
	details?: string;
	children: React.ReactNode;
}> = ({ details, children }) => {
	const router = useRouter();
	return (
		<section>
			<Drawer
				opened={Boolean(details)}
				onClose={() => router.push("/")}
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
			{!Boolean(details) && (
				<Affix position={{ bottom: 20, left: 20 }}>
					<button
						className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out"
						type="button"
						onClick={() => router.push("/?details=true")}
					>
						<IconBooks size={22} />
					</button>
				</Affix>
			)}
		</section>
	);
};
