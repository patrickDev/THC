/**
 * Idempotent seed script — safe to re-run.
 * Usage: npm run db:seed
 */

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { properties, testimonials } from './schema';
import { eq } from 'drizzle-orm';

const client = createClient({
  url: process.env.DATABASE_URL ?? 'file:./local.db',
  ...(process.env.DATABASE_AUTH_TOKEN ? { authToken: process.env.DATABASE_AUTH_TOKEN } : {}),
});

const db = drizzle(client);

async function seed() {
// Enable FK enforcement
await client.execute('PRAGMA foreign_keys = ON');

// ─── Properties ───────────────────────────────────────────────────────────────
const PROPERTIES = [
  {
    slug: '4521-oleander-houston',
    title: '4521 Oleander Dr — Charming Ranch',
    address: '4521 Oleander Dr',
    city: 'Houston',
    state: 'TX',
    zip: '77018',
    priceCents: 18500000, // $185,000
    beds: 3,
    baths: 2,
    sqft: 1480,
    strategy: 'fix_and_flip' as const,
    status: 'available' as const,
    description: 'Classic 1960s ranch home in the Oak Forest area. Solid bones, original hardwood floors, and a generous corner lot. Ideal for a full cosmetic flip — kitchen, baths, and landscaping will yield strong ARV in this sought-after neighborhood.',
    heroImageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      'https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=800&q=80',
    ],
    featured: true,
  },
  {
    slug: '918-cedar-elm-dallas',
    title: '918 Cedar Elm Ln — Rental-Ready Duplex',
    address: '918 Cedar Elm Ln',
    city: 'Dallas',
    state: 'TX',
    zip: '75208',
    priceCents: 31500000, // $315,000
    beds: 4,
    baths: 3,
    sqft: 2100,
    strategy: 'buy_and_hold' as const,
    status: 'available' as const,
    description: 'Duplex with two separate units in Oak Cliff. Both units currently leased at market rate, generating $2,850/month in gross rents. Updated plumbing, newer roof. Strong cash-flow from day one — ideal for the passive income investor.',
    heroImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    ],
    featured: true,
  },
  {
    slug: '2203-magnolia-san-antonio',
    title: '2203 Magnolia Ave — Historic Craftsman',
    address: '2203 Magnolia Ave',
    city: 'San Antonio',
    state: 'TX',
    zip: '78212',
    priceCents: 14900000, // $149,000
    beds: 3,
    baths: 1,
    sqft: 1350,
    strategy: 'fix_and_flip' as const,
    status: 'under_contract' as const,
    description: 'Craftsman bungalow in the Mahncke Park area. Original charm intact — coved ceilings, covered porch, detached garage. Needs a full renovation. Strong ARV comps in the $260–280K range. Quick access to Brackenridge Park.',
    heroImageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80',
    images: [],
    featured: true,
  },
  {
    slug: '6710-briarwood-houston',
    title: '6710 Briarwood Dr — Move-In Ready Rental',
    address: '6710 Briarwood Dr',
    city: 'Houston',
    state: 'TX',
    zip: '77096',
    priceCents: 24500000, // $245,000
    beds: 4,
    baths: 2,
    sqft: 1920,
    strategy: 'buy_and_hold' as const,
    status: 'available' as const,
    description: 'Well-maintained four-bedroom in Meyerland area. Recently refreshed with new paint, appliances, and HVAC. Current tenant paying $1,950/month, lease expires in 8 months. Strong rent-to-price ratio for a buy-and-hold investor.',
    heroImageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    featured: true,
  },
  {
    slug: '3344-pecan-grove-dallas',
    title: '3344 Pecan Grove Blvd — Investor Special',
    address: '3344 Pecan Grove Blvd',
    city: 'Dallas',
    state: 'TX',
    zip: '75224',
    priceCents: 12500000, // $125,000
    beds: 3,
    baths: 1,
    sqft: 1100,
    strategy: 'fix_and_flip' as const,
    status: 'available' as const,
    description: 'Solid three-bedroom in the South Dallas corridor. Foundation recently repaired with warranty. Needs full interior renovation — cosmetic scope only. Comparables in the $210–225K range post-renovation. Great entry-level flip.',
    heroImageUrl: 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=800&q=80',
    images: [],
    featured: false,
  },
  {
    slug: '1802-river-oaks-sa',
    title: '1802 River Oaks Ct — Turnkey Rental',
    address: '1802 River Oaks Ct',
    city: 'San Antonio',
    state: 'TX',
    zip: '78230',
    priceCents: 21900000, // $219,000
    beds: 3,
    baths: 2,
    sqft: 1650,
    strategy: 'buy_and_hold' as const,
    status: 'sold' as const,
    description: 'Three-bed, two-bath in the Medical Center corridor. Fully renovated, rented at $1,750/month. Sold to a portfolio buyer in 11 days. Showcasing our typical deal flow and execution speed.',
    heroImageUrl: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80',
    images: [],
    featured: false,
  },
  {
    slug: '5510-sunset-houston',
    title: '5510 Sunset Blvd — Garden District Fixer',
    address: '5510 Sunset Blvd',
    city: 'Houston',
    state: 'TX',
    zip: '77005',
    priceCents: 38500000, // $385,000
    beds: 4,
    baths: 3,
    sqft: 2400,
    strategy: 'fix_and_flip' as const,
    status: 'available' as const,
    description: 'Four-bedroom in the Rice/Museum District area. High ARV neighborhood — comps in the $650–700K range. Full gut renovation required. Rare opportunity to execute a premium flip in one of Houston\'s strongest appreciation corridors.',
    heroImageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    featured: true,
  },
  {
    slug: '420-lake-view-dallas',
    title: '420 Lake View Dr — Cash-Flowing Rental',
    address: '420 Lake View Dr',
    city: 'Dallas',
    state: 'TX',
    zip: '75116',
    priceCents: 18200000, // $182,000
    beds: 3,
    baths: 2,
    sqft: 1400,
    strategy: 'buy_and_hold' as const,
    status: 'available' as const,
    description: 'Solid three-bedroom in Duncanville corridor. Updated kitchen and bathrooms. Currently vacant — ready for a new tenant or owner-occupant. Strong rental demand in this submarket, comps suggest $1,600–1,700/month.',
    heroImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    images: [],
    featured: false,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Maria G.',
    location: 'Houston, TX',
    quote: 'I needed to sell fast after my husband passed. Texas Homes Capital was respectful, honest, and closed in 12 days. I didn\'t have to lift a finger or spend a dime on repairs.',
    rating: 5,
    featured: true,
  },
  {
    name: 'James R.',
    location: 'Dallas, TX',
    quote: 'I\'ve bought three properties through THC and every deal has been clean and straightforward. Their buyer list is the real deal — I\'ve gotten access to off-market opportunities I couldn\'t find elsewhere.',
    rating: 5,
    featured: true,
  },
  {
    name: 'Linda & Tom W.',
    location: 'San Antonio, TX',
    quote: 'We were drowning in a property we couldn\'t sell. THC gave us a fair offer, explained everything clearly, and there was zero pressure. Closed in 9 days. Couldn\'t be happier.',
    rating: 5,
    featured: true,
  },
  {
    name: 'Carlos M.',
    location: 'Houston, TX',
    quote: 'As a private lender, I\'ve worked with a lot of operators. THC is organized, transparent, and they pay on time every time. I\'ve done four loans with them and counting.',
    rating: 5,
    featured: true,
  },
  {
    name: 'Denise A.',
    location: 'Dallas, TX',
    quote: 'The team was patient with all my questions and never pushed me. I knew from the first call that they were the right buyers. Selling my mother\'s home was emotional — they made it easier.',
    rating: 5,
    featured: true,
  },
];

// ─── Run seed ─────────────────────────────────────────────────────────────────
  console.log('Seeding database...');

  for (const p of PROPERTIES) {
    const existing = await db.select({ id: properties.id }).from(properties).where(eq(properties.slug, p.slug)).limit(1);
    if (!existing.length) {
      await db.insert(properties).values(p);
      console.log(`  + Property: ${p.slug}`);
    } else {
      console.log(`  ~ Skipped (exists): ${p.slug}`);
    }
  }

  for (const t of TESTIMONIALS) {
    const existing = await db.select({ id: testimonials.id }).from(testimonials).where(eq(testimonials.name, t.name)).limit(1);
    if (!existing.length) {
      await db.insert(testimonials).values(t);
      console.log(`  + Testimonial: ${t.name}`);
    } else {
      console.log(`  ~ Skipped (exists): ${t.name}`);
    }
  }

  console.log('Done!');
  client.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
