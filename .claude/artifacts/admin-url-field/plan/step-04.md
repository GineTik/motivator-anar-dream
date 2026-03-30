# Step 4: Update All Integration Points (5 Files, 8 Call Sites)

## Action
Modify existing files + Delete old file

## File(s)
- `apps/landing/shared/collections/blocks/hero-block.ts` (existing) — 1 call site
- `apps/landing/shared/collections/blocks/process-block.ts` (existing) — 1 call site
- `apps/landing/shared/collections/blocks/cta-block.ts` (existing) — 1 call site
- `apps/landing/shared/collections/blocks/footer-block.ts` (existing) — 2 call sites
- `apps/landing/shared/collections/globals/header.ts` (existing) — 3 call sites
- `apps/landing/shared/collections/fields/smart-link.ts` (existing) — DELETE

## Details

### Change pattern

Every call site follows the same mechanical transformation:

**Before:**
```typescript
import { smartLinkFields } from "../fields/smart-link";
// ...
...smartLinkFields(),
```

**After:**
```typescript
import { smartUrlField } from "../fields/smart-url-field";
// ...
smartUrlField(),
```

Key difference: `smartLinkFields()` returns `Field[]` and is spread (`...`). `smartUrlField()` returns a single `Field` — no spread needed.

### File-by-file changes

#### 1. `hero-block.ts` (line 73)
```diff
- import { smartLinkFields } from "../fields/smart-link";
+ import { smartUrlField } from "../fields/smart-url-field";

  // Inside ctaButton group fields array:
- ...smartLinkFields(),
+ smartUrlField(),
```

#### 2. `process-block.ts` (line 152)
```diff
- import { smartLinkFields } from "../fields/smart-link";
+ import { smartUrlField } from "../fields/smart-url-field";

  // Inside tabs array item fields:
- ...smartLinkFields(),
+ smartUrlField(),
```

#### 3. `cta-block.ts` (line 68)
```diff
- import { smartLinkFields } from "../fields/smart-link";
+ import { smartUrlField } from "../fields/smart-url-field";

  // Inside ctaButton group fields array:
- ...smartLinkFields(),
+ smartUrlField(),
```

#### 4. `footer-block.ts` (lines 88, 123)
```diff
- import { smartLinkFields } from "../fields/smart-link";
+ import { smartUrlField } from "../fields/smart-url-field";

  // Inside menuGroups.links array item fields (line ~88):
- ...smartLinkFields(),
+ smartUrlField(),

  // Inside newsletter group fields (line ~123):
- ...smartLinkFields(),
+ smartUrlField(),
```

#### 5. `header.ts` (lines 51, 73, 89)
```diff
- import { smartLinkFields } from "../fields/smart-link";
+ import { smartUrlField } from "../fields/smart-url-field";

  // Inside navLinks array item fields (line ~51):
- ...smartLinkFields(),
+ smartUrlField(),

  // Inside navLinks.children array item fields (line ~73):
- ...smartLinkFields(),
+ smartUrlField(),

  // Inside root fields (cta link, line ~89):
- ...smartLinkFields(),
+ smartUrlField(),
```

Also clean up `defaultValue` on `navLinks` array — remove orphaned `linkType` keys:
```diff
  defaultValue: [
-   { label: "About", linkType: "custom", url: "/about" },
-   { label: "Practices", linkType: "custom", url: "/practices" },
-   { label: "Pricing", linkType: "custom", url: "/pricing" },
-   { label: "Blog", linkType: "custom", url: "/blog" },
-   { label: "Contact", linkType: "custom", url: "/contact" },
+   { label: "About", url: "/about" },
+   { label: "Practices", url: "/practices" },
+   { label: "Pricing", url: "/pricing" },
+   { label: "Blog", url: "/blog" },
+   { label: "Contact", url: "/contact" },
  ],
```

#### 6. `footer-block.ts` — clean up `defaultValue`
In addition to the 2 call site changes above, also clean up `defaultValue` on `menuGroups` array — remove orphaned `linkType` keys from nested `links` objects. Same pattern: strip `linkType` and `section` keys, keep `label` and `url`.

#### 7. Delete `smart-link.ts`
After all 8 call sites are updated, delete `apps/landing/shared/collections/fields/smart-link.ts`. No other files import from it (verified by grep in research).

### Post-change verification

After all changes:
1. Run `pnpm dev` to regenerate importMap and verify no build errors
2. Check that `importMap.js` now contains the SmartUrlField component entry
3. Open any admin page with a smart URL field to verify the custom component renders

## Documentation Reference
- Step 1: `smartUrlField()` returns a single `Field` — consumers use `smartUrlField()` not `...smartUrlField()`
- Research: all 8 call sites identified and verified via grep

## Rationale
- **All call sites changed in one step** — these are mechanical, identical transformations. Splitting across multiple steps would add review overhead for the same pattern repeated 8 times.
- **Old file deleted in same step** — once no imports reference `smart-link.ts`, keeping it creates confusion. Clean break.
- **No data migration** — the new field uses `name: "url"` which matches the old `url` column. The old `linkType` and `section` columns become orphaned but don't cause errors (Payload ignores unknown columns). Data migration is explicitly out of scope per spec.

## Spec Requirements Covered
- REQ-6: Update all integration points across 5 files / 8 call sites to use the new field
