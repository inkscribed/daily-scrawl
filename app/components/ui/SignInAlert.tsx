"use client";
import { Alert } from "@mantine/core";
import { useTheme } from "next-themes";
import { FC, ReactNode } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

export const SignInAlert: FC<{ children: ReactNode }> = ({ children }) => {
	const { theme } = useTheme();
	return (
		<Alert
			variant="light"
			color={theme === "dark" ? "violet" : "dark"}
			title="You are not signed in!"
			icon={<IconInfoCircle />}
			classNames={{
				message: "!flex flex-col gap-4",
			}}
		>
			{children}
		</Alert>
	);
};
