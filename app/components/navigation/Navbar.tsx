import { ThemeToggler } from "@/app/providers/ThemeProvider";
import { UserButton } from "@clerk/nextjs";
import cyclops_3 from "@/public/cyclops_3.svg";
import Image from "next/image";
export const Navbar = () => {
	return (
		<nav className="flex items-center justify-between w-full p-4 gap-4">
			<ul className="flex items-center gap-4">
				<Image src={cyclops_3} alt="cyclops" width={40} height={40} />
				<h1 className="font-semibold text-lg">Daily Scrawl</h1>
			</ul>
			<section className="flex">
				<button className="flex flex-row items-center justify-center gap-2 font-semibold ">
					Signup / Login
				</button>
				<UserButton afterSignOutUrl="/" />
				<ThemeToggler />
			</section>
		</nav>
	);
};
