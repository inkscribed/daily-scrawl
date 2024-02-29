import Link from "next/link";
import { ThemeToggler } from "../ThemeToggler";
import { Icon } from "./Icon";
import { UserButton } from "@clerk/nextjs";
import { IconHelpHexagon, IconLogin } from "@tabler/icons-react";
import { ParamPusher } from "../buttons/ParamPusher";
import { ToolTipWrapper } from "../ui/TooltipWrapper";
import { clerkUser } from "@/app/lib/actions";

export const Navbar = async () => {
	const userId = await clerkUser();

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
				{userId ? (
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
				) : (
					<ToolTipWrapper label="Login">
						<Link
							href="/sign-in"
							className="p-2 bg-violet-500/50 rounded-md text-background  hover:bg-violet-600/50 dark:text-textDark duration-300 transition-all"
						>
							<IconLogin size={22} />
						</Link>
					</ToolTipWrapper>
				)}

				<ParamPusher
					param={`/?show=true&step=0`}
					className="p-2 border border-lightBorder dark:border-border rounded-md bg-primary-500 text-background dark:text-textDark hover:bg-hoverLight dark:hover:bg-hoverDark duration-300 transition-all ease-in-out"
				>
					<IconHelpHexagon size={22} />
				</ParamPusher>
				<ThemeToggler />
			</section>
		</nav>
	);
};
