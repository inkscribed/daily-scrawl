import Link from "next/link";
import { Introduction } from "./components/modals/Introduction";
import { LocalStorageChecker } from "./components/LocalStorageChecker";

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
			<Link href="/?show=true&step=1">SUMMON THE MODAL</Link>
			{show && <Introduction step={step} />}
		</LocalStorageChecker>
	);
}
