"use client";
import Calendar from "react-github-contribution-calendar";
import { useTheme } from "next-themes";
import { Scrawl } from "@prisma/client";
import { FC } from "react";
import { YYYYMMDD } from "@/lib/dayJs";

type AccumulatorType = {
	[key: string]: number;
};

export const ConsistencyChart: FC<{
	scrawls: Scrawl[];
}> = ({ scrawls }) => {
	const { theme } = useTheme();
	const weekNames = ["", "M", "", "W", "", "F", ""];

	const values = scrawls.reduce<AccumulatorType>((acc, scrawl) => {
		const key = YYYYMMDD(scrawl.completedAt);
		acc[key] = scrawl.snoozedCount + 1;
		return acc;
	}, {});

	const wordsWritten = scrawls.reduce((acc, scrawl) => {
		return acc + scrawl.wordCount;
	}, 0);

	const until = new Date().toDateString();
	const panelAttributes = {
		rx: 2,
		ry: 2,
		style: {
			stroke: theme === "dark" ? "#222222" : "#b0b0b0",
			"stroke-width": 0.5,
		},
	};
	const weekLabelAttributes = {
		style: {
			"font-size": 10,
			margin: "0 10px",
			fill: theme === "dark" ? "#d0d0d0" : "#151414",
		},
	};
	const monthLabelAttributes = {
		style: {
			"font-size": 10,
			"alignment-baseline": "central",
			fill: theme === "dark" ? "#d0d0d0" : "#151414",
		},
	};

	const panelColors = [
		theme === "dark" ? "#111" : "#b0b0b0",
		"#0e4429",
		"#26A641",
		"#39D353",
	];

	return (
		<section className="flex flex-col gap-2 ">
			<p className=" font-semibold text-background dark:text-text">
				{scrawls.length} contribution(s) in the last year
			</p>
			<section className="!-mr-2">
				<Calendar
					values={values}
					until={until}
					panelAttributes={panelAttributes}
					weekLabelAttributes={weekLabelAttributes}
					monthLabelAttributes={monthLabelAttributes}
					panelColors={panelColors}
					weekNames={weekNames}
				/>
			</section>
			<p className="ml-auto font-semibold text-background dark:text-text text-xs">
				Words: {wordsWritten || 0}
			</p>
		</section>
	);
};
