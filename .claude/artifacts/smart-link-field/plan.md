# Implementation Plan: Smart Link Field

## Spec Reference
`./spec.md` — with user-approved modifications:
- Only 2 link types: **Custom URL** and **Section** (no Page type)
- Static section list (hardcoded)
- Backwards compatibility via fallback (missing `linkType` → treat as custom URL)

## Codebase Context

- All href fields are `type: "text"` — no existing smart link pattern
- Payload uses `admin.condition` for conditional field visibility
- DB is PostgreSQL, migrations use `@payloadcms/db-postgres` with raw SQL
- Block tables follow pattern: `pages_blocks_{slug}`, versioned tables: `_pages_v_blocks_{slug}`
- Header is a global: stored in `header` table (with `header_nav_links` for array items)
- Existing `openInNewTab` field already exists on hero and cta `ctaButton` groups
- Footer `socialLinks[].href` should stay as plain text (always external)

## Implementation Steps

### Step 1: Create reusable smart link field config

**Action:** Create new file
**File:** `apps/landing/shared/collections/fields/smart-link.ts`
**Details:**
- Export a function `smartLinkFields()` that returns an array of Payload `Field[]`
- Fields: `linkType` (select: "custom" | "section"), `url` (text, visible when custom), `section` (select, visible when section)
- Use `admin.condition` on `url` and `section` to show/hide based on `linkType`
- Section options stored as **kebab-case** matching DOM IDs: `hero`, `process`, `pricing`, `pricing-alt`, `feature`, `integration`, `testimonial`, `faq`, `cta`, `blog`, `footer`, `partnership`, `gallery`, `contact-us` — with human-readable labels
- `linkType` defaults to `"custom"`
- Do NOT include `openInNewTab` — each consumer manages that separately

**Rationale:** Storing section values as kebab-case eliminates runtime transformation — values match DOM IDs directly. No need for `toKebabCase` in `resolveHref`.

### Step 2: Update Header global schema

**Action:** Modify existing file
**File:** `apps/landing/shared/collections/globals/header.ts`
**Details:**
- Import `smartLinkFields` from step 1
- In `navLinks` array fields: replace `href` text field with `...smartLinkFields()`
- In `navLinks.children` array fields: replace `href` text field with `...smartLinkFields()`
- Replace `ctaLink` text field with spread `...smartLinkFields()` at the top level
- **Update `defaultValue`** for `navLinks` from `{ label: "About", href: "/about" }` → `{ label: "About", linkType: "custom", url: "/about" }`

### Step 3: Update Hero block schema

**Action:** Modify existing file
**File:** `apps/landing/shared/collections/blocks/hero-block.ts`
**Details:**
- Import `smartLinkFields`
- In `ctaButton` group fields: replace `href` text field with `...smartLinkFields()`
- Keep existing `openInNewTab` checkbox as-is

### Step 4: Update CTA block schema

**Action:** Modify existing file
**File:** `apps/landing/shared/collections/blocks/cta-block.ts`
**Details:**
- Same pattern as hero: replace `href` in `ctaButton` group with `...smartLinkFields()`
- Keep existing `openInNewTab`

### Step 5: Update Footer block schema

**Action:** Modify existing file
**File:** `apps/landing/shared/collections/blocks/footer-block.ts`
**Details:**
- In `menuGroups[].links[]`: replace `href` with `...smartLinkFields()`
- In `newsletter` group: replace `buttonHref` with `...smartLinkFields()`
- Leave `socialLinks[].href` as plain text (always external URLs)
- **Update `defaultValue`** for `menuGroups` links from `{ label: "Home", href: "/" }` → `{ label: "Home", linkType: "custom", url: "/" }`

### Step 6: Update Process block schema

**Action:** Modify existing file
**File:** `apps/landing/shared/collections/blocks/process-block.ts`
**Details:**
- In `tabs[]`: replace `buttonLink` text field with `...smartLinkFields()`

### Step 7: Create `resolveHref` utility

**Action:** Create new file
**File:** `apps/landing/features/payload-page/lib/resolve-href.ts`
**Details:**
- Export `resolveHref(link: SmartLinkData): string`
- Type: `SmartLinkData = { linkType?: "custom" | "section"; url?: string | null; section?: string | null; href?: string | null; buttonLink?: string | null; buttonHref?: string | null }`
- Logic:
  - If `linkType === "section"` → return `#${section}` (already kebab-case)
  - If `linkType === "custom"` → return `url ?? "#"`
  - Fallback (no `linkType`): return `url ?? href ?? buttonLink ?? buttonHref ?? "#"` — handles all old field names
- No need for `toKebabCase` — section values stored as kebab-case

### Step 8: Update frontend components

**Action:** Modify existing files
**Files:**
- `apps/landing/features/payload-page/ui/site-header.tsx`
- `apps/landing/features/payload-page/ui/hero-block.tsx`
- `apps/landing/features/payload-page/ui/cta-block.tsx`
- `apps/landing/features/payload-page/ui/footer-block.tsx`
- `apps/landing/features/payload-page/ui/process-block.tsx`

**Details per file:**

**site-header.tsx:**
- Import `resolveHref`
- Replace `link.href` with `resolveHref(link)` for nav links
- Replace `child.href` with `resolveHref(child)` for dropdown children
- Replace `data.ctaLink || "#"` with `resolveHref(data)` for CTA button

**hero-block.tsx:**
- Import `resolveHref`
- Replace `block.ctaButton?.href || "#"` with `resolveHref(block.ctaButton ?? {})`

**cta-block.tsx:**
- Import `resolveHref`
- Same pattern as hero

**footer-block.tsx:**
- Import `resolveHref`
- Replace `link.href` with `resolveHref(link)` in menuGroups links
- Replace `block.newsletter?.buttonHref || "#"` with `resolveHref(block.newsletter ?? {})`
- Leave `social.href` as-is (stays plain text)

**process-block.tsx:**
- Import `resolveHref`
- Replace `currentTab.buttonLink || "#"` with `resolveHref(currentTab)`

### Step 9: Generate TypeScript types

**Action:** Run command
**Command:** `npx payload generate:types` (from `apps/landing/`)

### Step 10: Create migration file (DO NOT APPLY)

**Action:** Run `npx payload migrate:create smart_link_fields` from `apps/landing/`
**Details:**
- Auto-generates migration SQL based on schema diff
- **Manually edit** the generated migration to copy data BEFORE column drops:

**Per-table column mapping:**

| Table | Old column | New column | Notes |
|-------|-----------|------------|-------|
| `header` | `cta_link` | `url` | Global top-level |
| `header_nav_links` | `href` | `url` | Array items |
| `header_nav_links_children` | `href` | `url` | Nested array |
| `pages_blocks_hero` | `cta_button_href` | `cta_button_url` | Inside group |
| `pages_blocks_cta` | `cta_button_href` | `cta_button_url` | Inside group |
| `pages_blocks_footer_menu_groups_links` | `href` | `url` | Nested array |
| `pages_blocks_footer` | `newsletter_button_href` | `newsletter_url` | Group field |
| `pages_blocks_process_tabs` | `button_link` | `url` | Array items |
| `_pages_v_blocks_*` | (same pattern) | (same) | Versioned tables |

For each table:
1. `UPDATE {table} SET {new_col} = {old_col}` — copy data
2. `UPDATE {table} SET link_type = 'custom' WHERE {old_col} IS NOT NULL` — set type
3. Then let auto-generated ALTER statements drop old columns / add new ones

- Register in `migrations/index.ts`
- **DO NOT run `payload migrate`** — file creation only

## Dependencies Between Steps

```
Step 1 (smart link field) → Steps 2-6 (schema updates) → Step 9 (types) → Step 10 (migration)
Step 7 (resolveHref) can run in parallel with Steps 2-6
Step 8 depends on Step 9 (needs generated types)
```

## Risk Areas

1. **Migration data preservation** — auto-generated migration will DROP old columns. Must manually add UPDATE statements BEFORE the drops. The per-table mapping above must be verified against actual generated column names.
2. **Header global vs block tables** — header is a global with different table naming. Migration SQL explicitly handles `header`, `header_nav_links`, `header_nav_links_children` separately.
3. **Payload `admin.condition`** — uses `siblingData` which should work in both arrays and groups. Verify after implementation.
4. **Exact table names** — Payload's PostgreSQL table naming for nested arrays (e.g., `pages_blocks_footer_menu_groups_links`) must be verified against actual DB schema. The auto-generated migration will reveal correct names.
