"use client";

import { ThemeProvider as ThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemesProvider
			attribute="class"
			defaultTheme="light"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemesProvider>
	);
}
