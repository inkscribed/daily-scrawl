"use client";
import Link from "next/link";
import { FC } from "react";
import { CloseModalButton } from "../buttons/CloseModalButton";
import { DailyScrawlIcon } from "../ui/ScrawlIcon";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Modal } from "@mantine/core";
import {
	IconAlarmSnooze,
	IconArrowLeft,
	IconArrowRight,
	IconClock24,
	IconLogin,
	IconTimeDuration10,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export const Introduction: FC<{}> = () => {
	const path = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const step = searchParams.get("step");

	function close() {
		localStorage.setItem("notification-accepted", "true");
		router.push(path);
	}

	return (
		<Modal
			opened={Boolean(step)}
			closeOnClickOutside={false}
			onClose={close}
			size={520}
			yOffset={125}
			transitionProps={{
				transition: "skew-up",
				duration: 200,
				timingFunction: "linear",
			}}
			radius={10}
			classNames={{
				body: "bg-text dark:bg-background h-[450px] flex grow flex-col",
				header: "!bg-text dark:!bg-background",
				inner: "bg-transparent",
				content: "!bg-transparent",
			}}
			title={
				step === "1" && <h2 className="font-bold text-xl">Ground rules</h2>
			}
		>
			{step === "0" && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col"
				>
					<div className="flex items-center flex-col justify-center gap-2 mb-4">
						<div className="w-64 h-64">
							<DailyScrawlIcon />
						</div>
						<h2 className="font-semibold text-2xl">Daily Scrawl</h2>
						<p className="text-center"> Your daily writing companion.</p>
					</div>
					<motion.div initial="default" whileHover="hover" className="mx-auto">
						<Link
							href={path + `?show=true&step=1`}
							className="group flex items-center bg-background text-text dark:text-background hover:bg-hoverDark dark:bg-text dark:hover:bg-hoverLight duration-300 font-semibold transition-all ease-in-out rounded px-3 py-1 text-sm"
						>
							next{" "}
							<motion.div
								variants={{
									default: { x: 0, opacity: 0, width: 0 },
									hover: { x: 5, opacity: 1, width: "auto" },
								}}
							>
								<IconArrowRight size={18} />
							</motion.div>
						</Link>
					</motion.div>
				</motion.div>
			)}
			{step === "1" && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col grow px-4"
				>
					<p className="mb-2">
						DailyScrawl offers you a unique writing experience designed to boost
						your creativity and focus. Every day, you are given a blank canvas
						and <b>10 minutes</b> of uninterrupted time to pour your thoughts
						and ideas into words.
					</p>
					<motion.ul className="list-disc pl-5 my-4 flex flex-col gap-3 items-start">
						<motion.li
							className="flex items-start gap-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.25 }}
						>
							<IconTimeDuration10 size={20} className="min-w-10" />
							You start with 10 minutes of writing time each day.
						</motion.li>
						<motion.li
							className="flex items-start gap-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						>
							<IconAlarmSnooze size={20} className="min-w-10" />
							Need a bit more time? You can hit &#34;Snooze&#34; to extend your
							session by 5 minutes, up to 2 times.
						</motion.li>
						<motion.li
							className="flex items-start gap-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.75 }}
						>
							<IconClock24 size={20} className="min-w-10" />
							Once your time is up, or you&#39;ve used your snoozes, you&#39;ll
							need to wait until the next day to write again.
						</motion.li>
						<motion.li
							className="flex items-start gap-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
						>
							<IconLogin size={20} className="min-w-10" />
							To keep your creations, simply create an account with us. It&#39;s
							quick, easy, and lets you come back to your work anytime.
						</motion.li>
					</motion.ul>
					<div className="flex items-center gap-1 justify-end mt-auto">
						<motion.div initial="default" whileHover="hover">
							<Link
								href={path + `?show=true&step=0`}
								className="flex items-center bg-background text-text dark:text-background hover:bg-hoverDark dark:bg-text dark:hover:bg-hoverLight duration-300 font-semibold transition-all ease-in-out rounded px-3 py-1 text-sm"
							>
								<motion.div
									variants={{
										default: { x: 0 },
										hover: { x: -5 },
									}}
								>
									<IconArrowLeft size={18} />
								</motion.div>
							</Link>
						</motion.div>

						<motion.div initial="default" whileHover="hover">
							<CloseModalButton className="flex items-center text-sm text-text dark:text-background bg-background hover:bg-hoverDark dark:bg-text dark:hover:bg-hoverLight duration-300 font-semibold transition-all ease-in-out px-3 py-1">
								Start writing
								<motion.div
									variants={{
										default: { x: 0, opacity: 0, width: 0 },
										hover: { x: 5, opacity: 1, width: "auto" },
									}}
								>
									<IconArrowRight size={18} />
								</motion.div>
							</CloseModalButton>
						</motion.div>
					</div>
				</motion.div>
			)}
		</Modal>
	);
};
