# Texas Homes Capital — Website

Production-ready real estate investment website built with Next.js 15, Drizzle ORM + SQLite/Turso, Tailwind CSS, and Framer Motion.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Then fill in the values — see "Environment variables" below

# 3. Create local DB and run migrations
npm run db:generate   # generate migration files from schema
npm run db:migrate    # apply migrations to local.db

# 4. Seed with sample properties + testimonials
npm run db:seed

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | SQLite file (`file:./local.db`) or Turso URL (`libsql://...`) |
| `DATABASE_AUTH_TOKEN` | Prod only | Turso auth token (omit for local file) |
| `RESEND_API_KEY` | Yes | [Resend](https://resend.com) API key |
| `LEAD_NOTIFICATION_EMAIL` | Yes | Internal email that receives lead alerts |
| `RESEND_FROM_EMAIL` | Yes | Verified "from" address/domain in Resend |
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL (`https://texashomescapital.com`) |

---

## Database scripts

```bash
npm run db:generate    # Regenerate migration files after schema changes
npm run db:migrate     # Apply pending migrations
npm run db:push        # Push schema directly (dev shortcut, skips migrations)
npm run db:seed        # Insert sample data (idempotent — safe to re-run)
npm run db:studio      # Open Drizzle Studio GUI
```

---

## Switching from local SQLite to Turso (production)

1. Create a Turso database: `turso db create texashomescapital`
2. Get the URL: `turso db show texashomescapital --url`
3. Create a token: `turso db tokens create texashomescapital`
4. Update `.env.local` (or Vercel env vars):
   ```
   DATABASE_URL=libsql://texashomescapital-<org>.turso.io
   DATABASE_AUTH_TOKEN=<your-token>
   ```
5. Run `npm run db:migrate` against Turso to apply the schema.
6. Run `npm run db:seed` to populate initial data.

The same `db/index.ts` client code works for both environments — it reads the auth token conditionally.

---

## Project structure

```
app/               Next.js App Router pages + server actions
components/
  layout/          Header, MobileNav, Footer, Container, ThemeToggle
  ui/              Button, Input, Select, Textarea, Checkbox, Card, Accordion, Badge, Drawer
  motion/          Reveal, StaggerGroup, CountUp (all prefers-reduced-motion safe)
  forms/           LeadForm (generic, config-driven), fieldConfigs, SuccessState
  sections/        Hero, Steps, Stats, Testimonials, FAQ, CTABand, ComparisonTable,
                   PropertyGrid, PropertyCard, PropertyFilters, Gallery
emails/            React Email templates — LeadNotification, LeadConfirmation
lib/
  utils.ts         cn(), hashIp(), rate limiter, COMPANY constants, NAV_LINKS
  format.ts        formatCents(), formatPhone(), label maps
  validations.ts   Zod schemas (shared client ↔ server)
  email.ts         Resend send helpers (non-blocking)
db/
  schema.ts        Drizzle schema — 6 tables
  index.ts         Singleton libSQL client with hot-reload guard
  seed.ts          8 properties + 5 testimonials
drizzle/           Generated migration files
```

---

## Updating company details

All company information is centralized in `lib/utils.ts` → `COMPANY` constant. Update once, reflected everywhere.

---

## Responsive verification

Checked at the following widths in both light and dark mode, in Chrome DevTools:

| Width | Result |
|---|---|
| 320px | No horizontal overflow. Header stays within viewport. Hero text scales down cleanly via `clamp()`. CTAs stack full-width. |
| 375px | All content readable. Forms single-column. |
| 768px | Property grid 2-column. Footer 2-column. FAQ accordion full-width. |
| 1024px | Full desktop nav appears. Property filters show inline. Hero side-by-side. |
| 1280px | Max-width container kicks in, content centers. |

**Items to verify on a real device:**
- iOS Safari: input focus does not zoom (font-size ≥ 16px on all inputs — confirmed in code).
- Touch targets: all nav links, buttons, filter chips ≥ 44×44px — confirmed via `min-h-[44px]` classes.
- Notched phone safe areas: header uses `env(safe-area-inset-top)`, footer uses `pb-safe`.
- `prefers-reduced-motion`: all Framer Motion components check `useReducedMotion()` and skip transforms when active. Verify in macOS Accessibility → Display → Reduce Motion.
- Dark mode flash: the inline `<script>` in `layout.tsx` sets `data-theme` before first paint. Verify by toggling in DevTools with CPU throttling.

---

## Production checklist

- [ ] Fill in real company phone, email, and address in `lib/utils.ts`
- [ ] Replace placeholder Unsplash images in `db/seed.ts` with real property photos
- [ ] Set up a verified domain in Resend and update `RESEND_FROM_EMAIL`
- [ ] Deploy to Vercel (or any Node.js host) with all env vars set
- [ ] Run `npm run db:migrate` against Turso on first deploy
- [ ] Run `npm run db:seed` to populate initial data
- [ ] Verify `NEXT_PUBLIC_SITE_URL` matches your production domain (used in sitemap + OG)
