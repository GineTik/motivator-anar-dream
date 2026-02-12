import { getPayload } from "payload";
import config from "@/payload.config";
import { RenderBlocks } from "./ui/render-blocks";
import { notFound } from "next/navigation";

interface PageProps {
	params: {
		slug?: string[];
	};
}

export async function generateMetadata({ params }: PageProps) {
	const slug = params.slug?.join("/") || "home";
	const payload = await getPayload({ config });

	const result = await payload.find({
		collection: "pages",
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	});

	const page = result.docs[0];

	if (!page) {
		return {};
	}

	return {
		title: page.seo?.title || page.title,
		description: page.seo?.description,
		keywords: page.seo?.keywords,
		openGraph: {
			title: page.seo?.title || page.title,
			description: page.seo?.description,
			images:
				typeof page.seo?.ogImage === "object" && page.seo.ogImage?.url
					? [page.seo.ogImage.url]
					: [],
		},
	};
}

export default async function Page({ params }: PageProps) {
	const slug = params.slug?.join("/") || "home";
	const payload = await getPayload({ config });

	const result = await payload.find({
		collection: "pages",
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	});

	const page = result.docs[0];

	if (!page) {
		notFound();
	}

	return <RenderBlocks blocks={page.blocks} />;
}
