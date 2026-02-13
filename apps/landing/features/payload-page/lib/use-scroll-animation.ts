"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook for a single element fade-in on scroll.
 * Returns a ref to attach and a boolean for visibility.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
	threshold = 0.1,
) {
	const ref = useRef<T>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
					}
				});
			},
			{ threshold },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold]);

	return { ref, isVisible };
}

/**
 * Hook for staggered list items fade-in on scroll.
 * Returns a ref callback and a Set of visible indices.
 */
export function useStaggerAnimation(
	itemCount: number,
	threshold = 0.1,
) {
	const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
	const itemRefs = useRef<(HTMLElement | null)[]>([]);

	useEffect(() => {
		const observers = itemRefs.current.map((item, index) => {
			if (!item) return null;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setVisibleItems((prev) => new Set(prev).add(index));
						}
					});
				},
				{ threshold },
			);

			observer.observe(item);
			return observer;
		});

		return () => {
			observers.forEach((observer) => observer?.disconnect());
		};
	}, [itemCount, threshold]);

	const setItemRef = (index: number) => (el: HTMLElement | null) => {
		itemRefs.current[index] = el;
	};

	return { visibleItems, setItemRef };
}

/** Standard fade-in-up classes matching the established pattern */
export const fadeInUp = {
	visible: "opacity-100 translate-y-0 blur-0",
	hidden: "opacity-0 translate-y-6 blur-[3px]",
	transition: "transition-all duration-700",
} as const;

/** Shorthand: returns the full className string based on visibility */
export function fadeClass(isVisible: boolean, extra = "") {
	return `${fadeInUp.transition} ${isVisible ? fadeInUp.visible : fadeInUp.hidden} ${extra}`.trim();
}
