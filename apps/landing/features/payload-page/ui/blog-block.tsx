"use client";

import type { BlogBlock as BlogBlockType } from "@/payload-types";
import {
	useScrollAnimation,
	useStaggerAnimation,
	fadeClass,
} from "../lib/use-scroll-animation";

interface BlogBlockProps {
	block: BlogBlockType;
}

export function BlogBlock({ block }: BlogBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const posts = block.posts || [];
	const totalCards = posts.length + (block.explore ? 1 : 0);

	const { ref: headerRef, isVisible: isHeaderVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { visibleItems: visibleCards, setItemRef: setCardRef } =
		useStaggerAnimation(totalCards);

	return (
		<section className="py-[60px] sm:py-[72px] md:py-[80px] lg:py-[100px]">
			<div className="relative z-[1] max-w-[1160px] mx-auto px-4 sm:px-5">
				<div className="w-full">
					{/* Header */}
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
												&#9998;
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

					{/* Blog Grid */}
					<div className="mt-[60px] sm:mt-[60px] md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
						{/* Blog Posts */}
						{posts.map((post, index) => {
							const imageUrl =
								typeof post.image === "object" && post.image?.url
									? post.image.url
									: null;

							return (
								<div
									key={index}
									ref={setCardRef(index)}
									className={`w-full ${fadeClass(visibleCards.has(index))}`}
									style={{ transitionDelay: `${index * 100}ms` }}
								>
									<a
										href={post.href || "#"}
										className="w-full no-underline group"
									>
										{/* Image */}
										<div className="rounded-xl w-full h-[218px] overflow-hidden">
											{imageUrl ? (
												<img
													src={imageUrl}
													loading="lazy"
													alt={post.title || ""}
													className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
												/>
											) : (
												<div className="w-full h-full bg-gradient-to-br from-brand-pricing-card-gradient-to to-brand-feature-card-gradient-from flex items-center justify-center">
													<span className="text-brand-primary-alpha text-sm">
														Image
													</span>
												</div>
											)}
										</div>
										{/* Details */}
										<div className="mt-4 sm:mt-[18px] md:mt-5">
											<div>
												<h5 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-xl leading-[30px] font-medium max-sm:text-lg max-sm:leading-7">
													{post.title}
												</h5>
												{post.description && (
													<div className="text-brand-primary/50 mt-2.5 sm:mt-3 md:mt-4 mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6">
														{post.description}
													</div>
												)}
											</div>
											<div className="flex justify-start items-end mt-1.5 sm:mt-2">
												<div className="flex flex-col gap-0.5 overflow-hidden">
													<div className="flex gap-4 sm:gap-[18px] md:gap-6 items-center">
														<div className="h-6 overflow-hidden">
															<div className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 tracking-[-0.01em]">
																Read More
															</div>
														</div>
														<div className="rounded-[10px] w-5 h-5 overflow-hidden">
															<div className="inline-flex justify-end items-start -rotate-45">
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 24 24"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																	className="rotate-45"
																>
																	<path
																		d="M7 17L17 7M17 7H7M17 7V17"
																		stroke="currentColor"
																		strokeWidth="2"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
															</div>
														</div>
													</div>
													<div className="bg-brand-primary w-full h-px relative">
														<div className="bg-gradient-to-b from-brand-gradient-from to-brand-gradient-to absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
													</div>
												</div>
											</div>
										</div>
									</a>
								</div>
							);
						})}

						{/* Explore Card */}
						{block.explore && (
							<div
								ref={setCardRef(posts.length)}
								className={`flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 rounded-2xl sm:rounded-xl md:rounded-2xl bg-brand-pricing-card-gradient-to p-5 sm:p-6 md:p-[40px_30px_24px] justify-between max-md:col-span-1 max-lg:col-span-2 lg:col-span-1 ${fadeClass(visibleCards.has(posts.length))}`}
								style={{ transitionDelay: `${posts.length * 100}ms` }}
							>
								<div className="flex justify-start items-center">
									<svg
										width="28"
										height="28"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="sm:w-8 md:w-8"
									>
										<path
											d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
											stroke="#250a63"
											strokeWidth="1.5"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M15.695 13.7H15.704M15.695 16.7H15.704M11.995 13.7H12.005M11.995 16.7H12.005M8.294 13.7H8.304M8.294 16.7H8.304"
											stroke="#250a63"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div>
									<div>
										<h4 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-2xl font-medium leading-8 max-md:text-[22px] max-md:leading-[30px] max-sm:text-xl max-sm:leading-7">
											{block.explore.heading}
										</h4>
										{block.explore.subtitle && (
											<div className="text-brand-primary/60 mt-[6px] sm:mt-2 md:mt-2.5 mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6">
												{block.explore.subtitle}
											</div>
										)}
									</div>
									<div className="mt-4 sm:mt-5 md:mt-[26px]">
										<a
											href={block.explore.buttonLink || "/blog"}
											className="relative flex justify-center items-center bg-brand-primary rounded-full px-[22px] py-2.5 sm:px-6 sm:py-3 md:px-[35px] md:py-4 no-underline overflow-hidden group"
										>
											<div className="relative z-[2] text-white tracking-[-0.02em] bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent font-[family-name:var(--font-inter-tight)] text-base leading-6 font-medium">
												{block.explore.buttonText}
											</div>
											<div className="absolute inset-0 bg-gradient-to-b from-brand-gradient-from to-brand-gradient-to rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
											<div className="absolute inset-0 bg-brand-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
											<div className="z-[1] rounded-full absolute inset-0 shadow-[inset_0_1.41px_3.18px_rgba(255,255,255,0.75)] md:shadow-[inset_0_1.41px_3.18px_rgba(255,255,255,0.8)] lg:shadow-[inset_0_1.41px_3.18px_rgba(255,255,255,0.87)]"></div>
										</a>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
