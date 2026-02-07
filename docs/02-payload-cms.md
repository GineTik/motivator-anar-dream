# Payload CMS

## Що таке Payload CMS?

Payload - це headless CMS нового покоління, повністю написаний на TypeScript. Він надає:

- Admin Panel з коробки
- Type-safe API
- Гнучку систему колекцій
- Аутентифікацію
- File uploads
- Webhooks та багато іншого

## Конфігурація

Основна конфігурація знаходиться в `payload.config.ts`:

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  admin: {
    user: 'users',  // Колекція користувачів для admin
  },
  collections: [
    // Ваші колекції тут
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
})
```

## Створення колекцій

Приклад колекції `Posts`:

```typescript
// collections/Posts.ts
import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
  ],
}
```

Додайте колекцію до конфігурації:

```typescript
import { Posts } from './collections/Posts'

export default buildConfig({
  collections: [Posts],
  // ... інша конфігурація
})
```

## Access Control

Payload має гнучку систему контролю доступу:

```typescript
{
  access: {
    create: ({ req: { user } }) => {
      // Тільки авторизовані користувачі
      return !!user
    },
    read: () => true,  // Публічне читання
    update: ({ req: { user } }) => {
      // Тільки власники можуть оновлювати
      return {
        author: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      // Тільки admin
      return user?.role === 'admin'
    },
  },
}
```

## Hooks

Payload підтримує хуки для різних життєвих циклів:

```typescript
{
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
        }
        return data
      },
    ],
    afterChange: [
      ({ doc, operation }) => {
        if (operation === 'create') {
          // Відправити email нотифікацію
        }
      },
    ],
  },
}
```

## REST API

Payload автоматично генерує REST API:

- `GET /api/posts` - список постів
- `GET /api/posts/:id` - один пост
- `POST /api/posts` - створити пост
- `PATCH /api/posts/:id` - оновити пост
- `DELETE /api/posts/:id` - видалити пост

## GraphQL

Для використання GraphQL додайте:

```bash
pnpm add @payloadcms/graphql
```

```typescript
import { buildConfig } from 'payload'
import { graphQLConfig } from '@payloadcms/graphql'

export default buildConfig({
  graphQL: graphQLConfig(),
  // ...
})
```

GraphQL Playground: http://localhost:3000/api/graphql

## TypeScript Types

Payload автоматично генерує TypeScript типи:

```typescript
// Згенеровано в payload-types.ts
export interface Post {
  id: string
  title: string
  content?: any
  author?: string | User
  publishedAt?: string
  status?: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}
```

## Використання в Next.js

```typescript
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@/payload.config'

export default async function BlogPage() {
  const payload = await getPayloadHMR({ config })
  
  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <div>
      {posts.docs.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  )
}
```

## Корисні ресурси

- [Документація Payload](https://payloadcms.com/docs)
- [Приклади](https://github.com/payloadcms/payload/tree/main/examples)
- [Discord спільнота](https://discord.com/invite/payload)
