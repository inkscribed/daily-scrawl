import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";
import { CloseModalButton } from "../buttons/CloseModalButton";
import { DailyScrawlIcon } from "../ui/ScrawlIcon";

export const Introduction: FC<{
	step: string;
}> = ({ step }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center -mt-20 p-4 z-[9999]">
			<div className="bg-text dark:bg-background p-6 rounded-lg max-w-lg w-full relative">
				<CloseModalButton className="absolute top-3 right-3">
					<IconX size={20} />
				</CloseModalButton>
				{step === "0" && (
					<section className="flex flex-col">
						<div className="flex items-center flex-col justify-center gap-2 mb-6">
							<div className="w-64 h-64">
								<DailyScrawlIcon />
							</div>
							<h2 className="font-semibold text-2xl">Daily Scrawl</h2>
							<p className="text-center"> Your daily writing companion.</p>
						</div>
						<Link
							href={`/?show=true&step=1`}
							className="ml-auto bg-hoverLight hover:bg-text dark:bg-hoverDark dark:hover:bg-background duration-300 font-semibold transition-all ease-in-out rounded px-3 py-1 text-sm"
						>
							next
						</Link>
					</section>
				)}
				{step === "1" && (
					<section className="flex flex-col">
						<h2 className="font-bold text-xl mb-4">Ground rules</h2>
						<p className="mb-2">
							DailyScrawl offers you a unique writing experience designed to
							boost your creativity and focus. Every day, you are given a blank
							canvas and <b>10 minutes</b> of uninterrupted time to pour your
							thoughts and ideas into words.
						</p>
						<ul className="list-disc pl-5 mb-4">
							<li>You start with 10 minutes of writing time each day.</li>
							<li>
								Need a bit more time? You can hit &#34;Snooze&#34; to extend
								your session by 5 minutes, up to 2 times.
							</li>
							<li>
								Once your time is up, or you&#39;ve used your snoozes,
								you&#39;ll need to wait until the next day to write again.
							</li>
							<li>
								To keep your creations, simply create an account with us.
								It&#39;s quick, easy, and lets you come back to your work
								anytime.
							</li>
						</ul>
						<div className="flex items-center gap-2 justify-between">
							<Link
								href={`/?show=true&step=0`}
								className="bg-hoverLight hover:bg-text dark:bg-hoverDark dark:hover:bg-background duration-300 font-semibold transition-all ease-in-out rounded px-3 py-1 text-sm"
							>
								back
							</Link>
							<CloseModalButton className="ml-auto text-sm bg-hoverLight hover:bg-text dark:bg-hoverDark dark:hover:bg-background duration-300 font-semibold transition-all ease-in-out px-3 py-1">
								Start writing
							</CloseModalButton>
						</div>
					</section>
				)}
			</div>
		</div>
	);
};
