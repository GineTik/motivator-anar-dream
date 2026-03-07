type SmartLinkData = {
	linkType?: "custom" | "section" | null;
	url?: string | null;
	section?: string | null;
	// Legacy field names for backwards compatibility
	href?: string | null;
	buttonLink?: string | null;
	buttonHref?: string | null;
	ctaLink?: string | null;
};

export function resolveHref(link: SmartLinkData): string {
	if (link.linkType === "section") {
		return link.section ? `#${link.section}` : "#";
	}

	if (link.linkType === "custom") {
		return link.url || "#";
	}

	// Fallback for old data without linkType
	return link.url || link.href || link.buttonLink || link.buttonHref || link.ctaLink || "#";
}
