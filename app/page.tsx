import { Introduction } from "./components/modals/Introduction";
import { LocalStorageChecker } from "./components/LocalStorageChecker";
import { Editor } from "@/app/components/editor/Editor";
import { Details } from "./components/modals/Details";
import { currentUser, SignInButton } from "@clerk/nextjs";
import { getLatestScrawl, getScrawls } from "./api/scrawl/route";
import { SignInAlert } from "./components/SignInAlert";
import { ConsistencyChart } from "./components/ConsistencyChart";
import { defaultDate, YYYYMMDD } from "@/lib/dayJs";
import { IconBook, IconNotes, IconPencil } from "@tabler/icons-react";
import { ButtonWrapper } from "./components/buttons/ButtonWrapper";
import Link from "next/link";
import { CompletionController } from "./components/CompletionController";

type SearchParamProps = {
	searchParams: {
		show: Record<string, string> | null | undefined;
		step: string;
		details: string;
		completed: boolean;
	};
};

async function Scrawls({ userId }: { userId: string }) {
	const scrawls = await getScrawls(userId);

	if (!scrawls) {
		return <div>No scrawls</div>;
	}

	return (
		<section>
			<ConsistencyChart scrawls={scrawls} />
			<hr className="h-px my-4 bg-hr border-0 dark:bg-hrDark" />
			<div className="space-y-2">
				<h2 className="font-semibold">Scrawls</h2>
				<ul className="h-[calc(100dvh-20rem)] overflow-y-auto flex flex-col gap-1">
					{scrawls?.map((scrawl: any) => (
						<li
							className="flex gap-2 justify-between hover:bg-text dark:hover:bg-background dark:text-text text-background duration-300 transition-all ease-in-out rounded px-3 py-1 "
							key={scrawl.id}
						>
							<div className="flex gap-2 items-center">
								<IconNotes size={20} />
								<p className="text-sm font-semibold">
									{YYYYMMDD(scrawl.completedAt)}
								</p>
							</div>
							<div className="flex gap-1 items-center">
								<ButtonWrapper className="p-1 hover:bg-white dark:hover:bg-black transition-all ease-in-out duration-300">
									<IconPencil size={20} />
								</ButtonWrapper>
								<ButtonWrapper className="p-1 hover:bg-white dark:hover:bg-black transition-all ease-in-out duration-300">
									<IconBook size={20} />
								</ButtonWrapper>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export async function DailyScrawl({
	userId,
	name,
}: {
	userId: string;
	name: string;
}) {
	const scrawl = await getLatestScrawl(userId);

	console.log({ scrawl });

	const today = new Date().toISOString().split("T")[0];
	const scrawlDate = scrawl
		? new Date(scrawl.completedAt).toISOString().split("T")[0]
		: null;

	if (!scrawl || scrawlDate !== today) {
		return (
			<section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
				<Editor />
			</section>
		);
	}

	return (
		<section className="flex items-center justify-center h-[calc(100dvh-20rem)]">
			<div className="mx-auto p-4 text-background dark:text-text z-10 w-96 flex flex-col">
				<h2 className="text-5xl font-bold text-center">
					Hi {name || "Scrawler"}
				</h2>
				<p className="text-center mt-4 text-3xl">
					Great job on your daily scrawl!
				</p>
				<Link
					href="?details=true"
					className="mt-6 mx-auto bg-background hover:bg-hoverDark dark:bg-text dark:text-background text-text dark:hover:bg-hoverLight rounded-full p-3 px-5 font-semibold"
				>
					See your progress
				</Link>

				<p className="text-center mt-4">{defaultDate(today)}</p>
			</div>
		</section>
	);
}

export default async function Page({ searchParams }: SearchParamProps) {
	const show = searchParams?.show;
	const step = searchParams?.step;
	const details = searchParams?.details;
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
				/>
				<Details details={details}>
					{!user ? (
						<SignInAlert>
							<p className="text-background dark:text-text">
								Please sign in to access these features.
								<br />
								You will be able to view your past writings and track your
								consistency as well as export your writings.
							</p>
							<div className="ml-auto">
								<SignInButton>
									<button className="ml-auto text-sm hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text duration-300 transition-all ease-in-out rounded px-3 py-1">
										Sign in
									</button>
								</SignInButton>
							</div>
						</SignInAlert>
					) : (
						<Scrawls userId={user.id} />
					)}
				</Details>
			</CompletionController>
		</LocalStorageChecker>
	);
}
