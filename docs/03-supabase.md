# Supabase Integration

## Що таке Supabase?

Supabase - це open-source альтернатива Firebase, яка надає:

- PostgreSQL база даних
- Аутентифікація
- Realtime subscriptions
- Storage для файлів
- Edge Functions
- Auto-generated API

## Налаштування

### 1. Створення проєкту

1. Відкрийте [Supabase Dashboard](https://app.supabase.com)
2. Створіть новий проєкт
3. Збережіть `Project URL` та `anon public` ключ

### 2. Змінні оточення

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Клієнти Supabase

### Client-side (Browser)

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Використання в Client Components:

```typescript
'use client'
import { createClient } from '@/lib/supabase/client'

export default function ClientComponent() {
  const supabase = createClient()
  
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }
  
  return <button onClick={handleLogin}>Login</button>
}
```

### Server-side

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

Використання в Server Components:

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function ServerComponent() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  return <div>Hello, {user?.email}</div>
}
```

## Аутентифікація

### Email/Password

```typescript
// Реєстрація
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})

// Вхід
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})

// Вихід
await supabase.auth.signOut()
```

### OAuth (Google, GitHub, etc.)

```typescript
await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
})
```

Callback route:

```typescript
// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/', request.url))
}
```

### Перевірка статусу користувача

```typescript
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  redirect('/login')
}
```

## Database

### Запити до бази даних

```typescript
// SELECT
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
  .order('created_at', { ascending: false })

// INSERT
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'New Post', content: 'Content' })

// UPDATE
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', 1)

// DELETE
const { data, error } = await supabase
  .from('posts')
  .delete()
  .eq('id', 1)
```

### Joins

```typescript
const { data, error } = await supabase
  .from('posts')
  .select(`
    *,
    author:users(name, avatar_url)
  `)
```

## Realtime

### Subscribe до змін

```typescript
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RealtimeComponent() {
  const [posts, setPosts] = useState([])
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('posts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('Change received!', payload)
          // Оновити стан
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return <div>{/* Render posts */}</div>
}
```

## Storage

### Upload файлів

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar1.png', file)

// Отримати публічний URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png')

console.log(data.publicUrl)
```

## Row Level Security (RLS)

Налаштуйте RLS в Supabase Dashboard:

```sql
-- Дозволити користувачам читати тільки свої пости
CREATE POLICY "Users can view own posts"
  ON posts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Дозволити створення постів тільки авторизованим
CREATE POLICY "Users can insert own posts"
  ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## Edge Functions

Створіть serverless функції в Supabase:

```typescript
// supabase/functions/hello/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  return new Response(
    JSON.stringify({ message: 'Hello from Supabase Edge Functions!' }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

Deploy:

```bash
supabase functions deploy hello
```

## Корисні ресурси

- [Документація Supabase](https://supabase.com/docs)
- [Next.js App Router Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Приклади](https://github.com/supabase/supabase/tree/master/examples)
