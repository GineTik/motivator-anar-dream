# Frontend Architecture

## Загальні правила

### File Naming Convention

- **Components**: `example-component.tsx`
- **Folders**: `example-folder/`
- **Hooks**: `use-example-hook.ts`
- **Utils**: `example-util.ts`
- **Types**: `example-types.ts`
- **Constants**: `example-constants.ts`
- **API**: `example-api.ts`

### TypeScript Rules

- **Full TypeScript**, no `any`
- Use `unknown` for dynamic/unsafe types
- Use `Record<string, unknown>` for generic objects
- Explicit types for all exports

## Архітектурні шари

### 1. App Layer

Entry point, глобальна конфігурація, routing, providers.

```
apps/landing/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Global providers
│   └── (payload)/         # Payload CMS routes
```

### 2. Features Layer

Незалежні бізнес-фічі, самодостатні модулі.

```
apps/landing/
├── features/
│   ├── landing/
│   │   ├── index.ts           # Public API
│   │   ├── ui/                # Components
│   │   │   └── hero-section.tsx
│   │   ├── model/             # State, hooks
│   │   ├── api/               # API calls
│   │   └── lib/               # Feature utils
│   ├── auth/
│   │   └── ...
│   └── booking/
│       └── ...
```

**Приклад feature структури:**

```typescript
// features/landing/index.ts
export { HeroSection } from "./ui/hero-section";
export { useHeroData } from "./model/use-hero-data";
export type { HeroData } from "./model/hero-types";

// features/landing/ui/hero-section.tsx
export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to Motivator</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Your landing page is ready!
      </p>
    </section>
  );
}
```

### 3. Services Layer

Переусувана бізнес-логіка, спільна між features.

```
apps/landing/
├── services/
│   ├── api-client/
│   │   ├── index.ts
│   │   └── client.ts
│   ├── analytics/
│   │   └── index.ts
│   └── storage/
│       └── index.ts
```

**Приклад сервісу:**

```typescript
// services/api-client/index.ts
export { apiClient } from "./client";
export type { ApiResponse, ApiError } from "./types";

// services/api-client/client.ts
export const apiClient = {
    get: async <T>(url: string): Promise<T> => {
        // implementation
    },
    post: async <T>(url: string, data: unknown): Promise<T> => {
        // implementation
    },
};
```

### 4. Shared Layer

Основні утиліти, UI kit, типи, константи.

```
apps/landing/
├── shared/
│   ├── ui/                    # UI components (shadcn/ui)
│   ├── lib/                   # Utils
│   │   ├── utils.ts
│   │   └── supabase/
│   │       ├── client.ts
│   │       ├── server.ts
│   │       └── middleware.ts
│   ├── types/                 # Global types
│   └── config/                # Constants
```

## Правила залежностей

- **App** → може імпортувати Features, Services, Shared
- **Features** → може імпортувати Services, Shared (НЕ інші Features)
- **Services** → може імпортувати тільки Shared
- **Shared** → немає імпортів з верхніх шарів

```
┌─────────────────────────────────┐
│            App                  │
│   (pages, layouts, providers)   │
└────────────┬────────────────────┘
             │
    ┌────────▼────────┐
    │    Features     │  ← Не можуть імпортувати один одного
    │  (auth, booking)│
    └────────┬────────┘
             │
    ┌────────▼────────┐
    │    Services     │  ← Спільна бізнес-логіка
    │  (api, analytics)│
    └────────┬────────┘
             │
    ┌────────▼────────┐
    │     Shared      │  ← Базові утиліти
    │   (ui, utils)   │
    └─────────────────┘
```

## Організація модулів

Кожен модуль експортує через `index.ts`:

```typescript
// features/auth/index.ts
export { LoginForm } from "./ui/login-form";
export { useAuth } from "./model/use-auth";
export type { AuthUser } from "./model/auth-types";

// Використання
import { LoginForm, useAuth } from "@/features/auth";
```

## Path aliases

В `tsconfig.json` налаштовані наступні аліаси:

```json
{
    "paths": {
        "@/*": ["./*"],
        "@/features/*": ["./src/features/*"],
        "@/shared/*": ["./src/shared/*"],
        "@/services/*": ["./src/services/*"]
    }
}
```

**Приклади імпортів:**

```typescript
// Features
import { HeroSection } from "@/features/landing";
import { LoginForm } from "@/features/auth";

// Shared
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { createClient } from "@/shared/lib/supabase/client";

// Services
import { apiClient } from "@/services/api-client";
```

## Best Practices

### 1. Починайте просто, рефакторьте за потреби

Не створюйте зайву структуру заздалегідь. Якщо у вас є тільки один компонент, просто створіть його в `features/landing/ui/`.

### 2. Один feature = один бізнес-домен

Feature повинен бути самодостатнім. Якщо щось використовується в декількох features, винесіть в Services або Shared.

### 3. Features не знають один про одного

Якщо потрібна комунікація між features, використовуйте:

- Глобальний стейт (Zustand, Redux)
- Event bus
- Спільний Service

### 4. Використовуйте композицію

```typescript
// ❌ Не успадковуйте
class ExtendedButton extends Button {}

// ✅ Композиція
function PrimaryButton(props) {
  return <Button variant="primary" {...props} />;
}
```

### 5. Мінімальний Public API

Експортуйте тільки те, що потрібно ззовні:

```typescript
// ❌ Експортуємо все
export { InternalHelper } from "./lib/internal";
export { PublicComponent } from "./ui/public";

// ✅ Тільки публічне API
export { PublicComponent } from "./ui/public";
```

### 6. Групуйте за функціоналом, не за типом

```
// ❌ Погано
src/
  components/
    hero.tsx
    login.tsx
  hooks/
    use-hero.ts
    use-auth.ts

// ✅ Добре
src/features/
  landing/
    ui/hero.tsx
    model/use-hero.ts
  auth/
    ui/login.tsx
    model/use-auth.ts
```

## Приклади структури

### Простий feature

```
apps/landing/features/landing/
├── index.ts
└── ui/
    └── hero-section.tsx
```

### Складний feature

```
apps/landing/features/booking/
├── index.ts
├── ui/
│   ├── booking-form.tsx
│   ├── booking-card.tsx
│   ├── booking-list.tsx
│   └── booking-details.tsx
├── model/
│   ├── use-booking.ts
│   ├── use-bookings-list.ts
│   ├── booking-types.ts
│   └── booking-store.ts
├── api/
│   ├── booking-api.ts
│   └── booking-queries.ts
└── lib/
    ├── validate-booking.ts
    └── format-booking.ts
```

## Migration з плоскої структури

Якщо у вас вже є компоненти:

1. Створіть feature папку
2. Перемістіть пов'язані компоненти в `ui/`
3. Створіть `index.ts` та експортуйте публічне API
4. Оновіть імпорти

```bash
# До
components/hero.tsx
hooks/use-hero.ts

# Після
features/landing/
├── index.ts
├── ui/
│   └── hero.tsx
└── model/
    └── use-hero.ts
```

## Тестування

Тести розміщуються поруч з кодом:

```
features/auth/
├── ui/
│   ├── login-form.tsx
│   └── login-form.test.tsx
├── model/
│   ├── use-auth.ts
│   └── use-auth.test.ts
```

## Корисні ресурси

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Next.js Project Structure](https://nextjs.org/docs/getting-started/project-structure)
