# Структура проєкту

## Основна структура

```
motivator-test/
├── apps/
│   └── landing/                   # Next.js лендінг
│       ├── app/                   # Next.js App Router
│       │   ├── (payload)/         # Payload CMS routes
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── globals.css
│       ├── features/              # Бізнес features
│       │   └── landing/
│       │       ├── index.ts
│       │       └── ui/
│       ├── services/              # Спільна логіка
│       ├── shared/                # UI kit, utils
│       │   └── lib/
│       │       ├── utils.ts
│       │       └── supabase/
│       ├── collections/           # Payload CMS колекції
│       ├── payload.config.ts
│       └── middleware.ts
├── packages/                      # Майбутні спільні пакети
├── docs/                          # Документація
└── pnpm-workspace.yaml
```

## Path aliases

```typescript
// У tsconfig.json
{
  "paths": {
    "@/*": ["./*"],                  // Root landing
    "@/features/*": ["./features/*"], // Features layer
    "@/shared/*": ["./shared/*"],     // Shared layer
    "@/services/*": ["./services/*"]  // Services layer
  }
}
```

## Приклади імпортів

```typescript
// Features
import { HeroSection } from "@/features/landing";

// Shared utilities
import { cn } from "@/shared/lib/utils";
import { createClient } from "@/shared/lib/supabase/client";

// Payload config
import config from "@/payload.config";
```

## Додавання нових features

```bash
# Створіть структуру
mkdir -p apps/landing/features/new-feature/ui

# Створіть компонент
# apps/landing/features/new-feature/ui/component.tsx
export function Component() {
  return <div>New Feature</div>
}

# Експортуйте через index.ts
# apps/landing/features/new-feature/index.ts
export { Component } from "./ui/component"

# Використовуйте в app
import { Component } from "@/features/new-feature"
```

## Додавання shadcn/ui компонентів

```bash
cd apps/landing
npx shadcn@latest add button

# Компоненти додаються в:
# apps/landing/components/ui/button.tsx

# Використання:
import { Button } from "@/components/ui/button"
```

## Команди

```bash
# Розробка
pnpm dev                  # Запустити landing
pnpm dev:all             # Запустити всі apps

# Build
pnpm build               # Зібрати landing
pnpm build:all          # Зібрати все

# Міграції
pnpm migrate:create      # Створити міграцію
pnpm migrate:status      # Статус міграцій
pnpm migrate             # Виконати міграції
pnpm migrate:down        # Відкотити міграцію

# Інше
pnpm lint                # Lint
pnpm clean               # Видалити node_modules
```

## Правила архітектури

- **App** → може імпортувати Features, Services, Shared
- **Features** → може імпортувати Services, Shared (НЕ інші Features)
- **Services** → може імпортувати тільки Shared
- **Shared** → без імпортів з верхніх шарів

## Payload CMS workflow

1. Створіть колекцію в `collections/`
2. Додайте в `payload.config.ts`
3. Створіть міграцію: `pnpm migrate:create`
4. Виконайте: `pnpm migrate`

**Важливо**: Auto-push вимкнений, створюйте міграції вручну!

## Supabase

- Працює онлайн (не локально)
- Клієнти в `shared/lib/supabase/`
- Connection string з Supabase Dashboard
