"use client";

import type { FaqBlock as FaqBlockType } from "@/payload-types";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";

interface FaqBlockProps {
	block: FaqBlockType;
}

export function FaqBlock({ block }: FaqBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const questions = block.questions || [];
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
	const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
	const { ref: headerRef, isVisible: isHeaderVisible } =
		useScrollAnimation<HTMLDivElement>();

	useEffect(() => {
		const observers = itemRefs.current.map((item, index) => {
			if (!item) return null;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setVisibleItems((prev) => new Set(prev).add(index));
						}
					});
				},
				{ threshold: 0.1 },
			);

			observer.observe(item);
			return observer;
		});

		return () => {
			observers.forEach((observer) => observer?.disconnect());
		};
	}, [questions.length]);

	const toggleQuestion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section
			className="relative py-[100px] bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage:
					"url('https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/682dea0ca9db60ce45c39bed_Faq%20Bg.avif')",
			}}
		>
			<div className="relative z-[1] max-w-[1160px] mx-auto px-5 max-sm:px-4">
				<div className="w-full max-w-[947px] mx-auto">
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
												?
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

					{/* FAQ Items */}
					<div className="mt-20 flex flex-col gap-6 max-lg:gap-5">
						{questions.map((item, index) => {
							const iconUrl =
								typeof item.icon === "object" && item.icon?.url
									? item.icon.url
									: null;

							const isOpen = openIndex === index;
							const isVisible = visibleItems.has(index);

							return (
								<div
									key={index}
									ref={(el) => {
										itemRefs.current[index] = el;
									}}
									className={`
                    border-[3px] border-white rounded-xl cursor-pointer px-[30px] py-[34px] overflow-hidden
                    transition-all duration-700
                    ${
											isVisible
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-6 blur-[3px]"
										}
                    max-lg:px-6 max-lg:py-6
                    max-md:border-2 max-md:px-5 max-md:py-5
                    max-sm:px-4 max-sm:py-[18px]
                  `}
									style={{
										transitionDelay: `${index * 100}ms`,
									}}
									onClick={() => toggleQuestion(index)}
								>
									<div className="flex justify-between items-start">
										{/* Content Left */}
										<div className="flex gap-[15px] justify-start items-start">
											{iconUrl && (
												<img
													src={iconUrl}
													alt=""
													loading="lazy"
													className="flex-none mt-[3px] max-lg:w-[22px] max-lg:h-[22px] max-md:hidden"
												/>
											)}
											<div className="w-[90%]">
												<h4 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-2xl font-medium leading-8 max-lg:text-[22px] max-lg:leading-[30px] max-md:text-xl max-md:leading-7 max-sm:text-lg max-sm:leading-[26px]">
													{item.question}
												</h4>
												{/* Answer - Animated */}
												<div
													ref={(el) => {
														answerRefs.current[index] = el;
													}}
													className="overflow-hidden transition-all duration-300 ease-in-out"
													style={{
														height: isOpen
															? `${answerRefs.current[index]?.scrollHeight}px`
															: "0px",
													}}
												>
													<div className="text-brand-primary mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 pt-5 max-lg:pt-4 max-sm:pt-[14px]">
														{item.answer}
													</div>
												</div>
											</div>
										</div>

										{/* Arrow Box */}
										<div className="flex-none flex justify-center items-center w-4 h-4 relative max-md:w-[15px] max-md:h-[15px] max-sm:w-[14px] max-sm:h-[14px]">
											<div className="bg-brand-primary rounded-[20px] w-full h-[2px]"></div>
											<div
												className={`
                          bg-brand-primary rounded-[20px] w-[2px] h-full absolute
                          transition-transform duration-300
                          ${isOpen ? "scale-y-0" : "scale-y-100"}
                        `}
											></div>
										</div>
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
