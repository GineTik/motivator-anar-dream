"use client";

import type { IntegrationBlock as IntegrationBlockType } from "@/payload-types";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";

interface IntegrationBlockProps {
	block: IntegrationBlockType;
}

export function IntegrationBlock({ block }: IntegrationBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const mainImageUrl =
		typeof block.mainImage === "object" && block.mainImage?.url
			? block.mainImage.url
			: null;

	const [isImageVisible, setIsImageVisible] = useState(false);
	const [isContentVisible, setIsContentVisible] = useState(false);
	const imageRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const { ref: headerRef, isVisible: isHeaderVisible } =
		useScrollAnimation<HTMLDivElement>();

	useEffect(() => {
		const imageObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsImageVisible(true);
					}
				});
			},
			{ threshold: 0.1 },
		);

		const contentObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsContentVisible(true);
					}
				});
			},
			{ threshold: 0.1 },
		);

		if (imageRef.current) {
			imageObserver.observe(imageRef.current);
		}
		if (contentRef.current) {
			contentObserver.observe(contentRef.current);
		}

		return () => {
			imageObserver.disconnect();
			contentObserver.disconnect();
		};
	}, []);

	return (
		<section className="relative py-[100px]">
			<div className="relative z-[1] max-w-[1432px] mx-auto px-5 max-sm:px-4">
				<div className="w-full">
					{/* Header Content */}
					<div
						ref={headerRef}
						className="flex flex-col justify-start items-center max-w-[450px] mx-auto"
					>
						{/* Badge */}
						<div
							className={`flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)] ${fadeClass(isHeaderVisible)}`}
						>
							<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px] max-md:px-[10px] max-md:pl-[3px]">
								<div className="rounded-full w-[33px] h-6 p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)] max-md:w-10">
									<div className="relative z-[1] bg-white bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to rounded-full flex justify-center items-center w-[33px] h-6 p-0 max-md:p-[6px] max-sm:p-1">
										{badgeIconUrl ? (
											<img
												src={badgeIconUrl}
												loading="lazy"
												alt=""
												className="relative z-[2] w-auto h-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)] max-md:w-[15px]"
											/>
										) : (
											<div className="text-xl font-bold text-brand-purple">
												◇
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

						{/* Heading */}
						<div
							className={`flex flex-col gap-5 justify-start items-center w-full mt-5 max-sm:gap-4 max-sm:mt-4 ${fadeClass(isHeaderVisible)}`}
							style={{ transitionDelay: "100ms" }}
						>
							<div>
								<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-[52px] font-medium leading-[60px] text-center max-md:text-5xl max-md:leading-[56px] max-sm:text-4xl max-sm:leading-[44px]">
									{block.heading}
								</h2>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="flex flex-col justify-end items-center mt-6 relative max-lg:mt-8 max-md:mt-7 max-sm:mt-6">
						{/* Image */}
						<div
							ref={imageRef}
							className={`
                transition-all duration-700
                ${
									isImageVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-6 blur-[3px]"
								}
              `}
						>
							{mainImageUrl ? (
								<img
									src={mainImageUrl}
									alt={block.heading}
									loading="lazy"
									className="w-full"
								/>
							) : (
								<div className="w-full h-64 bg-gradient-to-b from-brand-feature-card-gradient-from to-brand-feature-card-gradient-to rounded-xl flex items-center justify-center">
									<div className="text-brand-primary-alpha text-center">
										Integration visualization
									</div>
								</div>
							)}
						</div>

						{/* Content Overlay */}
						<div
							ref={contentRef}
							className={`
                flex flex-col gap-[18px] justify-start items-center w-[346px] max-w-full mx-auto
                absolute bottom-8
                max-lg:static max-lg:mt-0
                max-md:gap-4 max-md:mt-[10px]
                max-sm:gap-[14px]
                transition-all duration-700 delay-200
                ${
									isContentVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-6 blur-[3px]"
								}
              `}
						>
							<div className="text-brand-primary mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 text-center">
								{block.description}
							</div>

							{/* Link */}
							<a
								href={block.linkUrl || "#"}
								className="group flex flex-col justify-start items-stretch gap-[2px] no-underline overflow-hidden"
							>
								<div className="flex gap-6 justify-start items-center max-md:gap-[18px] max-sm:gap-[14px]">
									<div className="h-6 overflow-hidden">
										<div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-6">
											<div className="text-brand-primary tracking-[-0.01em] font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6">
												{block.linkText}
											</div>
											<div className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-transparent tracking-[-0.01em] font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6">
												{block.linkText}
											</div>
										</div>
									</div>
									<div className="rounded-[10px] w-5 h-5 overflow-hidden">
										<div className="inline-flex justify-end items-start -rotate-45">
											<img
												src="https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/682b06817d775272dd3fa1e4_arrow-up-right-01%20(1).svg"
												loading="lazy"
												alt=""
												className="rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
											/>
											<img
												src="https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/682a3c70abff5ba066de9a30_arrow-up-right-01.svg"
												loading="lazy"
												alt=""
												className="rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
											/>
										</div>
									</div>
								</div>
								<div className="bg-brand-primary w-full h-px relative overflow-hidden">
									<div className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
