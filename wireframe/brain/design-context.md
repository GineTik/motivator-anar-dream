# Design Context — Anara Dreams

Generated: 2026-03-30

## App Overview
Multilingual spiritual transformation platform (Anara Dreams Spirituality Center). Landing page with hero, features, pricing, testimonials, CTA, and footer sections. Built with Next.js + Payload CMS + Tailwind CSS.

## Target Platform
Both (responsive) — mobile-first with desktop optimization

## Layout Patterns
- Max content width: `max-w-[1160px]` with `mx-auto px-4 sm:px-5`
- Header: `max-w-[1200px]`
- 12-column grid system for feature cards
- Flexbox for most layouts, grid for card arrangements
- Sections use generous vertical padding: `py-[60px] sm:py-[72px] lg:py-[80px] xl:py-[134px]`

## Navigation
- Desktop: horizontal nav links with dropdown menus (hidden on mobile)
- Mobile: hamburger menu with animated toggle
- Footer: 2-4 menu groups (Explore, Resources, Support) with link lists
- SmartLink component handles internal vs external links

## Color Palette
- Brand primary: `#250a63` (dark purple — text, headings)
- Brand purple: `#594bec` (accent, interactive states, hover)
- Brand purple light: `#887cf8` (gradients)
- Footer border: `rgba(183, 183, 214, 0.3)`
- Footer gradient: `rgba(145, 209, 249, 0.15)` light blue tint
- Background: white with subtle gradient to light blue at footer
- Button accents: `#7b87fe` (secondary variant)

## Typography
- Primary font: Inter Tight (fallback Arial, sans-serif)
- Heading sizes: h1=62px, h2=52px, h3/h4=22-24px
- Body: 16px/24px
- Letter-spacing: -0.02em on headings
- Font weights: 400 (normal), 500 (medium), 600 (semibold)

## Page Types
### Landing Page
- Structure: hero → features → pricing → testimonials → CTA → footer
- Full-width sections with centered max-width content
- Gradient backgrounds between sections

## Interaction Patterns
- Scroll-triggered fade-in-up animations (opacity + translateY + blur)
- 700ms duration, 100ms staggered delays between items
- Hover: color transitions (300ms) to brand-purple
- Button hovers: gradient shifts, opacity changes

## Content Hierarchy
- Section headings: Inter Tight, medium weight, brand-primary color
- Body text: Inter Tight, normal weight
- Links: brand-primary color, hover to brand-purple
- Social icons: 20-24px with opacity hover

## Screenshot Observations
### Mobile Footer (Current State)
- 2-column grid for menu groups (Explore + Resources side by side)
- Support group drops to full-width below
- Uneven column heights (Explore has 6 links, Resources has 3)
- Looks unbalanced — left column much taller than right
- Newsletter section and copyright below menu groups
- Social icons at bottom

## UX Conventions
- Mobile-first responsive approach
- Generous whitespace between sections
- Consistent use of brand-primary for text
- Fade-in animations on scroll
- CTA buttons use secondary variant (rounded-full, accent color)

## Footer Structure
- Three sections: Top (logo + menus), Center (newsletter CTA), Bottom (copyright + socials)
- Background: white gradient to light blue
- Border-top separator before copyright
- Menu group titles: xl text, medium weight
- Menu links: base text, normal weight
