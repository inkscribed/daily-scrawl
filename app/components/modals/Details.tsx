"use client";
import { Drawer, Affix, Alert } from "@mantine/core";
import { FC } from "react";
import { IconBooks, IconInfoCircle } from "@tabler/icons-react";
import { Icon } from "../navigation/Icon";
import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export const Details: FC<{
	details?: string;
	children: React.ReactNode;
}> = ({ details, children }) => {
	const { theme, setTheme } = useTheme();

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
				<SignedOut>
					<Alert
						variant="light"
						color={theme === "dark" ? "violet" : "dark"}
						title="You are not signed in!"
						icon={<IconInfoCircle />}
						classNames={{
							message: "!flex flex-col gap-4",
						}}
					>
						<p className="text-background dark:text-text">
							Please sign in to access these features.
							<br />
							You will be able to view your past writings and track your
							consistency as well as export your writings.
						</p>
						<div className="ml-auto">
							<SignInButton>
								<button className="ml-auto text-sm hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text duration-300 transition-all ease-in-out rounded px-3 py-1">
									Sign in
								</button>
							</SignInButton>
						</div>
					</Alert>
				</SignedOut>
				<SignedIn>{children}</SignedIn>
			</Drawer>
			{!Boolean(details) && (
				<Affix position={{ bottom: 20, left: 20 }}>
					<button
						className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out"
						type="button"
						onClick={() => router.push("/?details=true")}
					>
						<IconBooks size={24} />
					</button>
				</Affix>
			)}
		</section>
	);
};
