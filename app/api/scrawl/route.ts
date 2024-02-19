import { prisma } from "@/app/lib/prisma";
import { Scrawl } from "@prisma/client";

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
