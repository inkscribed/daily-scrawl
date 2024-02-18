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
		console.log({ scrawl, userId, completed });
		async function saveScrawl(scrawl: string) {
			const data = JSON.parse(scrawl);
			const requestData = {
				...data,
				userId,
			};

			console.log({ requestData });

			await fetch("/api/scrawl", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			})
				.then(() => {
					localStorage.removeItem(YYYYMMDD(today));
				})
				.catch((error) => {
					console.error("Error saving scrawl:", error);
				})
				.finally(() => {
					router.push("/");
				});
		}

		if (completed && scrawl && userId) {
			saveScrawl(scrawl);
		}
	}, [router, userId, completed]);

	return <>{children}</>;
};
