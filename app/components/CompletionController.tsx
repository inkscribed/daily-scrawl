"use client";
import { YYYYMMDD } from "@/lib/dayJs";
import { useAuth } from "@clerk/nextjs";
import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export const CompletionController: FC<{
	children: ReactNode;
	completed: boolean;
}> = ({ children, completed }) => {
	const router = useRouter();
	const { userId } = useAuth();

	useEffect(() => {
		const today = new Date();
		const scrawl = localStorage.getItem(YYYYMMDD(today));

		async function saveScrawl(scrawl: string) {
			const data = JSON.parse(scrawl);
			const requestData = {
				...data,
				userId,
			};

			try {
				await fetch("/api/scrawl", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestData),
				});
			} catch (error) {
				console.error("Error saving scrawl:", error);
			}
		}

		if (completed && scrawl && userId) {
			saveScrawl(scrawl);
			localStorage.removeItem(YYYYMMDD(today));

			router.push("/");
		}
	}, [router, userId, completed]);

	return <>{children}</>;
};
