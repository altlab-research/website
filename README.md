# AltLab — Website v1

Engineering the Future of AI-Native Computing. Built with Next.js 15 (App
Router), TypeScript, Tailwind CSS, Framer Motion, Prisma, and Supabase.

## What's included

- **Public site**: Home, Research (list + detail), Publications, Projects
  (list + detail for AltMemory / AltFlow / AltRuntime / AltOS), Experiments
  (Labs), Blog (list + detail), About, Careers.
- **Admin**: `/admin` login (Supabase Auth) and `/admin/dashboard` — content
  capability panels and analytics overview.
- **Database schema**: `prisma/schema.prisma` matching the spec's `papers`
  and `posts` tables, plus `projects`, `experiments`, `career_listings`, and
  `analytics_events` to support the rest of the site.
- **Mock data layer**: `src/lib/data.ts` ships realistic placeholder content
  for every section so the site runs with zero configuration. Each accessor
  function has the equivalent Prisma call commented directly above it —
  swap once your database is live.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase + database values
npm run dev
```

The site runs immediately on mock data — you don't need Supabase configured
to browse the public pages locally.

## Connecting Supabase + the database

1. Create a project at supabase.com.
2. Copy your Project URL, anon key, and service role key into `.env.local`.
3. Copy your Postgres connection string into `DATABASE_URL` (use the
   transaction pooler) and `DIRECT_URL` (session/direct).
4. Push the schema and seed realistic content:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. Swap the bodies of the functions in `src/lib/data.ts` for the commented
   Prisma calls (or leave them — the seed script writes the same content
   into Postgres so you can switch incrementally, page by page).

## Creating an admin user

Admin accounts are provisioned directly in Supabase — there's no public
sign-up route:

1. In the Supabase dashboard, go to **Authentication → Users → Add user**.
2. Set an email and password.
3. Sign in at `/admin` with those credentials.

`src/middleware.ts` protects every `/admin/*` route except the login page
itself by checking the Supabase session.

## Project structure

```
src/
  app/                 Routes (App Router)
  components/           Shared UI components
  lib/
    data.ts             Mock data + accessor functions
    prisma.ts           Prisma client singleton
    supabase/            Browser + server Supabase clients
  types/                 Shared TypeScript types
prisma/
  schema.prisma          Database schema
  seed.ts                 Seed script (mirrors mock data)
```

## Deploying

The site is built for Vercel's free tier:

```bash
vercel
```

Add the same environment variables from `.env.local` in your Vercel project
settings before deploying.
