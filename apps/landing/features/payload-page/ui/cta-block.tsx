"use client";

import type { CtaBlock as CtaBlockType } from "@/payload-types";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";

interface CtaBlockProps {
	block: CtaBlockType;
}

export function CtaBlock({ block }: CtaBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLDivElement>();

	return (
		<section
			className="relative py-[60px] sm:py-[72px] lg:py-[80px] xl:py-[134px] pb-[60px] sm:pb-[72px] lg:pb-[80px] xl:pb-[164px] overflow-hidden bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage:
					"url('https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/682a458b010ce56887e3babd_9de874d21dfaa185260d680fc16bc571_Cta%20Cloud.avif')",
			}}
		>
			<div className="relative z-[1] max-w-[1160px] mx-auto px-4 sm:px-5">
				<div
					ref={sectionRef}
					className="flex flex-col items-center max-w-[697px] mx-auto"
				>
					{/* Badge */}
					<div
						className={`flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)] ${fadeClass(isVisible)}`}
					>
						<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px] max-md:px-[10px] max-md:pl-[3px] max-sm:pr-[10px]">
							<div className="rounded-full w-[50.63px] p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)] max-md:w-10 max-sm:w-auto">
								<div className="relative z-[1] bg-white bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to rounded-full flex justify-center items-center w-[50px] h-[33px] max-md:p-[5px] max-sm:p-1">
									{badgeIconUrl ? (
										<img
											src={badgeIconUrl}
											loading="lazy"
											alt=""
											className="relative z-[2] w-auto h-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)] max-md:w-[15px] max-sm:w-auto"
										/>
									) : (
										<div className="text-xl font-bold text-brand-purple">
											&#10024;
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

					{/* Text Content */}
					<div
						className={`w-full mt-3 sm:mt-4 md:mt-5 ${fadeClass(isVisible)}`}
						style={{ transitionDelay: "100ms" }}
					>
						<div className="max-w-[697px] mx-auto">
							<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-[42px] leading-[50px] sm:text-[52px] sm:leading-[60px] lg:text-[56px] lg:leading-[64px] xl:text-[62px] xl:leading-[70px] font-medium text-center">
								{block.heading}
							</h2>
						</div>
						<div className="max-w-[600px] mx-auto mt-4 sm:mt-5">
							<div className="text-brand-primary mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 text-center">
								{block.subtitle}
							</div>
						</div>
					</div>

					{/* Email Form */}
					<div
						className={`w-[95%] sm:w-[85%] md:w-[472px] max-w-full mt-7 sm:mt-8 md:mt-10 ${fadeClass(isVisible)}`}
						style={{ transitionDelay: "200ms" }}
					>
						<form className="mb-0">
							<div className="flex gap-1 sm:gap-1.5 md:gap-2 justify-center">
								<input
									type="email"
									placeholder={block.emailPlaceholder || "Enter Email"}
									className="border border-white bg-white text-brand-primary rounded-full h-[57px] max-md:h-[52px] mb-0 pl-4 sm:pl-[25px] font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 w-full focus:border-brand-purple-light focus:outline-none placeholder:text-[rgba(57,30,121,0.6)] placeholder:tracking-[-0.01em] placeholder:font-[family-name:var(--font-inter-tight)] placeholder:text-base placeholder:font-medium placeholder:leading-6"
								/>
								<button
									type="submit"
									className="bg-gradient-to-b from-brand-gradient-from to-brand-gradient-to text-white tracking-[-0.01em] rounded-full h-[57px] max-md:h-[52px] px-5 sm:px-7 md:px-[34px] font-[family-name:var(--font-inter-tight)] text-base font-medium leading-6 cursor-pointer border-0 shadow-[inset_0_1.41px_3.18px_rgba(255,255,255,0.87)] hover:bg-brand-primary hover:bg-none transition-colors duration-300 whitespace-nowrap"
								>
									{block.buttonText}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
