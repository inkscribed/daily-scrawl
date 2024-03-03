"use client";
import { Drawer } from "@mantine/core";
import { FC } from "react";
import { Icon } from "../navigation/Icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconCopyright,
	IconMail,
} from "@tabler/icons-react";
import Link from "next/link";

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
					"hover:dark:!bg-background !hover:bg-text !text-background dark:!text-textDark",
			}}
		>
			{children}
			<section className="flex items-center justify-between mt-auto absolute bottom-3 px-4 w-full right-0 left-0">
				<div className="flex gap-3 items-center">
					<Link href="https://github.com/BaraKona" target="_blank">
						<IconBrandGithub size={20} />
					</Link>
					<Link href="https://www.linkedin.com/in/bara-kona/" target="_blank">
						<IconBrandLinkedin size={20} />
					</Link>
					<a href="mailto:bkonateh1@gmail.com" target="_blank">
						<IconMail size={20} />
					</a>
					<Link href="https://instagram.com/barakona00" target="_blank">
						<IconBrandInstagram size={20} />
					</Link>
				</div>
				<div className="justify-center flex gap-2 text-xs text-background/30 dark:text-text/30">
					<IconCopyright
						size={16}
						className="text-background/30 dark:text-text/30"
					/>
					{new Date().getFullYear()} DailyScrawl
				</div>
			</section>
		</Drawer>
	);
};
