# Step 1: Create `smartUrlField()` Field Definition

## Action
Create new file + Modify existing file

## File(s)
- `apps/landing/shared/collections/fields/smart-url-field/index.ts` (new) — field factory function (public API of the module)
- `apps/landing/shared/collections/fields/smart-link.ts` (existing) — kept as-is for now, removed in Step 4

## Details

### New file: `smart-url-field.ts`

Create a field factory function that returns a single Payload `text` field with a custom admin component:

```typescript
import type { Field, TextField } from "payload";

type SmartUrlFieldOverrides = Partial<Pick<TextField, "name" | "label" | "required">>;

export function smartUrlField(overrides?: SmartUrlFieldOverrides): Field {
  return {
    name: "url",
    type: "text",
    label: "Посилання",
    admin: {
      components: {
        Field: "@/shared/collections/fields/smart-url-field/component#SmartUrlField",
      },
      description: "Введіть зовнішнє посилання або оберіть сторінку/секцію зі списку",
    },
    ...overrides,
  };
}
```

**Key decisions:**
- `name: "url"` — reuses the same DB column name as the old `url` field, minimizing migration needs
- `type: "text"` — stores a plain string, no special handling
- Component path uses `@/` alias which resolves to project root in this codebase
- `SmartUrlFieldOverrides` constrains overrides to valid text-field properties (`name`, `label`, `required`) instead of `Partial<Field>` union
- The old `smartLinkFields()` is NOT deleted yet — both exist during transition (Step 4 swaps all call sites)

**Verification checkpoint:** After creating this file, run `pnpm dev` and check `apps/landing/app/(payload)/admin/importMap.js` to confirm the new component path was picked up. If `@/` alias doesn't resolve, switch to a relative path from project root (e.g., `'/shared/collections/fields/smart-url-field/component#SmartUrlField'`).

### File structure decision

Everything lives inside a single folder — field definition as `index.ts` (public API), component and hook as internal modules:
```
shared/collections/fields/
├── smart-link.ts              (old, removed in Step 4)
└── smart-url-field/
    ├── index.ts                (new, this step — field factory, public API)
    ├── component.tsx           (Step 2)
    └── use-page-sections.ts    (Step 3)
```

Import from consumers: `import { smartUrlField } from '../fields/smart-url-field'` — clean barrel import, everything co-located in one module following the feature-based organization from CLAUDE.md.

## Documentation Reference
- `docs-research.md` → "Custom Field Definition" — field factory pattern from Payload docs
- `docs-research.md` → "Component Path Convention" — `@/path#ExportName` format
- Payload docs: `admin.components.Field` accepts a string path, auto-registered in importMap

## Rationale
- **Single `Field` return** (not `Field[]`) simplifies integration — `smartUrlField()` instead of `...smartLinkFields()`
- **`name: "url"` chosen** to match the existing `url` field name in the old pattern, reducing DB migration scope (the old `linkType` and `section` columns become unused but don't need immediate cleanup)
- **Co-located folder structure** keeps the custom component, hook, and field definition together — they form a single cohesive unit and have no consumers outside this field

## Spec Requirements Covered
- REQ-1: Single Payload field definition (`text` type with custom admin component) replacing the current 3-field pattern
