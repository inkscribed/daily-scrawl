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
				body: "dark:!bg-background !bg-text dark:text-text",
				root: "dark:!bg-background !bg-text",
				wrapper: "dark:bg-background bg-text",
				label: "dark:text-text text-background",
				closeButton: "dark:text-text text-background",
				icon: "dark:text-text text-background",
				title: "dark:text-text text-background",
			}}
		>
			<p className="text-background dark:text-text">
				Please sign in to access these features.
				<br />
				You will be able to view your past writing and track your consistency as
				well as export to various formats.
			</p>
			<div className="ml-auto mb-2">
				<Link href="/sign-in">
					<AnimatedArrowButton>Sign in</AnimatedArrowButton>
				</Link>
			</div>
		</Alert>
	);
};
