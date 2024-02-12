import { ThemeToggler } from "@/app/providers/ThemeProvider";
import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
	return (
		<nav className="flex items-center justify-end w-full p-4 gap-4">
			<button className="flex flex-row items-center justify-center gap-2 font-semibold ">
				Signup / Login
			</button>
			<UserButton afterSignOutUrl="/" />
			<ThemeToggler />
		</nav>
	);
};
