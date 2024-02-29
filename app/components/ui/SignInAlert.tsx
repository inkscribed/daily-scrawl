import { Alert } from "@mantine/core";
import Link from "next/link";
import { IconInfoCircle } from "@tabler/icons-react";
import { AnimatedArrowButton } from "./AnimatedArrowButton";

export const SignInAlert = () => {
	return (
		<Alert
			variant="light"
			title="You are not signed in!"
			icon={<IconInfoCircle />}
			classNames={{
				message: "!flex flex-col gap-4",
				body: "dark:!bg-background !bg-text dark:text-textDark",
				root: "dark:!bg-background !bg-text",
				wrapper: "dark:bg-background bg-text",
				label: "dark:text-textDark text-background",
				closeButton: "dark:text-textDark text-background",
				icon: "dark:text-textDark text-background",
				title: "dark:text-textDark text-background",
			}}
		>
			<p className="text-background dark:text-textDark">
				Please sign in to access these features.
				<br />
				You will be able to view your past writing and track your consistency as
				well as export to various formats.
			</p>
			<div className="ml-auto mb-2">
				<Link href="/sign-in">
					<AnimatedArrowButton className="text-sm font-semibold hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-textDark dark:text-background bg-background text-text duration-300 transition-all ease-in-out rounded px-3 py-1 flex items-center">
						Sign in
					</AnimatedArrowButton>
				</Link>
			</div>
		</Alert>
	);
};
