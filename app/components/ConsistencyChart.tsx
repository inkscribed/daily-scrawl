"use client";
import Calendar from "react-github-contribution-calendar";
import { useTheme } from "next-themes";

export const ConsistencyChart = () => {
	const { theme } = useTheme();
	const weekNames = ["", "M", "", "W", "", "F", ""];
	const values = {
		"2024-02-14": 2,
		"2024-02-15": 3,
		"2024-02-16": 1,
	};
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
				1 contribution(s) in the last year
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
		</section>
	);
};
