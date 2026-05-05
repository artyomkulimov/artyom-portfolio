import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "tap.tm showcase",
	description: "tap.tm mobile real-estate app showcase",
};

const stack = [
	"expo router",
	"react native",
	"kinde auth",
	"i18next",
	"image uploads",
	"native plugins",
];

const screens = [
	{
		title: "home feed",
		kicker: "browse",
		src: "/taptm/01-home.png",
		alt: "Tap.tm home feed with property cards and filters",
		body: "Search-first feed with rent/buy toggles, listing count, filters, sort controls, and property cards built for fast mobile scanning.",
	},
	{
		title: "profile hub",
		kicker: "account",
		src: "/taptm/02-profile.png",
		alt: "Tap.tm profile screen with user details and actions",
		body: "A compact account surface for view account, add property, favourites, owned listings, language switching, and support actions.",
	},
	{
		title: "property page",
		kicker: "listing",
		src: "/taptm/03-property-detail.png",
		alt: "Tap.tm property detail screen with images and listing data",
		body: "Full listing view with real imagery, price, specs, property metadata, and action affordances for a buyer or renter.",
	},
	{
		title: "account details",
		kicker: "settings",
		src: "/taptm/04-view-account.png",
		alt: "Tap.tm account screen with profile information",
		body: "Basic account page for viewing profile information and editing user details.",
	},
];

function PhoneShot({
	alt,
	className = "",
	priority = false,
	src,
}: {
	alt: string;
	className?: string;
	priority?: boolean;
	src: string;
}) {
	return (
		<div
			className={`rounded-[2rem] border border-neutral-950 bg-neutral-950 p-2 shadow-[0_28px_80px_rgba(23,23,23,0.22)] ${className}`}
		>
			<div className="overflow-hidden rounded-[1.55rem] bg-neutral-100">
				<Image
					alt={alt}
					className="h-auto w-full"
					height={2622}
					priority={priority}
					sizes="(min-width: 1280px) 340px, (min-width: 768px) 30vw, 78vw"
					src={src}
					width={1206}
				/>
			</div>
		</div>
	);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e53935]">
			{children}
		</p>
	);
}

export default function TapTmShowcasePage() {
	return (
		<section
			className="overflow-hidden bg-[#f7f3eb] text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50"
			data-showcase-page
		>
			<div className="border-neutral-200 border-b dark:border-neutral-800">
				<div className="mx-auto grid min-h-[760px] max-w-7xl grid-cols-1 gap-10 px-5 py-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8 lg:py-14">
					<div className="max-w-xl">
						<SectionLabel>mobile real-estate system</SectionLabel>
						<h1 className="mt-5 text-[4rem] font-semibold leading-[0.9] tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-[5.8rem]">
							tap.tm
						</h1>
						<p className="mt-6 max-w-lg text-lg leading-8 text-neutral-700 dark:text-neutral-300">
							A real-estate app built in Expo Router and React Native for
							browsing listings, saving properties, posting homes, and shipping
							a multilingual mobile experience.
						</p>

						<div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-neutral-800/70 border-l pl-4 text-neutral-500 text-sm dark:border-neutral-700">
							<span>multi-step property creation</span>
							<span>advanced listing filters</span>
							<span>image upload pipeline</span>
						</div>

						<div className="mt-7 flex flex-wrap gap-2">
							{stack.map((item) => (
								<span
									className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
									key={item}
								>
									{item}
								</span>
							))}
						</div>
					</div>

					<div className="relative min-h-[620px] md:min-h-[720px]">
						<div className="absolute left-[3%] top-[15%] hidden w-[33%] rotate-[-7deg] opacity-95 sm:block">
							<PhoneShot {...screens[1]} />
						</div>
						<div className="absolute right-[2%] top-[4%] w-[54%] max-w-[360px]">
							<PhoneShot {...screens[0]} priority />
						</div>
						<div className="absolute bottom-[2%] left-[19%] w-[48%] max-w-[330px] rotate-[4deg]">
							<PhoneShot {...screens[2]} />
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
				<div className="grid gap-14">
					{screens.map((screen, index) => (
						<article
							className={`grid gap-8 pt-10 md:grid-cols-[0.8fr_1.2fr] md:items-center ${
								index === 0
									? ""
									: "border-neutral-200 border-t dark:border-neutral-800"
							}`}
							key={screen.title}
						>
							<div className={index % 2 === 1 ? "md:order-2" : ""}>
								<SectionLabel>{screen.kicker}</SectionLabel>
								<h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
									{screen.title}
								</h2>
								<p className="mt-4 max-w-md text-base leading-7 text-neutral-700 dark:text-neutral-300">
									{screen.body}
								</p>
							</div>
							<div
								className={`mx-auto w-full max-w-[360px] ${
									index % 2 === 1
										? "md:justify-self-start"
										: "md:justify-self-end"
								}`}
							>
								<PhoneShot alt={screen.alt} src={screen.src} />
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
