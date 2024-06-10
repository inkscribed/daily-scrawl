"use client";
import { ToolTipWrapper } from "../ui/TooltipWrapper";
import { useStates } from "@/app/providers/StateProvider";

export const SwitchModeButton = () => {
	const { mode, setMode, start } = useStates();

	return (
		<ToolTipWrapper
			label={mode === 10 ? "Switch to 60 min" : "Switch to 10 min"}
		>
			<button
				onClick={() => (mode === 10 ? setMode(60) : setMode(10))}
				disabled={start}
				className="w-12 disabled:bg-gray-200 disabled:text-gray-300 disabled:dark:bg-slate-950 disabled:dark:text-slate-800 p-2 py-1.5 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-textDark hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out"
			>
				<span className="font-bold">{mode}</span>
			</button>
		</ToolTipWrapper>
	);
};
