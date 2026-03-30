"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@payloadcms/ui";
import { toKebabCase } from "@/shared/lib/utils";

export type Section = {
	label: string;
	blockType: string;
	anchor: string;
};

export type PageWithSections = {
	title: string;
	slug: string;
	sections: Section[];
};

type PagesApiResponse = {
	docs?: Array<{
		title: string;
		slug: string;
		blocks?: Array<{ blockType: string; blockName?: string }>;
	}>;
};

function transformPages(data: PagesApiResponse): PageWithSections[] {
	return (data.docs ?? []).map((page) => ({
		title: page.title,
		slug: page.slug,
		sections: (page.blocks ?? []).map((block) => ({
			label: block.blockName || block.blockType,
			blockType: block.blockType,
			anchor: toKebabCase(block.blockType),
		})),
	}));
}

const PAGES_API_ENDPOINT = "/api/pages";
const QUERY_KEY = "pages-sections";

async function fetchPages(localeCode: string): Promise<PageWithSections[]> {
	const res = await fetch(
		`${PAGES_API_ENDPOINT}?depth=0&limit=0&locale=${localeCode}`,
	);
	if (!res.ok) throw new Error(`Failed to fetch pages: ${res.status}`);
	const data: PagesApiResponse = await res.json();
	return transformPages(data);
}

type UsePageSectionsReturn = {
	pages: PageWithSections[];
	isLoading: boolean;
	error: string | null;
	load: () => void;
};

export function usePageSections(): UsePageSectionsReturn {
	const locale = useLocale();
	const localeCode = locale.code;

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: [QUERY_KEY, localeCode],
		queryFn: () => fetchPages(localeCode),
		staleTime: Infinity,
		enabled: false,
	});

	return {
		pages: data ?? [],
		isLoading,
		error: error?.message ?? null,
		load: () => { refetch(); },
	};
}
