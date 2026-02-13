import type { Page } from "@/payload-types";
import { HeroBlock } from "./hero-block";
import { HeaderBlock } from "./header-block";
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

interface RenderBlocksProps {
	blocks: Page["blocks"];
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
	if (!blocks || blocks.length === 0) {
		return null;
	}

	return (
		<>
			{blocks.map((block, index) => {
				switch (block.blockType) {
					case "hero":
						return (
							<HeroBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "header":
						return (
							<HeaderBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "process":
						return (
							<ProcessBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "pricing":
						return (
							<PricingBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "pricingAlt":
						return (
							<PricingAltBlock
								key={`${block.blockType}-${index}`}
								block={block}
							/>
						);
					case "feature":
						return (
							<FeatureBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "integration":
						return (
							<IntegrationBlock
								key={`${block.blockType}-${index}`}
								block={block}
							/>
						);
					case "testimonial":
						return (
							<TestimonialBlock
								key={`${block.blockType}-${index}`}
								block={block}
							/>
						);
					case "faq":
						return (
							<FaqBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "cta":
						return (
							<CtaBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "blog":
						return (
							<BlogBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "footer":
						return (
							<FooterBlock key={`${block.blockType}-${index}`} block={block} />
						);
					case "partnership":
						return (
							<PartnershipBlock
								key={`${block.blockType}-${index}`}
								block={block}
							/>
						);
					default:
						return null;
				}
			})}
		</>
	);
}
