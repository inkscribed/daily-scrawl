"use server";
import { prisma } from "@/app/lib/prisma";
import { Scrawl } from "@prisma/client";
import { revalidatePath } from "next/cache";

// import * as DOMPurify from "dompurify";
import DOMPurify from "isomorphic-dompurify";

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

	const clean = DOMPurify.sanitize(content);

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
				content: clean,
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

export async function togglePublic(
	id: string,
	userId: string,
	isPublic: boolean
): Promise<Scrawl | null> {
	if (!userId) {
		console.error("No userId provided when toggling public scrawl");
		return null;
	}

	try {
		const scrawl = await prisma.scrawl.update({
			where: {
				id,
				authorId: userId,
			},
			data: {
				isPublic: {
					set: !isPublic,
				},
			},
		});

		console.log("Toggled public scrawl:", scrawl);

		revalidatePath("/");
		return scrawl;
	} catch (error) {
		console.error("Error toggling public scrawl:", error);
		return null;
	}
}

export async function exportScrawlAsPDF(scrawlId: string) {
	// try {
	// 	const scrawl = await prisma.scrawl.findUnique({
	// 		where: {
	// 			id: scrawlId,
	// 		},
	// 	});

	// 	if (!scrawl) {
	// 		console.error("Scrawl not found");
	// 		return null;
	// 	}
	// } catch (error) {
	// 	console.error("Error exporting scrawl as PDF:", error);
	// 	return null;
	// }

	console.log("Exporting scrawl as PDF:", scrawlId);
}
