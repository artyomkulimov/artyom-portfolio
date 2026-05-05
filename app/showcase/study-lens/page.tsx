import {
	BrainCircuit,
	Camera,
	Keyboard,
	MessageSquare,
	Network,
} from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "study lens showcase",
	description: "Private AI study assistant showcase",
};

const flow = [
	{
		icon: Keyboard,
		label: "hotkey capture",
		body: "Python desktop agent grabs the current problem or worksheet state.",
	},
	{
		icon: Network,
		label: "live relay",
		body: "A WebSocket bridge moves the screenshot into the web UI without a manual upload loop.",
	},
	{
		icon: BrainCircuit,
		label: "AI review",
		body: "The model checks the work, spots the weak step, and explains the correction.",
	},
	{
		icon: MessageSquare,
		label: "feedback UI",
		body: "Next.js chat surface keeps the answer readable, focused, and easy to revise from.",
	},
];

const skills = [
	"desktop automation",
	"websocket relay",
	"multimodal prompting",
	"next.js chat ui",
	"python agent",
	"private prototype",
];

const screens = [
	{
		title: "question to answer",
		kicker: "answer",
		src: "/study-lens/content.png",
		alt: "Study Lens showing a question paper screenshot and a model answer",
		body: "A captured question paper sits above the model answer, so the study flow is visible in one readable screen.",
	},
];

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<p className="font-semibold text-[#59d6c9] text-[11px] uppercase tracking-[0.22em]">
			{children}
		</p>
	);
}

function SkillButton({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex rounded-md border border-white/10 bg-white/[0.06] px-3 py-1.5 font-medium text-neutral-300 text-xs shadow-sm">
			{children}
		</span>
	);
}

function BrowserShot({
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
			className={`rounded-lg border border-[#59d6c9]/15 bg-[#06110f] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.35)] ${className}`}
		>
			<div className="overflow-hidden rounded-md bg-neutral-950">
				<Image
					alt={alt}
					className="h-auto w-full"
					height={1830}
					priority={priority}
					sizes="(min-width: 1280px) 560px, (min-width: 768px) 48vw, 92vw"
					src={src}
					width={2928}
				/>
			</div>
		</div>
	);
}

function ScreenshotStack() {
	return (
		<div className="relative flex min-h-[520px] items-center justify-center md:min-h-[650px]">
			<BrowserShot
				alt={screens[0].alt}
				className="w-full max-w-[760px]"
				priority
				src={screens[0].src}
			/>
		</div>
	);
}

export default function StudyLensShowcasePage() {
	return (
		<section
			className="overflow-hidden bg-[#050807] text-neutral-50"
			data-showcase-page
		>
			<div className="border-neutral-800 border-b">
				<div className="mx-auto grid min-h-[760px] max-w-7xl grid-cols-1 gap-10 px-5 py-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8 lg:py-14">
					<div className="max-w-xl">
						<SectionLabel>private ai study prototype</SectionLabel>
						<h1 className="mt-5 text-[4rem] font-semibold leading-[0.9] tracking-tight text-neutral-50 sm:text-[5.8rem]">
							study lens
						</h1>
						<p className="mt-6 max-w-lg text-lg leading-8 text-neutral-300">
							A screenshot-based study companion for reviewing solved problems,
							checking reasoning, and turning mistakes into focused feedback.
						</p>

						<div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-neutral-700 border-l pl-4 text-neutral-500 text-sm">
							<span>spacebar capture loop</span>
							<span>model-answer output</span>
							<span>exam question context</span>
						</div>

						<div className="mt-7 flex flex-wrap gap-2">
							{skills.map((skill) => (
								<SkillButton key={skill}>{skill}</SkillButton>
							))}
						</div>
					</div>

					<ScreenshotStack />
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
				<div className="grid gap-14">
					{screens.map((screen) => (
						<article
							className="grid gap-8 pt-10 md:grid-cols-[0.8fr_1.2fr] md:items-center"
							key={screen.title}
						>
							<div>
								<SectionLabel>{screen.kicker}</SectionLabel>
								<h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-50">
									{screen.title}
								</h2>
								<p className="mt-4 max-w-md text-base leading-7 text-neutral-300">
									{screen.body}
								</p>
							</div>
							<div
								className="mx-auto w-full max-w-[860px] md:justify-self-end"
							>
								<BrowserShot alt={screen.alt} src={screen.src} />
							</div>
						</article>
					))}
				</div>

				<div className="mt-16 border-neutral-800 border-t pt-12">
					<div className="mb-8 flex items-end justify-between gap-6">
						<div>
							<SectionLabel>system shape</SectionLabel>
							<h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-50">
								from capture to explanation
							</h2>
						</div>
						<div className="hidden items-center gap-2 text-neutral-500 text-sm md:flex">
							<Camera className="h-4 w-4" />
							screenshot-first workflow
						</div>
					</div>

					<div className="grid gap-3 md:grid-cols-4">
						{flow.map((item) => {
							const Icon = item.icon;

							return (
								<div
									className="rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-sm"
									key={item.label}
								>
									<div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-[#59d6c9]/20 bg-[#59d6c9]/10 text-[#59d6c9]">
										<Icon className="h-4 w-4" />
									</div>
									<h3 className="font-semibold text-neutral-100 text-sm">
										{item.label}
									</h3>
									<p className="mt-2 text-neutral-400 text-sm leading-6">
										{item.body}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
