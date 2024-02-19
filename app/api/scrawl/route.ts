import { prisma } from "@/app/lib/prisma";
import { Scrawl } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function PATCH(data: any) {
	const { id, snoozedCount, content } = data;

	try {
		const scrawl = await prisma.scrawl.update({
			where: {
				id,
			},
			data: {
				content,
				snoozedCount: snoozedCount + 1,
			},
		});

		return scrawl;
	} catch (error) {
		console.error("Error snoozing scrawl:", error);
		return null;
	}
}

export async function getScrawls(userId: string): Promise<Scrawl[] | null> {
	try {
		const scrawls = await prisma.scrawl.findMany({
			where: {
				authorId: userId,
			},
			orderBy: {
				completedAt: "desc",
			},
		});

		return scrawls;
	} catch (error) {
		console.error("Error fetching scrawls:", error);
		return null;
	}
}

export async function getLatestScrawl(userId: string): Promise<Scrawl | null> {
	if (!userId) {
		console.error("No userId provided");
		return null;
	}

	try {
		const scrawl = await prisma.scrawl.findFirst({
			where: {
				authorId: userId,
			},
			orderBy: {
				completedAt: "desc",
			},
		});

		return scrawl;
	} catch (error) {
		console.error("Error fetching latest scrawl:", error);
		return null;
	}
}

export async function getSingleScrawl(
	id: string,
	userId: string | null
): Promise<Scrawl | null> {
	try {
		if (!userId) {
			const scrawl = await prisma.scrawl.findUnique({
				where: {
					id,
					isPublic: true,
				},
			});

			return scrawl;
		} else {
			const scrawl = await prisma.scrawl.findUnique({
				where: {
					id,
					authorId: userId,
				},
			});

			return scrawl;
		}
	} catch (error) {
		console.error("Error fetching single scrawl:", error);
		return null;
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
