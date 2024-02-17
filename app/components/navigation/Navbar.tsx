import Link from "next/link";
import { ThemeToggler } from "../ThemeToggler";
import { Icon } from "./Icon";
import { UserButton } from "@clerk/nextjs";
import { IconHelpHexagon } from "@tabler/icons-react";
import { ParamPusher } from "../buttons/ParamPusher";

export const Navbar = () => {
	return (
		<nav className="flex items-center justify-between w-full p-4 gap-4">
			<ul>
				<li>
					<Link href="/" className="flex items-center gap-4">
						<Icon />
						<h1 className="font-semibold text-lg">Daily Scrawl</h1>
					</Link>
				</li>
			</ul>
			<section className="flex items-center gap-2">
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox:
								"rounded-md h-10 w-10 border border-lightBorder dark:border-border",
							avatar: "rounded-md",
							userButtonBox__open: "rounded-md",
							userButtonAvatarBox__open: "rounded-md",
							userButtonTrigger__open: "rounded-md",
						},
					}}
				/>
				<ParamPusher
					param={`/?show=true&step=1`}
					className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-text hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out"
				>
					<IconHelpHexagon size={22} />
				</ParamPusher>
				<ThemeToggler />
			</section>
		</nav>
	);
};
