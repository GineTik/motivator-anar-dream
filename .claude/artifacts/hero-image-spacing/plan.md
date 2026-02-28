# Implementation Plan: Hero Block Person Image Desktop Spacing

## Spec Reference

`./spec.md`

## Codebase Context

The hero block styling lives in a single CSS Module file:
- `apps/landing/features/payload-page/ui/hero-block.module.css`

Desktop (default) styles define `.heroPerson` with `max-height: calc(100vh - 115px)` and `.heroPersonWrap` with `height: 100%` and no padding. This causes the person image to fill the entire content area edge-to-edge.

Mobile breakpoints (991px, 767px, 479px) use fixed heights (400px, 350px, 300px) — these must remain untouched.

The TSX component (`hero-block.tsx`) wraps `.heroPersonWrap` inside a `fadeInUp` animation div. This intermediate div has no explicit height, and since `.heroContentWrap` uses `align-items: center`, grid children are not stretched. The `height: 100%` on `.heroPersonWrap` is effectively a no-op for sizing — the image is constrained by its own `max-height`, not the wrapper height. The `box-sizing: border-box` declaration (Step 2) ensures that if height does resolve, padding is included within it.

No component (TSX) changes are needed — the fix is purely CSS.

## Implementation Steps

### Step 1: Reduce person image max-height

**Action:** Modify
**File:** `apps/landing/features/payload-page/ui/hero-block.module.css` (line 241)
**Details:**
- Change `.heroPerson` `max-height` from `calc(100vh - 115px)` to `calc(100vh - 115px - 80px)`
- This subtracts 80px (40px top + 40px bottom) from the available height

**Rationale:** The spec's core fix — reducing image max-height creates breathing room. The 80px reduction is small enough to keep the image large on tall viewports while providing visible spacing on standard displays. Combined with `align-items: flex-end` on the wrapper, the freed space appears as a gap above the image.

### Step 2: Add vertical padding to person image wrapper with border-box

**Action:** Modify
**File:** `apps/landing/features/payload-page/ui/hero-block.module.css` (lines 228–234)
**Details:**
- Add `box-sizing: border-box` to `.heroPersonWrap` — this ensures padding is included *within* `height: 100%`, preventing overflow
- Add `padding-bottom: 40px` to `.heroPersonWrap` — creates a visible gap from the viewport bottom

**Rationale:** Without `border-box`, adding padding to an element with `height: 100%` causes it to render at `100% + padding`, overflowing the grid cell. The `border-box` fix includes padding within the declared height. Only bottom padding is needed because `.heroPersonWrap` uses `align-items: flex-end` — the image anchors to the bottom, and the `max-height` reduction (Step 1) already creates natural space above. Bottom padding ensures the image doesn't touch the viewport bottom.

### Step 3: Reset padding on mobile breakpoints

**Action:** Modify
**File:** `apps/landing/features/payload-page/ui/hero-block.module.css` (lines 298–300, 356–358, 423–425)
**Details:**
- Add `padding-bottom: 0` to `.heroPersonWrap` in each of the three responsive breakpoints (991px, 767px, 479px)
- This explicitly resets the desktop padding so mobile behavior is guaranteed unchanged

**Rationale:** While `box-sizing: border-box` prevents overflow, the padding would still consume space inside the fixed heights (e.g., 400px becomes 360px content + 40px padding on tablet). Explicitly resetting padding at each breakpoint ensures mobile layouts remain pixel-identical to current behavior. This also protects against future breakpoint changes.

## Dependencies Between Steps

Steps 1, 2, and 3 are independent (different selectors/rules in the same file) but should be applied together. Step 3 is a safety measure for Step 2.

## Risk Areas

- **Low risk.** All changes are additive CSS modifications. `box-sizing: border-box` + explicit mobile resets eliminate the overflow and mobile regression risks identified in review.
- The animation wrapper div between the grid cell and `.heroPersonWrap` inherits grid stretch behavior. If a future refactor changes the animation wrapper's styling, `height: 100%` on `.heroPersonWrap` could break — but this is pre-existing behavior, not introduced by this change.

## Post-Implementation

Run the hardcoded colors audit per project rules (CLAUDE.md checklist):
```bash
pnpm audit:colors --app apps/landing --globals 'apps/landing/app/(frontend)/globals.css'
```
