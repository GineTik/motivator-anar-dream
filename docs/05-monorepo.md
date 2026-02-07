# Монорепозиторій з pnpm workspaces

## Що таке монорепозиторій?

Монорепозиторій - це підхід до організації коду, де кілька проєктів/пакетів зберігаються в одному Git репозиторії.

### Переваги

- **Спільний код**: Легко шерити код між проєктами
- **Атомарні коміти**: Зміни в декількох пакетах в одному коміті
- **Одна версія залежностей**: Уникнення конфліктів версій
- **Простіше рефакторити**: Зміни в API відразу в усіх місцях
- **Ефективність**: pnpm shared node_modules

### Недоліки

- **Складніше CI/CD**: Потрібно визначати, що білдити
- **Більший розмір**: Весь код в одному місці
- **Права доступу**: Складніше обмежити доступ до частин коду

## Структура проєкту

```
motivator-test/
├── apps/                      # Додатки
│   ├── landing/              # Next.js лендінг
│   ├── admin/                # Admin панель (майбутнє)
│   └── mobile/               # React Native (майбутнє)
├── packages/                  # Спільні пакети
│   ├── ui/                   # Компонентна бібліотека
│   ├── config/               # Спільні конфіги
│   ├── types/                # TypeScript типи
│   └── utils/                # Утиліти
├── docs/                      # Документація
├── pnpm-workspace.yaml       # Workspace конфігурація
└── package.json              # Root package.json
```

## pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

Це вказує pnpm, які директорії є workspace пакетами.

## Root package.json

```json
{
  "name": "motivator-test",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter landing dev",
    "dev:all": "pnpm --parallel --filter \"./apps/*\" dev",
    "build": "pnpm --filter landing build",
    "build:all": "pnpm --recursive build",
    "lint": "pnpm --recursive lint",
    "test": "pnpm --recursive test",
    "clean": "pnpm --recursive clean && rm -rf node_modules"
  },
  "devDependencies": {
    "typescript": "^5.9.3"
  }
}
```

## Створення спільного пакету

### 1. Створити структуру

```bash
mkdir -p packages/ui
cd packages/ui
pnpm init
```

### 2. Налаштувати package.json

```json
{
  "name": "@motivator/ui",
  "version": "0.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^19.2.4"
  },
  "devDependencies": {
    "@types/react": "^19.2.13",
    "typescript": "^5.9.3"
  }
}
```

### 3. Створити компоненти

```typescript
// packages/ui/src/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="btn">{children}</button>
}
```

```typescript
// packages/ui/src/index.ts
export { Button } from './Button'
```

### 4. Використовувати в додатку

```bash
# Додати залежність
cd apps/landing
pnpm add @motivator/ui --workspace
```

```json
// apps/landing/package.json
{
  "dependencies": {
    "@motivator/ui": "workspace:*"
  }
}
```

```typescript
// apps/landing/app/page.tsx
import { Button } from '@motivator/ui'

export default function Home() {
  return <Button>Click me</Button>
}
```

## pnpm команди для монорепозиторія

### Встановлення залежностей

```bash
# Для всього workspace
pnpm install

# Для конкретного пакету
pnpm --filter landing add react

# Додати workspace залежність
pnpm --filter landing add @motivator/ui --workspace
```

### Запуск скриптів

```bash
# В конкретному пакеті
pnpm --filter landing dev

# У всіх пакетах
pnpm --recursive dev

# Паралельно в apps/*
pnpm --parallel --filter "./apps/*" dev

# З залежностями
pnpm --filter landing... build  # landing та його залежності
```

### Фільтри

```bash
# За назвою
pnpm --filter landing dev

# За glob pattern
pnpm --filter "./apps/*" dev
pnpm --filter "@motivator/*" build

# З залежностями
pnpm --filter landing... build      # landing + dependencies
pnpm --filter ...landing build      # landing + dependents
```

## TypeScript конфігурація

### Root tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  }
}
```

### Package tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Версіонування та публікація

Для публікації пакетів використовуйте [changesets](https://github.com/changesets/changesets):

```bash
pnpm add -Dw @changesets/cli
pnpm changeset init
```

Workflow:

```bash
# 1. Зробити зміни
# 2. Створити changeset
pnpm changeset

# 3. Версіонувати пакети
pnpm changeset version

# 4. Опублікувати (якщо потрібно)
pnpm changeset publish
```

## Практики

### 1. Іменування пакетів

Використовуйте scope для внутрішніх пакетів:

```
@motivator/ui
@motivator/config
@motivator/types
```

### 2. Залежності

- **dependencies**: Потрібні в runtime
- **devDependencies**: Тільки для розробки
- **peerDependencies**: Повинні бути у споживача

### 3. Exports

Використовуйте `exports` field для точного контролю:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./button": "./src/Button.tsx",
    "./utils": "./src/utils.ts"
  }
}
```

### 4. Build order

pnpm автоматично визначає порядок білду на основі залежностей.

## Корисні ресурси

- [pnpm workspaces](https://pnpm.io/workspaces)
- [pnpm filtering](https://pnpm.io/filtering)
- [Turborepo](https://turbo.build/) - для складніших монорепо
- [Nx](https://nx.dev/) - альтернатива з більшими можливостями
