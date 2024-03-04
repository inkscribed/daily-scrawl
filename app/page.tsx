import { LocalStorageChecker } from "./components/LocalStorageChecker";
import { Editor } from "@/app/components/editor/Editor";
import { currentUser } from "@clerk/nextjs";
import { defaultDate } from "@/app/lib/dayJs";
import Link from "next/link";
import { CompletionController } from "./components/CompletionController";
import { Suspense } from "react";
import { prisma } from "./lib/prisma";
import { AnimatedArrowButton } from "./components/ui/AnimatedArrowButton";
import dayjs from "dayjs";

type SearchParamProps = {
	searchParams: {
		show: Record<string, string> | null | undefined;
		step: string;
		start: boolean;
		completed: boolean;
		scrawlCompleted: boolean;
	};
};

async function DailyScrawl({ userId, name }: { userId: string; name: string }) {
	const scrawl = await prisma.scrawl.findFirst({
		where: {
			authorId: userId,
		},
		orderBy: {
			completedAt: "desc",
		},
	});

	const today = dayjs().format("YYYY-MM-DD");
	const scrawlDate = scrawl
		? dayjs(scrawl.completedAt).format("YYYY-MM-DD")
		: null;

	console.log(scrawlDate, today);

	if (!scrawl || scrawlDate !== today || !userId) {
		return (
			<section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
				<Editor />
			</section>
		);
	}

	return (
		<section className="flex items-center justify-center h-[calc(100dvh-20rem)]">
			<div className="mx-auto p-4 text-background dark:text-textDark z-10 flex flex-col">
				<h2 className="text-5xl font-bold text-center">Hi {name}</h2>
				<p className="text-center mt-4 text-3xl w-96 mx-auto">
					Great job on your daily scrawl!
				</p>
				<Link href="?details=true" className="mx-auto">
					<AnimatedArrowButton className="mt-6 flex items-center mx-auto bg-background hover:bg-hoverDark dark:bg-textDark dark:text-background text-text dark:hover:bg-hoverLight rounded-full py-3 px-5 font-semibold">
						<p className="-mt-0.5">See your progress</p>
					</AnimatedArrowButton>
				</Link>

				<p className="text-center mt-4">{defaultDate(scrawl.completedAt)}</p>
			</div>
		</section>
	);
}

export default async function Page({ searchParams }: SearchParamProps) {
	const scrawlCompleted = searchParams?.scrawlCompleted;
	const user = currentUser ? await currentUser() : null;

	return (
		<LocalStorageChecker>
			<CompletionController completed={scrawlCompleted}>
				<Suspense
					fallback={
						<section className="flex items-center justify-center h-[calc(100dvh-20rem)]">
							<div className="mx-auto p-4 text-background dark:text-textDark z-10 flex flex-col">
								<h2 className="text-5xl font-bold text-center">
									Hi{" "}
									{user?.firstName
										? user?.firstName + " " + user?.lastName
										: "Scrawler"}
								</h2>
								<p className="text-center mt-4 text-3xl w-96 mx-auto">
									Loading your daily scrawl...
								</p>
							</div>
						</section>
					}
				>
					<DailyScrawl
						/* @ts-ignore */
						userId={user?.id}
						/* @ts-ignore */
						name={
							user?.firstName
								? user?.firstName + " " + user?.lastName
								: "Scrawler"
						}
					/>
				</Suspense>
			</CompletionController>
		</LocalStorageChecker>
	);
}
