# Налаштування проєкту

## Передумови

- Node.js >= 20.x
- pnpm >= 9.x
- PostgreSQL >= 14
- Supabase проєкт (опціонально для початку)

## Встановлення

### 1. Клонування та встановлення залежностей

```bash
# Перехід до проєкту
cd motivator-test

# Встановлення залежностей (виконається для всіх workspace)
pnpm install
```

### 2. Налаштування змінних оточення

Створіть `.env` файл у `apps/landing/`:

```bash
cp apps/landing/.env.example apps/landing/.env
```

Відредагуйте `.env` файл:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (PostgreSQL для Payload CMS)
DATABASE_URL=postgresql://user:password@localhost:5432/motivator

# Payload CMS
PAYLOAD_SECRET=your-secure-random-string-min-32-chars
```

### 3. Налаштування бази даних

#### Локальний PostgreSQL

```bash
# Створіть базу даних
createdb motivator

# Або через psql
psql -U postgres
CREATE DATABASE motivator;
```

#### Supabase Database

Ви можете використовувати Supabase PostgreSQL для Payload CMS:

1. Відкрийте Supabase Dashboard
2. Settings → Database
3. Скопіюйте Connection String (URI)
4. Використайте його як `DATABASE_URL`

### 4. Запуск проєкту

```bash
cd apps/landing
pnpm dev
```

Відкрийте:
- Landing: http://localhost:3000
- Payload Admin: http://localhost:3000/admin

### 5. Створення першого Admin користувача

При першому запуску Payload CMS запропонує створити admin користувача через UI.

## Структура проєкту

```
apps/landing/
├── app/                      # Next.js App Router
│   ├── (payload)/           # Payload CMS routes
│   │   ├── admin/           # Admin panel
│   │   └── api/             # API routes
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
├── lib/                     # Utilities
│   ├── supabase/           # Supabase clients
│   └── utils.ts            # Helper functions
├── middleware.ts           # Next.js middleware
├── payload.config.ts       # Payload CMS config
├── next.config.ts          # Next.js config
└── package.json
```

## Troubleshooting

### Помилка підключення до бази даних

Переконайтеся, що:
- PostgreSQL запущений
- `DATABASE_URL` правильний
- База даних створена

### Помилка Payload CMS

Переконайтеся, що:
- `PAYLOAD_SECRET` встановлений (мінімум 32 символи)
- База даних доступна
- Міграції виконані

### Помилка Supabase

Переконайтеся, що:
- `NEXT_PUBLIC_SUPABASE_URL` та `NEXT_PUBLIC_SUPABASE_ANON_KEY` встановлені
- Ключі взяті з правильного проєкту
