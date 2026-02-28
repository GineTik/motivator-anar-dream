# Spec: Process Block — Mobile Content Centering

## Goal

Fix the process block's tab content area on mobile so that content is full-width and centered, instead of left-aligned and squeezed to 50% width.

## Context

The process block displays tabbed content with an image and text side-by-side on desktop. On mobile, the layout switches to a stacked column (image on top, text below via `flex-col-reverse`). However, the text content container retains its desktop `w-1/2 max-w-1/2` constraint and `items-start` alignment on mobile, causing:

- Content squeezed into 50% of viewport width
- Left-aligned text and elements that should be centered on a narrow screen

**Screenshot confirms:** badge, heading, description, and button are all left-aligned and compressed on mobile.

## Requirements

### Tab Content Container (line 166)

- MUST be full width on mobile (`w-full`), half width on desktop (`md:w-1/2`)
- MUST remove the `max-w-1/2` constraint on mobile (only apply `md:max-w-1/2`)
- MUST center-align flex items on mobile (`items-center`), left-align on desktop (`md:items-start`)

### Text Alignment

- Heading (line 177) MUST be centered on mobile (`text-center md:text-left`)
- Description (line 181) MUST be centered on mobile (`text-center md:text-left`)

### Button

- Button container (line 185) SHOULD center on mobile (handled by parent `items-center`)

### No Changes to Desktop

- MUST NOT alter the desktop (md+) or large (lg+) layout in any way
- Desktop layout remains: side-by-side, left-aligned text, 50/50 split

## Design

### Mobile (<768px)

```
┌──────────────────────────┐
│    [    Image Card    ]   │
│                           │
│     ┌──Tab Badge──┐       │
│                           │
│     Scalable Data         │
│       Operations          │
│                           │
│  Track the growth and     │
│  engagement of your...    │
│                           │
│      [ Get Started ]      │
└──────────────────────────┘
```

- Image: full width (already correct)
- Text content: full width, centered
- Badge pill: centered
- Heading: centered
- Description: centered
- Button: centered

### Desktop (>=768px)

No changes — remains side-by-side with left-aligned text.

## Edge Cases

- Long badge text: still wraps naturally within the pill, centered
- Long heading: wraps centered on mobile, left-aligned on desktop
- No image uploaded: placeholder text already centered (no change needed)

## Out of Scope

- Tab menu styling or layout changes
- Header/badge section above tabs (already centered)
- Image card sizing or aspect ratio adjustments
- Any content or copy changes

## Acceptance Criteria

- [ ] Tab content text area is full-width on mobile (not 50%)
- [ ] Badge, heading, description, and button are visually centered on mobile
- [ ] Desktop layout is unchanged (side-by-side, left-aligned text)
- [ ] No new Tailwind classes conflict with existing responsive breakpoints
- [ ] Hardcoded colors audit passes (`pnpm audit:colors`)
