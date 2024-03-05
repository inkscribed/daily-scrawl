import type { Metadata } from "next";
import "./globals.css";
import "@mantine/tiptap/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./components/navigation/Navbar";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Details } from "./components/modals/Details";
import { Scrawls } from "./components/scrawls/Scrawls";
import { Introduction } from "./components/modals/Introduction";
import { SignInAlert } from "./components/ui/SignInAlert";
import { clerkUser } from "./lib/actions";
import { Toaster } from "react-hot-toast";
import { StateProvider } from "./providers/StateProvider";

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
	const userId = await clerkUser();

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

				<body className="bg-text dark:bg-background text-background dark:text-textDark">
					<StateProvider>
						<ThemeProvider>
							<MantineProvider>
								<Navbar />
								{children}
								<Details>
									{!userId ? <SignInAlert /> : <Scrawls userId={userId} />}
								</Details>
								<Introduction />
							</MantineProvider>
						</ThemeProvider>
					</StateProvider>
					<Analytics />
					<SpeedInsights />
					<GoogleAnalytics gaId="G-QGRNQTFX1C" />
					<Toaster position="bottom-right" />
				</body>
			</html>
		</ClerkProvider>
	);
}
