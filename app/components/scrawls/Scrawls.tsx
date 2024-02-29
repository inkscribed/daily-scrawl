import {
	IconBook,
	IconDownload,
	IconBrandGithub,
	IconBrandLinkedin,
	IconMail,
	IconBrandInstagram,
} from "@tabler/icons-react";
import { ConsistencyChart } from "../ui/ConsistencyChart";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import Link from "next/link";
import { PublicUpdateButton } from "./PublicUpdateButton";
import { ToolTipWrapper } from "../ui/TooltipWrapper";
import { prisma } from "@/app/lib/prisma";
import { ListWrapper } from "./ListWrapper";
import { DownloadPDFButton } from "../buttons/DownloadPDFButton";
import { ScrawlName } from "./ScrawlName";

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
		<section className="flex flex-col">
			<ConsistencyChart scrawls={scrawls} />
			<hr className="h-px my-4 bg-hr border-0 dark:bg-hrDark" />
			<div className="space-y-2">
				<h2 className="font-semibold">Scrawls</h2>
				<ul className="h-[calc(100dvh-23rem)] overflow-y-auto flex flex-col gap-1">
					{scrawls?.map((scrawl: any) => (
						<ListWrapper href={`/read/${scrawl.id}`} key={scrawl.id}>
							<ScrawlName scrawl={scrawl} />
							<div className="flex gap-1 items-center">
								<DownloadPDFButton scrawl={scrawl}>
									<IconDownload size={16} />
								</DownloadPDFButton>
								<PublicUpdateButton
									scrawlId={scrawl.id}
									isPublic={scrawl.isPublic}
									userId={userId}
								/>
								<Link href={`/read/${scrawl.id}`}>
									<ToolTipWrapper label="Read">
										<ButtonWrapper className="dark:hover:bg-black">
											<IconBook size={16} />
										</ButtonWrapper>
									</ToolTipWrapper>
								</Link>
							</div>
						</ListWrapper>
					))}
				</ul>
			</div>
			<div className="flex gap-3 items-center mt-3 mx-auto">
				<Link href="https://github.com/BaraKona" target="_blank">
					<IconBrandGithub size={20} />
				</Link>
				<Link href="https://www.linkedin.com/in/bara-kona/" target="_blank">
					<IconBrandLinkedin size={20} />
				</Link>
				<a href="mailto:bkonateh1@gmail.com" target="_blank">
					<IconMail size={20} />
				</a>
				<Link href="https://instagram.com/barakona00" target="_blank">
					<IconBrandInstagram size={20} />
				</Link>
			</div>
		</section>
	);
}
