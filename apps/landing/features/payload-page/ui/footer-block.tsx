"use client";

import type { FooterBlock as FooterBlockType } from "@/payload-types";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { SmartLink } from "@/shared/ui/smart-link";
import { resolveHref } from "../lib/resolve-href";

interface FooterBlockProps {
	block: FooterBlockType;
}

export function FooterBlock({ block }: FooterBlockProps) {
	const logoUrl =
		typeof block.logo === "object" && block.logo?.url
			? block.logo.url
			: null;

	const menuGroups = block.menuGroups || [];
	const socialLinks = block.socialLinks || [];

	const { ref: topRef, isVisible: isTopVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: newsletterRef, isVisible: isNewsletterVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: bottomRef, isVisible: isBottomVisible } =
		useScrollAnimation<HTMLDivElement>();

	return (
		<footer className="bg-gradient-to-b from-white from-60% to-brand-footer-gradient-to pt-16 sm:pt-[72px] lg:pt-20 xl:pt-[87px] pb-6 sm:pb-8 lg:pb-9 xl:pb-10">
			<div className="relative z-[1] max-w-[1160px] mx-auto px-4 sm:px-5">
				<div className="w-full">
					{/* Top: Logo + Menu Groups */}
					<div
						ref={topRef}
						className={`flex flex-wrap justify-between items-start gap-6 sm:gap-7 md:gap-8 ${fadeClass(isTopVisible)}`}
					>
						{/* Logo */}
						<div className="w-full sm:w-auto flex max-sm:justify-center">
							<a href="/" className="inline-block">
								{logoUrl ? (
									<img
										src={logoUrl}
										loading="lazy"
										alt=""
										className="w-auto max-w-50"
									/>
								) : (
									<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-xl font-semibold">
										Anara Dreams
									</span>
								)}
							</a>
						</div>

						{/* Menu Groups — accordion on mobile, flex columns on sm+ */}
						<div className="w-full sm:w-auto flex-1 lg:pl-50 md:pl-15">
							{/* Desktop: flex layout */}
							<div className="hidden sm:flex gap-5 md:gap-8 justify-between">
								{menuGroups.map((group, index) => (
									<div key={index}>
										<h5 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-xl leading-[30px] font-medium">
											{group.title}
										</h5>
										<div className="flex flex-col gap-3.5 md:gap-4 mt-5 md:mt-6">
											{(group.links || []).map(
												(link, linkIndex) => (
													<SmartLink
														key={linkIndex}
														href={resolveHref(
															link?.url,
														)}
														className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 no-underline transition-colors duration-300 hover:text-brand-purple"
													>
														{link.label}
													</SmartLink>
												),
											)}
										</div>
									</div>
								))}
							</div>
							{/* Mobile: accordion */}
							<div className="sm:hidden">
								{menuGroups.map((group, index) => (
									<details
										key={index}
										className="border-b border-brand-footer-border group"
									>
										<summary className="flex justify-between items-center py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
											<span className="text-brand-primary tracking-[-0.02em] font-[family-name:var(--font-inter-tight)] text-lg leading-7 font-medium">
												{group.title}
											</span>
											<span className="text-brand-purple text-xl leading-none transition-transform duration-200 group-open:rotate-45">
												+
											</span>
										</summary>
										<div className="flex flex-col gap-3 pb-3.5">
											{(group.links || []).map(
												(link, linkIndex) => (
													<SmartLink
														key={linkIndex}
														href={resolveHref(
															link?.url,
														)}
														className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 no-underline transition-colors duration-300 hover:text-brand-purple"
													>
														{link.label}
													</SmartLink>
												),
											)}
										</div>
									</details>
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
						<div className="w-full md:w-auto md:ml-auto">
							<SmartLink
								href={resolveHref(block.newsletter?.url)}
								className={cn(
									buttonVariants({ variant: "secondary" }),
									"h-[50px] px-5 sm:px-[30px]",
								)}
							>
								{block.newsletter?.buttonText}
							</SmartLink>
						</div>
					</div>

					{/* Bottom: Copyright + Social */}
					<div
						ref={bottomRef}
						className={`flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 sm:gap-6 md:gap-10 border-t border-brand-footer-border mt-10 sm:mt-12 md:mt-[52px] lg:mt-[95px] pt-6 sm:pt-[25px] ${fadeClass(isBottomVisible)}`}
					>
						<div className="w-full sm:w-auto max-md:mx-auto">
							<div className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 max-sm:text-sm max-sm:leading-[22px] max-sm:text-center max-md:text-center">
								&copy; {new Date().getFullYear()} -{" "}
								{block.copyright}
							</div>
						</div>
						{socialLinks.length > 0 && (
							<div className="w-auto max-md:w-full max-md:flex max-md:justify-center">
								<div className="flex gap-5 sm:gap-5 md:gap-6 justify-end">
									{socialLinks.map((social, index) => {
										const iconUrl =
											typeof social.icon === "object" &&
											social.icon?.url
												? social.icon.url
												: null;

										return (
											<a
												key={index}
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={
													social.label ||
													"Social link"
												}
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
