import { Introduction } from "./components/modals/Introduction";
import { LocalStorageChecker } from "./components/LocalStorageChecker";
import { Editor } from "@/app/components/editor/Editor";
import { Details } from "./components/modals/Details";
import { prisma } from "@/lib/prisma";

type SearchParamProps = {
	searchParams: {
		show: Record<string, string> | null | undefined;
		step: string;
		details: string;
	};
};

export default async function Page({ searchParams }: SearchParamProps) {
	const show = searchParams?.show;
	const step = searchParams?.step;
	const details = searchParams?.details;

	return (
		<LocalStorageChecker>
			{show && <Introduction step={step} />}
			<section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
				<Editor />
			</section>
			<Details details={details}>
				<div>
					<h1>Details</h1>
				</div>
			</Details>
		</LocalStorageChecker>
	);
}
