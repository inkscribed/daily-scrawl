import { Affix } from "@mantine/core";
import { ReactNode } from "react";

export const DetailsAffix = ({ children }: { children: ReactNode }) => {
	return (
		<Affix position={{ bottom: 20, left: 20 }} zIndex={1}>
			{children}
		</Affix>
	);
};
