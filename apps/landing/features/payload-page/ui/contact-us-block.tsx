"use client";

import type { ContactUsBlock as ContactUsBlockType } from "@/payload-types";
import {
	useScrollAnimation,
	useStaggerAnimation,
	fadeClass,
} from "../lib/use-scroll-animation";
import { Button } from "@/shared/ui/button";

interface ContactUsBlockProps {
	block: ContactUsBlockType;
}

function ContactIcon({ type }: { type: string }) {
	if (type === "email") {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M22 6L12 13L2 6"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}
	if (type === "telegram") {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M22 2L11 13"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M22 2L15 22L11 13L2 9L22 2Z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.26 21.03 19.53 21 18.8 20.88C14.48 20.09 10.41 18.09 7.18 14.86C3.95 11.63 1.95 7.56 1.16 3.24C1.04 2.51 1.01 1.78 1.07 1.04C1.11 0.48 1.56 0.04 2.12 0.04H5.12C5.58 0.04 5.97 0.36 6.06 0.82C6.25 1.75 6.55 2.66 6.95 3.52L5.25 5.22C6.78 8.38 9.48 11.08 12.64 12.61L14.34 10.91C15.2 11.31 16.11 11.61 17.04 11.8C17.5 11.89 17.82 12.28 17.82 12.74V16.92H22Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				transform="translate(0, 1.5)"
			/>
		</svg>
	);
}

export function ContactUsBlock({ block }: ContactUsBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const backgroundImageUrl =
		typeof block.backgroundImage === "object" && block.backgroundImage?.url
			? block.backgroundImage.url
			: "/bg-1.png";

	const contactItems = block.contactItems ?? [];

	const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();
	const { visibleItems, setItemRef } = useStaggerAnimation(
		contactItems.length,
	);

	return (
		<section ref={sectionRef} className="relative py-[100px] max-md:py-16 max-sm:py-12">
			{/* Background image */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
			/>

			<div className="relative z-[1] max-w-[1160px] mx-auto px-5">
				{/* Section Header: Badge + Heading + Subtitle */}
				<div className="flex flex-col items-center max-w-[657px] mx-auto">
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

					{/* Heading */}
					<div
						className={`w-full mt-3 sm:mt-4 md:mt-5 ${fadeClass(isVisible)}`}
						style={{ transitionDelay: "100ms" }}
					>
						<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-[42px] leading-[50px] sm:text-[52px] sm:leading-[60px] font-medium text-center max-sm:text-4xl max-sm:leading-[44px]">
							{block.heading}
						</h2>
					</div>

					{/* Subtitle */}
					<div
						className={`max-w-[600px] mx-auto mt-4 sm:mt-5 ${fadeClass(isVisible)}`}
						style={{ transitionDelay: "150ms" }}
					>
						<p className="text-brand-primary-alpha mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 text-center">
							{block.subtitle}
						</p>
					</div>
				</div>

				{/* Contact Card */}
				<div
					className={`mt-10 sm:mt-12 md:mt-14 rounded-2xl border border-brand-contact-card-border bg-brand-contact-card-bg backdrop-blur-[40px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_12px_80px_-10px_rgba(176,184,210,0.24)] ${fadeClass(isVisible)}`}
					style={{ transitionDelay: "200ms" }}
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						{/* Left: Contact Info */}
						<div className="flex flex-col">
							<h3 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-2xl sm:text-[28px] font-medium leading-8 sm:leading-9">
								{block.cardHeading}
							</h3>
							<p className="text-brand-primary-alpha mb-0 mt-3 sm:mt-4 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6">
								{block.cardDescription}
							</p>

							{/* Contact Items */}
							<div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4">
								{contactItems.map((item, index) => (
									<div
										key={index}
										ref={setItemRef(index)}
										className={`flex items-center gap-4 rounded-xl border border-brand-contact-item-border bg-brand-contact-item-bg p-4 sm:p-5 transition-all duration-700 ${
											visibleItems.has(index)
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-6"
										}`}
										style={{ transitionDelay: `${index * 100 + 300}ms` }}
									>
										<div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-contact-icon-bg flex items-center justify-center text-brand-purple">
											<ContactIcon type={item.type || "email"} />
										</div>
										<span className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-base sm:text-lg font-medium leading-6">
											{item.value}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Right: Contact Form */}
						<div
							className={`flex flex-col ${fadeClass(isVisible)}`}
							style={{ transitionDelay: "300ms" }}
						>
							<form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
								{/* Name */}
								<div className="flex flex-col gap-1.5">
									<label className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-medium leading-6">
										{block.formFields?.nameLabel}
									</label>
									<input
										type="text"
										placeholder={block.formFields?.namePlaceholder || "Enter your Name"}
										className="border border-brand-contact-input-border bg-white text-brand-primary rounded-xl h-12 sm:h-[52px] px-4 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 focus:border-brand-purple-light focus:outline-none placeholder:text-brand-contact-input-placeholder placeholder:font-[family-name:var(--font-inter-tight)] placeholder:text-base placeholder:font-normal"
									/>
								</div>

								{/* Email */}
								<div className="flex flex-col gap-1.5">
									<label className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-medium leading-6">
										{block.formFields?.emailLabel}
									</label>
									<input
										type="email"
										placeholder={block.formFields?.emailPlaceholder || "Enter your email"}
										className="border border-brand-contact-input-border bg-white text-brand-primary rounded-xl h-12 sm:h-[52px] px-4 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 focus:border-brand-purple-light focus:outline-none placeholder:text-brand-contact-input-placeholder placeholder:font-[family-name:var(--font-inter-tight)] placeholder:text-base placeholder:font-normal"
									/>
								</div>

								{/* Phone */}
								<div className="flex flex-col gap-1.5">
									<label className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-medium leading-6">
										{block.formFields?.phoneLabel}
									</label>
									<input
										type="tel"
										placeholder={block.formFields?.phonePlaceholder || "(+123)"}
										className="border border-brand-contact-input-border bg-white text-brand-primary rounded-xl h-12 sm:h-[52px] px-4 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 focus:border-brand-purple-light focus:outline-none placeholder:text-brand-contact-input-placeholder placeholder:font-[family-name:var(--font-inter-tight)] placeholder:text-base placeholder:font-normal"
									/>
								</div>

								{/* Company Name */}
								<div className="flex flex-col gap-1.5">
									<label className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-medium leading-6">
										{block.formFields?.companyLabel}
									</label>
									<input
										type="text"
										placeholder={block.formFields?.companyPlaceholder || "Enter your company name"}
										className="border border-brand-contact-input-border bg-white text-brand-primary rounded-xl h-12 sm:h-[52px] px-4 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 focus:border-brand-purple-light focus:outline-none placeholder:text-brand-contact-input-placeholder placeholder:font-[family-name:var(--font-inter-tight)] placeholder:text-base placeholder:font-normal"
									/>
								</div>

								{/* Message */}
								<div className="flex flex-col gap-1.5">
									<label className="text-brand-primary font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-medium leading-6">
										{block.formFields?.messageLabel}
									</label>
									<textarea
										placeholder={block.formFields?.messagePlaceholder || "Message here"}
										rows={4}
										className="border border-brand-contact-input-border bg-white text-brand-primary rounded-xl p-4 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 focus:border-brand-purple-light focus:outline-none resize-y placeholder:text-brand-contact-input-placeholder placeholder:font-[family-name:var(--font-inter-tight)] placeholder:text-base placeholder:font-normal"
									/>
								</div>

								{/* Submit Button */}
								<div className="flex justify-center mt-2">
									<Button type="submit" variant="secondary" size="lg">
										{block.buttonText}
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
