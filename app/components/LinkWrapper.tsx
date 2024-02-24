import Link from "next/link";
import { ReactNode } from "react";

export const LinkWrapper = ({
	children,
	href,
}: {
	children: ReactNode;
	href: string;
}) => {
	return (
		<Link href={href} prefetch={true}>
			{children}
		</Link>
	);
};
