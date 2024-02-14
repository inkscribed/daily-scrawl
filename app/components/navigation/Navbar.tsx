import { ThemeToggler } from "../ThemeToggler";
import { Icon } from "./Icon";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
	return (
		<nav className="flex items-center justify-between w-full p-4 gap-4">
			<ul className="flex items-center gap-4">
				<Icon />
				<h1 className="font-semibold text-lg">Daily Scrawl</h1>
			</ul>
			<section className="flex items-center gap-2">
				<SignedOut>
					<SignInButton>
						<button className="flex flex-row items-center justify-center gap-2 font-semibold">
							Sign in
						</button>
					</SignInButton>
				</SignedOut>
				<UserButton afterSignOutUrl="/" />
				<ThemeToggler />
			</section>
		</nav>
	);
};
