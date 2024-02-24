import type { Metadata } from "next";
import "./globals.css";
import "@mantine/tiptap/styles.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { Navbar } from "./components/navigation/Navbar";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { dark } from "@clerk/themes";
import { SignInAlert } from "./components/ui/SignInAlert";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Details } from "./components/modals/Details";
import { Scrawls } from "./components/scrawls/Scrawls";
import { Introduction } from "./components/modals/Introduction";
import Link from "next/link";
import { DetailsAffix } from "./components/modals/DetailsAffix";
import { IconBooks } from "@tabler/icons-react";

export const metadata: Metadata = {
	title: "Daily Scrawl",
	description:
		"Discover DailyScrawl: Your daily writing retreat. Engage in 10 minutes of focused, distraction-free writing each day. Cultivate creativity, clarity, and growth. Start your journey with DailyScrawl today.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { userId }: { userId: string | null } = auth();

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
							<Details>
								{!userId ? (
									<SignInAlert>
										<p className="text-background dark:text-text">
											Please sign in to access these features.
											<br />
											You will be able to view your past writing and track your
											consistency as well as export to various formats.
										</p>
										<div className="ml-auto mb-2">
											<Link
												href="/sign-in"
												className="ml-auto text-sm hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text duration-300 transition-all ease-in-out rounded px-3 py-1"
											>
												Sign in
											</Link>
										</div>
									</SignInAlert>
								) : (
									<Scrawls userId={userId} />
								)}
							</Details>
							<DetailsAffix>
								<Link href="?details=true" prefetch={true}>
									<button className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark dark:bg-background bg-text duration-300 transition-all ease-in-out">
										<IconBooks size={22} />
									</button>
								</Link>
							</DetailsAffix>
							<Introduction />
						</MantineProvider>
					</ThemeProvider>
					<Analytics />
					<SpeedInsights />
				</body>
			</html>
		</ClerkProvider>
	);
}
