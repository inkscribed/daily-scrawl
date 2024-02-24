import { IconNotes, IconBook } from "@tabler/icons-react";
import { ConsistencyChart } from "../ui/ConsistencyChart";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import Link from "next/link";
import { YYYYMMDD } from "@/app/lib/dayJs";
import { PublicUpdateButton } from "./PublicUpdateButton";
import { ToolTipWrapper } from "../ui/TooltipWrapper";
import { prisma } from "@/app/lib/prisma";
import { ListWrapper } from "./ListWrapper";

export async function Scrawls({ userId }: { userId: string }) {
	const scrawls = await prisma.scrawl.findMany({
		where: {
			authorId: userId,
		},
		orderBy: {
			completedAt: "desc",
		},
	});

	if (!scrawls) {
		return <div>No scrawls</div>;
	}

	return (
		<section>
			<ConsistencyChart scrawls={scrawls} />
			<hr className="h-px my-4 bg-hr border-0 dark:bg-hrDark" />
			<div className="space-y-2">
				<h2 className="font-semibold">Scrawls</h2>
				<ul className="h-[calc(100dvh-21rem)] overflow-y-auto flex flex-col gap-1">
					{scrawls?.map((scrawl: any) => (
						<ListWrapper href={`/read/${scrawl.id}`} key={scrawl.id}>
							<div className="flex gap-2 items-center">
								<IconNotes size={20} />
								<p className="text-sm font-semibold">
									{YYYYMMDD(scrawl.completedAt)}
								</p>
							</div>
							<div className="flex gap-1 items-center">
								<PublicUpdateButton
									scrawlId={scrawl.id}
									isPublic={scrawl.isPublic}
									userId={userId}
								/>
								<Link href={`/read/${scrawl.id}`}>
									<ToolTipWrapper label="Read">
										<ButtonWrapper className="dark:hover:bg-black transition-all ease-in-out duration-300">
											<IconBook size={16} />
										</ButtonWrapper>
									</ToolTipWrapper>
								</Link>
							</div>
						</ListWrapper>
					))}
				</ul>
			</div>
		</section>
	);
}
