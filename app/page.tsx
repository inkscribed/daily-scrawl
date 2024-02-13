import { Introduction } from "./components/modals/Introduction";
import { LocalStorageChecker } from "./components/LocalStorageChecker";
import { Editor } from "@/app/components/editor/Editor";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SearchParamProps = {
	searchParams: {
		show: Record<string, string> | null | undefined;
		step: string;
	};
};

async function getUsers() {
	const users = await prisma.user.findMany();
	return users;
}

export default async function Page({ searchParams }: SearchParamProps) {
	const show = searchParams?.show;
	const step = searchParams?.step;

	const users = await getUsers();

	console.log(users);

	return (
		<LocalStorageChecker>
			{show && <Introduction step={step} />}
			<section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
				<Editor />
			</section>
		</LocalStorageChecker>
	);
}
