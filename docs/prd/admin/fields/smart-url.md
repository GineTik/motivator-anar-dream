# Smart URL Field

Custom Payload CMS field for selecting internal pages/sections or entering external URLs.

## Location

`apps/landing/shared/collections/fields/smart-url-field/`

## Purpose

Replaces the default text input for URL fields in the admin panel. Provides a dropdown with all site pages and their sections, so editors can link to internal content without manually typing paths. Also accepts arbitrary external URLs.

## Usage

```ts
import { smartUrlField } from "@/shared/collections/fields/smart-url-field";

// In a collection/block config:
fields: [
  smartUrlField({ name: "url", label: "Link", required: true }),
]
```

## Behavior

### Input modes

1. **External URL** — editor types a full URL (e.g. `https://example.com`). Stored as-is.
2. **Internal page** — editor picks a page from the dropdown. Stored as `/{slug}` (or `/` for the home page).
3. **Internal section** — editor picks a page section. Stored as `/{slug}#{anchor}` (or `/#{anchor}` for home page sections).

### Home page handling

The home page has slug `home` in Payload but is served at `/` on the frontend. The field maps between these:
- Dropdown generates `/` (not `/home`) for the home page
- Display chip resolves `/` back to the home page title
- Section links use `/#anchor` format

### Chip display

When an internal link is selected, the raw path is replaced with a styled chip showing:
- Page title (resolved from current page data)
- Section label (if linking to a section), shown as `Page → Section`
- A clear button to remove the link and return to text input

Clicking the chip switches back to text editing mode with the raw value selected.

### Dropdown

- Opens on chevron click or when focusing an empty input
- Fetches pages from `/api/pages` with current admin locale
- Search input filters pages and sections by title/label
- Keyboard navigation (arrows, enter, escape)
- Sections grouped under their parent page
- Data cached per locale (staleTime: Infinity, refetched on dropdown open)

### Styling

Uses inline `style` objects (not Tailwind) because this component renders inside the Payload admin panel, which has its own CSS context separate from the frontend Tailwind build.

Relies on Payload CSS variables (`--theme-text`, `--theme-elevation-*`, `--theme-dim`, etc.) to match the admin theme, except where specific colors are hardcoded (e.g. description text).

## File structure

| File | Purpose |
|---|---|
| `index.ts` | `smartUrlField()` factory — public API for collections |
| `component.tsx` | React component (client-side) |
| `use-page-sections.ts` | Hook for fetching pages + sections from API |
| `styles.ts` | Inline style objects for admin panel rendering |

## Architecture decisions

- **QueryClient per field** — each `SmartUrlField` instance wraps its inner component in a dedicated `QueryClientProvider` to avoid conflicts with Payload's own React Query setup.
- **Lazy loading** — pages are fetched only when the dropdown opens (`enabled: false` + manual `refetch`), not on mount.
- **Locale-aware** — queries are keyed by locale code, so switching locale in admin fetches fresh data.
