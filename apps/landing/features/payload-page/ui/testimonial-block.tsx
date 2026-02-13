"use client";

import type { TestimonialBlock as TestimonialBlockType } from "@/payload-types";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";

interface TestimonialBlockProps {
	block: TestimonialBlockType;
}

export function TestimonialBlock({ block }: TestimonialBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const testimonials = block.testimonials || [];
	const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
	}, [testimonials.length]);

	return (
		<section className="relative py-[100px]">
			<div className="relative z-[1] max-w-[1160px] mx-auto px-5 max-sm:px-4">
				<div className="w-full">
					{/* Header Content */}
					<div
						ref={headerRef}
						className="flex flex-col justify-start items-center max-w-[701px] mx-auto"
					>
						{/* Badge */}
						<div
							className={`flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)] ${fadeClass(isHeaderVisible)}`}
						>
							<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px] max-md:px-[10px] max-md:pl-[3px] max-sm:pr-[10px]">
								<div className="rounded-full w-[33px] h-6 p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)] max-md:w-10 max-sm:w-auto">
									<div className="relative z-[1] bg-white bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to rounded-full flex justify-center items-center w-[33px] h-6 p-0 max-md:p-[6px] max-md:w-10 max-md:h-8 max-sm:p-1 max-sm:w-auto max-sm:h-auto">
										{badgeIconUrl ? (
											<img
												src={badgeIconUrl}
												loading="lazy"
												alt=""
												className="relative z-[2] w-auto h-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)] max-md:w-[15px] max-sm:w-auto"
											/>
										) : (
											<div className="text-xl font-bold text-brand-purple">
												♥
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

						{/* Heading and Subtitle */}
						<div
							className={`flex flex-col gap-5 justify-start items-center w-full mt-5 max-sm:gap-4 max-sm:mt-4 ${fadeClass(isHeaderVisible)}`}
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

					{/* Testimonials Grid */}
					<div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-lg:gap-5 max-md:gap-4">
						{testimonials.map((testimonial, index) => {
							const logoUrl =
								typeof testimonial.logo === "object" && testimonial.logo?.url
									? testimonial.logo.url
									: null;
							const authorImageUrl =
								typeof testimonial.authorImage === "object" &&
								testimonial.authorImage?.url
									? testimonial.authorImage.url
									: null;

							const isHighlighted = testimonial.cardStyle === "highlighted";
							const isDouble = testimonial.gridSpan === "double";
							const isVisible = visibleCards.has(index);
							const isHovered = hoveredCard === index;

							return (
								<div
									key={index}
									ref={(el) => {
										cardRefs.current[index] = el;
									}}
									className={`
                    ${isDouble ? "lg:row-span-2" : ""}
                    rounded-xl p-8 relative overflow-hidden
                    ${
											isHighlighted
												? "border-2 border-brand-primary bg-brand-primary"
												: "border-2 border-brand-testimonial-border bg-white"
										}
                    transition-all duration-700
                    ${
											isVisible
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-6 blur-[3px]"
										}
                    max-lg:p-8
                    max-md:p-6
                    max-sm:p-5
                  `}
									style={{
										transitionDelay: `${index * 80}ms`,
									}}
									onMouseEnter={() => setHoveredCard(index)}
									onMouseLeave={() => setHoveredCard(null)}
								>
									{/* Card Content */}
									<div className="relative z-[1] flex flex-col justify-between w-full h-full gap-[18px] max-lg:gap-7">
										{/* Top Content */}
										<div className="flex flex-col justify-start items-start">
											{logoUrl && (
												<img
													src={logoUrl}
													alt=""
													loading="lazy"
													className="max-md:w-[120px] max-sm:w-[100px]"
												/>
											)}
											{!logoUrl && (
												<div
													className={`font-[family-name:var(--font-inter-tight)] text-xl leading-[30px] font-normal ${
														isHighlighted ? "text-white" : "text-brand-primary"
													} max-md:text-lg max-md:leading-7 max-sm:text-lg max-sm:leading-7`}
												>
													{testimonial.quote}
												</div>
											)}
										</div>

										{/* Bottom Content */}
										<div className="flex flex-col gap-[14px]">
											{logoUrl && (
												<div
													className={`font-[family-name:var(--font-inter-tight)] text-xl leading-[30px] font-normal ${
														isHighlighted ? "text-white" : "text-brand-primary"
													} max-md:text-lg max-md:leading-7 max-sm:text-lg max-sm:leading-7`}
												>
													{testimonial.quote}
												</div>
											)}

											{/* Author Info */}
											<div className="flex gap-[10px] justify-between items-center">
												<div className="flex flex-col">
													<div
														className={`tracking-[-0.01em] font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 ${
															isHighlighted
																? "text-white"
																: "text-brand-primary"
														}`}
													>
														{testimonial.authorName}
													</div>
													<div
														className={`tracking-[-0.03em] font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 mt-[2px] ${
															isHighlighted
																? "text-brand-testimonial-tagline-white"
																: "text-brand-testimonial-tagline"
														}`}
													>
														{testimonial.authorRole}
													</div>
												</div>
												{authorImageUrl && (
													<img
														src={authorImageUrl}
														alt={testimonial.authorName}
														loading="lazy"
														className="flex-none w-12 h-12 rounded-full"
													/>
												)}
											</div>
										</div>
									</div>

									{/* Hover Gradient Overlay */}
									{!isHighlighted && (
										<div
											className={`
                      bg-gradient-to-b from-brand-testimonial-card-gradient-from via-brand-testimonial-card-gradient-via to-brand-testimonial-card-gradient-to
                      absolute inset-0
                      transition-all duration-500
                      ${isHovered ? "opacity-100 -translate-y-0" : "opacity-0 -translate-y-[30%]"}
                    `}
										></div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
