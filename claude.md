# Product Overview

## Brand

**Name:** Anara Dreams Spirituality Center (Центр Духовності Anara Dreams)

**Mission:** Platform for inner awakening and conscious development through spiritual mentorship and transformation

**Core Message:** "Changes begin from within. When you connect with yourself, life begins to respond."

## Product

**Type:** Multilingual spiritual transformation platform

**Target Markets:**

- Russian-speaking audience
- Ukrainian-speaking audience
- American/European/International audiences

**Key Offerings:**

- Consciousness and self-discovery practices
- Applicable spiritual knowledge for real life
- Personal transformation support
- Inner stability and clarity guidance

**Philosophy:** Transformation happens through inner connection, not through struggle. Conscious creation of reality at your own pace.

---

# Frontend Architecture

## General Rules

- **Language**: All code, comments, documentation, commit messages, and variable names must be in English

## File Naming Convention

- Components: `example-component.tsx`
- Folders: `example-folder/`
- Hooks: `use-example-hook.ts`
- Utils: `example-util.ts`
- Types: `example-types.ts`
- Constants: `example-constants.ts`
- API: `example-api.ts`

## TypeScript Rules

- Full TypeScript, no `any`
- Use `unknown` for dynamic/unsafe types
- Use `Record<string, unknown>` for generic objects
- Explicit types for all exports

## Architecture Layers

### 1. App Layer

Entry point, global config, routing, providers.

```
src/ (if needed)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
```

### 2. Features Layer

Independent business features, self-contained modules.

```
src/
├── features/
│   ├── auth/
│   │   ├── index.ts           # Public API
│   │   ├── ui/                # Components
│   │   ├── model/             # State, hooks
│   │   ├── api/               # API calls
│   │   └── lib/               # Feature utils
│   └── booking/
│       └── ...
```

### 3. Services Layer

Reusable business logic, shared between features.

```
src/
├── services/
│   ├── api-client/
│   ├── analytics/
│   └── storage/
```

### 4. Shared Layer

Core utilities, UI kit, types, constants.

```
src/
├── shared/
│   ├── ui/                    # UI components
│   ├── lib/                   # Utils
│   ├── types/                 # Global types
│   └── config/                # Constants
```

## Dependency Rules

- **App** → can import Features, Services, Shared
- **Features** → can import Services, Shared (NOT other Features)
- **Services** → can import Shared only
- **Shared** → no imports from upper layers

## Module Organization

Each module exports via `index.ts`:

```typescript
// features/auth/index.ts
export { LoginForm } from "./ui/login-form";
export { useAuth } from "./model/use-auth";
export type { AuthUser } from "./model/auth-types";
```

## Feature Structure Example

```
features/
└── booking/
    ├── index.ts               # Public API
    ├── ui/
    │   ├── booking-form.tsx
    │   └── booking-card.tsx
    ├── model/
    │   ├── use-booking.ts
    │   └── booking-types.ts
    ├── api/
    │   └── booking-api.ts
    └── lib/
        └── validate-booking.ts
```

## Best Practices

- Start simple, refactor when needed
- One feature = one business domain
- Features don't know about each other
- Use composition over inheritance
- Expose minimal public API
- Keep Shared layer minimal
- Group by function, not by type

---

## Post-Style-Change Checklist

After any changes to component styles (Tailwind classes, colors, gradients, fonts), **always** run the hardcoded colors audit:

```bash
pnpm audit:colors --app apps/landing --globals 'apps/landing/app/(frontend)/globals.css'
```

If fixable issues are found, run with `--fix` to auto-replace hardcoded values with design tokens:

```bash
pnpm audit:colors --app apps/landing --globals 'apps/landing/app/(frontend)/globals.css' --fix
```
