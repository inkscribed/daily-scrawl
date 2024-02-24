"use client";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const AnimatedArrowButton = ({ children }: { children: ReactNode }) => {
	return (
		<motion.div
			initial="default"
			whileHover="hover"
			className="text-sm hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text duration-300 transition-all ease-in-out rounded px-3 py-1 flex items-center"
		>
			{children}
			<motion.div
				variants={{
					default: { x: 0, opacity: 0, width: 0 },
					hover: { x: 5, opacity: 1, width: "auto" },
				}}
			>
				<IconArrowRight size={18} />
			</motion.div>
		</motion.div>
	);
};
