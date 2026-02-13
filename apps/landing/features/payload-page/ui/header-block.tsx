"use client";

import type { HeaderBlock as HeaderBlockType } from "@/payload-types";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/shared/ui/button";

interface HeaderBlockProps {
	block: HeaderBlockType;
}

export function HeaderBlock({ block }: HeaderBlockProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<number | null>(null);
	const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const logoUrl =
		typeof block.logo === "object" && block.logo?.url ? block.logo.url : null;

	const navLinks = block.navLinks || [];

	useEffect(() => {
		return () => {
			if (dropdownTimeoutRef.current) {
				clearTimeout(dropdownTimeoutRef.current);
			}
		};
	}, []);

	const handleDropdownEnter = (index: number) => {
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
			dropdownTimeoutRef.current = null;
		}
		setOpenDropdown(index);
	};

	const handleDropdownLeave = () => {
		dropdownTimeoutRef.current = setTimeout(() => {
			setOpenDropdown(null);
		}, 150);
	};

	return (
		<header className="z-10 absolute w-full py-5 sm:py-6 md:py-7 px-4 sm:px-5">
			<div className="max-w-[1200px] w-full mx-auto">
				<div className="bg-white rounded-2xl ring-4 ring-white/50 px-5 sm:px-8 md:px-10 py-4 sm:py-5 flex items-center justify-between">
					{/* Left — Logo */}
					<div className="flex-shrink-0">
						<a
							href="/"
							aria-label="home"
							className="inline-flex items-center gap-2 no-underline"
						>
							{logoUrl ? (
								<img
									loading="lazy"
									src={logoUrl}
									alt=""
									className="h-8 sm:h-9 w-auto"
								/>
							) : (
								<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-xl sm:text-2xl font-bold tracking-[-0.02em]">
									Anara Dreams
								</span>
							)}
						</a>
					</div>

					{/* Center — Desktop Navigation */}
					<nav className="hidden lg:flex">
						<ul className="flex gap-6 xl:gap-9 items-center list-none m-0 p-0">
							{navLinks.map((link, index) => {
								const hasChildren = link.children && link.children.length > 0;
								const isOpen = openDropdown === index;

								return (
									<li key={index} className="relative">
										{hasChildren ? (
											<div
												className="relative"
												onMouseEnter={() => handleDropdownEnter(index)}
												onMouseLeave={handleDropdownLeave}
											>
												<button
													className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0"
													aria-expanded={isOpen}
													aria-haspopup="menu"
												>
													<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-[15px] font-medium leading-6 transition-colors duration-200 hover:text-brand-purple">
														{link.label}
													</span>
													<svg
														width="10"
														height="6"
														viewBox="0 0 10 6"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className={`text-brand-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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

												{/* Dropdown */}
												{isOpen && (
													<div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[900]">
														<div className="bg-white rounded-xl shadow-[0_10px_40px_-8px_rgba(176,184,210,0.3)] border border-[rgba(235,237,255,0.6)]">
															<div className="py-4 px-5 min-w-[160px]">
																<div className="flex flex-col gap-2.5">
																	{link.children?.map((child, childIndex) => (
																		<a
																			key={childIndex}
																			href={child.href}
																			className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-[15px] font-normal leading-6 no-underline transition-all duration-200 hover:text-brand-purple hover:translate-x-0.5"
																		>
																			{child.label}
																		</a>
																	))}
																</div>
															</div>
														</div>
													</div>
												)}
											</div>
										) : (
											<a href={link.href} className="no-underline">
												<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-[15px] font-medium leading-6 transition-colors duration-200 hover:text-brand-purple">
													{link.label}
												</span>
											</a>
										)}
									</li>
								);
							})}
						</ul>
					</nav>

					{/* Right — CTA + Mobile Toggle */}
					<div className="flex items-center gap-4">
						{/* CTA Button — Desktop */}
						<Button
							href={block.ctaLink || "#"}
							variant="solid"
							size="sm"
							className="hidden lg:inline-flex text-[15px] xl:px-7 xl:py-3"
						>
							{block.ctaText}
						</Button>

						{/* Mobile Menu Button */}
						<button
							className="lg:hidden flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer rounded-lg hover:bg-[#f5f3ff] transition-colors duration-200"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle menu"
						>
							<div className="flex flex-col gap-[5px] w-5 items-center justify-center">
								<span
									className={`block w-5 h-[2px] bg-brand-primary rounded-full transition-all duration-300 origin-center ${
										mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
									}`}
								/>
								<span
									className={`block w-5 h-[2px] bg-brand-primary rounded-full transition-all duration-300 ${
										mobileMenuOpen ? "opacity-0" : ""
									}`}
								/>
								<span
									className={`block w-5 h-[2px] bg-brand-primary rounded-full transition-all duration-300 origin-center ${
										mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
									}`}
								/>
							</div>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="lg:hidden bg-white rounded-2xl shadow-[0_10px_40px_-8px_rgba(176,184,210,0.2)] mt-2 p-6 sm:p-8">
						<ul className="flex flex-col gap-3 list-none m-0 p-0">
							{navLinks.map((link, index) => {
								const hasChildren = link.children && link.children.length > 0;
								const isOpen = openDropdown === index;

								return (
									<li key={index}>
										{hasChildren ? (
											<div className="flex flex-col">
												<button
													className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0"
													onClick={() => setOpenDropdown(isOpen ? null : index)}
												>
													<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-medium leading-7">
														{link.label}
													</span>
													<svg
														width="10"
														height="6"
														viewBox="0 0 10 6"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className={`text-brand-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
												{isOpen && (
													<div className="mt-2 pl-4 flex flex-col gap-2">
														{link.children?.map((child, childIndex) => (
															<a
																key={childIndex}
																href={child.href}
																className="text-brand-primary-alpha font-[family-name:var(--font-inter-tight)] text-[15px] font-normal leading-6 no-underline transition-colors duration-200 hover:text-brand-purple"
															>
																{child.label}
															</a>
														))}
													</div>
												)}
											</div>
										) : (
											<a
												href={link.href}
												className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-medium leading-7 no-underline transition-colors duration-200 hover:text-brand-purple"
											>
												{link.label}
											</a>
										)}
									</li>
								);
							})}

							{/* Mobile CTA */}
							<li className="mt-3 pt-3 border-t border-[rgba(183,183,214,0.3)]">
								<Button
									href={block.ctaLink || "#"}
									variant="solid"
									size="sm"
									className="w-full text-center text-[15px]"
								>
									{block.ctaText}
								</Button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</header>
	);
}
