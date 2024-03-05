"use client";
import { useDisclosure } from "@mantine/hooks";
import { FC, ReactNode, createContext, useContext } from "react";

type states = {
	opened: boolean;
	open: () => void;
	close: () => void;
};

export const StateContext = createContext<states>({
	opened: false,
	open: () => {},
	close: () => {},
});

export const StateProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<StateContext.Provider
			value={{
				opened,
				open,
				close,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStates = () => {
	return useContext(StateContext);
};
