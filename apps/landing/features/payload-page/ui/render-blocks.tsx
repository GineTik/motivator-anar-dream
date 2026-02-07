import type { Page } from "@/payload-types";
import { HeroBlock } from "./hero-block";

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
					default:
						return null;
				}
			})}
		</>
	);
}
