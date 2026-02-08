"use client";

import type { PricingBlock as PricingBlockType } from "@/payload-types";
import { CircleCheck } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface PricingBlockProps {
	block: PricingBlockType;
}

interface TestimonialCardProps {
	testimonial: NonNullable<PricingBlockType["testimonials"]>[number];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
	const authorImageUrl =
		typeof testimonial.authorImage === "object" && testimonial.authorImage?.url
			? testimonial.authorImage.url
			: null;

	return (
		<div className="rounded-xl bg-white backdrop-blur-[16px] border-4 border-brand-testimonial-border mb-4 p-8 shadow-[inset_0_12px_12px_var(--color-brand-testimonial-shadow),inset_0_-12px_12px_var(--color-brand-testimonial-shadow)] md:p-8 md:mb-4 max-[767px]:p-6 max-[767px]:mb-3 max-[479px]:border-2 max-[479px]:p-5">
			<div>
				<div className="text-brand-primary-alpha mb-0 text-base leading-6">
					&ldquo;{testimonial.quote}&rdquo;
				</div>
			</div>
			<div className="flex gap-[10px] justify-between items-center mt-8 md:mt-7 max-[767px]:mt-6">
				<div>
					<div className="text-brand-primary tracking-[-0.01em] text-base leading-6 font-medium">
						{testimonial.authorName}
					</div>
					<div className="text-brand-primary-alpha mt-[2px] mb-0 text-base leading-6">
						{testimonial.authorRole}
					</div>
				</div>
				{authorImageUrl ? (
					<img
						src={authorImageUrl}
						loading="lazy"
						alt={testimonial.authorName}
						className="flex-none w-12 h-12 rounded-full object-cover max-[767px]:w-10 max-[767px]:h-10"
					/>
				) : (
					<div className="flex-none w-12 h-12 rounded-full bg-gradient-to-b from-brand-purple-light to-brand-purple flex items-center justify-center text-white font-medium text-lg max-[767px]:w-10 max-[767px]:h-10 max-[767px]:text-base">
						{testimonial.authorName?.charAt(0) || "?"}
					</div>
				)}
			</div>
		</div>
	);
}

interface ScrollColumnProps {
	testimonials: NonNullable<PricingBlockType["testimonials"]>;
	direction: "up" | "down";
	speed?: number;
}

function ScrollColumn({
	testimonials,
	direction,
	speed = 0.5,
}: ScrollColumnProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const measureRef = useRef<HTMLDivElement>(null);
	const [singleSetHeight, setSingleSetHeight] = useState(0);
	const offsetRef = useRef(0);
	const rafRef = useRef<number>(0);

	const measure = useCallback(() => {
		if (measureRef.current) {
			setSingleSetHeight(measureRef.current.offsetHeight);
		}
	}, []);

	useEffect(() => {
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [measure, testimonials]);

	useEffect(() => {
		if (singleSetHeight === 0) return;

		// For "down" direction, start offset at -singleSetHeight so it scrolls into view
		if (direction === "down") {
			offsetRef.current = -singleSetHeight;
		} else {
			offsetRef.current = 0;
		}

		const animate = () => {
			if (direction === "up") {
				offsetRef.current -= speed;
				if (offsetRef.current <= -singleSetHeight) {
					offsetRef.current += singleSetHeight;
				}
			} else {
				offsetRef.current += speed;
				if (offsetRef.current >= 0) {
					offsetRef.current -= singleSetHeight;
				}
			}

			if (trackRef.current) {
				trackRef.current.style.transform = `translateY(${offsetRef.current}px)`;
			}

			rafRef.current = requestAnimationFrame(animate);
		};

		rafRef.current = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(rafRef.current);
		};
	}, [singleSetHeight, direction, speed]);

	return (
		<div className="flex-1 overflow-hidden">
			<div ref={trackRef} className="will-change-transform">
				{/* First set - used for measuring */}
				<div ref={measureRef}>
					{testimonials.map((testimonial, index) => (
						<TestimonialCard key={`a-${index}`} testimonial={testimonial} />
					))}
				</div>
				{/* Second set - for seamless loop */}
				<div>
					{testimonials.map((testimonial, index) => (
						<TestimonialCard key={`b-${index}`} testimonial={testimonial} />
					))}
				</div>
			</div>
		</div>
	);
}

export function PricingBlock({ block }: PricingBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const planIconUrl =
		typeof block.plan?.icon === "object" && block.plan.icon?.url
			? block.plan.icon.url
			: null;

	const testimonials = block.testimonials || [];

	// Split testimonials into two columns
	const halfLength = Math.ceil(testimonials.length / 2);
	const column1Testimonials = testimonials.slice(0, halfLength);
	const column2Testimonials = testimonials.slice(halfLength);

	return (
		<section
			className="relative py-[100px] bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage:
					"url('https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/682cd44f3a882ae331b4c263_Pricing%2001%20Bg.avif')",
			}}
		>
			<div className="relative z-[1] max-w-[1240px] mx-auto px-5">
				<div className="w-full">
					{/* Header */}
					<div className="block">
						<div className="flex flex-col justify-start items-center max-w-[701px] mx-auto">
							{/* Badge */}
							<div className="flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)]">
								<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px] md:px-[14.82px] md:py-[3px] md:pl-[3px] max-[479px]:pr-[10px]">
									<div className="rounded-full w-auto md:w-10 lg:w-auto p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)]">
										<div className="relative z-[1] bg-white bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to rounded-full flex justify-center items-center w-[33px] h-6 md:w-10 md:h-8 lg:w-[33px] lg:h-6 md:p-[6px] max-[767px]:p-[5px] max-[479px]:p-1">
											{badgeIconUrl ? (
												<img
													src={badgeIconUrl}
													loading="lazy"
													alt=""
													className="relative z-[2] w-auto h-auto md:w-[15px] lg:w-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)]"
												/>
											) : (
												<div className="text-xl font-bold text-brand-purple">
													!
												</div>
											)}
										</div>
										<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-outline-from to-brand-badge-outline-to rounded-full absolute inset-0"></div>
									</div>
									<div className="flex">
										<div className="text-brand-primary tracking-[-0.03em] text-sm leading-[22px] md:text-base md:leading-6 max-[479px]:text-sm max-[479px]:leading-[22px]">
											{block.badge?.text}
										</div>
									</div>
								</div>
								<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-border-from to-brand-badge-border-to rounded-full absolute inset-0 max-[479px]:w-full"></div>
							</div>

							{/* Heading and Subtitle */}
							<div className="flex flex-col gap-5 md:gap-5 max-[479px]:gap-4 justify-start items-center w-full mt-5 max-[479px]:mt-4">
								<div>
									<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 text-[52px] font-medium leading-[60px] text-center md:text-5xl md:leading-[56px] max-[767px]:text-5xl max-[767px]:leading-[56px] max-[479px]:text-4xl max-[479px]:leading-[44px]">
										{block.heading}
									</h2>
								</div>
								<div>
									<div className="text-brand-primary-alpha mb-0 text-base leading-6 text-center">
										{block.subtitle}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="mt-20 flex justify-between lg:flex-row max-[991px]:flex-col max-[991px]:gap-[52px] max-[767px]:gap-12 max-[479px]:gap-10">
						{/* Left - Pricing Card */}
						<div className="w-[448px] max-w-full lg:w-[448px] max-[991px]:w-full">
							<div className="rounded-xl backdrop-blur-[32px] bg-brand-pricing-card-bg w-full p-[6px] overflow-hidden max-[767px]:p-1 max-[479px]:p-[3px]">
								<div className="relative z-[1] rounded-xl bg-white w-full p-6 pb-8 overflow-hidden max-[479px]:p-4">
									{/* Card Top */}
									<div className="bg-gradient-to-b from-brand-pricing-card-gradient-from to-brand-pricing-card-gradient-to border border-brand-pricing-card-border rounded-3xl p-6 md:rounded-[20px] max-[767px]:rounded-2xl max-[767px]:p-5 max-[479px]:p-4">
										{planIconUrl && (
											<img
												src={planIconUrl}
												loading="lazy"
												alt=""
												className="drop-shadow-[0_6.86px_10.43px_rgba(97,83,238,0.1)] max-[767px]:w-12 max-[479px]:w-10"
											/>
										)}
										<div className="mt-6 max-[767px]:mt-5 max-[479px]:mt-4">
											<h4 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 text-2xl font-medium leading-8 md:text-[22px] md:leading-[30px] max-[767px]:text-[22px] max-[767px]:leading-[30px] max-[479px]:text-xl max-[479px]:leading-7">
												{block.plan?.name}
											</h4>
											<div className="text-brand-pricing-plan-subtitle mt-4 mb-0 text-base leading-6 md:mt-3 max-[767px]:mt-[10px] max-[479px]:mt-2">
												{block.plan?.description}
											</div>
										</div>
										<div className="flex gap-1 justify-start items-end mt-6 max-[767px]:mt-5 max-[479px]:mt-4">
											<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 text-[52px] font-medium leading-[60px] md:text-5xl md:leading-[56px] max-[767px]:text-5xl max-[767px]:leading-[56px] max-[479px]:text-4xl max-[479px]:leading-[44px]">
												{block.plan?.price}
											</h2>
											<div className="text-brand-pricing-period mb-2 text-base leading-6">
												{block.plan?.period}
											</div>
										</div>
									</div>

									{/* Card Bottom */}
									<div className="mt-10 lg:mt-10 max-[991px]:mt-10 max-[767px]:mt-7 max-[479px]:mt-6">
										{/* Features */}
										<div className="flex flex-col gap-6 md:gap-5 max-[767px]:gap-4 max-[479px]:gap-3">
											{block.plan?.features?.map((feature, index) => (
												<div
													key={index}
													className="flex gap-3 justify-start items-center"
												>
													<CircleCheck className="w-6 h-6 flex-none text-brand-purple" />
													<div className="text-brand-primary tracking-[-0.03em] text-base leading-6 font-normal">
														{feature.text}
													</div>
												</div>
											))}
										</div>

										{/* Button */}
										<div className="mt-10 md:mt-8 max-[767px]:mt-7 max-[479px]:mt-6">
											<a
												href={block.plan?.buttonLink || "#"}
												className="relative flex justify-center items-center bg-gradient-to-b from-brand-gradient-from to-brand-gradient-to rounded-full px-[35px] py-[18px] w-full max-w-full no-underline overflow-hidden group md:px-7 md:py-4 max-[767px]:px-6 max-[767px]:py-[14px] max-[479px]:px-[22px] max-[479px]:py-3"
											>
												<div className="relative z-[2] text-white tracking-[-0.01em] text-base leading-6 font-medium">
													{block.plan?.buttonText}
												</div>
												<div className="absolute inset-0 bg-brand-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right - Testimonials */}
						<div className="w-[672px] max-w-full h-[740px] relative overflow-hidden lg:w-[672px] lg:h-[740px] max-[991px]:w-full max-[991px]:h-[500px] max-[767px]:h-[450px]">
							<div className="flex gap-4 md:gap-4 max-[767px]:gap-3 h-full">
								{/* Column 1 - Scrolling Up */}
								<ScrollColumn
									testimonials={column1Testimonials}
									direction="up"
									speed={0.5}
								/>

								{/* Column 2 - Scrolling Down - Hidden on mobile */}
								<div className="flex-1 max-[479px]:hidden">
									<ScrollColumn
										testimonials={column2Testimonials}
										direction="down"
										speed={0.4}
									/>
								</div>
							</div>

							{/* Gradient Fog Overlay - Top and Bottom */}
							<div
								className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
								style={{
									background:
										"linear-gradient(to bottom, var(--color-brand-shadow-overlay-start) 0%, transparent 100%)",
								}}
							></div>
							<div
								className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
								style={{
									background:
										"linear-gradient(to top, var(--color-brand-shadow-overlay-end) 0%, transparent 100%)",
								}}
							></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
