import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";
import { CloseModalButton } from "../buttons/CloseModalButton";

export const Introduction: FC<{
	step: string;
}> = ({ step }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center -mt-20 p-4 z-50">
			<div className="bg-text dark:bg-background p-6 rounded-lg max-w-lg w-full relative">
				<CloseModalButton className="absolute top-3 right-3">
					<IconX size={20} />
				</CloseModalButton>

				{step === "1" && (
					<section className="flex flex-col">
						<h2 className="font-bold text-xl mb-4">Welcome to DailyScrawl!</h2>
						<p className="mb-2">
							DailyScrawl offers you a unique writing experience designed to
							boost your creativity and focus. Every day, you are given a blank
							canvas and 10 minutes of uninterrupted time to pour your thoughts
							and ideas into words.
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
						<Link
							href={`/?show=true&step=2`}
							className="ml-auto px-2 py-1 text-sm"
						>
							Next
						</Link>
					</section>
				)}
				{step === "2" && (
					<section className="flex flex-col">
						<h2 className="font-bold text-xl mb-4">Save Your Masterpieces!</h2>
						<p className="mb-2">
							Don&#39;t let your words vanish! Create an account to save your
							daily writings.
						</p>
						<ul className="list-disc pl-5 mb-4">
							<li>
								<strong>Access Anytime</strong>: Log in to view, edit, or
								continue your writings from any day.
							</li>
							<li>
								<strong>Never Lose a Word</strong>: Your writings are saved
								securely, so you can come back to them anytime you wish.
							</li>
						</ul>
						<CloseModalButton className="ml-auto text-sm">
							Start writing
						</CloseModalButton>
					</section>
				)}
			</div>
		</div>
	);
};
