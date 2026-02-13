"use client";

import type { GalleryBlock as GalleryBlockType } from "@/payload-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";

interface GalleryBlockProps {
	block: GalleryBlockType;
}

interface GalleryImage {
	url: string;
	alt: string;
}

export function GalleryBlock({ block }: GalleryBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const { ref: headerRef, isVisible: isHeaderVisible } =
		useScrollAnimation<HTMLDivElement>();

	const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxVisible, setLightboxVisible] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const images: GalleryImage[] = (block.images || [])
		.map((item) => {
			const url =
				typeof item.image === "object" && item.image?.url
					? item.image.url
					: null;
			return url ? { url, alt: item.alt || "Gallery image" } : null;
		})
		.filter((img): img is GalleryImage => img !== null);

	useEffect(() => {
		const observers = cardRefs.current.map((card, index) => {
			if (!card) return null;
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setVisibleCards((prev) => new Set(prev).add(index));
						}
					});
				},
				{ threshold: 0.1 },
			);
			observer.observe(card);
			return observer;
		});

		return () => {
			observers.forEach((observer) => observer?.disconnect());
		};
	}, [images.length]);

	const FALLBACK_BG =
		"https://cdn.prod.website-files.com/6828ea881872740b3f4a766c/682f0e4c4ee9e7987f606b8a_Process%2002%20Bg.avif";

	const fallbackImages: GalleryImage[] = Array.from({ length: 6 }, (_, i) => ({
		url: "",
		alt: `Visual representation ${i + 1}`,
	}));

	const displayImages = images.length > 0 ? images : fallbackImages;
	const isFallback = images.length === 0;

	const prevIndex =
		activeIndex > 0 ? activeIndex - 1 : displayImages.length - 1;
	const nextIndex =
		activeIndex < displayImages.length - 1 ? activeIndex + 1 : 0;

	const openLightbox = useCallback((index: number) => {
		setActiveIndex(index);
		setLightboxOpen(true);
		document.body.style.overflow = "hidden";
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setLightboxVisible(true);
			});
		});
	}, []);

	const closeLightbox = useCallback(() => {
		setLightboxVisible(false);
		setTimeout(() => {
			setLightboxOpen(false);
			document.body.style.overflow = "";
		}, 300);
	}, []);

	const goNext = useCallback(() => {
		setActiveIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
	}, [displayImages.length]);

	const goPrev = useCallback(() => {
		setActiveIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
	}, [displayImages.length]);

	useEffect(() => {
		if (!lightboxOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeLightbox();
			if (e.key === "ArrowRight") goNext();
			if (e.key === "ArrowLeft") goPrev();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [lightboxOpen, closeLightbox, goNext, goPrev]);

	return (
		<>
			<section className="relative py-[100px]">
				<div className="relative z-[1] max-w-[1160px] mx-auto px-5">
					{/* Header */}
					<div
						ref={headerRef}
						className="flex flex-col justify-start items-center max-w-[657px] mx-auto"
					>
						{/* Badge */}
						<div
							className={`flex justify-center items-center p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)] ${fadeClass(isHeaderVisible)}`}
						>
							<div className="relative z-[1] flex gap-2 bg-white rounded-full justify-center items-center px-[14.82px] py-[3.33px] pl-[3.71px]">
								<div className="rounded-full w-[33px] h-6 p-[0.82px] relative shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)]">
									<div className="relative z-[1] bg-white bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to rounded-full flex justify-center items-center w-[33px] h-6 p-0">
										{badgeIconUrl ? (
											<img
												src={badgeIconUrl}
												loading="lazy"
												alt=""
												className="relative z-[2] w-auto h-auto drop-shadow-[0_4.53px_7px_rgba(97,83,238,0.31)]"
											/>
										) : (
											<div className="text-xl font-bold text-brand-purple">
												✦
											</div>
										)}
									</div>
									<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-outline-from to-brand-badge-outline-to rounded-full absolute inset-0"></div>
								</div>
								<div className="flex">
									<div className="text-brand-primary tracking-[-0.03em] font-[family-name:var(--font-inter-tight)] text-base leading-6 font-normal">
										{block.badge?.text}
									</div>
								</div>
							</div>
							<div className="opacity-[0.14] bg-gradient-to-b from-brand-badge-border-from to-brand-badge-border-to rounded-full absolute inset-0"></div>
						</div>

						{/* Heading & Subtitle */}
						<div
							className={`flex flex-col gap-5 justify-start items-center w-full mt-5 ${fadeClass(isHeaderVisible)}`}
							style={{ transitionDelay: "100ms" }}
						>
							<h2 className="text-brand-primary tracking-[-0.02em] mt-0 mb-0 font-[family-name:var(--font-inter-tight)] text-[52px] font-medium leading-[60px] text-center max-md:text-5xl max-md:leading-[56px] max-sm:text-4xl max-sm:leading-[44px]">
								{block.heading}
							</h2>
							<p className="text-brand-primary mb-0 font-[family-name:var(--font-inter-tight)] text-base font-normal leading-6 text-center">
								{block.subtitle}
							</p>
						</div>
					</div>

					{/* Gallery Grid */}
					<div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{displayImages.map((image, index) => {
							const isVisible = visibleCards.has(index);

							return (
								<div
									key={index}
									ref={(el) => {
										cardRefs.current[index] = el;
									}}
									className={`
										rounded-xl backdrop-blur-[40.55px] bg-brand-feature-card-bg p-1 overflow-hidden
										shadow-[0_12px_80px_-10px_rgba(176,184,210,0.24)]
										transition-all duration-700 cursor-pointer group
										${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
									`}
									style={{ transitionDelay: `${index * 80}ms` }}
									onClick={() => openLightbox(index)}
								>
									<div
										className="border-2 border-white rounded-[10px] bg-gradient-to-b from-brand-feature-card-gradient-from via-brand-feature-card-gradient-via to-brand-feature-card-gradient-to overflow-hidden relative bg-cover bg-center"
										style={
											isFallback
												? { backgroundImage: `url('${FALLBACK_BG}')` }
												: undefined
										}
									>
										{isFallback ? (
											<div className="aspect-[4/3] flex items-center justify-center">
												<div className="text-brand-testimonial-tagline font-[family-name:var(--font-inter-tight)] text-base font-medium text-center">
													Visual representation
												</div>
											</div>
										) : (
											<img
												src={image.url}
												alt={image.alt}
												loading="lazy"
												className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										)}
										{/* Hover overlay */}
										<div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300 flex items-center justify-center">
											<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
												<svg
													className="w-5 h-5 text-brand-primary"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
													/>
												</svg>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Lightbox */}
			{lightboxOpen && (
				<div
					className={`
						fixed inset-0 z-50 flex items-center justify-center
						transition-opacity duration-300
						${lightboxVisible ? "opacity-100" : "opacity-0"}
					`}
					onClick={closeLightbox}
				>
					{/* Backdrop */}
					<div
						className={`
							absolute inset-0 bg-brand-primary/80 backdrop-blur-md
							transition-opacity duration-300
							${lightboxVisible ? "opacity-100" : "opacity-0"}
						`}
					/>

					{/* Close button */}
					<button
						onClick={closeLightbox}
						className={`
							absolute top-6 right-6 z-[60] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
							transition-all duration-300
							${lightboxVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
						`}
						style={{ transitionDelay: "100ms" }}
					>
						<svg
							className="w-6 h-6 text-white m-auto"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{/* Navigation arrows */}
					<button
						onClick={(e) => {
							e.stopPropagation();
							goPrev();
						}}
						className={`
							absolute left-4 z-[60] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
							transition-all duration-300 flex items-center justify-center max-sm:left-2
							${lightboxVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
						`}
						style={{ transitionDelay: "150ms" }}
					>
						<svg
							className="w-6 h-6 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							goNext();
						}}
						className={`
							absolute right-4 z-[60] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
							transition-all duration-300 flex items-center justify-center max-sm:right-2
							${lightboxVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
						`}
						style={{ transitionDelay: "150ms" }}
					>
						<svg
							className="w-6 h-6 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>

					{/* 3-slide carousel: prev peek | active | next peek */}
					<div
						className={`
							relative z-[55] flex items-center justify-center w-full
							transition-all duration-500
							${lightboxVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
						`}
						style={{ transitionDelay: "50ms" }}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Previous image peek — mostly off-screen */}
						<div
							className="absolute left-0 top-1/2 -translate-y-1/2 w-[18%] max-sm:w-[14%] -translate-x-[75%] cursor-pointer rounded-xl overflow-hidden transition-all duration-500 hover:brightness-75"
							onClick={goPrev}
						>
							<div className="relative">
								{isFallback ? (
									<div
										className="w-full h-[70vh] bg-cover bg-center flex items-center justify-center"
										style={{ backgroundImage: `url('${FALLBACK_BG}')` }}
									>
										<div className="text-brand-testimonial-tagline font-[family-name:var(--font-inter-tight)] text-xs font-medium text-center">
											Visual representation
										</div>
									</div>
								) : (
									<img
										src={displayImages[prevIndex].url}
										alt={displayImages[prevIndex].alt}
										className="w-full h-[70vh] object-cover"
									/>
								)}
								<div className="absolute inset-0 bg-brand-primary/40" />
							</div>
						</div>

						{/* Active image — centered */}
						<div className="w-[65%] max-sm:w-[80%] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
							{isFallback ? (
								<div
									className="w-full h-[70vh] bg-cover bg-center flex items-center justify-center"
									style={{ backgroundImage: `url('${FALLBACK_BG}')` }}
								>
									<div className="text-brand-testimonial-tagline font-[family-name:var(--font-inter-tight)] text-lg font-medium text-center">
										Visual representation
									</div>
								</div>
							) : (
								<img
									src={displayImages[activeIndex].url}
									alt={displayImages[activeIndex].alt}
									className="w-full h-[70vh] object-contain"
								/>
							)}
						</div>

						{/* Next image peek — mostly off-screen */}
						<div
							className="absolute right-0 top-1/2 -translate-y-1/2 w-[18%] max-sm:w-[14%] translate-x-[75%] cursor-pointer rounded-xl overflow-hidden transition-all duration-500 hover:brightness-75"
							onClick={goNext}
						>
							<div className="relative">
								{isFallback ? (
									<div
										className="w-full h-[70vh] bg-cover bg-center flex items-center justify-center"
										style={{ backgroundImage: `url('${FALLBACK_BG}')` }}
									>
										<div className="text-brand-testimonial-tagline font-[family-name:var(--font-inter-tight)] text-xs font-medium text-center">
											Visual representation
										</div>
									</div>
								) : (
									<img
										src={displayImages[nextIndex].url}
										alt={displayImages[nextIndex].alt}
										className="w-full h-[70vh] object-cover"
									/>
								)}
								<div className="absolute inset-0 bg-brand-primary/40" />
							</div>
						</div>
					</div>

					{/* Image counter */}
					<div
						className={`
							absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] text-white/70 text-sm font-[family-name:var(--font-inter-tight)]
							transition-all duration-300
							${lightboxVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
						`}
						style={{ transitionDelay: "200ms" }}
					>
						{activeIndex + 1} / {displayImages.length}
					</div>
				</div>
			)}
		</>
	);
}
