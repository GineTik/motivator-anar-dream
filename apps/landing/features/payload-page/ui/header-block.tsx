"use client";

import type { HeaderBlock as HeaderBlockType } from "@/payload-types";
import { useState } from "react";

interface HeaderBlockProps {
	block: HeaderBlockType;
}

export function HeaderBlock({ block }: HeaderBlockProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<number | null>(null);

	const logoUrl =
		typeof block.logo === "object" && block.logo?.url
			? block.logo.url
			: null;

	const navLinks = block.navLinks || [];

	return (
		<nav className="pt-[14px] sm:pt-4 md:pt-[18px] px-2.5">
			<div className="z-[5] rounded-[10px] bg-white/60 w-full max-w-[1000px] mx-auto p-0.5 sm:p-[3px] md:p-1">
				<div className="flex gap-2.5 bg-white rounded-lg justify-between items-center w-full px-4 sm:px-5 py-3 sm:py-[13px] md:py-[14px]">
					{/* Logo */}
					<div className="flex-shrink-0">
						<a href="/" aria-label="home" className="inline-block">
							{logoUrl ? (
								<img
									loading="lazy"
									src={logoUrl}
									alt=""
									className="max-h-8"
								/>
							) : (
								<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-lg font-semibold">
									Anara Dreams
								</span>
							)}
						</a>
					</div>

					{/* Desktop Nav */}
					<div className="hidden lg:flex">
						<ul className="flex gap-8 items-center list-none m-0 p-0">
							{navLinks.map((link, index) => {
								const hasChildren =
									link.children && link.children.length > 0;
								const isDropdownOpen = openDropdown === index;

								return (
									<li key={index} className="mb-0 relative">
										{hasChildren ? (
											<div
												className="relative"
												onMouseEnter={() => setOpenDropdown(index)}
												onMouseLeave={() => setOpenDropdown(null)}
											>
												<button className="flex items-center gap-1 bg-transparent border-none cursor-pointer p-0 pr-[18px] relative">
													<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-[30px] transition-colors duration-300 hover:text-brand-purple">
														{link.label}
													</span>
													<svg
														className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-primary text-sm transition-transform duration-200"
														style={{
															transform: isDropdownOpen
																? "translateY(-50%) rotate(180deg)"
																: "translateY(-50%) rotate(0deg)",
														}}
														width="10"
														height="6"
														viewBox="0 0 10 6"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M1 1L5 5L9 1"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</button>
												{isDropdownOpen && (
													<div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[900]">
														<div className="bg-white rounded-xl p-5 px-6 shadow-[0_10px_50px_-10px_rgba(176,184,210,0.24)] min-w-[150px]">
															<div className="flex flex-col gap-3">
																{link.children?.map((child, childIndex) => (
																	<a
																		key={childIndex}
																		href={child.href}
																		className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 no-underline transition-all duration-300 hover:text-brand-purple hover:translate-x-[3px]"
																	>
																		{child.label}
																	</a>
																))}
															</div>
														</div>
													</div>
												)}
											</div>
										) : (
											<a
												href={link.href}
												className="flex justify-center items-start p-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-[30px] no-underline"
											>
												<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-[30px] transition-colors duration-300 hover:text-brand-purple">
													{link.label}
												</span>
											</a>
										)}
									</li>
								);
							})}
						</ul>
					</div>

					{/* Right Side */}
					<div className="flex gap-3 sm:gap-4 md:gap-6 items-center">
						{/* CTA Button - Desktop */}
						<div className="hidden lg:block">
							<a
								href={block.ctaLink || "#"}
								className="flex gap-1.5 justify-center items-center no-underline group"
							>
								<div className="h-7 overflow-hidden">
									<div className="font-[family-name:var(--font-inter-tight)] text-[18px] font-semibold leading-7 text-brand-primary">
										{block.ctaText}
									</div>
								</div>
								<div className="flex justify-end items-start w-6 h-6 overflow-hidden -rotate-45">
									<svg
										width="24"
										height="24"
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
							</a>
						</div>

						{/* Mobile Menu Button */}
						<button
							className="lg:hidden flex items-center justify-center w-8 h-8 p-0.5 bg-transparent border-none cursor-pointer"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle menu"
						>
							<div className="flex flex-col gap-1.5 w-full h-full justify-center items-center">
								<div
									className={`w-5 h-0.5 bg-brand-primary rounded transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""}`}
								></div>
								<div
									className={`w-5 h-0.5 bg-brand-primary rounded transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
								></div>
							</div>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="lg:hidden bg-white rounded-[10px] p-5 sm:p-6 md:p-[30px_24px] mt-1">
						<ul className="flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 list-none m-0 p-0">
							{navLinks.map((link, index) => {
								const hasChildren =
									link.children && link.children.length > 0;
								const isDropdownOpen = openDropdown === index;

								return (
									<li key={index} className="mb-0">
										{hasChildren ? (
											<div className="flex flex-col items-start">
												<button
													className="flex items-center gap-1 bg-transparent border-none cursor-pointer p-0 pr-5 relative"
													onClick={() =>
														setOpenDropdown(
															isDropdownOpen ? null : index,
														)
													}
												>
													<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-[30px]">
														{link.label}
													</span>
													<svg
														className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-primary text-xs transition-transform duration-200"
														style={{
															transform: isDropdownOpen
																? "translateY(-50%) rotate(180deg)"
																: "translateY(-50%) rotate(0deg)",
														}}
														width="10"
														height="6"
														viewBox="0 0 10 6"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M1 1L5 5L9 1"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</button>
												{isDropdownOpen && (
													<div className="mt-3 pl-4">
														<div className="flex flex-col gap-3">
															{link.children?.map(
																(child, childIndex) => (
																	<a
																		key={childIndex}
																		href={child.href}
																		className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 no-underline transition-colors duration-300 hover:text-brand-purple"
																	>
																		{child.label}
																	</a>
																),
															)}
														</div>
													</div>
												)}
											</div>
										) : (
											<a
												href={link.href}
												className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-[30px] no-underline"
											>
												{link.label}
											</a>
										)}
									</li>
								);
							})}
							{/* Mobile CTA */}
							<li className="mt-2.5">
								<a
									href={block.ctaLink || "#"}
									className="flex gap-1.5 justify-center items-center no-underline"
								>
									<div className="font-[family-name:var(--font-inter-tight)] text-[18px] font-semibold leading-7 text-brand-primary">
										{block.ctaText}
									</div>
									<div className="flex justify-end items-start w-6 h-6 overflow-hidden -rotate-45">
										<svg
											width="24"
											height="24"
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
								</a>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
}
