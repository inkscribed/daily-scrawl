import Link from "next/link";
import { Introduction } from "./components/modals/Introduction";

type SearchParamProps = {
	searchParams: Record<string, string> | null | undefined;
};

export default function Page({ searchParams }: SearchParamProps) {
	const show = searchParams?.show;

	return (
		<>
			<Link href="/?show=true">SUMMON THE MODAL</Link>
			{show && <Introduction />}
		</>
	);
}
