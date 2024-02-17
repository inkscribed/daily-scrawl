" use client ";
import { FC, ReactNode } from "react";

export const ButtonWrapper: FC<{
	children: ReactNode;
	onClick?: () => void;
	className?: string;
}> = ({ children, onClick, className }) => {
	return (
		<button
			onClick={onClick}
			className={`p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out ${className}`}
		>
			{children}
		</button>
	);
};
