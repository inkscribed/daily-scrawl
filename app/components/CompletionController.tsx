"use client";
import { YYYYMMDD } from "@/app/lib/dayJs";
import { useAuth } from "@clerk/nextjs";
import { FC, ReactNode, useEffect } from "react";
import { saveScrawl } from "../lib/actions";

export const CompletionController: FC<{
	children: ReactNode;
	completed: boolean;
}> = ({ children, completed }) => {
	const { userId } = useAuth();

	useEffect(() => {
		const today = new Date();
		const scrawl = localStorage.getItem(YYYYMMDD(today));

		if (completed && scrawl && Boolean(userId)) {
			const payload = JSON.parse(scrawl);
			saveScrawl({ ...payload, userId });
			localStorage.removeItem(YYYYMMDD(today));
		}
	}, [userId, completed]);

	return <>{children}</>;
};
