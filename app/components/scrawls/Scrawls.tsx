import { IconNotes, IconPencil, IconBook } from "@tabler/icons-react";
import { ConsistencyChart } from "../ConsistencyChart";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import Link from "next/link";
import { YYYYMMDD } from "@/lib/dayJs";
import { getScrawls } from "@/app/api/scrawl/route";
import { IconShare } from "@tabler/icons-react";
import { IconShareOff } from "@tabler/icons-react";

export async function Scrawls({ userId }: { userId: string }) {
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
									{scrawl.isPublic ? (
										<IconShare
											size={18}
											className="dark:text-sky-600 text-blue-600"
										/>
									) : (
										<IconShareOff
											size={18}
											className="dark:text-yellow-600 text-yellow-600"
										/>
									)}
								</ButtonWrapper>
								<ButtonWrapper className="p-1 hover:bg-white dark:hover:bg-black transition-all ease-in-out duration-300">
									<IconPencil size={18} />
								</ButtonWrapper>
								<ButtonWrapper className="p-1 hover:bg-white dark:hover:bg-black transition-all ease-in-out duration-300">
									<Link href={`/read/${scrawl.id}`}>
										<IconBook size={18} />
									</Link>
								</ButtonWrapper>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}