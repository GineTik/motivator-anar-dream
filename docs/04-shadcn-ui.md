# shadcn/ui

## Що таке shadcn/ui?

shadcn/ui - це не звичайна компонентна бібліотека. Це колекція перевикористовуваних компонентів, які ви можете копіювати та вставляти у свій проєкт.

Особливості:
- Повний контроль над кодом
- Accessible (a11y)
- Customizable
- Побудовано на Radix UI та Tailwind CSS

## Додавання компонентів

### CLI метод (рекомендовано)

```bash
# Додати один компонент
npx shadcn@latest add button

# Додати декілька компонентів
npx shadcn@latest add button card input

# Додати всі компоненти (не рекомендовано)
npx shadcn@latest add --all
```

### Ручне додавання

Компоненти можна копіювати вручну з [shadcn/ui docs](https://ui.shadcn.com/).

## Структура компонентів

Після додавання компоненти з'являються у `components/ui/`:

```
components/
└── ui/
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── ...
```

## Приклади використання

### Button

```typescript
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
```

### Card

```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
```

### Input

```typescript
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

### Form

```bash
# Встановіть додаткові залежності
pnpm add react-hook-form @hookform/resolvers zod

# Додайте компоненти
npx shadcn@latest add form
```

```typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Dialog

```bash
npx shadcn@latest add dialog
```

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
```

## Кастомізація

### Зміна кольорів

Відредагуйте CSS змінні в `app/globals.css`:

```css
:root {
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
}
```

### Зміна компонентів

Компоненти знаходяться у вашому проєкті, тому ви можете їх змінювати:

```typescript
// components/ui/button.tsx
export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, className }),
        "custom-class" // Додайте свої класи
      )}
      {...props}
    />
  )
}
```

### Створення варіантів

```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        custom: "your-custom-classes", // Новий варіант
      },
    },
  }
)
```

## Популярні компоненти для додавання

```bash
# Форми та інпути
npx shadcn@latest add form input textarea select checkbox radio-group switch

# Навігація
npx shadcn@latest add navigation-menu menubar tabs

# Overlay
npx shadcn@latest add dialog sheet popover tooltip

# Feedback
npx shadcn@latest add alert toast progress

# Layout
npx shadcn@latest add card separator aspect-ratio

# Дані
npx shadcn@latest add table data-table calendar
```

## Утиліта cn()

`lib/utils.ts` містить утиліту для об'єднання класів:

```typescript
import { cn } from "@/lib/utils"

// Використання
<div className={cn(
  "base-class",
  condition && "conditional-class",
  className
)} />
```

## Темна тема

shadcn/ui підтримує темну тему з коробки. Додайте theme provider:

```bash
pnpm add next-themes
```

```typescript
// app/providers.tsx
"use client"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

```typescript
// app/layout.tsx
import { Providers } from "./providers"

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

Theme toggle:

```bash
npx shadcn@latest add dropdown-menu
```

```typescript
"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Корисні ресурси

- [Офіційна документація](https://ui.shadcn.com)
- [Приклади](https://ui.shadcn.com/examples)
- [Themes](https://ui.shadcn.com/themes)
- [GitHub](https://github.com/shadcn-ui/ui)
