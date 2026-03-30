# Step 6: Update Frontend Link Rendering

## Action
Create new component + Modify existing files

## File(s)
- `apps/landing/features/payload-page/lib/resolve-href.ts` (existing) — add `isExternalHref` helper
- `apps/landing/shared/ui/smart-link.tsx` (new) — universal link component
- `apps/landing/features/payload-page/ui/hero-block.tsx` (existing)
- `apps/landing/features/payload-page/ui/cta-block.tsx` (existing)
- `apps/landing/features/payload-page/ui/process-block.tsx` (existing)
- `apps/landing/features/payload-page/ui/footer-block.tsx` (existing)
- `apps/landing/features/payload-page/ui/site-header.tsx` (existing)

## Details

### Step 1: Add `isExternalHref` to `resolve-href.ts`

```typescript
export function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}
```

### Step 2: Create `SmartLink` component

New file: `apps/landing/shared/ui/smart-link.tsx`

A polymorphic link component that automatically chooses `<Link>` (internal) or `<a>` (external) based on the href value. Eliminates the repeated ternary across 11 call sites.

```tsx
import Link from 'next/link'
import { type ComponentProps, forwardRef } from 'react'
import { isExternalHref } from '@/features/payload-page/lib/resolve-href'

type SmartLinkProps = ComponentProps<'a'> & {
  href: string
  openInNewTab?: boolean
}

export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  ({ href, openInNewTab, children, ...rest }, ref) => {
    const isExternal = isExternalHref(href)
    const targetProps =
      isExternal || openInNewTab
        ? { target: '_blank' as const, rel: 'noopener noreferrer' }
        : {}

    if (isExternal) {
      return (
        <a ref={ref} href={href} {...targetProps} {...rest}>
          {children}
        </a>
      )
    }

    return (
      <Link ref={ref} href={href} {...targetProps} {...rest}>
        {children}
      </Link>
    )
  }
)

SmartLink.displayName = 'SmartLink'
```

**Key design decisions:**
- `forwardRef` — allows parent components to pass refs (needed for scroll-into-view, focus management)
- `ComponentProps<'a'>` — accepts all anchor attributes (`className`, `onClick`, etc.) so callers can pass `buttonVariants(...)` classNames or event handlers
- `openInNewTab` prop — applies `target="_blank"` to **either** element type. Internal links with `openInNewTab` still use `<Link>` (preserves prefetching) but open in new tab.
- Lives in `shared/ui/` — it's a generic UI component, not specific to any feature

### Step 3: Replace all 11 call sites

All patterns reduce to `<SmartLink>` with optional `className` and `openInNewTab`:

#### Pattern A: Plain text links (5 sites)

**Before:**
```tsx
<a href={resolveHref(link)} className="no-underline">
  <span>{link.label}</span>
</a>
```

**After:**
```tsx
<SmartLink href={resolveHref(link?.url)} className="no-underline">
  <span>{link.label}</span>
</SmartLink>
```

Used in:
- `site-header.tsx`: 4 nav link sites (desktop top-level, desktop children, mobile top-level, mobile children)
- `footer-block.tsx`: 1 menu links site

#### Pattern B: Button-style links (6 sites)

**Before:**
```tsx
<Button
  href={resolveHref(block.ctaButton ?? {})}
  variant="gradient"
  size="lg"
  {...(block.ctaButton?.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
>
  {block.ctaButton?.text}
</Button>
```

**After:**
```tsx
<SmartLink
  href={resolveHref(block.ctaButton?.url)}
  openInNewTab={block.ctaButton?.openInNewTab}
  className={buttonVariants({ variant: "gradient", size: "lg" })}
>
  {block.ctaButton?.text}
</SmartLink>
```

Used in:
- `hero-block.tsx`: 1 CTA button (`variant: "gradient", size: "lg"`)
- `cta-block.tsx`: 1 CTA button (`variant: "gradient", size: "lg"`)
- `process-block.tsx`: 1 tab button (`variant: "gradient"`, no explicit size, no `openInNewTab`)
- `site-header.tsx`: 2 CTA buttons (`variant: "solid", size: "sm"` + custom classNames)
- `footer-block.tsx`: 1 newsletter button (`variant: "secondary"` + custom classNames `"h-[50px] px-5 sm:px-[30px]"`)

For footer newsletter, combine styles with `cn()`:
```tsx
import { cn } from '@/shared/lib/utils'

<SmartLink
  href={resolveHref(block.newsletter?.url)}
  className={cn(buttonVariants({ variant: "secondary" }), "h-[50px] px-5 sm:px-[30px]")}
>
  {block.newsletter?.buttonText}
</SmartLink>
```

### File-by-file imports

| File | Add import | Remove import |
|------|-----------|--------------|
| `site-header.tsx` | `SmartLink` from `@/shared/ui/smart-link`, `buttonVariants` from `@/shared/ui/button` | `Button` (if no other usages remain) |
| `hero-block.tsx` | `SmartLink`, `buttonVariants` | `Button` |
| `cta-block.tsx` | `SmartLink`, `buttonVariants` | `Button` |
| `process-block.tsx` | `SmartLink`, `buttonVariants` | `Button` |
| `footer-block.tsx` | `SmartLink`, `buttonVariants`, `cn` from `@/shared/lib/utils` | `Button` (if no other usages) |

### Summary table

| File | Pattern A (plain) | Pattern B (button) | Total |
|------|-------------------|--------------------|-------|
| `site-header.tsx` | 4 | 2 | 6 |
| `footer-block.tsx` | 1 | 1 | 2 |
| `hero-block.tsx` | — | 1 | 1 |
| `cta-block.tsx` | — | 1 | 1 |
| `process-block.tsx` | — | 1 | 1 |
| **Total** | **5** | **6** | **11** |

## Documentation Reference
- Spec REQ-8: External links use `<a target="_blank">`, internal links use Next.js `<Link>`
- Next.js `<Link>` supports `target="_blank"` and `ref` forwarding natively

## Rationale
- **`SmartLink` component** — the external-vs-internal ternary repeats 11 times with identical logic. A shared component eliminates duplication and centralizes the behavior. If the branching logic ever changes (e.g., add `mailto:` support), one file to update.
- **`shared/ui/` placement** — it's a generic UI primitive like `Button`, not tied to any feature. Follows the dependency rules: `shared/` can't import from upper layers, but `isExternalHref` is in `features/`. **Exception**: import `isExternalHref` from the feature layer. Alternatively, move `isExternalHref` to `shared/lib/` if this dependency direction concerns. The function is a pure string check with no feature-specific logic.
- **`forwardRef` + `ComponentProps<'a'>`** — makes `SmartLink` a drop-in replacement for `<a>` and `<Button href>`. Any prop that worked on those elements works on `SmartLink`.
- **No wrapper around children** — `SmartLink` renders children directly, so existing markup structure stays identical.

## Spec Requirements Covered
- REQ-8: Frontend rendering — external links use `<a target="_blank" rel="noopener noreferrer">`, internal links use Next.js `<Link>`
