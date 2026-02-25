# Spec: Global Header Layout

## 1. Goal

Move the header from a per-page block to a Payload CMS Global, so every page automatically renders the header from layout without needing to configure it as a block on each page.

## 2. Context

Currently the header is a **block** (`header-block.ts` schema + `header-block.tsx` component) that must be manually added to every page's `blocks` array in the Payload admin. This creates several problems:

- **Duplication** — the same header config must be repeated on every page
- **Inconsistency risk** — different pages can have different headers by accident
- **Editing overhead** — changing the header requires editing every page

Payload CMS has a [Globals](https://payloadcms.com/docs/globals/overview) feature designed exactly for this — singleton documents (like site header, footer, settings) that exist once and are accessible globally.

The project currently has **zero Globals** configured (`payload.config.js` has no `globals` key).

### Existing header block fields to migrate

| Field | Type | Notes |
|-------|------|-------|
| `logo` | upload (media) | Optional |
| `navLinks` | array (1–8) | Each with `label` (localized), `href`, optional `children[]` |
| `ctaText` | text | Required, localized |
| `ctaLink` | text | Optional |
| `ctaArrowIcon` | upload (media) | Optional |

## 3. Requirements

- MUST create a Payload Global named `"header"` with the same fields as the current `HeaderBlock` schema
- MUST register the Global in `payload.config.js` via the `globals` array
- MUST fetch the header Global data in the layout (`app/(frontend)/layout.tsx`) and render the header component above `{children}`
- MUST reuse the existing `HeaderBlock` UI component (renamed/adapted to accept Global data instead of block data)
- MUST remove `HeaderBlock` from the blocks registry (`blocks/index.ts`)
- MUST remove `HeaderBlock` from the pages collection blocks array (`pages.ts`)
- MUST remove the `"header"` case from `render-blocks.tsx`
- MUST regenerate Payload types after schema changes (`npx payload generate:types`)
- MUST NOT break existing pages that currently have a header block configured (they just won't render it as a block anymore — it will come from the layout)
- SHOULD preserve all existing header component behavior (desktop nav, mobile menu, dropdowns, CTA)
- SHOULD run `pnpm audit:colors` after changes per project checklist

## 4. Data Model

### New: Payload Global schema

```typescript
// shared/collections/globals/header.ts
import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  fields: [
    // Same fields as current HeaderBlock:
    // logo, navLinks (with children), ctaText, ctaLink, ctaArrowIcon
  ],
};
```

Generated type will produce a `Header` type (instead of `HeaderBlock`) in `payload-types.ts`.

## 5. Design

No visual changes. The header component renders identically — it just receives data from the Global instead of from a block. The component stays `"use client"` with the same states (mobileMenuOpen, openDropdown, dropdownTimeoutRef).

### Data flow change

**Before:**
```
Page blocks[] → RenderBlocks → <HeaderBlock block={block} />
```

**After:**
```
Layout (server) → payload.findGlobal({ slug: "header" }) → <Header data={headerData} />
                                                              ↓
                                                        children (page content)
```

## 6. Implementation Steps

| # | Action | File |
|---|--------|------|
| 1 | Create Global schema | `shared/collections/globals/header.ts` (new) |
| 2 | Create globals barrel export | `shared/collections/globals/index.ts` (new) |
| 3 | Register Global in config | `payload.config.js` — add `globals: [Header]` |
| 4 | Adapt header component | `features/payload-page/ui/header-block.tsx` — rename to accept Global type `Header` instead of `HeaderBlock` |
| 5 | Fetch Global data in layout | `app/(frontend)/layout.tsx` — `getPayload` + `findGlobal` → render header |
| 6 | Remove from blocks registry | `shared/collections/blocks/index.ts` — remove `HeaderBlock` export |
| 7 | Remove from pages collection | `shared/collections/pages.ts` — remove `HeaderBlock` from blocks array |
| 8 | Remove from render-blocks | `features/payload-page/ui/render-blocks.tsx` — remove `"header"` case and import |
| 9 | Regenerate types | `npx payload generate:types` |
| 10 | Run color audit | `pnpm audit:colors --app apps/landing --globals '...'` |

## 7. Edge Cases

- **Existing pages with header block in blocks array** — the `"header"` block type in existing page data won't match any case in `render-blocks.tsx` after removal, so it falls through to `default: return null`. No crash, just silently ignored. The header will come from the layout.
- **Header Global not yet configured** — on first deploy, the Global will have default values (from `defaultValue` in fields). The component already handles missing logo gracefully (falls back to "Anara Dreams" text).
- **Layout is server component, header is client component** — the layout fetches data server-side, passes it as props to the `"use client"` header component. This is the standard Next.js pattern and works correctly.

## 8. Out of Scope

- Footer migration to Global (same pattern, but separate task)
- Removing old header block data from existing page documents in the database
- Adding header visibility toggle per page (e.g., "hide header on this page")
- Database migration to clean up old `header` blocks from pages' `blocks` JSON

## 9. Acceptance Criteria

- [ ] Payload admin shows "Header" in the Globals section (sidebar)
- [ ] All header fields (logo, navLinks, ctaText, ctaLink, ctaArrowIcon) are editable in the Global
- [ ] Every page renders the header automatically without a header block in its blocks array
- [ ] Header component behavior is unchanged (desktop nav, mobile menu, dropdowns, CTA)
- [ ] `HeaderBlock` no longer appears in the blocks picker when editing a page
- [ ] TypeScript compiles without errors
- [ ] Color audit passes
