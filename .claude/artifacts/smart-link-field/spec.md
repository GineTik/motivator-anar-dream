# Smart Link Field — Spec

## Goal

Replace all plain-text `href` fields in Payload CMS with an intuitive link selector that lets non-technical users choose between a custom URL, an internal page, or a section anchor — without typing raw paths or anchors.

## Context

- Current state: all links (header nav, CTA buttons, footer) use `type: "text"` for href
- Problem: the client (non-technical user) must manually type URLs like `/about`, `#pricing`, or `https://...` — error-prone and confusing
- Payload CMS supports `relationship` fields and conditional field visibility (`admin.condition`) which can power a WordPress-like link picker
- 14 block types exist with auto-generated section IDs (kebab-cased `blockType`)
- Pages collection has `slug` field with unique constraint

## Requirements

### Core

- MUST provide 3 link type options: **Custom URL**, **Page**, **Section**
- MUST show only the relevant input field based on selected link type
- MUST support `openInNewTab` checkbox (for Custom URL and Page types)
- MUST be a reusable field config that can replace all existing `href` text fields
- MUST resolve to a valid `href` string on the frontend (e.g., `/slug`, `#section-id`, `https://...`)

### Link Types

#### Custom URL
- MUST accept any URL: absolute (`https://...`), relative (`/path`), or anchor (`#id`)
- SHOULD show placeholder text: `https://example.com`

#### Page
- MUST show a dropdown/search of all pages from the `pages` collection
- MUST store a relationship to the page document
- MUST resolve to the page's slug at render time (e.g., page with slug `about` → `/about`)
- SHOULD handle deleted pages gracefully (broken link warning or fallback)

#### Section
- MUST show a select dropdown with available section types
- MUST generate anchor href from selected section (e.g., `pricing` → `#pricing`)
- Section options derived from known block types: hero, process, pricing, pricing-alt, feature, integration, testimonial, faq, cta, blog, footer, partnership, gallery, contact-us

### Backwards Compatibility

- MUST NOT break existing data — migration strategy needed for existing text-based hrefs
- SHOULD support a migration path: existing text values become "Custom URL" type entries

## Design

### Admin UI (Payload CMS)

```
┌─────────────────────────────────────┐
│ Link Type:  [Custom URL ▾]          │  ← select dropdown
├─────────────────────────────────────┤
│ URL: [https://example.com      ]    │  ← shown for "Custom URL"
│ ☐ Open in new tab                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Link Type:  [Page ▾]                │
├─────────────────────────────────────┤
│ Page: [🔍 Home                 ▾]   │  ← relationship field (searchable)
│ ☐ Open in new tab                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Link Type:  [Section ▾]             │
├─────────────────────────────────────┤
│ Section: [Pricing ▾]               │  ← select dropdown
└─────────────────────────────────────┘
```

### States

- **Default**: Link Type = "Custom URL", URL field empty
- **Page selected**: shows page title in relationship field
- **Section selected**: shows section name in select
- **No page found**: relationship field shows empty/search state

### Field Configuration (Payload schema)

The smart link is a `group` field with conditional child visibility:

```
linkType: select ("custom" | "page" | "section")
url: text (visible when linkType = "custom")
page: relationship → pages (visible when linkType = "page")
section: select (visible when linkType = "section")
openInNewTab: checkbox (visible when linkType ≠ "section")
```

## Data Model

```typescript
type SmartLink = {
	linkType: "custom" | "page" | "section";
	url?: string;            // when linkType = "custom"
	page?: string | Page;    // when linkType = "page" (Payload relationship)
	section?: string;        // when linkType = "section" (block type slug)
	openInNewTab?: boolean;
};
```

### Frontend Resolution

```typescript
function resolveHref(link: SmartLink): string {
	switch (link.linkType) {
		case "custom":
			return link.url ?? "#";
		case "page":
			// page is populated via Payload depth
			const page = link.page as Page;
			return page?.slug ? `/${page.slug}` : "#";
		case "section":
			return link.section ? `#${toKebabCase(link.section)}` : "#";
	}
}
```

## Affected Files

### New
- `apps/landing/shared/collections/fields/smart-link.ts` — reusable field config

### Modified
- `apps/landing/shared/collections/globals/header.ts` — replace href text fields
- `apps/landing/shared/collections/blocks/hero-block.ts` — replace ctaButton href
- `apps/landing/shared/collections/blocks/cta-block.ts` — replace ctaButton href
- `apps/landing/shared/collections/blocks/footer-block.ts` — replace link hrefs
- `apps/landing/shared/collections/blocks/process-block.ts` — replace buttonLink
- `apps/landing/features/payload-page/ui/site-header.tsx` — use resolveHref
- `apps/landing/features/payload-page/ui/hero-block.tsx` — use resolveHref
- `apps/landing/features/payload-page/ui/cta-block.tsx` — use resolveHref
- `apps/landing/features/payload-page/ui/footer-block.tsx` — use resolveHref
- Frontend utility file for `resolveHref` function

## Edge Cases

- Page is deleted after being selected → `resolveHref` returns `#`, link renders but goes nowhere
- Multiple blocks of same type on a page → section anchor scrolls to first matching ID (existing limitation of render-blocks.tsx)
- Existing data has plain text hrefs → need migration or backwards-compatible reading
- Page slug changes → link auto-updates because it's a relationship (Payload resolves at render time)

## Out of Scope

- Custom section IDs per block instance (would fix duplicate ID issue but separate concern)
- Link validation/broken link detection in admin
- Nested page + section combination (e.g., "go to #pricing on /about page")
- Visual link preview in admin panel

## Acceptance Criteria

- [ ] Admin UI shows 3-option link type selector for all link fields
- [ ] Selecting "Page" shows searchable page dropdown
- [ ] Selecting "Section" shows section type dropdown
- [ ] Selecting "Custom URL" shows text input
- [ ] "Open in new tab" checkbox appears for Custom URL and Page types only
- [ ] Frontend correctly resolves all 3 link types to valid href strings
- [ ] Existing pages with old data continue to work (migration or fallback)
- [ ] Header navigation links use the new smart link field
- [ ] CTA and Hero button links use the new smart link field
- [ ] Footer links use the new smart link field
- [ ] Types regenerated successfully with `npx payload generate:types`
