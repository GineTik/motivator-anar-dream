"use client";

import type { PricingAltBlock as PricingAltBlockType } from "@/payload-types";
import { useState } from "react";
import {
	useScrollAnimation,
	useStaggerAnimation,
	fadeClass,
} from "../lib/use-scroll-animation";

interface PricingAltBlockProps {
	block: PricingAltBlockType;
}

export function PricingAltBlock({ block }: PricingAltBlockProps) {
	const [isYearly, setIsYearly] = useState(false);

	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const plans = block.plans || [];

	const { ref: headerRef, isVisible: isHeaderVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: toggleRef, isVisible: isToggleVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { visibleItems: visibleCards, setItemRef: setCardRef } =
		useStaggerAnimation(plans.length);

	return (
		<section className="py-[60px] sm:py-[72px] md:py-[80px] lg:py-[100px]">
			<div className="relative z-[1] max-w-[1160px] mx-auto px-4 sm:px-5">
				<div className="w-full">
					{/* Header */}
					<div
						ref={headerRef}
						className="flex flex-col justify-start items-center max-w-[588px] mx-auto"
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
												&#9733;
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
							className={`flex flex-col gap-4 sm:gap-5 justify-start items-center w-full mt-4 sm:mt-5 ${fadeClass(isHeaderVisible)}`}
							style={{ transitionDelay: "100ms" }}
						>
							<div>
								<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-4xl leading-[44px] sm:text-5xl sm:leading-[56px] md:text-[52px] md:leading-[60px] font-medium text-center">
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

					{/* Tabs + Cards */}
					<div className="mt-7 sm:mt-8 md:mt-10">
						<div className="flex flex-col justify-start items-center">
							{/* Tab Menu */}
							<div
								ref={toggleRef}
								className={`rounded-xl bg-white border-2 border-[rgba(235,237,255,0.6)] flex justify-center items-center p-1 overflow-hidden ${fadeClass(isToggleVisible)}`}
							>
								<button
									onClick={() => setIsYearly(false)}
									className={`flex gap-2.5 justify-center items-center rounded-[7px] px-[22px] py-2 border-none cursor-pointer transition-colors duration-200 ${
										!isYearly ? "bg-[#7b87fe]" : "bg-transparent"
									}`}
								>
									<span
										className={`font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 tracking-[-0.01em] ${
											!isYearly ? "text-white" : "text-brand-primary"
										}`}
									>
										Monthly
									</span>
								</button>
								<button
									onClick={() => setIsYearly(true)}
									className={`flex gap-2.5 justify-center items-center rounded-[7px] px-[22px] py-2 border-none cursor-pointer transition-colors duration-200 ${
										isYearly ? "bg-[#7b87fe]" : "bg-transparent"
									}`}
								>
									<span
										className={`font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 tracking-[-0.01em] ${
											isYearly ? "text-white" : "text-brand-primary"
										}`}
									>
										Yearly
									</span>
									{block.discountLabel && (
										<span
											className={`font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 tracking-[-0.03em] ${
												isYearly ? "text-white/80" : "text-[#7b87fe]"
											}`}
										>
											{block.discountLabel}
										</span>
									)}
								</button>
							</div>

							{/* Plan Cards */}
							<div className="w-full mt-7 sm:mt-8 md:mt-10">
								<div className="flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 justify-center">
									{plans.map((plan, index) => {
										const planBadgeIconUrl =
											typeof plan.badgeIcon === "object" && plan.badgeIcon?.url
												? plan.badgeIcon.url
												: null;

										return (
											<div
												key={index}
												ref={setCardRef(index)}
												className={`flex-1 ${fadeClass(visibleCards.has(index))}`}
												style={{ transitionDelay: `${index * 100}ms` }}
											>
												<div className="rounded-[10px] backdrop-blur-[32px] bg-brand-pricing-card-bg h-full p-1 max-md:p-[3px] overflow-hidden">
													<div className="rounded-[10px] bg-white w-full h-full">
														{/* Top */}
														<div className="pt-[3px] px-[3px]">
															<div
																className={`rounded-[10px] p-5 sm:p-6 md:p-8 relative bg-cover bg-center bg-no-repeat ${
																	plan.highlighted
																		? "bg-gradient-to-b from-brand-pricing-card-gradient-from to-brand-pricing-card-gradient-to"
																		: ""
																}`}
																style={
																	!plan.highlighted
																		? {
																				backgroundImage:
																					"url('https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/682da1907d1e927627bac0f9_Plan%20Bg.avif')",
																			}
																		: undefined
																}
															>
																{/* Plan Badge - positioned absolutely on desktop, static on tablet */}
																{plan.badgeText && (
																	<div className="lg:absolute lg:top-5 lg:right-5 mb-3 lg:mb-0 flex justify-start items-start">
																		<div className="flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)]">
																			<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px]">
																				{planBadgeIconUrl && (
																					<div className="rounded-full w-[33px] h-6 p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)]">
																						<div className="relative z-[1] bg-white bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to rounded-full flex justify-center items-center w-[33px] h-6 p-0">
																							<img
																								src={planBadgeIconUrl}
																								loading="lazy"
																								alt=""
																								className="relative z-[2] w-auto h-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)]"
																							/>
																						</div>
																						<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-outline-from to-brand-badge-outline-to rounded-full absolute inset-0"></div>
																					</div>
																				)}
																				<div className="flex">
																					<div className="text-brand-primary tracking-[-0.03em] font-[family-name:var(--font-inter-tight)] text-base leading-6 font-normal">
																						{plan.badgeText}
																					</div>
																				</div>
																			</div>
																			<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-border-from to-brand-badge-border-to rounded-full absolute inset-0"></div>
																		</div>
																	</div>
																)}

																{/* Plan Name */}
																<h4 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-2xl font-medium leading-8 max-md:text-[22px] max-md:leading-[30px] max-sm:text-xl max-sm:leading-7">
																	{plan.name}
																</h4>

																{/* Price */}
																<div className="flex gap-1 items-end mt-3.5 sm:mt-5 md:mt-8">
																	<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-4xl leading-[44px] sm:text-5xl sm:leading-[56px] md:text-[52px] md:leading-[60px] font-medium">
																		{isYearly
																			? plan.yearlyPrice || plan.monthlyPrice
																			: plan.monthlyPrice}
																	</h2>
																	<div className="text-brand-pricing-period mb-2 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6">
																		{isYearly
																			? plan.yearlyPeriod || plan.period
																			: plan.period}
																	</div>
																</div>

																{/* Button */}
																<div className="mt-5 md:mt-[25px]">
																	<a
																		href={plan.buttonLink || "#"}
																		className="relative flex justify-center items-center bg-gradient-to-b from-brand-gradient-from to-brand-gradient-to rounded-full w-full max-w-full py-3.5 sm:py-4 md:py-[18px] px-6 sm:px-7 md:px-[35px] no-underline overflow-hidden group"
																	>
																		<div className="relative z-[2] text-white font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 tracking-[-0.01em]">
																			{plan.buttonText}
																		</div>
																		<div className="absolute inset-0 bg-brand-primary rounded-full opacity-100"></div>
																		<div className="absolute inset-0 bg-gradient-to-b from-brand-gradient-from to-brand-gradient-to rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
																	</a>
																</div>
															</div>
														</div>

														{/* Features */}
														<div className="flex flex-wrap gap-x-8 gap-y-2 sm:gap-y-2.5 md:gap-y-[15px] p-5 sm:p-6 md:p-8 pt-5 sm:pt-7 md:pt-10">
															{(plan.features || []).map(
																(feature, featureIndex) => (
																	<div
																		key={featureIndex}
																		className="flex gap-2.5 sm:gap-3 justify-start items-center"
																	>
																		<svg
																			width="16"
																			height="16"
																			viewBox="0 0 16 16"
																			fill="none"
																			xmlns="http://www.w3.org/2000/svg"
																			className="flex-none"
																		>
																			<path
																				d="M13.3337 4L6.00033 11.3333L2.66699 8"
																				stroke="#594bec"
																				strokeWidth="2"
																				strokeLinecap="round"
																				strokeLinejoin="round"
																			/>
																		</svg>
																		<div className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6">
																			{feature.text}
																		</div>
																	</div>
																),
															)}
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
