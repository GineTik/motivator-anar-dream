"use client";

import type { TextFieldClientComponent } from "payload";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useField } from "@payloadcms/ui";
import { ChevronDown, X } from "lucide-react";

import type { PageWithSections } from "./use-page-sections";
import { usePageSections } from "./use-page-sections";
import { STYLES } from "./styles";

const queryClient = new QueryClient();

type DisplayInfo = {
	pageName: string;
	sectionName: string | null;
};

type FlatItem = {
	type: "page" | "section";
	label: string;
	value: string;
};

export const SmartUrlField: TextFieldClientComponent = (props) => (
	<QueryClientProvider client={queryClient}>
		<SmartUrlFieldInner {...props} />
	</QueryClientProvider>
);

const SmartUrlFieldInner: TextFieldClientComponent = ({ field, path }) => {
	const { value, setValue } = useField<string>({ path });
	const { pages, isLoading, error, load } = usePageSections();
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [search, setSearch] = useState("");
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const isInternal = typeof value === "string" && value.startsWith("/");
	const showChip = isInternal && !isEditing;

	const resolvedInfo = useMemo(() => {
		if (!isInternal || !value) return null;
		return resolveDisplayInfo(value, pages);
	}, [isInternal, value, pages]);

	const flatItems = useMemo(
		() => (isOpen ? flattenItems(pages, search) : []),
		[isOpen, pages, search],
	);

	const openDropdown = useCallback(() => {
		if (!isOpen) {
			setIsOpen(true);
			setSearch("");
			setHighlightedIndex(-1);
			load();
		}
	}, [isOpen, load]);

	const closeDropdown = useCallback(() => {
		setIsOpen(false);
		setSearch("");
		setHighlightedIndex(-1);
	}, []);

	const selectItem = useCallback(
		(itemValue: string) => {
			setValue(itemValue);
			setIsEditing(false);
			closeDropdown();
		},
		[setValue, closeDropdown],
	);

	const handleChipClick = useCallback(() => {
		setIsEditing(true);
		requestAnimationFrame(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
	}, []);

	const handleClear = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			setValue("");
			setIsEditing(true);
			requestAnimationFrame(() => inputRef.current?.focus());
		},
		[setValue],
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
		},
		[setValue],
	);

	const handleInputFocus = useCallback(() => {
		if (!value) openDropdown();
	}, [value, openDropdown]);

	const handleInputBlur = useCallback(() => {
		requestAnimationFrame(() => {
			if (!containerRef.current?.contains(document.activeElement)) {
				if (isInternal) setIsEditing(false);
				closeDropdown();
			}
		});
	}, [isInternal, closeDropdown]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (!isOpen) return;
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					setHighlightedIndex((prev) =>
						prev < flatItems.length - 1 ? prev + 1 : 0,
					);
					break;
				case "ArrowUp":
					e.preventDefault();
					setHighlightedIndex((prev) =>
						prev > 0 ? prev - 1 : flatItems.length - 1,
					);
					break;
				case "Enter":
					e.preventDefault();
					if (highlightedIndex >= 0 && flatItems[highlightedIndex]) {
						selectItem(flatItems[highlightedIndex].value);
					}
					break;
				case "Escape":
					e.preventDefault();
					closeDropdown();
					inputRef.current?.focus();
					break;
			}
		},
		[isOpen, flatItems, highlightedIndex, selectItem, closeDropdown],
	);

	useEffect(() => {
		function handleMouseDown(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				if (isInternal) setIsEditing(false);
				closeDropdown();
			}
		}
		document.addEventListener("mousedown", handleMouseDown);
		return () => document.removeEventListener("mousedown", handleMouseDown);
	}, [isInternal, closeDropdown]);

	useEffect(() => {
		if (isOpen && searchRef.current) {
			searchRef.current.focus();
		}
	}, [isOpen]);

	return (
		<div ref={containerRef} style={STYLES.container}>
			<label style={STYLES.label}>
				{typeof field.label === "string" ? field.label : "Посилання"}
			</label>

			<div style={STYLES.inputRow} role="combobox" aria-expanded={isOpen}>
				{showChip ? (
					<SmartUrlChip
						info={resolvedInfo}
						onChipClick={handleChipClick}
						onClear={handleClear}
					/>
				) : (
					<input
						ref={inputRef}
						style={STYLES.input}
						value={value ?? ""}
						onChange={handleInputChange}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						placeholder="https://example.com or select a page"
					/>
				)}

				<button
					type="button"
					style={STYLES.chevron}
					onClick={() => (isOpen ? closeDropdown() : openDropdown())}
					aria-label="Toggle dropdown"
				>
					<ChevronDown size={16} />
				</button>
			</div>

			{isOpen && (
				<SmartUrlDropdown
					items={flatItems}
					isLoading={isLoading}
					error={error}
					search={search}
					highlightedIndex={highlightedIndex}
					searchRef={searchRef}
					onSearchChange={(val) => {
						setSearch(val);
						setHighlightedIndex(0);
					}}
					onKeyDown={handleKeyDown}
					onSelect={selectItem}
					onHighlight={setHighlightedIndex}
					onRetry={load}
				/>
			)}

			{field.admin?.description && (
				<div style={STYLES.description}>
					{typeof field.admin.description === "string"
						? field.admin.description
						: null}
				</div>
			)}
		</div>
	);
};

function SmartUrlChip({
	info,
	onChipClick,
	onClear,
}: {
	info: DisplayInfo | null;
	onChipClick: () => void;
	onClear: (e: React.MouseEvent) => void;
}) {
	return (
		<div
			style={STYLES.chip}
			onClick={onChipClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter") onChipClick();
			}}
		>
			<span style={STYLES.chipBadge}>
				{info?.pageName}
				{info?.sectionName && ` → ${info.sectionName}`}
				<button
					type="button"
					style={STYLES.chipClear}
					onClick={onClear}
					aria-label="Clear link"
				>
					<X size={10} />
				</button>
			</span>
		</div>
	);
}

function SmartUrlDropdown({
	items,
	isLoading,
	error,
	search,
	highlightedIndex,
	searchRef,
	onSearchChange,
	onKeyDown,
	onSelect,
	onHighlight,
	onRetry,
}: {
	items: FlatItem[];
	isLoading: boolean;
	error: string | null;
	search: string;
	highlightedIndex: number;
	searchRef: React.RefObject<HTMLInputElement | null>;
	onSearchChange: (value: string) => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
	onSelect: (value: string) => void;
	onHighlight: (index: number) => void;
	onRetry: () => void;
}) {
	return (
		<div style={STYLES.dropdown} role="listbox" onKeyDown={onKeyDown}>
			<input
				ref={searchRef}
				style={STYLES.searchInput}
				value={search}
				onChange={(e) => onSearchChange(e.target.value)}
				onKeyDown={onKeyDown}
				placeholder="Search pages..."
			/>

			{isLoading && <div style={STYLES.loading}>Loading pages...</div>}

			{error && (
				<div
					style={STYLES.error}
					onClick={onRetry}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === "Enter") onRetry();
					}}
				>
					Failed to load pages. Click to retry.
				</div>
			)}

			{!isLoading && !error && items.length === 0 && (
				<div style={STYLES.loading}>No pages found</div>
			)}

			{!isLoading &&
				!error &&
				items.map((item, index) => (
					<div key={item.value}>
						{item.type === "page" && (
							<div style={STYLES.groupHeader}>{item.label}</div>
						)}
						<div
							role="option"
							aria-selected={highlightedIndex === index}
							style={{
								...STYLES.item,
								...(item.type === "section"
									? STYLES.sectionItem
									: {}),
								...(highlightedIndex === index
									? STYLES.itemHighlighted
									: {}),
							}}
							onClick={() => onSelect(item.value)}
							onMouseEnter={() => onHighlight(index)}
						>
							{item.type === "page"
								? `/${item.label}`
								: item.label}
						</div>
					</div>
				))}
		</div>
	);
}

function resolveDisplayInfo(
	value: string,
	pages: PageWithSections[],
): DisplayInfo {
	const [rawPath, anchor] = value.replace(/^\//, "").split("#");
	const path = rawPath === "" ? "home" : rawPath;
	const page = pages.find((p) => p.slug === path);
	if (!page) return { pageName: path, sectionName: anchor ?? null };
	const section = anchor
		? page.sections.find((s) => s.anchor === anchor)
		: null;
	return {
		pageName: page.title,
		sectionName: section?.label ?? anchor ?? null,
	};
}

function flattenItems(pages: PageWithSections[], search: string): FlatItem[] {
	const query = search.toLowerCase();
	const items: FlatItem[] = [];

	for (const page of pages) {
		const pageMatches = page.title.toLowerCase().includes(query);
		const matchingSections = page.sections.filter((s) =>
			pageMatches ? true : s.label.toLowerCase().includes(query),
		);

		if (!pageMatches && matchingSections.length === 0) continue;

		const pagePath = page.slug === "home" ? "/" : `/${page.slug}`;

		items.push({
			type: "page",
			label: page.title,
			value: pagePath,
		});

		for (const section of matchingSections) {
			const displayLabel =
				section.label === section.blockType
					? section.blockType
					: `${section.label} (${section.blockType})`;
			items.push({
				type: "section",
				label: displayLabel,
				value: `${pagePath}#${section.anchor}`,
			});
		}
	}

	return items;
}
