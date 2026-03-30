# Step 3: Create `usePageSections` Data-Fetching Hook

## Action
Create new file

## File(s)
- `apps/landing/shared/collections/fields/smart-url-field/use-page-sections.ts` (new) — React hook for fetching pages and their sections from Payload REST API

## Details

### Hook: `usePageSections`

A client-side React hook that fetches all pages with their blocks from the Payload REST API, transforms them into a grouped structure for the dropdown, and caches the result at module level (shared across all field instances on the page).

```typescript
'use client'
import { useCallback, useState } from 'react'
import { useLocale } from '@payloadcms/ui'

export type Section = {
  label: string       // blockName or blockType fallback
  blockType: string   // original camelCase blockType
  anchor: string      // toKebabCase(blockType) — used as #fragment in URL
}

export type PageWithSections = {
  title: string
  slug: string
  sections: Section[]
}

type UsePageSectionsReturn = {
  pages: PageWithSections[]
  isLoading: boolean
  error: string | null
  load: () => void     // trigger fetch (called on dropdown open)
}

// Module-level cache — shared across all SmartUrlField instances on the same page.
// Keyed by locale code so switching locale fetches fresh data.
const cache = new Map<string, PageWithSections[]>()
let activeFetch: Promise<void> | null = null
let activeFetchLocale: string | null = null

export function usePageSections(): UsePageSectionsReturn {
  const locale = useLocale()
  const localeCode = locale.code
  const [pages, setPages] = useState<PageWithSections[]>(() => cache.get(localeCode) ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    // Already cached for this locale
    if (cache.has(localeCode)) {
      setPages(cache.get(localeCode)!)
      return
    }

    // Another instance is already fetching for this locale — wait for it
    if (activeFetch && activeFetchLocale === localeCode) {
      activeFetch.then(() => {
        if (cache.has(localeCode)) {
          setPages(cache.get(localeCode)!)
        }
      })
      return
    }

    setIsLoading(true)
    setError(null)

    const fetchPromise = fetch(`/api/pages?depth=0&limit=0&locale=${localeCode}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch pages: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const transformed: PageWithSections[] = (data.docs ?? []).map(
          (page: { title: string; slug: string; blocks?: Array<{ blockType: string; blockName?: string }> }) => ({
            title: page.title,
            slug: page.slug,
            sections: (page.blocks ?? []).map((block) => ({
              label: block.blockName || block.blockType,
              blockType: block.blockType,
              anchor: toKebabCase(block.blockType),
            })),
          })
        )
        cache.set(localeCode, transformed)
        setPages(transformed)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error')
      })
      .finally(() => {
        setIsLoading(false)
        activeFetch = null
        activeFetchLocale = null
      })

    activeFetch = fetchPromise
    activeFetchLocale = localeCode
  }, [localeCode])

  return { pages, isLoading, error, load }
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
```

### Key design decisions:

1. **Lazy loading via `load()`** — data fetches on first dropdown open, not on page load (REQ-3, Design Decision: "Dropdown loading")
2. **Module-level cache** — a `Map<string, PageWithSections[]>` keyed by locale, shared across all `SmartUrlField` instances on the same admin page. The header global alone has 3+ smart URL fields — without shared cache, each would fire an identical API call. Cache resets on page reload (per spec Design Decision: "Fresh data appears after page reload").
3. **`activeFetch` deduplication** — if instance A triggers a fetch and instance B opens its dropdown while the fetch is in-flight, instance B waits for the same promise instead of starting a new one.
4. **`limit=0`** — Payload convention for "no limit", fetches all pages. Avoids silent truncation if the site grows beyond any arbitrary limit.
5. **`depth=0`** — blocks are inline fields (`type: "blocks"`), not relations. Payload always includes inline fields regardless of depth. The `depth` parameter only affects `relationship` and `upload` fields.
6. **`toKebabCase` duplication** — same function exists in `render-blocks.tsx`. Intentionally duplicated because:
   - The admin component runs in Payload's admin bundle (separate from frontend bundle)
   - It's a 1-line pure function — extracting would create a cross-bundle dependency for trivial code
7. **`locale.code` access** — `useLocale()` in Payload v3 always returns a `Locale` object with `code` property. No optional chaining needed — the project has localization configured (en/uk/ru).

### Types exported for Step 2:
The `PageWithSections` and `Section` types are exported and used by the `SmartUrlField` component to render dropdown items.

## Documentation Reference
- `docs-research.md` → "Fetching Pages in Client Component" — REST API pattern with `fetch('/api/pages?...')`
- `docs-research.md` → "Available Hooks" — `useLocale()` for locale-aware API calls
- Spec Design Decision: "Dropdown loading: Fetch pages/sections on first dropdown open, cache for the admin session"

## Rationale
- **Hook, not inline fetch** — separates data-fetching concern from UI rendering; the component stays focused on presentation
- **Co-located with field** — this hook is specific to the smart URL field dropdown, not a general-purpose utility
- **Module-level cache over per-instance** — header global has 3+ field instances; module cache prevents 3x duplicate API calls while keeping the hook interface simple
- **No external state library** — uses plain `useState` + module `Map`; no SWR/React Query in dependencies, and requirements are simple (fetch once per locale, cache in memory)

## Spec Requirements Covered
- REQ-3: Dynamic loading of all pages (title + slug) and their sections (block label + blockType) from Payload API on field focus/open
- REQ-13: Show section labels (`blockName`) in dropdown, fall back to `blockType` when empty
