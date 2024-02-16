import type { Metadata } from "next";
import "./globals.css";
import "@mantine/tiptap/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./components/navigation/Navbar";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { dark } from "@clerk/themes";

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
			appearance={{
				baseTheme: dark,
				variables: { colorPrimary: "#000" },
				elements: {
					formButtonPrimary:
						"bg-black border border-black border-solid hover:bg-white hover:text-black",
					footerActionLink: "text-white",
					profileSectionPrimaryButton: "text-white",
					card: "rounded-md",
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
