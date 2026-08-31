import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// ─── leads ──────────────────────────────────────────────────────────────────────
export const leads = sqliteTable(
  'leads',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    leadType: text('lead_type', { enum: ['buyer', 'seller', 'partner'] as const }).notNull(),
    fullName: text('full_name').notNull(),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    city: text('city').notNull(),
    state: text('state').notNull(),
    message: text('message'),
    consent: integer('consent', { mode: 'boolean' }).notNull().default(false),
    sourcePath: text('source_path').notNull(),
    ipHash: text('ip_hash'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  },
  (t) => ({
    emailIdx: index('leads_email_idx').on(t.email),
    createdAtIdx: index('leads_created_at_idx').on(t.createdAt),
  })
);

// ─── seller_submissions ─────────────────────────────────────────────────────────
export const sellerSubmissions = sqliteTable('seller_submissions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  leadId: text('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  propertyAddress: text('property_address').notNull(),
  propertyCity: text('property_city').notNull(),
  propertyState: text('property_state').notNull(),
  zip: text('zip').notNull(),
  condition: text('condition', {
    enum: ['excellent', 'good', 'fair', 'needs_work', 'major_repairs'] as const,
  }).notNull(),
  timeline: text('timeline', {
    enum: ['asap', '1_3_months', '3_6_months', 'just_exploring'] as const,
  }).notNull(),
  askingPriceCents: integer('asking_price_cents'),
  reasonForSelling: text('reason_for_selling'),
});

// ─── buyer_preferences ──────────────────────────────────────────────────────────
export const buyerPreferences = sqliteTable('buyer_preferences', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  leadId: text('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  budgetMinCents: integer('budget_min_cents').notNull(),
  budgetMaxCents: integer('budget_max_cents').notNull(),
  strategy: text('strategy', {
    enum: ['fix_and_flip', 'buy_and_hold', 'either'] as const,
  }).notNull(),
  markets: text('markets', { mode: 'json' }).$type<string[]>().notNull().default([]),
  financingType: text('financing_type', {
    enum: ['cash', 'conventional', 'hard_money', 'seller_finance', 'undecided'] as const,
  }).notNull(),
});

// ─── partner_applications ───────────────────────────────────────────────────────
export const partnerApplications = sqliteTable('partner_applications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  leadId: text('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  partnerType: text('partner_type', {
    enum: ['capital', 'lender', 'jv', 'contractor', 'wholesaler', 'agent'] as const,
  }).notNull(),
  capitalAvailableCents: integer('capital_available_cents'),
  marketsOfInterest: text('markets_of_interest', { mode: 'json' })
    .$type<string[]>()
    .notNull()
    .default([]),
  yearsExperience: integer('years_experience'),
  accredited: integer('accredited', { mode: 'boolean' }).notNull().default(false),
});

// ─── properties ─────────────────────────────────────────────────────────────────
export const properties = sqliteTable('properties', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zip: text('zip').notNull(),
  priceCents: integer('price_cents').notNull(),
  beds: integer('beds').notNull(),
  baths: integer('baths').notNull(),
  sqft: integer('sqft').notNull(),
  strategy: text('strategy', { enum: ['fix_and_flip', 'buy_and_hold'] as const }).notNull(),
  status: text('status', {
    enum: ['available', 'under_contract', 'sold'] as const,
  })
    .notNull()
    .default('available'),
  description: text('description').notNull(),
  heroImageUrl: text('hero_image_url').notNull(),
  images: text('images', { mode: 'json' }).$type<string[]>().notNull().default([]),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ─── testimonials ────────────────────────────────────────────────────────────────
export const testimonials = sqliteTable('testimonials', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  location: text('location').notNull(),
  quote: text('quote').notNull(),
  rating: integer('rating').notNull().default(5),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
});

// ─── Inferred types ──────────────────────────────────────────────────────────────
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type SellerSubmission = typeof sellerSubmissions.$inferSelect;
export type NewSellerSubmission = typeof sellerSubmissions.$inferInsert;
export type BuyerPreference = typeof buyerPreferences.$inferSelect;
export type NewBuyerPreference = typeof buyerPreferences.$inferInsert;
export type PartnerApplication = typeof partnerApplications.$inferSelect;
export type NewPartnerApplication = typeof partnerApplications.$inferInsert;
export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
