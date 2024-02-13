import { Introduction } from "./components/modals/Introduction";
import { LocalStorageChecker } from "./components/LocalStorageChecker";
import { Editor } from "@/app/components/editor/Editor";

type SearchParamProps = {
	searchParams: {
		show: Record<string, string> | null | undefined;
		step: string;
	};
};

export default function Page({ searchParams }: SearchParamProps) {
	const show = searchParams?.show;
	const step = searchParams?.step;

	return (
		<LocalStorageChecker>
			{show && <Introduction step={step} />}
			<section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
				<Editor />
			</section>
		</LocalStorageChecker>
	);
}
