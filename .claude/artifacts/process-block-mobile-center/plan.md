# Implementation Plan: Process Block — Mobile Content Centering

## Spec Reference
Link to: `./spec.md`

## Codebase Context

The process block lives at `apps/landing/features/payload-page/ui/process-block.tsx`. The tab content area (lines 160–219) uses a `flex-col-reverse md:flex-row` layout. The left content container (line 166) has `w-1/2 max-w-1/2 items-start` which constrains it to 50% width and left-aligns content at all breakpoints — this is the root cause.

All changes are confined to a single file. The fix involves making 3 Tailwind class adjustments to make the text container responsive and 2 text alignment additions for heading/description.

## Implementation Steps

### Step 1: Make tab content container responsive

**Action:** Modify
**File:** `apps/landing/features/payload-page/ui/process-block.tsx` (line 166)
**Details:**

Current classes:
```
flex flex-col justify-center items-start w-1/2 max-w-1/2
```

Replace with:
```
flex flex-col justify-center items-center md:items-start w-full md:w-1/2 md:max-w-1/2
```

Changes:
- `items-start` → `items-center md:items-start` (center on mobile, left-align on desktop)
- `w-1/2` → `w-full md:w-1/2` (full width on mobile, half on desktop)
- `max-w-1/2` → `md:max-w-1/2` (remove max-width constraint on mobile)

**Rationale:** This is the core fix. The container must be full-width on mobile for content to fill the screen, and `items-center` centers child elements (badge, button) horizontally. Desktop classes prefixed with `md:` preserve existing layout.

### Step 2: Remove mobile max-width cap on heading wrapper

**Action:** Modify
**File:** `apps/landing/features/payload-page/ui/process-block.tsx` (line 176)
**Details:**

The heading is wrapped in a `<div>` with `max-w-full max-md:max-w-[357px]`. The `max-md:max-w-[357px]` caps the heading container to 357px on mobile, which conflicts with the full-width centering goal.

Current classes:
```
max-w-full max-md:max-w-[357px]
```

Replace with:
```
max-w-full
```

**Rationale:** This 357px cap was a desktop-first leftover that artificially constrains the heading on mobile. Removing it lets the heading fill the parent container's width, so `text-center` alignment works naturally across the full viewport.

### Step 3: Center heading text on mobile

**Action:** Modify
**File:** `apps/landing/features/payload-page/ui/process-block.tsx` (line 177)
**Details:**

Add `text-center md:text-left` to the `<h3>` element.

Current classes:
```
text-brand-primary tracking-[-0.02em] mt-0 mb-0 text-2xl md:text-[32px] lg:text-[42px] font-medium leading-8 md:leading-10 lg:leading-[50px]
```

Add to end:
```
text-center md:text-left
```

**Rationale:** `items-center` on the parent centers the element itself but doesn't affect text alignment within the element. Explicit `text-center` is needed for multi-line headings to wrap centered on mobile.

### Step 4: Center description text on mobile

**Action:** Modify
**File:** `apps/landing/features/payload-page/ui/process-block.tsx` (line 181)
**Details:**

Add `text-center md:text-left` to the description `<div>`.

Current classes:
```
text-brand-testimonial-tagline mt-2 md:mt-4 lg:mt-5 mb-0 text-base leading-6
```

Add to end:
```
text-center md:text-left
```

**Rationale:** Same as Step 2 — description text needs explicit centering for multi-line wrapping on mobile.

## Dependencies Between Steps

None — all 4 steps are independent edits within the same file and can be applied in any order.

## Risk Areas

- **None significant.** All changes are additive responsive prefixes (`md:`) on existing classes. No structural changes, no new components, no logic changes. Desktop layout is preserved by `md:` prefix convention.

## Post-Implementation

- Run `pnpm audit:colors --app apps/landing --globals 'apps/landing/app/(frontend)/globals.css'` to verify no hardcoded color violations were introduced (per CLAUDE.md checklist).
