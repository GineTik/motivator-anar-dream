---
name: implement-payload-section
description: Use when creating a new Payload CMS section/block from scratch or from a design reference for the landing page. Covers schema, component, registration, design system compliance, and validation.
---

# Implement Payload Section

## Overview

Step-by-step guide to implementing a new Payload CMS block (section) for the Anara Dreams landing page. Every section MUST reuse existing design patterns, shared components, and design tokens to maintain visual consistency.

**Key principle:** Reuse first, create second. Before writing any new UI, check what existing blocks already implement and copy those patterns exactly.

## When to Use

- Creating a new landing page section/block from scratch
- Implementing a section from a design mockup or description
- Adding a new block type to the Payload page builder

**Don't use for:**

- Migrating from reference HTML/CSS files (use `migrate-section-to-payload` instead)
- Editing existing blocks
- Schema-only changes without UI

## File Structure

```
apps/landing/
├── shared/collections/blocks/{name}-block.ts      # Schema (Step 1)
├── features/payload-page/ui/{name}-block.tsx       # Component (Step 2)
├── shared/collections/blocks/index.ts              # Export (Step 3)
├── shared/collections/pages.ts                     # Register (Step 3)
└── features/payload-page/ui/render-blocks.tsx      # Render (Step 3)
```

## Step 1: Block Schema

**File:** `apps/landing/shared/collections/blocks/{name}-block.ts`

```typescript
import type { Block } from "payload";

export const ExampleBlock: Block = {
    slug: "example",
    interfaceName: "ExampleBlock",
    fields: [
        // Fields here
    ],
};
```

### Standard Field Patterns

**Badge group** (most sections have this):

```typescript
{
	name: "badge",
	type: "group",
	fields: [
		{
			name: "icon",
			type: "upload",
			relationTo: "media",
			required: false,
		},
		{
			name: "text",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Your spiritual path",
		},
	],
},
```

**Heading + subtitle:**

```typescript
{
	name: "heading",
	type: "text",
	required: true,
	localized: true,
	defaultValue: "Your path to transformation",
},
{
	name: "subtitle",
	type: "textarea",
	required: true,
	localized: true,
	defaultValue: "Discover tools for consciousness and self-discovery that bring real change.",
},
```

**CTA button:**

```typescript
{
	name: "buttonText",
	type: "text",
	required: true,
	localized: true,
	defaultValue: "Begin your journey",
},
{
	name: "buttonLink",
	type: "text",
	required: false,
	defaultValue: "#",
},
```

**Array with items:**

```typescript
{
	name: "items",
	type: "array",
	minRows: 1,
	maxRows: 6,
	defaultValue: [
		{ heading: "Awareness", description: "Cultivate present-moment awareness..." },
		{ heading: "Connection", description: "Develop a profound relationship..." },
	],
	fields: [
		{
			name: "icon",
			type: "upload",
			relationTo: "media",
			required: false,
		},
		{
			name: "heading",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			localized: true,
		},
	],
},
```

**Media upload:**

```typescript
{
	name: "image",
	type: "upload",
	relationTo: "media",
	required: false,
	admin: {
		description: "Description of expected image format",
	},
},
```

### Default Value Rules

- ALL text fields MUST have `defaultValue`
- ALL defaults MUST be in **English**
- ALL defaults MUST use **Anara Dreams spiritual/transformation language**
- ALL user-facing text fields MUST have `localized: true`

**Good defaults:**

- "Your path to transformation"
- "Awaken to your inner truth"
- "Space for inner awakening"
- "Begin your journey"

**Bad defaults (generic SaaS - FORBIDDEN):**

- "Get started now"
- "Boost your productivity"
- "Scale your business"
- "Sign up for free"

## Step 2: Block Component

**File:** `apps/landing/features/payload-page/ui/{name}-block.tsx`

### Component Template

```typescript
"use client";

import type { ExampleBlock as ExampleBlockType } from "@/payload-types";
import { useScrollAnimation, fadeClass } from "../lib/use-scroll-animation";
import { Button } from "@/shared/ui/button";

interface ExampleBlockProps {
	block: ExampleBlockType;
}

export function ExampleBlock({ block }: ExampleBlockProps) {
	const badgeIconUrl =
		typeof block.badge?.icon === "object" && block.badge.icon?.url
			? block.badge.icon.url
			: null;

	const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

	return (
		<section ref={sectionRef} className="relative py-[100px]">
			<div className="relative z-[1] max-w-[1160px] mx-auto px-5">
				{/* Header: Badge + Heading + Subtitle */}
				{/* Content area */}
			</div>
		</section>
	);
}
```

### CRITICAL: Media URL Extraction

Payload returns `Media` objects OR `string` IDs. Always use this pattern:

```typescript
const imageUrl =
	typeof block.someImage === "object" && block.someImage?.url
		? block.someImage.url
		: null;

// Usage with fallback:
{imageUrl ? (
	<img src={imageUrl} loading="lazy" alt="..." />
) : (
	<div>Fallback content</div>
)}
```

### Design System Reference

#### Layout

```
Section:        py-[100px] (or py-16 md:py-20 lg:py-24)
Container:      max-w-[1160px] mx-auto px-5, relative z-[1]
Header wrapper: max-w-[657px] mx-auto (or max-w-[503px], max-w-[701px])
```

#### Badge Component (Copy from existing blocks)

The badge is a complex component used in most sections. **Copy it exactly from an existing block** like `feature-block.tsx` or `cta-block.tsx`. Structure:

```
Outer: p-[0.82px] rounded-full relative shadow-[2.88px_25.11px_19.72px_rgba(93,72,236,0.04)]
  Inner: z-[1] flex gap-2 bg-white rounded-full px-[14.82px] py-[3.33px] pl-[3.71px]
    Icon circle: rounded-full w-[33px] h-6 p-[0.82px] relative shadow-[...]
      Gradient bg: bg-gradient-to-b from-brand-badge-gradient-from to-brand-badge-gradient-to
      Overlay: opacity-[0.14] bg-gradient-to-b from-brand-badge-outline-from to-brand-badge-outline-to
    Text: text-brand-primary tracking-[-0.03em] text-base leading-6
  Border overlay: opacity-[0.14] bg-gradient-to-b from-brand-badge-border-from to-brand-badge-border-to
```

#### Typography

```
H2 (section heading):
  text-brand-primary tracking-[-0.02em] mt-0 mb-0
  font-[family-name:var(--font-inter-tight)]
  text-[52px] font-medium leading-[60px] text-center
  max-md:text-5xl max-md:leading-[56px]
  max-sm:text-4xl max-sm:leading-[44px]

H4 (card heading):
  text-brand-primary tracking-[-0.02em] mt-0 mb-0
  font-[family-name:var(--font-inter-tight)]
  text-2xl font-medium leading-8
  max-md:text-[22px] max-md:leading-[30px]
  max-sm:text-xl max-sm:leading-7

Body text:
  text-brand-primary mb-0
  font-[family-name:var(--font-inter-tight)]
  text-base font-normal leading-6

Muted body:
  text-brand-testimonial-tagline (or text-brand-primary-alpha)
  mb-0 text-base leading-6
```

#### Cards

```
Card outer:
  rounded-xl backdrop-blur-[40.55px] bg-brand-feature-card-bg p-1 overflow-hidden
  shadow-[0_12px_80px_-10px_rgba(176,184,210,0.24)]

Card inner:
  border-2 border-white rounded-[10px]
  bg-gradient-to-b from-brand-feature-card-gradient-from via-brand-feature-card-gradient-via to-brand-feature-card-gradient-to
  flex flex-col h-full overflow-hidden

Icon circle (in cards):
  rounded-full w-16 h-16 p-[0.82px] relative overflow-hidden
  shadow-[0_4.12px_6.26px_rgba(97,83,238,0.1)]
  Inner: bg-white rounded-full + gradient overlay from-brand-feature-icon-gradient-from to-brand-feature-icon-gradient-to
```

#### Button (Shared Component)

```typescript
import { Button } from "@/shared/ui/button";

// Link button (most common)
<Button href={block.buttonLink || "#"} variant="gradient">
	{block.buttonText}
</Button>

// Submit button
<Button type="submit" variant="gradient" size="lg">
	{block.buttonText}
</Button>
```

Variants: `gradient` (default, purple), `solid` (primary bg), `secondary` (accent bg)
Sizes: `sm`, `default`, `lg`

### Animations

**Import:**

```typescript
import {
    useScrollAnimation,
    useStaggerAnimation,
    fadeClass,
} from "../lib/use-scroll-animation";
```

**Single element fade-in:**

```typescript
const { ref: headerRef, isVisible: isHeaderVisible } = useScrollAnimation<HTMLDivElement>();

<div ref={headerRef} className={fadeClass(isHeaderVisible)}>
	Content
</div>
```

**Staggered delay (for sequential elements):**

```typescript
<div
	className={fadeClass(isVisible)}
	style={{ transitionDelay: "100ms" }}
>
	Second element
</div>
```

**Staggered list/cards (each card observes independently):**

```typescript
const { visibleItems, setItemRef } = useStaggerAnimation(items.length);

{items.map((item, index) => (
	<div
		key={index}
		ref={setItemRef(index)}
		className={`transition-all duration-700 ${
			visibleItems.has(index)
				? "opacity-100 translate-y-0"
				: "opacity-0 translate-y-6"
		}`}
		style={{ transitionDelay: `${index * 100}ms` }}
	>
		{/* card content */}
	</div>
))}
```

**Every visible element MUST have a scroll animation.** No static sections.

### Color Rules

- Use design tokens: `text-brand-primary`, `bg-brand-purple`, `from-brand-gradient-from`, etc.
- **NEVER** use hardcoded hex/rgb: `text-[#250a63]` is FORBIDDEN
- If a needed color doesn't exist, add a semantic token to `apps/landing/app/(frontend)/globals.css` under `@theme`
- Name new tokens semantically: `--color-brand-section-muted` NOT `--color-purple-2`

### Style Rules

- **Tailwind inline ONLY.** No CSS modules, no `.module.css` files
- Use `font-[family-name:var(--font-inter-tight)]` for the brand font
- Tabs for indentation (match project convention)

## Step 3: Registration

Update these 3 files:

**1. `apps/landing/shared/collections/blocks/index.ts`:**

```typescript
export { ExampleBlock } from "./example-block";
```

**2. `apps/landing/shared/collections/pages.ts`:**

```typescript
import { ExampleBlock } from "./blocks/example-block";
// Add to blocks array:
blocks: [
	// ...existing blocks,
	ExampleBlock,
],
```

**3. `apps/landing/features/payload-page/ui/render-blocks.tsx`:**

```typescript
import { ExampleBlock } from "./example-block";
// Add switch case:
case "example":
	return <ExampleBlock key={`${block.blockType}-${index}`} block={block} />;
```

## Step 4: Generate Types

```bash
cd apps/landing && npx payload generate:types
```

This updates `@/payload-types` with the new block's TypeScript interface.

**IMPORTANT: Do NOT run database migrations.** Type generation is sufficient. Do NOT run `payload migrate` or `payload migrate:create`.

## Mandatory Validation Checklist

**You MUST complete and present this checklist after implementation.**

### Schema

- [ ] Block file at `shared/collections/blocks/{name}-block.ts`
- [ ] `slug` is kebab-case, `interfaceName` is PascalCase
- [ ] All text fields have `localized: true`
- [ ] All text fields have `defaultValue`
- [ ] All `defaultValue` are in **English**
- [ ] All `defaultValue` use Anara Dreams spiritual language (no generic SaaS)
- [ ] Array fields have `minRows`/`maxRows`
- [ ] Media fields use `relationTo: "media"`

### Component

- [ ] File at `features/payload-page/ui/{name}-block.tsx`
- [ ] `"use client"` directive present
- [ ] Type imported from `@/payload-types`
- [ ] Media URLs extracted with safe typeof check
- [ ] Fallback UI for missing images
- [ ] Tailwind inline ONLY (no CSS modules)
- [ ] Brand font used: `font-[family-name:var(--font-inter-tight)]`

### Design System Compliance

- [ ] Badge component copied from existing block (if section has badge)
- [ ] Heading uses standard H2 typography classes
- [ ] Body text uses standard typography classes
- [ ] Cards use standard card pattern (if applicable)
- [ ] Button uses shared `<Button>` component (if applicable)
- [ ] Layout uses standard container: `max-w-[1160px] mx-auto px-5`
- [ ] Section padding: `py-[100px]` or responsive equivalent
- [ ] Responsive breakpoints implemented

### Animations

- [ ] `useScrollAnimation` used for section/header
- [ ] `fadeClass()` applied to all visible elements
- [ ] Stagger delays on sequential elements (`transitionDelay`)
- [ ] Cards/list items use individual observation (stagger pattern)
- [ ] No static (non-animated) content blocks

### Color Audit

- [ ] Run `pnpm audit:colors` — no hardcoded colors in new files
- [ ] All colors reference design tokens from `globals.css`
- [ ] New tokens added to `@theme` if needed (with semantic names)

### Registration

- [ ] Exported from `blocks/index.ts`
- [ ] Added to blocks array in `pages.ts`
- [ ] Import + switch case in `render-blocks.tsx`

### Types

- [ ] `npx payload generate:types` executed successfully
- [ ] No TypeScript errors in new files
- [ ] **NO migrations run** (no `payload migrate` or `payload migrate:create`)

## Common Mistakes

| Mistake                            | Fix                                                    |
| ---------------------------------- | ------------------------------------------------------ |
| Hardcoded colors `text-[#250a63]`  | Use token `text-brand-primary`                         |
| Generic defaults "Get started"     | Use spiritual language "Begin your journey"            |
| Missing `localized: true`          | Add to ALL user-facing text fields                     |
| CSS modules created                | Delete `.module.css`, use Tailwind inline              |
| Badge built from scratch           | Copy exact badge JSX from existing block               |
| No scroll animations               | Every element needs `useScrollAnimation` + `fadeClass` |
| Raw media access `block.image.url` | Use safe extraction pattern with typeof check          |
| Running database migrations        | Only run `npx payload generate:types`                  |
| Defaults in non-English language   | All defaults must be in English                        |
| Static heading without font class  | Add `font-[family-name:var(--font-inter-tight)]`       |

## Red Flags - STOP and Fix

- Any `text-[#...]`, `bg-[#...]`, or `from-[rgba(...)]` in new code
- A `.module.css` file was created
- Badge component built differently from existing blocks
- No `fadeClass()` or animation hooks in the component
- Default values in Ukrainian/Russian instead of English
- Default values sound like generic SaaS ("boost", "scale", "optimize")
- `payload migrate` or `payload migrate:create` was executed
- Missing checklist presentation to user
- `pnpm audit:colors` was NOT run as the final step

## MANDATORY Final Step: Color Audit

**After ALL implementation is done, you MUST run:**

```bash
pnpm audit:colors
```

This is NOT optional. Do NOT present the validation checklist until `audit:colors` has been run and its output reviewed. If it reports hardcoded colors in your new files — fix them before marking the task complete.
