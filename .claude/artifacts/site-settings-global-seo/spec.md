# Site Settings Global — SEO & Favicon

## Goal

Add a Payload CMS Global (`site-settings`) that provides site-wide SEO defaults, favicon management, and metadata configuration — all editable from the admin panel.

## Context

- The project has per-page SEO fields in the `pages` collection (title, description, keywords, ogImage) — all localized
- Root layout metadata is hardcoded: `title: "Motivator"`, `description: "Your motivation platform"`
- No favicon/icon exists anywhere in the project
- No `robots.txt`, `sitemap.xml`, canonical URLs, or hreflang tags are configured
- The site supports 3 locales: `en`, `uk`, `ru` (with fallback enabled)
- One Global already exists (`header`) — this adds a second one (`site-settings`)
- `generateMetadata` in `features/payload-page/page.tsx` handles per-page metadata but has no fallback to global defaults

## Requirements

### Global Config (Payload Admin)

- MUST create a `site-settings` Payload Global accessible from admin panel
- MUST organize fields into logical groups: `seo`, `favicon`, `social`
- MUST support localization for all text-based SEO fields

### Favicon

- MUST allow uploading a favicon image via Payload admin (media upload)
- MUST generate appropriate favicon references in the HTML `<head>` (via Next.js metadata)
- SHOULD support common formats (`.ico`, `.png`, `.svg`)

### SEO Defaults

- MUST provide a `siteName` field (localized) — used in title template and OG metadata
- MUST provide a `titleSeparator` field — character(s) between page title and site name (default: `"|"`)
- MUST provide a `defaultDescription` field (localized) — fallback when page has no description
- MUST provide a `defaultKeywords` field (localized) — fallback when page has no keywords
- MUST provide a `defaultOgImage` field (media upload) — fallback when page has no OG image

### Title Template

- MUST format page titles as `"{pageTitle} {separator} {siteName}"` (e.g., "Pricing | Anara Dreams")
- MUST use Next.js `metadata.title.template` for automatic title formatting
- MUST allow the homepage to use `siteName` as-is (via `title.default`)

### Metadata Fallback Chain

- Page-level SEO fields override global defaults
- Global defaults override hardcoded fallbacks
- Chain: `page.seo.field` → `siteSettings.seo.field` → empty/null

### robots.txt

- MUST generate a dynamic `robots.txt` via Next.js route handler
- MUST provide `allowIndexing` toggle in admin (boolean, default: `true`)
- MUST include sitemap URL reference in `robots.txt`
- When `allowIndexing` is `false`, MUST output `Disallow: /` for all user-agents

### Sitemap

- MUST generate a dynamic `sitemap.xml` via Next.js metadata API
- MUST include all published pages from the `pages` collection
- MUST include `lastmod` from page `updatedAt`
- MUST include locale alternates for all 3 locales (hreflang in sitemap)

### Canonical URLs & hreflang

- MUST add `canonical` URL to every page's metadata
- MUST add `alternates.languages` with all 3 locale URLs to every page's metadata

### Social Metadata

- MUST add Twitter/X card metadata (`twitter:card`, `twitter:site`)
- SHOULD provide an optional `twitterHandle` field in admin
- MUST set `openGraph.siteName` from global `siteName`
- MUST set `openGraph.locale` based on current page locale

### Root Layout Integration

- MUST replace hardcoded `metadata` export in root layout with dynamic metadata from `site-settings`
- MUST set HTML `lang` attribute dynamically based on current locale (not hardcoded `"uk"`)

## Data Model

### Site Settings Global Schema

```
site-settings (Global)
├── seo (group)
│   ├── siteName          — text, localized, required
│   │                       default(en): "Anara Dreams"
│   │                       default(uk): "Anara Dreams"
│   │                       default(ru): "Anara Dreams"
│   ├── titleSeparator    — text, not localized
│   │                       default: "|"
│   ├── defaultDescription — textarea, localized
│   │                       default(en): "Platform for inner awakening and conscious development through spiritual mentorship"
│   │                       default(uk): "Платформа для внутрішнього пробудження та усвідомленого розвитку через духовне наставництво"
│   │                       default(ru): "Платформа для внутреннего пробуждения и осознанного развития через духовное наставничество"
│   ├── defaultKeywords   — text, localized
│   │                       default(en): "spiritual development, conscious transformation, inner awakening, meditation, self-discovery"
│   │                       default(uk): "духовний розвиток, усвідомлена трансформація, внутрішнє пробудження, медитація, самопізнання"
│   │                       default(ru): "духовное развитие, осознанная трансформация, внутреннее пробуждение, медитация, самопознание"
│   └── defaultOgImage    — upload (media), not localized
│
├── favicon (group)
│   └── icon              — upload (media), not localized
│                           admin hint: "Recommended: 512x512 PNG or SVG"
│
├── social (group)
│   ├── twitterHandle     — text, not localized
│   │                       default: ""
│   │                       admin hint: "e.g. @anaradreams"
│   └── ogLocaleMap       — not stored; derived from current locale at render time
│
└── indexing (group)
    └── allowIndexing     — checkbox, not localized
                            default: true
                            admin hint: "Disable to block search engines (adds noindex to robots.txt)"
```

### Metadata Output Shape (Next.js)

```typescript
// Root layout metadata (from site-settings)
{
  title: {
    template: "%s | Anara Dreams",  // uses siteName + separator
    default: "Anara Dreams",        // homepage / fallback
  },
  description: "Platform for inner awakening...",
  keywords: "spiritual development, ...",
  icons: {
    icon: "/media/favicon.png",     // from site-settings.favicon.icon
  },
  openGraph: {
    siteName: "Anara Dreams",
    locale: "en",                   // dynamic per locale
  },
  twitter: {
    card: "summary_large_image",
    site: "@anaradreams",
  },
  robots: {
    index: true,                    // from allowIndexing
    follow: true,
  },
}

// Page-level metadata (merges with root)
{
  title: "Pricing",                 // becomes "Pricing | Anara Dreams" via template
  description: page.seo.description || siteSettings.seo.defaultDescription,
  keywords: page.seo.keywords || siteSettings.seo.defaultKeywords,
  openGraph: {
    images: [page.seo.ogImage?.url || siteSettings.seo.defaultOgImage?.url],
  },
  alternates: {
    canonical: "https://anaradreams.com/pricing",
    languages: {
      en: "https://anaradreams.com/en/pricing",
      uk: "https://anaradreams.com/uk/pricing",
      ru: "https://anaradreams.com/ru/pricing",
    },
  },
}
```

## Edge Cases

- **No favicon uploaded** — MUST NOT output broken `<link rel="icon">` tag; skip favicon metadata entirely
- **No default OG image and no page OG image** — MUST NOT output empty `og:image`; omit the field
- **Empty siteName** — MUST fall back to `"Anara Dreams"` hardcoded
- **Empty titleSeparator** — MUST fall back to `"|"`
- **Page with no SEO fields filled** — MUST use all global defaults seamlessly
- **allowIndexing toggled off** — `robots.txt` must immediately reflect `Disallow: /`; page-level `robots` meta must include `noindex, nofollow`
- **Draft pages** — MUST NOT appear in `sitemap.xml`; only `_status: "published"` pages
- **Site-settings Global not yet saved** — first deploy before admin configures anything; MUST use hardcoded defaults from schema `defaultValue` fields

## Out of Scope

- Structured data / JSON-LD (separate feature)
- Per-page `noindex` toggle (can be added to Page schema later)
- PWA manifest (`manifest.json`)
- Analytics / tracking script injection
- Social media link list (Instagram, Facebook, etc.) — belongs in footer config
- Multi-domain / multi-tenant configuration
- Locale-specific domain routing (e.g., `uk.anaradreams.com`)

## Acceptance Criteria

- [ ] `site-settings` Global appears in Payload admin sidebar
- [ ] Admin can fill siteName, defaultDescription, defaultKeywords (per locale)
- [ ] Admin can upload a favicon image and it appears in browser tab
- [ ] Admin can upload a default OG image
- [ ] Admin can toggle `allowIndexing` on/off
- [ ] Page titles render as `"Page Title | Site Name"` format
- [ ] Pages without SEO fields fall back to global defaults for description, keywords, and OG image
- [ ] `/robots.txt` is dynamically generated and respects `allowIndexing` toggle
- [ ] `/sitemap.xml` lists all published pages with `lastmod` and locale alternates
- [ ] Every page has `canonical` URL and `alternates.languages` in metadata
- [ ] Twitter card metadata is present on all pages
- [ ] `<html lang="...">` reflects the current locale, not hardcoded `"uk"`
- [ ] When site-settings has no saved data, all hardcoded defaults work correctly
