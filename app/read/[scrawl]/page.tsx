import { YYYYMMDD } from "@/app/lib/dayJs";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs";
import { TypographyStylesProvider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Reading Scrawl",
};

export default async function Page({
	params,
}: {
	params: { scrawl: string; show: string; step: string };
}) {
	const { userId } = await auth();
	return (
		<Suspense
			fallback={
				<section className="flex">
					<div className="basis-[58rem] mx-auto px-4 flex flex-col gap-4">
						<h2 className="font-semibold text-3xl bg-hoverDark dark:bg-hoverLight w-60 h-[30px] rounded-md" />
						<p className="h-3 w-5/6 bg-hoverDark dark:bg-hoverLight rounded" />
						<p className="h-3 w-full bg-hoverDark dark:bg-hoverLight rounded" />
						<p className="h-3 w-2/4 bg-hoverDark dark:bg-hoverLight rounded" />
						<p className="h-3 w-4/5 bg-hoverDark dark:bg-hoverLight rounded" />
						<br /> <br />
						<p className="h-3 w-full bg-hoverDark dark:bg-hoverLight rounded" />
						<p className="h-3 w-1/2 bg-hoverDark dark:bg-hoverLight rounded" />
					</div>
				</section>
			}
		>
			<Scrawl scrawl={params.scrawl} userId={userId || null} />
		</Suspense>
	);
}

async function Scrawl({
	scrawl,
	userId,
}: {
	scrawl: string;
	userId: string | null;
}) {
	let scrawlData = null;

	console.log("Scrawl:", scrawl);
	console.log("User:", userId);

	if (userId) {
		scrawlData = await prisma.scrawl.findFirst({
			where: {
				OR: [
					{
						id: scrawl,
						authorId: userId,
					},
					{
						id: scrawl,
						isPublic: true,
					},
				],
			},
		});
	} else {
		scrawlData = await prisma.scrawl.findUnique({
			where: {
				id: scrawl,
				isPublic: true,
			},
		});
	}

	if (!scrawlData) {
		return (
			<section className="flex">
				<div className="basis-[58rem] mx-auto px-4 flex flex-col gap-4">
					<h2 className="font-semibold text-3xl">No scrawl found</h2>
					<p>
						Looks like you&#39;re trying to access a scrawl that doesn&#39;t
						exist or isn&#39;t public.
					</p>
					<p></p>
					<Link
						href="/"
						className="flex gap-2 items-center mr-auto px-4 py-3 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text"
					>
						<IconArrowLeft size={18} />
						Go back
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="flex">
			<div className="basis-[58rem] mx-auto px-4 flex flex-col gap-4">
				<h2 className="font-semibold text-3xl">
					{YYYYMMDD(scrawlData?.completedAt)}
				</h2>
				<TypographyStylesProvider className="pb-10">
					<div dangerouslySetInnerHTML={{ __html: scrawlData.content }} />
				</TypographyStylesProvider>
			</div>
		</section>
	);
}
