"use server";

import { prisma } from "@/app/lib/prisma";
import { Scrawl } from "@prisma/client";
import { revalidatePath } from "next/cache";

type ScrawlRequest = Scrawl & { userId: string };

export async function saveScrawl(scrawlRequest: ScrawlRequest) {
	const {
		content,
		userId,
		wordCount,
		snoozedCount,
		completedAt,
	}: ScrawlRequest = scrawlRequest;
	console.log({
		content,
		userId,
	});

	try {
		const lastScrawl = await prisma.scrawl.findFirst({
			where: {
				authorId: userId,
			},
			orderBy: {
				completedAt: "desc",
			},
		});

		if (
			lastScrawl?.completedAt.toDateString() ===
			new Date(completedAt).toDateString()
		) {
			return { error: "already completed today" };
		}

		console.log(
			lastScrawl?.completedAt.toDateString(),
			new Date().toDateString(),
			new Date(completedAt).toDateString()
		);

		const scrawl = await prisma.scrawl.create({
			data: {
				content,
				authorId: userId,
				completedAt: completedAt ? new Date(completedAt) : new Date(),
				snoozedCount,
				isCompleted: true,
				uniqueId: `${userId}-${new Date().toDateString()}`,
				wordCount,
			},
		});

		revalidatePath("/");
		return scrawl;
	} catch (error) {
		console.error("Error creating scrawl:", error);
		return { error: "Error creating scrawl" };
	}
}
