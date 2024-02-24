"use client";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const AnimatedArrowButton = ({
	children,
	className,
}: {
	children: ReactNode;
	className: string;
}) => {
	return (
		<motion.div initial="default" whileHover="hover" className={className}>
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
