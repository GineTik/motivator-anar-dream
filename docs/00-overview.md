# Motivator - Огляд проєкту

## Загальна інформація

Motivator - це платформа мотивації, побудована на основі монорепозиторія з використанням сучасного стеку технологій.

## Архітектура

Проєкт організований як **монорепозиторій** з використанням pnpm workspaces:

```
motivator-test/
├── apps/
│   └── landing/          # Next.js лендінг з Payload CMS
├── packages/             # Спільні пакети (майбутні)
├── docs/                 # Документація проєкту
└── pnpm-workspace.yaml   # Конфігурація workspace
```

## Технологічний стек

### Frontend & Backend
- **Next.js 16** - React framework з App Router
- **TypeScript** - Типобезпека
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Компонентна бібліотека

### CMS
- **Payload CMS 3** - Headless CMS з Admin Panel
- **Lexical Editor** - Rich text editor

### База даних
- **PostgreSQL** - Основна БД для Payload CMS
- **Supabase** - Backend-as-a-Service для аутентифікації та додаткових даних

### Package Manager
- **pnpm** - Швидкий та ефективний package manager

## Основні особливості

1. **Монорепозиторій** - централізоване управління залежностями
2. **Type Safety** - TypeScript у всіх частинах проєкту
3. **Modern React** - React 19 з Server Components
4. **Headless CMS** - Гнучке управління контентом
5. **Supabase Integration** - Готова аутентифікація та realtime функціонал

## Середовища розробки

- **Development** - `pnpm dev` в apps/landing
- **Production** - `pnpm build && pnpm start`
- **Payload Admin** - http://localhost:3000/admin

## Наступні кроки

1. Налаштувати Supabase проєкт
2. Створити .env файл з необхідними змінними
3. Запустити міграції бази даних
4. Додати перші колекції в Payload CMS
5. Створити базові UI компоненти
