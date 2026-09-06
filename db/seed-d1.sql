-- ─── Texas Homes Capital — D1 Production Seed ────────────────────────────────
-- Run with:
--   npx wrangler d1 execute texashomescapital-db --file=db/seed-d1.sql --remote
--
-- Uses INSERT OR IGNORE so it is safe to run more than once.

-- ── Testimonials ──────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO testimonials (id, name, location, quote, rating, featured) VALUES
  (
    '11111111-0000-0000-0000-000000000001',
    'Maria G.',
    'Houston, TX',
    'Texas Homes Capital made selling our inherited property completely stress-free. They gave us a fair offer within 24 hours and closed in 10 days. I couldn''t believe how smooth the whole process was.',
    5, 1
  ),
  (
    '11111111-0000-0000-0000-000000000002',
    'James R.',
    'Dallas, TX',
    'As a real estate investor, I love working with THC. They bring me deals before they hit the market and the entire process is clean and professional. I''ve closed three properties with them this year alone.',
    5, 1
  ),
  (
    '11111111-0000-0000-0000-000000000003',
    'Sandra K.',
    'San Antonio, TX',
    'We needed to sell fast during a really difficult time. Texas Homes Capital was compassionate, professional, and delivered exactly what they promised. No games, no surprises — just a fair deal.',
    5, 1
  ),
  (
    '11111111-0000-0000-0000-000000000004',
    'Robert M.',
    'Austin, TX',
    'I was skeptical about cash buyers after hearing horror stories, but Texas Homes Capital changed my mind completely. Their offer was fair and they closed on the exact date I needed. Highly recommend.',
    5, 1
  ),
  (
    '11111111-0000-0000-0000-000000000005',
    'Linda T.',
    'Plano, TX',
    'We partnered with THC as private lenders and have been very happy with the returns and the communication. They run a tight ship and always keep us in the loop on every project.',
    5, 1
  ),
  (
    '11111111-0000-0000-0000-000000000006',
    'David C.',
    'Beaumont, TX',
    'My house needed a ton of work and I honestly thought I''d never be able to sell it. Texas Homes Capital bought it as-is and saved me from a really stressful situation. Cannot thank them enough.',
    5, 0
  );

-- ── Properties ────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO properties (
  id, slug, title, address, city, state, zip,
  price_cents, beds, baths, sqft,
  strategy, status, description,
  hero_image_url, images, featured, created_at
) VALUES
  (
    '22222222-0000-0000-0000-000000000001',
    'houston-3132-baywood-dr',
    '3BR/2BA Fix & Flip — Houston Heights Area',
    '3132 Baywood Dr',
    'Houston', 'TX', '77018',
    18500000, 3, 2, 1420,
    'fix_and_flip', 'available',
    'Solid 1960s bungalow in the Heights corridor with a strong ARV. Needs cosmetic updates and a kitchen refresh. Comparable sales in the $290–$310k range. Ideal for experienced flippers. Clean title, motivated seller.',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    '["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"]',
    1,
    strftime('%s', 'now')
  ),
  (
    '22222222-0000-0000-0000-000000000002',
    'dallas-7814-lyndon-ln',
    '3BR/2BA Buy & Hold — Dallas South Oak Cliff',
    '7814 Lyndon Ln',
    'Dallas', 'TX', '75232',
    16500000, 3, 2, 1350,
    'buy_and_hold', 'available',
    'Rent-ready home cash-flowing at $1,650/month with a reliable month-to-month tenant in place. Strong rental market and low vacancy in the area. Projected 7% cap rate. Tenant will stay if desired — great turnkey hold.',
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80',
    '["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"]',
    1,
    strftime('%s', 'now') - 86400
  ),
  (
    '22222222-0000-0000-0000-000000000003',
    'san-antonio-4210-candlewood-pass',
    '4BR/3BA Fix & Flip — San Antonio NW',
    '4210 Candlewood Pass',
    'San Antonio', 'TX', '78249',
    22000000, 4, 3, 2100,
    'fix_and_flip', 'under_contract',
    'Large 4/3 in the UTSA corridor — strong demand from students and families. Needs roof, HVAC, and interior refresh. ARV estimated at $340–$360k. Priced to accommodate an $80k+ renovation budget with a solid profit margin.',
    'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80',
    '["https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80"]',
    0,
    strftime('%s', 'now') - 172800
  ),
  (
    '22222222-0000-0000-0000-000000000004',
    'houston-9901-fuqua-st',
    '2BR/1BA Buy & Hold — Houston Southeast',
    '9901 Fuqua St',
    'Houston', 'TX', '77075',
    12500000, 2, 1, 980,
    'buy_and_hold', 'available',
    'Low-maintenance 2/1 with a reliable long-term tenant paying $1,200/month. An affordable entry point into the Houston rental market with positive cash flow from day one. Great for first-time investors building their portfolio.',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    '["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"]',
    1,
    strftime('%s', 'now') - 259200
  ),
  (
    '22222222-0000-0000-0000-000000000005',
    'dallas-3344-bonnie-view-rd',
    '3BR/1BA Fix & Flip — Dallas Fair Park',
    '3344 Bonnie View Rd',
    'Dallas', 'TX', '75216',
    13500000, 3, 1, 1180,
    'fix_and_flip', 'available',
    'Classic Dallas 3/1 with great bones and an ARV around $220k after renovations. Priced aggressively for a quick close. Must be an end buyer — no wholesaling. Proof of funds required before scheduling a walkthrough.',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
    '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"]',
    1,
    strftime('%s', 'now') - 432000
  ),
  (
    '22222222-0000-0000-0000-000000000006',
    'austin-1204-rutland-dr',
    '3BR/2BA Buy & Hold — Austin Mueller Area',
    '1204 Rutland Dr',
    'Austin', 'TX', '78758',
    32000000, 3, 2, 1650,
    'buy_and_hold', 'sold',
    'Rented at $2,400/month in the booming Mueller and Rundberg corridor. Consistent appreciation and excellent tenant quality. This one sold within days of listing — join the buyer list to see deals like this before they are gone.',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"]',
    0,
    strftime('%s', 'now') - 604800
  );
