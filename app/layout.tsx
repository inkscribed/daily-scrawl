import type { Metadata } from "next";
import "./globals.css";
import "@mantine/tiptap/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./components/navigation/Navbar";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
	title: "Daily Scrawl",
	description:
		"Discover DailyScrawl: Your daily writing retreat. Engage in 10 minutes of focused, distraction-free writing each day. Cultivate creativity, clarity, and growth. Start your journey with DailyScrawl today.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			// appearance={{
			// 	baseTheme: dark,

			// }}
			appearance={{
				variables: { colorPrimary: "#000000" },
				elements: {
					formButtonPrimary:
						"bg-black border border-black border-solid hover:bg-white hover:text-black",
					socialButtonsBlockButton:
						"bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
					socialButtonsBlockButtonText: "font-semibold",
					formButtonReset:
						"bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
					membersPageInviteButton:
						"bg-black border border-black border-solid hover:bg-white hover:text-black",
					card: "bg-[#fafafa]",
				},
			}}
		>
			<html lang="en" suppressHydrationWarning>
				<head>
					<ColorSchemeScript />
				</head>
				<body className="bg-text dark:bg-background text-background dark:text-text">
					<ThemeProvider>
						<MantineProvider>
							<Navbar />
							{children}
						</MantineProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
