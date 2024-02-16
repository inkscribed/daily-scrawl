import { Introduction } from "./components/modals/Introduction";
import { LocalStorageChecker } from "./components/LocalStorageChecker";
import { Editor } from "@/app/components/editor/Editor";
import { Details } from "./components/modals/Details";
import { currentUser, SignInButton } from "@clerk/nextjs";
import { getScrawls } from "./api/scrawl/route";
import { SignInAlert } from "./components/SignInAlert";
import { ConsistencyChart } from "./components/ConsistencyChart";
import { YYYYMMDD } from "@/lib/dayJs";
import { IconBook, IconPencil } from "@tabler/icons-react";
import { ButtonWrapper } from "./components/buttons/ButtonWrapper";

type SearchParamProps = {
	searchParams: {
		show: Record<string, string> | null | undefined;
		step: string;
		details: string;
	};
};

async function Scrawls({ userId }: { userId: string }) {
	const scrawls = await (await getScrawls(userId)).json();

	if (!scrawls) {
		return <div>No scrawls</div>;
	}

	return (
		<div className="space-y-2">
			<h2 className="font-semibold">Scrawls</h2>
			<ul className="h-[calc(100dvh-20rem)] overflow-y-auto flex flex-col gap-1">
				{scrawls?.map((scrawl: any) => (
					<li
						className="flex gap-2 justify-between hover:bg-text dark:hover:bg-background dark:text-text text-background duration-300 transition-all ease-in-out rounded px-3 py-1 "
						key={scrawl.id}
					>
						<div className="flex gap-2 items-center">
							<IconPencil size={20} />
							<p className="text-sm font-semibold">
								{YYYYMMDD(scrawl.completedAt)}
							</p>
						</div>
						<ButtonWrapper className="p-1">
							<IconBook size={20} />
						</ButtonWrapper>
					</li>
				))}
			</ul>
		</div>
	);
}

export default async function Page({ searchParams }: SearchParamProps) {
	const show = searchParams?.show;
	const step = searchParams?.step;
	const details = searchParams?.details;

	const user = await currentUser();

	return (
		<LocalStorageChecker>
			{show && <Introduction step={step} />}
			<section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
				<Editor />
			</section>
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
					<section>
						<ConsistencyChart />
						<hr className="h-px my-4 bg-hr border-0 dark:bg-hrDark" />
						<Scrawls userId={user.id} />
					</section>
				)}
			</Details>
		</LocalStorageChecker>
	);
}
