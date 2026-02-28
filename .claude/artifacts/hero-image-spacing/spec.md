# Spec: Hero Block Person Image Desktop Spacing

## Goal

Add top and bottom spacing to the hero person image on desktop so it doesn't stretch edge-to-edge from the header to the viewport bottom.

## Context

Currently on desktop (>991px), the person image in the hero block fills the full available height (`max-height: calc(100vh - 115px)`). This makes the image feel cramped — it starts immediately below the header and extends to the very bottom of the viewport with no breathing room.

On mobile (<991px) the image has explicit fixed heights (300–400px) and looks fine. Only desktop needs adjustment.

### Current CSS (desktop, relevant rules)

- `.heroWrap` — `padding-top: 115px` (header clearance)
- `.heroContentWrap` — `min-height: calc(100vh - 115px)`, 2-column grid, `align-items: center`
- `.heroPerson` — `width: 100%; height: 100%; object-fit: contain; max-height: calc(100vh - 115px)`
- `.heroPersonWrap` — `height: 100%; align-items: flex-end`

### Problem

The image's `max-height` equals the entire content area height, leaving zero gap above and below the person.

## Requirements

- MUST add visible spacing above the person image (gap from header area) on desktop
- MUST add visible spacing below the person image (gap from viewport bottom) on desktop
- MUST NOT change mobile behavior (<=991px) — mobile already has fixed heights and looks correct
- MUST keep the image vertically centered or bottom-aligned within its reduced area
- MUST NOT change the grid layout or left-column content positioning
- SHOULD keep the image as large as possible while still having clear breathing room

## Design

### Approach

Reduce the person image `max-height` by adding vertical padding to the calculation. The image container should have top and bottom padding (or the `max-height` calc should subtract extra space) so the person sits comfortably within the viewport.

**Target spacing:** ~40px top + ~40px bottom (80px total reduction), resulting in:

```css
.heroPerson {
    max-height: calc(100vh - 115px - 80px);
}
```

Additionally, add vertical padding to `.heroPersonWrap` to ensure the spacing is visually consistent even if the image is shorter than max-height:

```css
.heroPersonWrap {
    padding-top: 40px;
    padding-bottom: 40px;
}
```

### States

- **Default (desktop >991px):** Image has ~40px gap from header area and ~40px gap from viewport bottom
- **Tablet (<=991px):** No change — fixed height values remain
- **Mobile (<=767px, <=479px):** No change

## Edge Cases

- Very tall viewports (>1200px): the 80px reduction is proportionally small, image still looks large — acceptable
- Short viewports (~700px): the image will be smaller but the 80px gap ensures content doesn't feel cramped — acceptable
- Image with different aspect ratios: `object-fit: contain` preserves ratio, padding just adds extra room

## Out of Scope

- Changing the person image itself or its fallback SVG
- Adjusting left-column content (heading, badge, button)
- Mobile layout changes
- Background image adjustments

## Acceptance Criteria

- [ ] On desktop (>991px), person image has visible gap (~40px) from header area
- [ ] On desktop (>991px), person image has visible gap (~40px) from viewport bottom
- [ ] On mobile/tablet (<=991px), layout is unchanged
- [ ] Image maintains correct aspect ratio and `object-fit: contain` behavior
- [ ] No horizontal layout shifts or content overlap introduced
