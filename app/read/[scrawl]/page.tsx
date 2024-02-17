import { getSingleScrawl } from "@/app/api/scrawl/route";
import { Introduction } from "@/app/components/modals/Introduction";
import { YYYYMMDD } from "@/lib/dayJs";
import { currentUser } from "@clerk/nextjs";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
	params,
}: {
	params: { scrawl: string; show: string; step: string };
}) {
	const user = await currentUser();
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
				<div
					className="h-[calc(100dvh-8rem)] overflow-y-auto pb-10"
					dangerouslySetInnerHTML={{ __html: scrawlData.content }}
				/>
			</div>
		</section>
	);
}
