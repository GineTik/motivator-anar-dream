# Step 2: Create `SmartUrlField` Admin React Component

## Action
Create new file

## File(s)
- `apps/landing/shared/collections/fields/smart-url-field/component.tsx` (new) — Custom Payload admin field component (combobox/autocomplete)

## Details

### Component: `SmartUrlField`

A `'use client'` React component that replaces the default text input for the `url` field. Combines a free-text input (for external URLs) with a searchable dropdown (for internal pages/sections).

### Component architecture

```
SmartUrlField (main component)
├── Input area (two modes)
│   ├── CHIP MODE (value is internal link, not editing)
│   │   └── Chip/badge with page+section name + ✕ button
│   └── INPUT MODE (empty, external URL, or editing internal link)
│       └── Text input with the raw value
├── Dropdown toggle (chevron button — always visible)
└── Dropdown panel (absolute positioned, max-height with scroll)
    ├── Search input (filters pages/sections)
    ├── Loading spinner
    ├── Error message with retry
    └── Grouped list (role="listbox")
        ├── Page group header ("About")
        │   ├── Page item (role="option", click → /about)
        │   └── Section items
        │       ├── "Hero Section (hero)" → /about#hero
        │       └── "Our Process (process)" → /about#process
        └── Page group header ("Pricing")
            └── ...
```

### Implementation outline

```tsx
'use client'
import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { usePageSections } from './use-page-sections'
import type { PageWithSections } from './use-page-sections'

export const SmartUrlField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  const { pages, isLoading, error, load } = usePageSections()
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false) // chip → input transition
  const [search, setSearch] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Derived state
  const isInternal = typeof value === 'string' && value.startsWith('/')
  const isExternal = typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))
  const isEmpty = !value
  const showChip = isInternal && !isEditing

  // Resolve display info for internal links
  const resolvedInfo = useMemo(() => {
    if (!isInternal || !value) return null
    return resolveDisplayInfo(value, pages)
  }, [isInternal, value, pages])

  // ... (see behavioral details below)
}
```

### Behavioral details

#### 1. Display modes: Chip vs Input

The field has two visual modes:

**Chip mode** (when `value` starts with `/` and `isEditing === false`):
- Renders a styled chip/badge showing resolved page name + section name
- Chip structure: `Page Name → Section Name  ✕` (or just `Page Name  ✕` if no fragment)
- The `✕` button clears the field (`setValue('')`, stay in input mode)
- **Clicking the chip area** (not ✕) transitions to Input mode:
  1. Set `isEditing = true`
  2. After render, focus the input and call `inputRef.current.select()` to select all text
  3. The input is pre-filled with the raw value (e.g., `/about#hero`)
  4. User can now type/paste a replacement (REQ-12)
- **On input blur** (without opening dropdown): if value still starts with `/`, revert to chip mode (`setIsEditing(false)`)

**Input mode** (empty, external URL, or editing an internal link):
- Standard text input showing the raw value
- `onChange` → `setValue(e.target.value)` (updates form state, Save button becomes active)
- Placeholder: "https://example.com or select a page"

#### 2. Opening the dropdown
- **Chevron button**: always visible, toggles dropdown open/closed in any state
- **Input focus**: opens dropdown when field is empty (not when typing an external URL)
- On first open: calls `load()` from `usePageSections` (triggers API fetch if not cached)
- Dropdown is positioned absolutely below the input, z-indexed above other fields
- **`max-height: 300px`** with `overflow-y: auto` to prevent viewport overflow

#### 3. Search/filter (REQ-11)
- A text input at the top of the dropdown panel
- Filters `pages` array: matches page `title` or section `label` (case-insensitive substring)
- Empty search shows all pages/sections
- Resets `highlightedIndex` to 0 on search change

#### 4. Selecting an item from dropdown
- **Page click**: `setValue('/' + page.slug)` → stores `/about`
- **Section click**: `setValue('/' + page.slug + '#' + section.anchor)` → stores `/about#hero`
- Closes dropdown after selection
- Sets `isEditing = false` (triggers chip display for internal links)

#### 5. Typing an external URL (REQ-2)
- When input is focused and user types/pastes text starting with `http`
- Directly updates via `setValue(inputValue)` on change
- No dropdown interaction needed — behaves like a plain text input
- Dropdown does NOT auto-open when typing (only opens via chevron or when empty)

#### 6. Resolving display info from value
```typescript
function resolveDisplayInfo(value: string, pages: PageWithSections[]) {
  // Parse value: "/about#hero" → slug="about", anchor="hero"
  // Note: page slugs in this project are always single segments (no nested routes)
  const [path, anchor] = value.replace(/^\//, '').split('#')
  const page = pages.find((p) => p.slug === path)
  if (!page) return { pageName: path, sectionName: anchor ?? null }
  const section = anchor ? page.sections.find((s) => s.anchor === anchor) : null
  return {
    pageName: page.title,
    sectionName: section?.label ?? anchor ?? null,
  }
}
```
- When pages haven't loaded yet, falls back to showing slug/anchor as-is
- After pages load (on dropdown open), chip updates to show proper names

#### 7. Close on outside click
- `useEffect` with `mousedown` listener on `document`
- Checks if click target is outside `containerRef` → closes dropdown
- Also resets `isEditing` to `false` if the value is internal

#### 8. Keyboard navigation
- **Arrow Down**: move highlight to next item in flattened list (pages + sections)
- **Arrow Up**: move highlight to previous item
- **Enter**: select the highlighted item (same as click)
- **Escape**: close dropdown, reset search
- `highlightedIndex` tracks position in flattened list of all selectable items
- Highlighted item gets visual focus style (`--theme-elevation-100` background)
- ARIA attributes: container has `role="combobox"`, dropdown has `role="listbox"`, items have `role="option"` with `aria-selected`

#### 9. Dropdown grouping (REQ-10)
- Pages are top-level groups with headers (non-selectable, just visual labels)
- Each page is also a selectable item (click to link to page root `/slug`)
- Sections listed under their parent page as selectable items
- Section items show: `label (blockType)` format — e.g., "Our Process (process)"
- When `blockName` equals `blockType`, show just the blockType without duplication

### Styling approach

The component renders inside Payload's admin UI. Styling uses:
- **Inline styles** for all styling — positioning, colors, borders, font
- **Payload CSS variables** for color values to match admin theme
- **No Tailwind** — Payload's admin panel doesn't use Tailwind; injecting Tailwind classes would conflict

**Verification checkpoint**: After first render in dev, inspect the admin UI's computed styles via browser DevTools to confirm CSS variable names. Payload v3 uses `--theme-elevation-{N}` naming convention. If variables are not available, fall back to hardcoded neutral colors that match the dark admin theme.

Expected CSS variables from Payload admin theme:
- `--theme-elevation-0` — background
- `--theme-elevation-50` — input background
- `--theme-elevation-100` — hover/active background
- `--theme-elevation-150` — borders
- `--theme-text` — primary text color
- `--theme-dim` — secondary/muted text
- `--theme-success-500` — accent for internal link chip

### Field label rendering

The component must render the field label above the input. Use `field.label` from props. Also render `field.admin?.description` below the input as helper text if present, matching Payload's native field description styling.

### Error state from API

If `usePageSections` returns `error`, show an inline message inside the dropdown panel: "Failed to load pages. Click to retry." with `load()` on click.

## Documentation Reference
- `docs-research.md` → "Custom Field Component" — `TextFieldClientComponent` type, `useField` hook
- `docs-research.md` → "Available Hooks" — `useField<string>({ path })` returns `{ value, setValue }`
- Spec UI States table — Empty, External URL, Internal Link, Dropdown Open, Loading, Error
- Spec REQ-5: Visual distinction between internal (chip/badge) and external (plain text)
- Spec Scenario 4: "clicks on the field — all text is selected — and pastes"

## Rationale
- **Chip-to-input transition for REQ-12** — clicking the chip switches to an input pre-filled with the raw value and selects all text. This matches the spec's Scenario 4 flow exactly: "clicks on the field — all text is selected — and pastes". On blur, reverts to chip display. Clear UX model with two distinct visual states.
- **Single component file** — the component is ~250-300 lines; splitting into sub-components would be premature. If it grows beyond 350 lines during implementation, extract dropdown rendering into a separate component.
- **Inline styles over Tailwind** — Payload admin has its own CSS theme with CSS variables. Tailwind would require separate config for admin and might conflict. Using Payload's CSS variables ensures visual consistency.
- **No external combobox library** — libraries like `cmdk` would add dependencies. The dropdown behavior is simple enough (filter + select from grouped list) to build with basic React + DOM events + keyboard handling.
- **`resolveDisplayInfo` as standalone function** — not a hook because it's pure computation. Called in `useMemo` for performance.
- **Chevron always visible** — ensures dropdown is accessible in all field states (empty, external, internal). The spec says "chevron clicked" as a trigger for Dropdown Open state.

## Spec Requirements Covered
- REQ-2: Custom admin React component (combobox/autocomplete) — free-text input + dropdown picker
- REQ-4: Store value as single plain string — `setValue` writes `/slug#anchor` or `https://...`
- REQ-5: Visual distinction — internal link shown as chip/badge, external as plain text
- REQ-9: Field changes update only local Payload form state (via `useField.setValue`)
- REQ-10: Dropdown groups pages with nested sections
- REQ-11: Search/filter within dropdown
- REQ-12: Click on internal link chip transitions to input with all text selected
