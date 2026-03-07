import type { Page } from "@/payload-types";
import { HeroBlock } from "./hero-block";
import { ProcessBlock } from "./process-block";
import { PricingBlock } from "./pricing-block";
import { PricingAltBlock } from "./pricing-alt-block";
import { FeatureBlock } from "./feature-block";
import { IntegrationBlock } from "./integration-block";
import { TestimonialBlock } from "./testimonial-block";
import { FaqBlock } from "./faq-block";
import { CtaBlock } from "./cta-block";
import { BlogBlock } from "./blog-block";
import { FooterBlock } from "./footer-block";
import { PartnershipBlock } from "./partnership-block";
import { GalleryBlock } from "./gallery-block";
import { ContactUsBlock } from "./contact-us-block";

interface RenderBlocksProps {
	blocks: Page["blocks"];
}

function toKebabCase(str: string): string {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function renderBlock(block: NonNullable<Page["blocks"]>[number]) {
	switch (block.blockType) {
		case "hero":
			return <HeroBlock block={block} />;
		case "process":
			return <ProcessBlock block={block} />;
		case "pricing":
			return <PricingBlock block={block} />;
		case "pricingAlt":
			return <PricingAltBlock block={block} />;
		case "feature":
			return <FeatureBlock block={block} />;
		case "integration":
			return <IntegrationBlock block={block} />;
		case "testimonial":
			return <TestimonialBlock block={block} />;
		case "faq":
			return <FaqBlock block={block} />;
		case "cta":
			return <CtaBlock block={block} />;
		case "blog":
			return <BlogBlock block={block} />;
		case "footer":
			return <FooterBlock block={block} />;
		case "partnership":
			return <PartnershipBlock block={block} />;
		case "gallery":
			return <GalleryBlock block={block} />;
		case "contactUs":
			return <ContactUsBlock block={block} />;
		default:
			return null;
	}
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
	if (!blocks || blocks.length === 0) {
		return null;
	}

	return (
		<>
			{blocks.map((block, index) => {
				const content = renderBlock(block);
				if (!content) return null;

				const sectionId = toKebabCase(block.blockType);

				return (
					<div key={`${block.blockType}-${index}`} id={sectionId}>
						{content}
					</div>
				);
			})}
		</>
	);
}
