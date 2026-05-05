"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
	const pathname = usePathname();
	const isShowcase = pathname.startsWith("/showcase/");
	if (isShowcase) {
		return (
			<header className="z-30 -mt-6 mb-0 w-full border-neutral-200 border-b bg-[#f7f3eb]/95 text-neutral-950 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95 dark:text-neutral-50">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-start px-5 md:px-8">
					<Link
						className="inline-grid h-10 grid-cols-[1rem_auto] items-center gap-2 text-sm leading-none text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
						href="/"
					>
						<ArrowLeft className="h-4 w-4" />
						<span className="block leading-none">portfolio</span>
					</Link>
				</div>
			</header>
		);
	}
	const navItems = [{ href: "/", name: "home" }];

	return (
		<aside className="-ml-[8px] mb-16 tracking-tight">
			<div className="lg:sticky lg:top-20">
				<nav
					className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
					id="nav"
				>
					<div className="flex flex-row space-x-0 pr-10">
						{navItems.map(({ href, name }) => {
							const isActive = pathname === href;
							return (
								<Link
									key={href}
									href={href}
									className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 ${
										isActive
											? "text-neutral-900 dark:text-neutral-100"
											: "text-neutral-500 dark:text-neutral-500"
									}`}
								>
									{name}
								</Link>
							);
						})}
					</div>
				</nav>
			</div>
		</aside>
	);
}
