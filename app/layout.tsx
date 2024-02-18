import type { Metadata } from "next";
import "./globals.css";
import "@mantine/tiptap/styles.css";
import { ClerkProvider, SignInButton, currentUser } from "@clerk/nextjs";
import { Navbar } from "./components/navigation/Navbar";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { dark } from "@clerk/themes";
import { DetailsAffix } from "./components/modals/DetailsAffix";
import { SignInAlert } from "./components/ui/SignInAlert";

import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Details } from "./components/modals/Details";
import { Scrawls } from "./components/scrawls/Scrawls";

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
	const user = await currentUser();

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
								{!user ? (
									<SignInAlert>
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
									</SignInAlert>
								) : (
									<Scrawls userId={user.id} />
								)}
							</Details>
							<DetailsAffix />
						</MantineProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
