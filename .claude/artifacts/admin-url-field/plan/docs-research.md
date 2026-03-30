# Documentation Research

## Technologies Researched

### Payload CMS v3.75.0
- **Source:** Context7 `/payloadcms/payload/v3.77.0`
- **Key findings relevant to this task:**

#### Custom Field Components
- A field's admin UI can be replaced via `admin.components.Field` — value is a **string path** (not a React import), e.g. `'/fields/SmartUrlField/Component#SmartUrlFieldComponent'`
- Payload auto-generates an `importMap.js` from these paths — no manual registration needed
- The component file **must** have `'use client'` directive
- Component type: `TextFieldClientComponent` (from `payload` types) for a `text` field

#### `useField` Hook (form state integration)
- Import: `import { useField } from '@payloadcms/ui'`
- Returns `{ value, setValue }` — `setValue(newValue)` updates **local form state only** (no DB write)
- Accepts generic: `useField<string>({ path })` — `path` comes from component props
- This is exactly what REQ-9 requires — field changes update form state, Save button becomes active

#### Available Hooks for Admin Components
```tsx
import {
  useField,        // Field value and setValue
  useForm,         // Form state and dispatch
  useFormFields,   // Multiple field values (optimized)
  useLocale,       // Current locale
  useConfig,       // Payload config (client-safe)
  useDocumentInfo, // Current document info
  usePayload,      // Local API methods (server only)
} from '@payloadcms/ui'
```

#### Data Fetching in Client Components
- **Cannot use `usePayload()`** in client components (it's for RSC only)
- **Must use `fetch('/api/...')`** with REST API for client-side data loading
- Pattern: `fetch('/api/pages?depth=0&limit=100')` then `.json()`
- Payload REST API: `GET /api/pages` returns `{ docs: Page[], totalDocs, ... }`

#### Component Path Convention
- Paths are relative to the project root (where `payload.config` lives)
- Can use `#ExportName` suffix for named exports: `'/path/to/file#ComponentName'`
- Current importMap has only 2 entries — this will be the first custom field component

### React 19 / Next.js 16
- **Source:** Project `package.json`
- React 19 with `'use client'` directive for client components
- Next.js 16 with App Router
- No testing libraries installed (no vitest, jest, playwright, testing-library)

### lucide-react (icons)
- **Source:** Project `package.json` — already installed (`^0.563.0`)
- Available for dropdown chevron, external link icon, search icon, etc.
- Import: `import { ChevronDown, ExternalLink, Search, X } from 'lucide-react'`

### class-variance-authority + tailwind-merge + clsx
- **Source:** Project `package.json` — already installed
- Used in `shared/ui/button.tsx` — follow same pattern for new component styling
- `cn()` utility at `shared/lib/utils` for className merging

## Code Examples from Docs

### Custom Field Definition (field config)
```typescript
// Field factory function pattern (from Payload docs)
import type { Field } from 'payload'

export const smartUrlField = (overrides?: Partial<Field>): Field => ({
  name: 'url',
  type: 'text',
  admin: {
    components: {
      Field: '/shared/collections/fields/smart-url/component#SmartUrlField',
    },
  },
  ...overrides,
})
```

### Custom Field Component (client component)
```tsx
'use client'
import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

export const SmartUrlField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  // setValue('...') updates local form state → Save button becomes active
  return <input value={value || ''} onChange={(e) => setValue(e.target.value)} />
}
```

### Fetching Pages in Client Component
```tsx
// REST API call to get all pages with their blocks
const res = await fetch('/api/pages?depth=0&limit=100&locale=en')
const { docs } = await res.json()
// docs: Array<{ id, title, slug, blocks: Array<{ blockType, blockName }> }>
```

## Gotchas & Constraints

1. **No `usePayload()` in client components** — must use REST API via `fetch()`
2. **Import map auto-generation** — component path string must be correct on first try; run `pnpm dev` to regenerate
3. **No testing libraries** — spec mentions unit/E2E tests but project has no test setup. Tests are out of scope for this plan.
4. **Locale-aware API calls** — pages have localized `title`, so API calls should include `?locale=...` using `useLocale()` hook
5. **`blockName` availability** — Payload CMS adds `blockName` to every block by default (user-editable label). Available in API response without extra config.
6. **REST API depth** — `depth=0` is sufficient since we only need top-level page fields + blocks array (blocks are inline, not relations)
