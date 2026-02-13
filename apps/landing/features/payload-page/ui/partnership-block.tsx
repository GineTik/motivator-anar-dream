"use client";

import type { PartnershipBlock as PartnershipBlockType } from "@/payload-types";
import { CircleCheck } from "lucide-react";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";
import { Button } from "@/shared/ui/button";

interface PartnershipBlockProps {
	block: PartnershipBlockType;
}

export function PartnershipBlock({ block }: PartnershipBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const items = block.checklistItems || [];

	const { ref: headerRef, isVisible: isHeaderVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: contentRef, isVisible: isContentVisible } =
		useScrollAnimation<HTMLDivElement>();

	return (
		<section className="relative py-[60px] sm:py-[72px] md:py-[80px] lg:py-[100px]">
			<div className="relative z-[1] max-w-[1160px] mx-auto px-4 sm:px-5">
				<div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24 items-start">
					{/* Left — Badge + Heading */}
					<div
						ref={headerRef}
						className="w-full lg:w-[45%] lg:flex-shrink-0 flex flex-col justify-start items-start"
					>
						{/* Badge */}
						<div
							className={`flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)] ${fadeClass(isHeaderVisible)}`}
						>
							<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px] max-md:px-[10px] max-md:pl-[3px] max-sm:pr-[10px]">
								<div className="rounded-full w-[33px] h-6 p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)] max-md:w-10 max-sm:w-auto">
									<div className="relative z-[1] bg-white bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to rounded-full flex justify-center items-center w-[33px] h-6 p-0 max-md:p-[5px] max-md:w-10 max-md:h-8 max-sm:p-1 max-sm:w-auto max-sm:h-auto">
										{badgeIconUrl ? (
											<img
												src={badgeIconUrl}
												loading="lazy"
												alt=""
												className="relative z-[2] w-auto h-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)] max-md:w-[15px] max-sm:w-auto"
											/>
										) : (
											<div className="text-xl font-bold text-brand-purple">
												&#10022;
											</div>
										)}
									</div>
									<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-outline-from to-brand-badge-outline-to rounded-full absolute inset-0"></div>
								</div>
								<div className="flex">
									<div className="text-brand-primary tracking-[-0.03em] font-[family-name:var(--font-inter-tight)] text-base leading-6 font-normal max-sm:text-sm max-sm:leading-[22px]">
										{block.badge?.text}
									</div>
								</div>
							</div>
							<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-border-from to-brand-badge-border-to rounded-full absolute inset-0 max-sm:w-full"></div>
						</div>

						{/* Heading + Subtitle */}
						<div
							className={`mt-4 sm:mt-5 ${fadeClass(isHeaderVisible)}`}
							style={{ transitionDelay: "100ms" }}
						>
							<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-4xl leading-[44px] sm:text-5xl sm:leading-[56px] md:text-[52px] md:leading-[60px] font-medium">
								{block.heading}
							</h2>
							{block.subtitle && (
								<div className="text-brand-primary-alpha mt-4 sm:mt-5 mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6">
									{block.subtitle}
								</div>
							)}
						</div>
					</div>

					{/* Right — Checklist + CTA */}
					<div
						ref={contentRef}
						className="w-full lg:flex-1 flex flex-col justify-start items-start"
					>
						{/* Checklist */}
						<div
							className={`flex flex-col gap-4 sm:gap-5 ${fadeClass(isContentVisible)}`}
						>
							{items.map((item, index) => (
								<div
									key={item.id || index}
									className="flex gap-3 justify-start items-center"
								>
									<CircleCheck
										className={`w-6 h-6 flex-none ${item.highlighted ? "text-brand-accent" : "text-brand-purple"}`}
									/>
									<div
										className={`font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 ${item.highlighted ? "text-brand-accent font-medium" : "text-brand-primary"}`}
									>
										{item.text}
									</div>
								</div>
							))}
						</div>

						{/* CTA Button */}
						<div
							className={`mt-8 sm:mt-10 ${fadeClass(isContentVisible)}`}
							style={{ transitionDelay: "100ms" }}
						>
							<Button href={block.buttonLink || "#"} variant="gradient">
								{block.buttonText}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
