# Step 8: Set Up Testing Infrastructure

## Action
Install packages + Create config files

## File(s)
- `apps/landing/package.json` (existing) — add devDependencies
- `apps/landing/vitest.config.ts` (new) — Vitest configuration
- `apps/landing/playwright.config.ts` (new) — Playwright configuration

## Details

### 1. Install packages

```bash
cd apps/landing

# Unit + integration tests
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom

# E2E tests
pnpm add -D @playwright/test

# Install Playwright browsers
pnpm exec playwright install --with-deps chromium
```

**Packages:**
- `vitest` — fast unit/integration test runner, native ESM + TypeScript support, compatible with Next.js/Payload
- `@testing-library/react` — component testing for the SmartUrlField admin component (pulls `@testing-library/dom` as peer dep)
- `@testing-library/jest-dom` — custom DOM matchers (`toBeInTheDocument()`, `toHaveAttribute()`, etc.)
- `jsdom` — browser environment for Vitest (renders React components without a real browser)
- `@playwright/test` — E2E testing framework for admin UI scenarios

### 2. Vitest config

```typescript
// apps/landing/vitest.config.ts
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

```typescript
// apps/landing/vitest.setup.ts
import '@testing-library/jest-dom/vitest'
```

**Key decisions:**
- `environment: 'jsdom'` — needed for React component tests (DOM APIs)
- `globals: true` — allows `describe`, `it`, `expect` without imports (cleaner test code)
- `setupFiles` — imports jest-dom matchers globally so all tests can use `toBeInTheDocument()` etc.
- `@` alias — matches the project's existing `@/` path alias from tsconfig
- `import.meta.url` for `__dirname` — correct ESM pattern (project uses `"type": "module"`)

### 3. Playwright config

```typescript
// apps/landing/playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: true,
  },
})
```

**Key decisions:**
- `testDir: './e2e'` — separate directory for E2E tests, keeps them apart from unit tests
- `webServer` config — auto-starts dev server if not running, reuses existing one if it is
- Chromium only — sufficient for admin panel testing, faster CI runs

### 4. Package.json scripts

Add to `apps/landing/package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

### 5. Gitignore

Add to `.gitignore` (root or `apps/landing/.gitignore`):

```
# Playwright
test-results/
playwright-report/
```

### 6. Directory structure

```
apps/landing/
├── vitest.config.ts
├── playwright.config.ts
├── e2e/                        # E2E tests (future)
│   └── .gitkeep
└── shared/
    └── collections/
        └── fields/
            └── smart-url-field/
                ├── index.ts
                ├── component.tsx
                ├── use-page-sections.ts
                └── __tests__/         # Unit tests (future)
                    └── .gitkeep
```

Test files will be co-located with the code they test (e.g., `__tests__/resolve-href.test.ts`) — following the convention from CLAUDE.md's feature structure. Writing actual tests is a separate task.

### 7. Verification

```bash
cd apps/landing

# Verify vitest works
pnpm test -- --passWithNoTests

# Verify playwright works
pnpm test:e2e -- --help
```

## Documentation Reference
- Payload docs (Context7): Vitest + Playwright recommended for Payload plugin/app testing
- Payload integration test pattern: `getPayload({ config })` + `payload.create/find` for DB-level tests
- Vitest docs: `environment: 'jsdom'` for React component tests

## Rationale
- **Vitest over Jest** — native ESM support (the project uses `"type": "module"`), faster execution, built-in TypeScript support without extra transforms
- **Testing Library over Enzyme/direct renders** — industry standard for React component testing, encourages testing user behavior not implementation details
- **Playwright over Cypress** — recommended by Payload docs, lighter, better ESM support, built-in auto-wait
- **Chromium only** — admin panel is used by the team internally, not public-facing. Cross-browser testing is unnecessary.
- **Configs only, no tests yet** — this step sets up infrastructure. Writing tests is a separate concern that can be done as a follow-up task.

## Spec Requirements Covered
- Prerequisite for Test Plan from spec (unit tests for `resolveHref()` and SmartUrlField component, E2E tests for 4 scenarios)
- No tests are written in this step — only the tooling is installed and configured
