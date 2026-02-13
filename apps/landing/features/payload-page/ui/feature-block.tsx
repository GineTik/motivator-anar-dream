"use client";

import type { FeatureBlock as FeatureBlockType } from "@/payload-types";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";

interface FeatureBlockProps {
	block: FeatureBlockType;
}

export function FeatureBlock({ block }: FeatureBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const features = block.features || [];
	const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const { ref: headerRef, isVisible: isHeaderVisible } =
		useScrollAnimation<HTMLDivElement>();

	useEffect(() => {
		const observers = cardRefs.current.map((card, index) => {
			if (!card) return null;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setVisibleCards((prev) => new Set(prev).add(index));
						}
					});
				},
				{ threshold: 0.1 },
			);

			observer.observe(card);
			return observer;
		});

		return () => {
			observers.forEach((observer) => observer?.disconnect());
		};
	}, [features.length]);

	return (
		<section
			className="relative py-[100px] bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage:
					"url('https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/6830d5b440b966d23f265b23_Features%20Bg.avif')",
			}}
		>
			<div className="relative z-[1] max-w-[1160px] mx-auto px-5">
				<div className="w-full">
					{/* Header Content */}
					<div
						ref={headerRef}
						className="flex flex-col justify-start items-center max-w-[657px] mx-auto"
					>
						{/* Badge */}
						<div
							className={`flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)] ${fadeClass(isHeaderVisible)}`}
						>
							<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px]">
								<div className="rounded-full w-[33px] h-6 p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)]">
									<div className="relative z-[1] bg-white bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to rounded-full flex justify-center items-center w-[33px] h-6 p-0">
										{badgeIconUrl ? (
											<img
												src={badgeIconUrl}
												loading="lazy"
												alt=""
												className="relative z-[2] w-auto h-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)]"
											/>
										) : (
											<div className="text-xl font-bold text-brand-purple">
												✦
											</div>
										)}
									</div>
									<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-outline-from to-brand-badge-outline-to rounded-full absolute inset-0"></div>
								</div>
								<div className="flex">
									<div className="text-brand-primary tracking-[-0.03em] font-[family-name:var(--font-inter-tight)] text-base leading-6 font-normal">
										{block.badge?.text}
									</div>
								</div>
							</div>
							<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-border-from to-brand-badge-border-to rounded-full absolute inset-0"></div>
						</div>

						{/* Heading and Subtitle */}
						<div
							className={`flex flex-col gap-5 justify-start items-center w-full mt-5 ${fadeClass(isHeaderVisible)}`}
							style={{ transitionDelay: "100ms" }}
						>
							<div>
								<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-[52px] font-medium leading-[60px] text-center max-md:text-5xl max-md:leading-[56px] max-sm:text-4xl max-sm:leading-[44px]">
									{block.heading}
								</h2>
							</div>
							<div>
								<div className="text-brand-primary mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 text-center">
									{block.subtitle}
								</div>
							</div>
						</div>
					</div>

					{/* Features Grid */}
					<div className="mt-20 grid grid-cols-12 gap-5 w-full max-lg:gap-4">
						{features.map((feature, index) => {
							const iconUrl =
								typeof feature.icon === "object" && feature.icon?.url
									? feature.icon.url
									: null;
							const imageUrl =
								typeof feature.image === "object" && feature.image?.url
									? feature.image.url
									: null;

							const isLarge = feature.layoutType === "large";
							const isVisible = visibleCards.has(index);

							return (
								<div
									key={index}
									ref={(el) => {
										cardRefs.current[index] = el;
									}}
									className={`
                    ${isLarge ? "col-span-12 lg:col-span-6" : "col-span-12 md:col-span-6 lg:col-span-4"}
                    rounded-xl backdrop-blur-[40.55px] bg-brand-feature-card-bg p-1 overflow-hidden
                    shadow-[0_12px_80px_-10px_rgba(176,184,210,0.24)]
                    transition-all duration-700
                    ${
											isVisible
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-6"
										}
                  `}
									style={{
										transitionDelay: `${index * 100}ms`,
									}}
								>
									<div className="border-2 border-white rounded-[10px] bg-gradient-to-b from-brand-feature-card-gradient-from via-brand-feature-card-gradient-via to-brand-feature-card-gradient-to flex flex-col justify-between h-full overflow-hidden max-lg:gap-5 gap-10">
										{/* Card Top */}
										<div className="flex flex-col gap-8 justify-start items-start pt-9 px-7 max-lg:pt-7 max-lg:px-6 max-sm:pt-5 max-sm:px-5">
											{/* Icon */}
											<div
												className={`
                          rounded-full w-16 h-16 p-[0.82px] relative overflow-hidden
                          shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)]
                          transition-transform duration-500
                          ${isVisible ? "scale-100" : "scale-0"}
                          max-lg:w-[52px] max-lg:h-[52px]
                          max-sm:w-12 max-sm:h-12
                        `}
												style={{
													transitionDelay: `${index * 100 + 200}ms`,
												}}
											>
												<div className="relative z-[1] bg-white rounded-full flex justify-center items-center w-full h-full">
													{iconUrl ? (
														<img
															src={iconUrl}
															alt=""
															className="relative z-[1] w-auto max-lg:w-[22px] max-sm:w-5"
														/>
													) : (
														<div className="text-2xl font-bold text-brand-purple">
															◆
														</div>
													)}
												</div>
												<div className="bg-gradient-to-b from-brand-feature-icon-gradient-from to-brand-feature-icon-gradient-to absolute inset-0"></div>
											</div>

											{/* Text */}
											<div
												className={`
                          flex flex-col gap-3 justify-start items-start
                          transition-all duration-700
                          ${
														isVisible
															? "opacity-100 translate-y-0"
															: "opacity-0 translate-y-4 blur-[3px]"
													}
                        `}
												style={{
													transitionDelay: `${index * 100 + 300}ms`,
												}}
											>
												<h4 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-2xl font-medium leading-8 max-md:text-[22px] max-md:leading-[30px] max-sm:text-xl max-sm:leading-7">
													{feature.heading}
												</h4>
												<div className="text-brand-primary mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6">
													{feature.description}
												</div>
											</div>
										</div>

										{/* Card Bottom - Image */}
										{imageUrl && (
											<div
												className={`
                          flex justify-start items-end
                          ${isLarge ? "pb-[30px] pl-10 max-lg:pb-5 max-lg:pl-6 max-sm:pb-3 max-sm:pl-5" : "pb-3 pl-7 max-lg:pl-6 max-sm:pl-5"}
                          transition-all duration-700
                          ${
														isVisible
															? "opacity-100 translate-y-0"
															: "opacity-0 translate-y-6 blur-[3px]"
													}
                        `}
												style={{
													transitionDelay: `${index * 100 + 400}ms`,
												}}
											>
												<img
													src={imageUrl}
													alt={feature.heading}
													loading="lazy"
													className="w-full"
												/>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
