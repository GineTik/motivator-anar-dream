"use client";

import type { FooterBlock as FooterBlockType } from "@/payload-types";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";

interface FooterBlockProps {
	block: FooterBlockType;
}

export function FooterBlock({ block }: FooterBlockProps) {
	const logoUrl =
		typeof block.logo === "object" && block.logo?.url ? block.logo.url : null;

	const menuGroups = block.menuGroups || [];
	const socialLinks = block.socialLinks || [];

	const { ref: topRef, isVisible: isTopVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: newsletterRef, isVisible: isNewsletterVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: bottomRef, isVisible: isBottomVisible } =
		useScrollAnimation<HTMLDivElement>();

	return (
		<footer className="bg-gradient-to-b from-white from-60% to-[rgba(145,209,249,0.15)] pt-16 sm:pt-[72px] lg:pt-20 xl:pt-[87px] pb-6 sm:pb-8 lg:pb-9 xl:pb-10">
			<div className="relative z-[1] max-w-[1160px] mx-auto px-4 sm:px-5">
				<div className="w-full">
					{/* Top: Logo + Menu Groups */}
					<div
						ref={topRef}
						className={`flex flex-wrap justify-between items-start gap-6 sm:gap-7 md:gap-8 ${fadeClass(isTopVisible)}`}
					>
						{/* Logo */}
						<div className="w-full sm:w-auto">
							<a
								href="/"
								className="inline-block max-sm:w-[90px] max-md:w-[95px]"
							>
								{logoUrl ? (
									<img src={logoUrl} loading="lazy" alt="" className="w-auto" />
								) : (
									<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-xl font-semibold">
										Anara Dreams
									</span>
								)}
							</a>
						</div>

						{/* Menu Groups */}
						<div className="w-full sm:w-auto sm:max-w-[527px]">
							<div className="flex gap-6 sm:gap-5 md:gap-8 justify-between max-sm:flex-col">
								{menuGroups.map((group, index) => (
									<div key={index}>
										<h5 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-xl leading-[30px] font-medium max-sm:text-lg max-sm:leading-7">
											{group.title}
										</h5>
										<div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4 mt-4 sm:mt-5 md:mt-6">
											{(group.links || []).map((link, linkIndex) => (
												<a
													key={linkIndex}
													href={link.href}
													className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 no-underline transition-colors duration-300 hover:text-brand-purple"
												>
													{link.label}
												</a>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Center: Newsletter */}
					<div
						ref={newsletterRef}
						className={`flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 justify-between items-start md:items-center mt-8 sm:mt-10 md:mt-[60px] lg:mt-[100px] ${fadeClass(isNewsletterVisible)}`}
					>
						<div className="w-full md:w-[405px] max-w-full">
							<div className="flex flex-col gap-2.5 sm:gap-3 md:gap-3.5 items-start">
								<h4 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-2xl font-medium leading-8 max-md:text-[22px] max-md:leading-[30px] max-sm:text-xl max-sm:leading-7">
									{block.newsletter?.heading}
								</h4>
								<div className="text-brand-primary-alpha font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6">
									{block.newsletter?.subtitle}
								</div>
							</div>
						</div>
						<div className="w-full md:w-auto md:max-w-[384px] md:ml-auto">
							<form className="mb-0">
								<div className="flex gap-0">
									<input
										type="email"
										placeholder={block.newsletter?.placeholder || "Enter Email"}
										className="border border-[rgba(77,0,255,0.14)] bg-white text-brand-primary rounded-full h-[50px] mb-0 pl-4 sm:pl-[25px] font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 w-full focus:border-brand-purple-light focus:outline-none placeholder:text-[rgba(57,30,121,0.6)] placeholder:tracking-[-0.01em] placeholder:font-[family-name:var(--font-inter-tight)] placeholder:text-base placeholder:font-medium placeholder:leading-6"
									/>
									<button
										type="submit"
										className="bg-[#7b87fe] text-white tracking-[-0.01em] rounded-full h-[50px] px-5 sm:px-[30px] font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 cursor-pointer border-0 hover:bg-brand-primary transition-colors duration-300 whitespace-nowrap"
									>
										{block.newsletter?.buttonText}
									</button>
								</div>
							</form>
						</div>
					</div>

					{/* Bottom: Copyright + Social */}
					<div
						ref={bottomRef}
						className={`flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 sm:gap-6 md:gap-10 border-t border-[rgba(183,183,214,0.3)] mt-10 sm:mt-12 md:mt-[52px] lg:mt-[95px] pt-6 sm:pt-[25px] ${fadeClass(isBottomVisible)}`}
					>
						<div className="w-full sm:w-auto max-md:mx-auto">
							<div className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 max-sm:text-sm max-sm:leading-[22px] max-sm:text-center max-md:text-center">
								&copy; {new Date().getFullYear()} - {block.copyright}
							</div>
						</div>
						{socialLinks.length > 0 && (
							<div className="w-auto max-md:w-full max-md:flex max-md:justify-center">
								<div className="flex gap-5 sm:gap-5 md:gap-6 justify-end">
									{socialLinks.map((social, index) => {
										const iconUrl =
											typeof social.icon === "object" && social.icon?.url
												? social.icon.url
												: null;

										return (
											<a
												key={index}
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={social.label || "Social link"}
												className="w-5 sm:w-6 h-5 sm:h-6 transition-opacity duration-300 hover:opacity-70"
											>
												{iconUrl ? (
													<img
														src={iconUrl}
														loading="lazy"
														alt=""
														className="w-full"
													/>
												) : (
													<div className="w-full h-full bg-brand-primary rounded-full"></div>
												)}
											</a>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</footer>
	);
}
