# Motivator

Платформа мотивації, побудована на сучасному стеку технологій з використанням монорепозиторія.

## 🚀 Технології

- **Next.js 16** - React framework з App Router
- **Payload CMS 3** - Headless CMS з Admin Panel
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)
- **shadcn/ui** - Компонентна бібліотека
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety
- **pnpm** - Package manager

## 📁 Структура проєкту

```
motivator-test/
├── apps/
│   └── landing/              # Next.js лендінг з Payload CMS
│       ├── app/              # Next.js App Router
│       ├── features/         # Business features (самодостатні модулі)
│       │   └── landing/      # Landing feature
│       ├── services/         # Спільна бізнес-логіка
│       ├── shared/           # UI kit, утиліти, типи
│       │   └── lib/          # Supabase clients, utils
│       └── payload.config.ts # Payload CMS конфігурація
├── packages/                 # Спільні пакети (майбутнє)
├── docs/                     # Документація проєкту
│   ├── 00-overview.md        # Огляд проєкту
│   ├── 01-setup.md           # Налаштування
│   ├── 02-payload-cms.md     # Payload CMS гайд
│   ├── 03-supabase.md        # Supabase інтеграція
│   ├── 04-shadcn-ui.md       # shadcn/ui компоненти
│   ├── 05-monorepo.md        # Монорепозиторій
│   └── 06-architecture.md    # Frontend архітектура
└── pnpm-workspace.yaml
```

## 🏗️ Початок роботи

### Передумови

- Node.js >= 20.x
- pnpm >= 9.x
- PostgreSQL >= 14

### Встановлення

1. **Клонувати репозиторій**

```bash
git clone <repository-url>
cd motivator-test
```

2. **Встановити залежності**

```bash
pnpm install
```

3. **Налаштувати змінні оточення**

```bash
cp apps/landing/.env.example apps/landing/.env
```

Відредагуйте `apps/landing/.env`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (PostgreSQL для Payload CMS)
DATABASE_URL=postgresql://user:password@localhost:5432/motivator

# Payload CMS
PAYLOAD_SECRET=your-secret-key-min-32-chars
```

4. **Створити базу даних**

```bash
createdb motivator
```

5. **Запустити проєкт**

```bash
cd apps/landing
pnpm dev
```

Відкрийте:

- **Landing**: http://localhost:3000
- **Payload Admin**: http://localhost:3000/admin

## 📖 Документація

Детальна документація знаходиться в папці `docs/`:

- [00-overview.md](./docs/00-overview.md) - Огляд архітектури та технологій
- [01-setup.md](./docs/01-setup.md) - Детальне налаштування проєкту
- [02-payload-cms.md](./docs/02-payload-cms.md) - Робота з Payload CMS
- [03-supabase.md](./docs/03-supabase.md) - Інтеграція Supabase
- [04-shadcn-ui.md](./docs/04-shadcn-ui.md) - Використання shadcn/ui
- [05-monorepo.md](./docs/05-monorepo.md) - Робота з монорепозиторієм
- [06-architecture.md](./docs/06-architecture.md) - Frontend архітектура (Features/Services/Shared)

## 🎯 Основні команди

### Розробка

```bash
# Запустити landing в режимі розробки
pnpm dev

# Запустити всі apps одночасно
pnpm dev:all
```

### Build

```bash
# Зібрати landing
pnpm build

# Зібрати всі packages
pnpm build:all
```

### Database Migrations (Payload CMS)

```bash
# Створити нову міграцію
pnpm migrate:create

# Переглянути статус міграцій
pnpm migrate:status

# Виконати міграції
pnpm migrate

# Відкотити останню міграцію
pnpm migrate:down

# Видалити всі дані та виконати міграції заново
pnpm migrate:refresh
```

### Lint

```bash
# Lint всього проєкту
pnpm lint
```

## 🧩 Додавання компонентів shadcn/ui

```bash
cd apps/landing

# Додати окремі компоненти
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form

# Подивитися доступні компоненти
npx shadcn@latest add
```

## 🗄️ Payload CMS

Payload CMS інтегрований в Next.js додаток:

- **Admin Panel**: `/admin`
- **REST API**: `/api/*`
- **Конфігурація**: `apps/landing/payload.config.ts`

### Workflow з міграціями

1. **Створіть колекцію** в `apps/landing/collections/`
2. **Додайте колекцію** в `payload.config.ts`
3. **Створіть міграцію**: `pnpm migrate:create`
4. **Перевірте статус**: `pnpm migrate:status`
5. **Виконайте міграцію**: `pnpm migrate`

**Важливо**: Auto-push схеми вимкнений (`push: false`). Завжди створюйте міграції вручну.

Детальніше: [docs/02-payload-cms.md](./docs/02-payload-cms.md)

## 🔐 Supabase

Supabase клієнти налаштовані для:

- **Client Components**: `shared/lib/supabase/client.ts`
- **Server Components**: `shared/lib/supabase/server.ts`
- **Middleware**: `shared/lib/supabase/middleware.ts`

### Аутентифікація

```typescript
import { createClient } from "@/shared/lib/supabase/client";

const supabase = createClient();
await supabase.auth.signInWithPassword({ email, password });
```

**Важливо**: Supabase працює в хмарі, локальна база не потрібна. Використовуйте connection string з Supabase Dashboard.

Детальніше: [docs/03-supabase.md](./docs/03-supabase.md)

## 📦 Створення спільних пакетів

```bash
# Створити новий пакет
mkdir -p packages/ui
cd packages/ui
pnpm init

# Додати залежність на пакет
cd apps/landing
pnpm add @motivator/ui --workspace
```

Детальніше: [docs/05-monorepo.md](./docs/05-monorepo.md)

## 🚢 Deployment

### Vercel (Рекомендовано для Next.js)

1. Push код на GitHub
2. Імпортуйте проєкт в Vercel
3. Вкажіть Root Directory: `apps/landing`
4. Додайте environment variables
5. Deploy!

### Інші платформи

- **Railway**: Підтримує pnpm workspaces
- **Netlify**: Налаштуйте base directory
- **Docker**: Створіть multi-stage Dockerfile

## 🛠️ Розробка

### Структура apps/landing

```
apps/landing/
├── app/                  # Next.js App Router
│   ├── (payload)/       # Payload CMS routes (group)
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── features/            # Business features (модулі)
│   └── landing/         # Landing feature
│       ├── index.ts     # Public API
│       └── ui/          # Components
├── services/            # Спільна бізнес-логіка
├── shared/              # Загальні утиліти
│   ├── lib/            # Utils, Supabase clients
│   └── ui/             # shadcn/ui компоненти (після додавання)
├── collections/         # Payload CMS колекції
├── payload.config.ts    # Payload конфігурація
└── middleware.ts        # Next.js middleware
```

### Додавання нового app

```bash
mkdir apps/admin
cd apps/admin
pnpm init
# ... налаштуйте новий додаток
```

## 🤝 Contributing

1. Fork проєкт
2. Створіть feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit зміни (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Відкрийте Pull Request

## 📝 License

MIT

## 🔗 Корисні посилання

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS](https://payloadcms.com)
- [Supabase](https://supabase.com)
- [shadcn/ui](https://ui.shadcn.com)
- [pnpm](https://pnpm.io)
- [Tailwind CSS](https://tailwindcss.com)

---

**Створено з ❤️ для Motivator**
