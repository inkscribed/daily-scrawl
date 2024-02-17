import { getSingleScrawl } from "@/app/api/scrawl/route";
import { Introduction } from "@/app/components/modals/Introduction";
import { YYYYMMDD } from "@/lib/dayJs";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Page({
	params,
}: {
	params: { scrawl: string; show: string; step: string };
}) {
	const user = await currentUser();

	console.log(params);
	return (
		<Suspense fallback={<div>Loading...</div>}>
			{params.show && <Introduction step={params.step} />}
			<Scrawl scrawl={params.scrawl} userId={user ? user.id : null} />
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
	const scrawlData = await getSingleScrawl(scrawl, userId);

	if (!scrawlData) {
		return <div>Scrawl not found</div>;
	}

	return (
		<section className="flex">
			<div className="basis-[58rem] mx-auto px-4 flex flex-col gap-4">
				<h2 className="font-semibold text-3xl">
					{YYYYMMDD(scrawlData?.completedAt)}
				</h2>
				<div
					className="h-[calc(100dvh-8rem)] overflow-y-auto pb-10"
					dangerouslySetInnerHTML={{ __html: scrawlData.content }}
				/>
			</div>
		</section>
	);
}
