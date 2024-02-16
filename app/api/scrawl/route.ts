import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
	const { content, userId } = await req.json();
	console.log({
		content,
		userId,
	});

	try {
		const scrawl = await prisma.scrawl.create({
			data: {
				content,
				authorId: userId,
				// time now
				completedAt: new Date(),
				snoozedCount: 0,
				isCompleted: true,
			},
		});

		return NextResponse.json(scrawl);
	} catch (error) {
		console.error("Error creating scrawl:", error);
		return NextResponse.json({ error: "error creating scrawl" });
	}
}

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

export async function getScrawls(userId: string) {
	try {
		const scrawls = await prisma.scrawl.findMany({
			where: {
				authorId: userId,
			},
		});

		console.log(scrawls);
		return NextResponse.json(scrawls);
	} catch (error) {
		console.error("Error fetching scrawls:", error);
		return NextResponse.json({ error: "error fetching scrawls" });
	}
}
