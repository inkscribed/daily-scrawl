import { Introduction } from "./components/modals/Introduction";
import { LocalStorageChecker } from "./components/LocalStorageChecker";
import { Editor } from "@/app/components/editor/Editor";
import { currentUser } from "@clerk/nextjs";
import { getLatestScrawl } from "./api/scrawl/route";
import { defaultDate } from "@/lib/dayJs";
import Link from "next/link";
import { CompletionController } from "./components/CompletionController";

type SearchParamProps = {
	searchParams: {
		show: Record<string, string> | null | undefined;
		step: string;
		start: boolean;
		completed: boolean;
	};
};

export async function DailyScrawl({
	userId,
	name,
	start,
}: {
	userId: string;
	name: string;
	start: boolean;
}) {
	const scrawl = await getLatestScrawl(userId);

	const today = new Date().toLocaleDateString().split("T")[0];
	const scrawlDate = scrawl
		? new Date(scrawl.completedAt).toLocaleDateString().split("T")[0]
		: null;

	console.log({ scrawl });

	// if (start || !scrawl || scrawlDate !== today) {
	// 	return (
	// 		<section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
	// 			<Editor />
	// 		</section>
	// 	);
	// }

	if (start || !scrawl || scrawlDate !== today) {
		return (
			<section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
				<Editor />
			</section>
		);
	}

	return (
		<section className="flex items-center justify-center h-[calc(100dvh-20rem)]">
			<div className="mx-auto p-4 text-background dark:text-text z-10 flex flex-col">
				<h2 className="text-5xl font-bold text-center">
					Hi {name || "Scrawler"}
				</h2>
				<p className="text-center mt-4 text-3xl w-96">
					Great job on your daily scrawl!
				</p>
				<Link
					href="?details=true"
					className="mt-6 mx-auto bg-background hover:bg-hoverDark dark:bg-text dark:text-background text-text dark:hover:bg-hoverLight rounded-full p-3 px-5 font-semibold"
				>
					See your progress
				</Link>

				<p className="text-center mt-4">{defaultDate(scrawl.completedAt)}</p>
			</div>
		</section>
	);
}

export default async function Page({ searchParams }: SearchParamProps) {
	const show = searchParams?.show;
	const step = searchParams?.step;
	const start = searchParams?.start;
	const completed = searchParams?.completed;

	const user = await currentUser();

	return (
		<LocalStorageChecker>
			<CompletionController completed={completed}>
				{show && <Introduction step={step} />}

				<DailyScrawl
					/* @ts-ignore */
					userId={user?.id}
					/* @ts-ignore */
					name={user?.firstName + " " + user?.lastName}
					start={start}
				/>
			</CompletionController>
		</LocalStorageChecker>
	);
}
