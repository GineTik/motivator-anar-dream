# Step 5: Simplify `resolveHref()` to Passthrough

## Action
Modify existing file

## File(s)
- `apps/landing/features/payload-page/lib/resolve-href.ts` (existing) — simplify to passthrough

## Details

### Before
```typescript
type SmartLinkData = {
  linkType?: "custom" | "section" | null;
  url?: string | null;
  section?: string | null;
  href?: string | null;
  buttonLink?: string | null;
  buttonHref?: string | null;
  ctaLink?: string | null;
};

export function resolveHref(link: SmartLinkData): string {
  if (link.linkType === "section") {
    return link.section ? `#${link.section}` : "#";
  }
  if (link.linkType === "custom") {
    return link.url || "#";
  }
  return link.url || link.href || link.buttonLink || link.buttonHref || link.ctaLink || "#";
}
```

### After
```typescript
export function resolveHref(value: string | null | undefined): string {
  return value || "#";
}
```

The stored value is now a valid href directly (`/about#hero`, `https://...`). No parsing, no structured data — just a null-safe passthrough.

### Update all callers

All 5 frontend files that call `resolveHref()` currently pass an object. They need to pass the `url` string instead:

| File | Before | After |
|------|--------|-------|
| `hero-block.tsx:88` | `resolveHref(block.ctaButton ?? {})` | `resolveHref(block.ctaButton?.url)` |
| `cta-block.tsx:87` | `resolveHref(block.ctaButton ?? {})` | `resolveHref(block.ctaButton?.url)` |
| `process-block.tsx:188` | `resolveHref(currentTab)` | `resolveHref(currentTab?.url)` |
| `footer-block.tsx:63` | `resolveHref(link)` | `resolveHref(link?.url)` |
| `footer-block.tsx:93` | `resolveHref(block.newsletter ?? {})` | `resolveHref(block.newsletter?.url)` |
| `site-header.tsx:120` | `resolveHref(child)` | `resolveHref(child?.url)` |
| `site-header.tsx:133` | `resolveHref(link)` | `resolveHref(link?.url)` |
| `site-header.tsx:149` | `resolveHref(data)` | `resolveHref(data?.url)` |
| `site-header.tsx:225` | `resolveHref(child)` | `resolveHref(child?.url)` |
| `site-header.tsx:236` | `resolveHref(link)` | `resolveHref(link?.url)` |
| `site-header.tsx:249` | `resolveHref(data)` | `resolveHref(data?.url)` |

All 11 call sites follow the same pattern: extract `.url` from the parent object.

## Documentation Reference
- Spec REQ-7: Simplify `resolveHref()` — stored value is already a valid href, becomes direct passthrough
- Spec REQ-4: No special prefix — values are valid `href` attributes directly

## Rationale
- **Keep `resolveHref` function** — even though it's trivially simple now, it serves as a single point for null-safe fallback to `"#"`. Removing it would scatter `?? "#"` across 11 call sites.
- **Change signature to `string | null | undefined`** — callers now pass `object?.url` which may be `undefined`. The function handles all falsy cases.
- **Delete `SmartLinkData` type** — no longer needed, the function accepts a primitive.

## Spec Requirements Covered
- REQ-7: Simplify `resolveHref()` — direct passthrough, remove old parsing logic
