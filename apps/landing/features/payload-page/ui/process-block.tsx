"use client";

import type { ProcessBlock as ProcessBlockType } from "@/payload-types";
import { useState } from "react";

interface ProcessBlockProps {
	block: ProcessBlockType;
}

export function ProcessBlock({ block }: ProcessBlockProps) {
	const [activeTab, setActiveTab] = useState(0);

	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const tabs = block.tabs || [];
	const currentTab = tabs[activeTab];

	return (
		<section className="relative py-16 md:py-20 lg:py-24">
			<div className="relative z-[1] max-w-[1184px] mx-auto px-4">
				<div className="w-full">
					{/* Header Content */}
					<div className="flex flex-col justify-start items-center max-w-[503px] mx-auto mb-8 md:mb-10 lg:mb-12">
						{/* Badge */}
						<div className="flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)]">
							<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px]">
								<div className="rounded-full w-auto md:w-10 lg:w-[50.63px] p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)]">
									<div className="relative z-[1] bg-white bg-gradient-to-b from-[rgba(196,68,222,0)] to-[rgba(89,75,236,0.17)] rounded-full flex justify-center items-center w-8 h-6 md:w-10 md:h-8 lg:w-[50px] lg:h-[33px]">
										{badgeIconUrl ? (
											<img
												src={badgeIconUrl}
												loading="lazy"
												alt=""
												className="relative z-[2] w-auto h-auto md:w-[15px] lg:w-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)]"
											/>
										) : (
											<div className="text-xl font-bold text-[#594bec]">!</div>
										)}
									</div>
									<div className="opacity-[0.14] bg-gradient-to-b from-[rgba(77,0,255,0)] to-[rgba(46,0,153,0.14)] rounded-full absolute inset-0"></div>
								</div>
								<div className="flex">
									<div className="text-[#250a63] tracking-[-0.03em] text-sm leading-[22px] md:text-base md:leading-6">
										{block.badge?.text}
									</div>
								</div>
							</div>
							<div className="opacity-[0.14] bg-gradient-to-b from-[rgba(77,0,255,0.34)] to-[#2e0099] rounded-full absolute inset-0"></div>
						</div>

						{/* Heading and Subtitle */}
						<div className="flex flex-col gap-4 md:gap-5 justify-start items-center w-full mt-5">
							<div>
								<h2 className="text-[#250a63] tracking-[-0.02em] mt-0 mb-0 text-4xl md:text-5xl lg:text-[52px] font-medium leading-[44px] md:leading-[56px] lg:leading-[60px] text-center">
									{block.heading}
								</h2>
							</div>
							<div>
								<div className="text-[#250a63b3] mb-0 text-base leading-6 text-center">
									{block.subtitle}
								</div>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="mt-8 md:mt-10 lg:mt-12">
						<div className="flex flex-col justify-start items-center">
							{/* Tab Menu */}
							<div className="flex flex-wrap gap-2.5 md:gap-3 lg:gap-5 justify-center items-center">
								{tabs.map((tab, index) => {
									const isActive = activeTab === index;
									const iconUrl =
										typeof tab.icon === "object" && tab.icon?.url
											? tab.icon.url
											: null;
									const iconActiveUrl =
										typeof tab.iconActive === "object" && tab.iconActive?.url
											? tab.iconActive.url
											: null;

									return (
										<button
											key={index}
											onClick={() => setActiveTab(index)}
											className="bg-transparent rounded-full p-[0.82px] relative overflow-hidden cursor-pointer border-none"
										>
											<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-start items-center px-3 py-1 md:px-[15px] md:py-[5px] lg:px-[16.44px] lg:py-[5.11px] pl-[5.11px] overflow-hidden">
												<div className="relative z-[1] flex-none w-7 h-7 md:w-7 md:h-7 lg:w-[34px] lg:h-[34px] rounded-full p-[0.82px] overflow-hidden shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)]">
													<div className="relative z-[1] bg-white rounded-full flex justify-center items-center w-full h-full">
														<div className="flex justify-center items-center w-4 h-4 relative overflow-hidden">
															{iconUrl && (
																<img
																	src={iconUrl}
																	alt=""
																	className="absolute transition-opacity duration-300"
																	style={{
																		opacity: isActive ? 0 : 1,
																	}}
																/>
															)}
															{iconActiveUrl && (
																<img
																	src={iconActiveUrl}
																	alt=""
																	className="absolute transition-opacity duration-300"
																	style={{
																		opacity: isActive ? 1 : 0,
																	}}
																/>
															)}
														</div>
														<div className="opacity-[0.17] bg-gradient-to-b from-[rgba(196,68,222,0)] to-[rgba(89,75,236,0.6)] rounded-full absolute inset-0"></div>
													</div>
													<div className="bg-gradient-to-b from-[rgba(77,0,255,0)] to-[rgba(46,0,153,0.14)] absolute inset-0"></div>
												</div>
												<div className="relative z-[1] text-[#250a63] tracking-[-0.01em] text-sm leading-[22px] md:text-base md:leading-6 font-medium">
													{tab.title}
												</div>
												<div
													className="bg-gradient-to-b from-[rgba(196,68,222,0)] to-[rgba(89,75,236,0.17)] absolute inset-0 transition-opacity duration-300"
													style={{
														opacity: isActive ? 1 : 0,
													}}
												></div>
											</div>
											<div className="opacity-[0.14] bg-gradient-to-b from-[rgba(77,0,255,0.34)] to-[#2e0099] absolute inset-0"></div>
										</button>
									);
								})}
							</div>

							{/* Tab Content */}
							<div className="w-full mt-10 md:mt-12 lg:mt-[60px] mx-auto max-w-[1000px]">
								{currentTab && (
									<div className="flex flex-col-reverse md:flex-row gap-8 md:gap-8 lg:gap-10 justify-between items-center">
										{/* Left Content */}
										<div className="flex flex-col justify-center items-start w-1/2 max-w-1/2">
											<div className="rounded-full p-[0.82px] relative overflow-hidden shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)]">
												<div className="relative z-[1] bg-white rounded-full px-4 py-[5px] md:px-5 md:py-[6px] lg:px-[22px] lg:py-2">
													<div className="text-[#250a63] tracking-[-0.03em] text-base leading-6">
														{currentTab.badge}
													</div>
												</div>
												<div className="opacity-[0.14] bg-gradient-to-b from-[rgba(77,0,255,0.34)] to-[#2e0099] absolute inset-0"></div>
											</div>
											<div className="w-full mt-[14px] md:mt-4 lg:mt-5">
												<div className="max-w-full max-md:max-w-[357px]">
													<h3 className="text-[#250a63] tracking-[-0.02em] mt-0 mb-0 text-2xl md:text-[32px] lg:text-[42px] font-medium leading-8 md:leading-10 lg:leading-[50px]">
														{currentTab.heading}
													</h3>
												</div>
												<div className="text-[#250a63b3] mt-2 md:mt-4 lg:mt-5 mb-0 text-base leading-6">
													{currentTab.description}
												</div>
											</div>
											<div className="mt-6 md:mt-6 lg:mt-[30px]">
												<a
													href={currentTab.buttonLink || "#"}
													className="relative flex justify-center items-center bg-[#250a63] rounded-full px-[22px] py-[10px] md:px-7 md:py-[14px] lg:px-[35px] lg:py-4 no-underline overflow-hidden group"
												>
													<div className="relative z-[2] text-white tracking-[-0.02em] bg-gradient-to-b from-white to-[rgba(255,255,255,0.7)] bg-clip-text text-transparent text-base leading-6 font-medium">
														{currentTab.buttonText}
													</div>
													<div className="absolute inset-0 bg-gradient-to-b from-[rgb(136,124,248)] to-[rgb(89,75,236)] rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
													<div className="absolute inset-0 bg-[#250a63] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
													<div className="z-[1] rounded-full absolute inset-0 shadow-[inset_0_1.41px_3.18px_rgba(255,255,255,0.75)] md:shadow-[inset_0_1.41px_3.18px_rgba(255,255,255,0.8)] lg:shadow-[inset_0_1.41px_3.18px_rgba(255,255,255,0.87)]"></div>
												</a>
											</div>
										</div>

										{/* Right Content - Image */}
										<div className="w-full md:w-1/2 lg:w-[443px] h-auto md:h-[380px] lg:h-[395px] rounded-xl backdrop-blur-[25.96px] bg-[rgba(235,237,255,0.6)] p-[3px] md:p-[3px] lg:p-[3.25px] overflow-hidden">
											<div
												className="border-[1.62px] border-white rounded-[10px] bg-cover bg-center bg-no-repeat flex justify-center items-center w-full h-full overflow-hidden shadow-[0_9.74px_64.91px_-8.11px_rgba(176,184,210,0.24)] p-6 md:p-8 lg:p-5"
												style={{
													backgroundImage:
														"url('https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/682f0e4c4ee9e7987f606b8a_Process%2002%20Bg.avif')",
												}}
											>
												{typeof currentTab.image === "object" &&
												currentTab.image?.url ? (
													<img
														src={currentTab.image.url}
														alt={currentTab.heading}
														loading="lazy"
														className="w-full max-w-full md:max-w-full lg:max-w-[391px]"
													/>
												) : (
													<div className="flex justify-center items-center w-full h-full text-[#250a63b3] text-center">
														Visual representation
													</div>
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
