"use client";

import { IconBooks } from "@tabler/icons-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Affix } from "@mantine/core";

export const DetailsAffix = () => {
	const router = useRouter();
	const path = usePathname();
	const details = useSearchParams().get("details");

	if (details) {
		return null;
	}

	return (
		<Affix position={{ bottom: 20, left: 20 }}>
			<button
				className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out"
				type="button"
				onClick={() => router.push(`${path}?details=true`)}
			>
				<IconBooks size={22} />
			</button>
		</Affix>
	);
};
