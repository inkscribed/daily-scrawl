"use client";
import { useDisclosure } from "@mantine/hooks";
import { FC, ReactNode, createContext, useContext, useState } from "react";

type states = {
	opened: boolean;
	open: () => void;
	close: () => void;
	mode: 10 | 60;
	setMode: (mode: 10 | 60) => void;
	start: boolean;
	setStart: (start: boolean) => void;
};

export const StateContext = createContext<states>({
	opened: false,
	open: () => {},
	close: () => {},
	mode: 10,
	setMode: () => {},
	start: false,
	setStart: () => {},
});

export const StateProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [mode, setMode] = useState<10 | 60>(10);
	const [start, setStart] = useState<boolean>(false);

	return (
		<StateContext.Provider
			value={{
				opened,
				open,
				close,
				mode,
				setMode,
				start,
				setStart,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStates = () => {
	return useContext(StateContext);
};
