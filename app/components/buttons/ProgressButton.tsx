"use client";
import { useStates } from "@/app/providers/StateProvider";
import { AnimatedArrowButton } from "../ui/AnimatedArrowButton";

export const ProgressButton = () => {
	const { opened, open, close } = useStates();

	return (
		<button onClick={open} className="mx-auto">
			<AnimatedArrowButton className="mt-6 flex items-center mx-auto bg-background hover:bg-hoverDark dark:bg-textDark dark:text-background text-text dark:hover:bg-hoverLight rounded-full py-3 px-5 font-semibold">
				<p className="mt-0.5">See your progress</p>
			</AnimatedArrowButton>
		</button>
	);
};
