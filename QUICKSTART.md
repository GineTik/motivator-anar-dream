# Quick Start Guide

## Перше налаштування (5 хвилин)

### 1. Встановіть залежності

```bash
pnpm install
```

### 2. Налаштуйте .env

```bash
cp apps/landing/.env.example apps/landing/.env
```

Відредагуйте `apps/landing/.env`:

```env
# Supabase (отримайте з https://app.supabase.com/project/_/settings/api)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database для Payload CMS (можна взяти з Supabase)
DATABASE_URL=postgresql://user:password@host:5432/database

# Payload Secret (згенеруйте: openssl rand -base64 32)
PAYLOAD_SECRET=your-generated-secret-here
```

### 3. Запустіть проєкт

```bash
pnpm dev
```

Відкрийте:
- **Landing**: http://localhost:3000
- **Payload Admin**: http://localhost:3000/admin

### 4. Створіть першого admin користувача

При першому відвідуванні `/admin` Payload запропонує створити користувача через UI.

## Перші кроки

### Додати shadcn/ui компонент

```bash
cd apps/landing
npx shadcn@latest add button card
```

Використання:

```typescript
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return <Button>Click me</Button>
}
```

### Створити новий feature

```bash
mkdir -p apps/landing/features/auth/ui
```

```typescript
// apps/landing/features/auth/ui/login-form.tsx
export function LoginForm() {
  return <form>...</form>
}

// apps/landing/features/auth/index.ts
export { LoginForm } from "./ui/login-form"

// apps/landing/app/login/page.tsx
import { LoginForm } from "@/features/auth"

export default function LoginPage() {
  return <LoginForm />
}
```

### Додати Payload колекцію

```bash
mkdir -p apps/landing/collections
```

```typescript
// apps/landing/collections/posts.ts
import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
```

```typescript
// apps/landing/payload.config.ts
import { Posts } from './collections/posts'

export default buildConfig({
  collections: [Posts], // Додайте сюди
  // ...
})
```

Створіть міграцію:

```bash
pnpm migrate:create
# Введіть назву: add_posts_collection
pnpm migrate
```

### Використати Supabase Auth

```typescript
// Client Component
'use client'
import { createClient } from '@/shared/lib/supabase/client'

export function LoginButton() {
  const supabase = createClient()
  
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }
  
  return <button onClick={handleLogin}>Login with GitHub</button>
}

// Server Component
import { createClient } from '@/shared/lib/supabase/server'

export default async function Profile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  return <div>Hello, {user?.email}</div>
}
```

## Корисні команди

```bash
# Development
pnpm dev                    # Запустити landing
pnpm dev:all               # Запустити всі apps

# Міграції
pnpm migrate:create        # Створити міграцію
pnpm migrate:status        # Переглянути статус
pnpm migrate               # Виконати міграції

# Build
pnpm build                 # Зібрати для production

# Lint
pnpm lint                  # Перевірити код
```

## Структура файлів

```
apps/landing/
├── app/                    → Pages (Next.js App Router)
├── features/              → Бізнес features (модулі)
│   └── landing/
│       ├── index.ts       → Public API
│       └── ui/            → Компоненти
├── shared/                → Загальні утиліти
│   └── lib/
│       ├── utils.ts       → Helpers (cn, etc.)
│       └── supabase/      → Supabase clients
├── collections/           → Payload CMS колекції
└── payload.config.ts      → Payload конфігурація
```

## Наступні кроки

1. Прочитайте [STRUCTURE.md](./STRUCTURE.md) - детальна структура
2. Перегляньте [docs/06-architecture.md](./docs/06-architecture.md) - архітектурні правила
3. Вивчіть [docs/](./docs/) - повна документація

## Отримати допомогу

- [README.md](./README.md) - головна документація
- [docs/](./docs/) - детальні гайди
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## Troubleshooting

### Port вже зайнятий

```bash
# Знайдіть процес на порту 3000
lsof -ti:3000

# Вбийте процес
kill -9 $(lsof -ti:3000)

# Або запустіть на іншому порту
PORT=3001 pnpm dev
```

### Помилка підключення до БД

Перевірте:
1. `DATABASE_URL` правильний у `.env`
2. База даних існує
3. Мережа дозволяє підключення (Supabase → Database Settings → Connection Pooling)

### Міграції не працюють

```bash
# Перевірте статус
pnpm migrate:status

# Якщо треба перезапустити з нуля (видалить дані!)
pnpm migrate:refresh
```

Готово! 🚀 Починайте розробку!
