import { Introduction } from "./components/modals/Introduction";
import { LocalStorageChecker } from "./components/LocalStorageChecker";
import { Editor } from "@/app/components/editor/Editor";
import { Details } from "./components/modals/Details";
import { currentUser, SignInButton } from "@clerk/nextjs";
import { getScrawls } from "./api/scrawl/route";
import { SignInAlert } from "./components/SignInAlert";

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
		<div>
			{scrawls?.map((scrawl: any) => (
				<div key={scrawl.id}>{scrawl.content}</div>
			))}
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
					<Scrawls userId={user.id} />
				)}
			</Details>
		</LocalStorageChecker>
	);
}
