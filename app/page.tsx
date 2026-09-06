import type { Metadata } from 'next';
import { getDb } from '@/db/index';
import { properties, testimonials } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Hero } from '@/components/sections/Hero';
import { Steps } from '@/components/sections/Steps';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTABand } from '@/components/sections/CTABand';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { HomeOfferForm } from '@/components/sections/HomeOfferForm';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { COMPANY } from '@/lib/utils';
import Image from 'next/image';
import {
  ClipboardCheck,
  Home,
  TrendingUp,
  Handshake,
  Phone,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Texas Real Estate Investment — Buy, Sell & Partner',
  description:
    'Texas Homes Capital buys homes fast for cash and acquires rental properties across Houston, Dallas, and San Antonio. No repairs, no commissions, no pressure.',
  openGraph: {
    title: `${COMPANY.name} — Texas Real Estate Investment`,
    description: 'Sell your Texas home fast for cash or invest with us.',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: COMPANY.name,
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://texashomescapital.com',
      telephone: COMPANY.phone,
      email: COMPANY.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
      areaServed: COMPANY.markets.map((m) => ({ '@type': 'City', name: m })),
      description: COMPANY.tagline,
    }),
  },
};

const HOW_IT_WORKS_STEPS = [
  { number: '01', title: 'Tell us about your home', description: 'Fill out our quick form with basic details. No commitment required.', Icon: ClipboardCheck },
  { number: '02', title: 'Receive a fair cash offer', description: "We'll review your property and present a no-obligation offer within 24 hours.", Icon: Home },
  { number: '03', title: 'Pick your closing date', description: 'Choose a date that works for you — we can close in as few as 7 days.', Icon: TrendingUp },
  { number: '04', title: 'Close and get paid', description: 'We handle all the paperwork. You walk away with cash in hand, stress-free.', Icon: Handshake },
];

const WHAT_WE_DO = [
  {
    strategy: 'Fix & Flip',
    headline: 'Buy distressed homes. Renovate. Resell.',
    body: 'We identify off-market and undervalued properties, complete renovations to a high standard, and sell to qualified buyers — improving neighborhoods in the process.',
    img: 'https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=600&q=80',
    imgAlt: 'A renovated kitchen in a Texas home',
  },
  {
    strategy: 'Buy & Hold',
    headline: 'Acquire rentals for long-term cash flow.',
    body: 'We build a portfolio of single-family rental homes across Texas, generating consistent monthly income and equity appreciation for our investor partners.',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    imgAlt: 'A well-maintained rental home exterior',
  },
];

export default async function HomePage() {
  const db = await getDb();
  const [featuredProperties, featuredTestimonials] = await Promise.all([
    db
      .select()
      .from(properties)
      .where(eq(properties.featured, true))
      .orderBy(desc(properties.createdAt))
      .limit(6),
    db
      .select()
      .from(testimonials)
      .where(eq(testimonials.featured, true))
      .limit(6),
  ]);

  return (
    <>
      <Hero />

      {/* Get My Fair Offer form */}
      <section className="relative overflow-hidden bg-bg py-16 md:py-24" id="get-offer">
        {/* Subtle diagonal stripe accent */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            {/* Left: copy */}
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                Free &amp; No Obligation
              </p>
              <h2 className="font-display text-display-md font-bold text-text">
                Get your fair cash offer today.
              </h2>
              <p className="mt-5 text-lg leading-prose text-muted">
                Fill out the form and we&rsquo;ll get back to you within one business day
                with a no-pressure cash offer — no repairs, no commissions, no games.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Sell your home as-is — no repairs needed',
                  'No agent commissions or hidden fees',
                  'Close in as few as 7 days',
                  'Cash in hand on your timeline',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Trust indicator */}
              <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border bg-bg-card px-5 py-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">Prefer to call?</p>
                  <p className="font-display text-xl font-bold text-text">{COMPANY.phone}</p>
                  <p className="text-xs text-muted">Mon–Sat, 8 AM – 6 PM CT</p>
                </div>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.06}>
              <div className="rounded-3xl border border-border bg-bg-card p-7 shadow-2xl md:p-10">
                <h3 className="mb-1 font-display text-2xl font-bold text-text">
                  Request your cash offer
                </h3>
                <p className="mb-7 text-sm text-muted">
                  Takes less than 2 minutes. We respond within one business day.
                </p>
                <HomeOfferForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="py-16 md:py-24 bg-bg-secondary">
        <Container>
          <Reveal className="mb-14 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Our Strategies
            </p>
            <h2 className="font-display text-display-md font-bold text-text">
              Two ways we invest in Texas real estate
            </h2>
          </Reveal>

          <StaggerGroup staggerMs={120} className="grid gap-6 lg:grid-cols-2">
            {WHAT_WE_DO.map((item) => (
              <div key={item.strategy} className="group relative overflow-hidden rounded-3xl border border-border bg-bg-card shadow-card transition-shadow hover:shadow-xl">
                  {/* Full-width image at top */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image src={item.img} alt={item.imgAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-card" />
                  </div>
                  {/* Content */}
                  <div className="p-7">
                    <span className="inline-block rounded-full bg-accent-light px-3 py-1 text-xs font-bold text-accent">
                      {item.strategy}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-text">{item.headline}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
              </div>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <Steps
        eyebrow="How It Works"
        heading="Sell your home in 4 simple steps"
        subhead="We've simplified the process so you can focus on what's next — not the paperwork."
        steps={HOW_IT_WORKS_STEPS}
      />

      {/* Comparison: Traditional vs Us */}
      <section className="py-16 md:py-24 bg-bg">
        <Container>
          <Reveal className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Why Choose Us
            </p>
            <h2 className="font-display text-display-md font-bold text-text">
              The smarter way to sell your home
            </h2>
            <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
              See how selling to {COMPANY.name} stacks up against the traditional process.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-0 max-w-4xl mx-auto overflow-hidden rounded-3xl border border-border shadow-2xl">
            {/* Traditional */}
            <Reveal className="h-full">
              <div className="flex h-full flex-col bg-bg-card p-8 md:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 text-red-500 font-bold text-lg">✕</div>
                  <span className="font-display text-lg font-bold text-text">Traditional Process</span>
                </div>
                <ul className="flex-1 space-y-5">
                  {[
                    'Pay 6% Plus Other Fees',
                    'Unpredictable Offers',
                    'Cleanup and Repair Stress',
                    'Showings and Open Houses',
                    'Long Sales Process, Often 2–3+ Months',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-0.5 shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 text-xs font-bold">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Us */}
            <Reveal delay={0.06} className="h-full">
              <div className="relative flex h-full flex-col bg-accent p-8 md:p-10">
                {/* Subtle dot texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08] rounded-r-3xl"
                  style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  aria-hidden="true"
                />
                <div className="relative mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white font-bold text-lg">✓</div>
                  <span className="font-display text-lg font-bold text-white">{COMPANY.name}</span>
                </div>
                <ul className="relative flex-1 space-y-5">
                  {[
                    'Zero Fees to Sell Your House',
                    'Highest Off-Market Price',
                    'Sell As-Is. No Cleanup. No Repairs.',
                    'Close In As Little As 7 Days',
                    'No Closing Costs',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium text-white">
                      <span className="mt-0.5 shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-white/20 text-white text-xs font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Recent projects */}
      {featuredProperties.length > 0 && (
        <section className="py-16 md:py-24 bg-bg">
          <Container>
            <Reveal className="mb-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                Portfolio
              </p>
              <h2 className="font-display text-display-md font-bold text-text">
                Recent projects
              </h2>
            </Reveal>
            <PropertyGrid properties={featuredProperties} />
          </Container>
        </section>
      )}

      <Stats />

      <Testimonials testimonials={featuredTestimonials} />

      <CTABand
        eyebrow="Ready to talk?"
        heading="Let's make a deal that works for you."
        subhead="Whether you're selling, investing, or partnering — we're easy to reach and fast to respond."
        primaryCta={{ label: 'Get a Cash Offer', href: '/sellers' }}
        secondaryCta={{ label: 'Explore Investments', href: '/buyers' }}
      />

      {/* Contact band */}
      <section className="bg-bg py-10 border-t border-border">
        <Container>
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-bg-secondary px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light">
                <Phone size={16} className="text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">Questions? Call us directly.</p>
                <p className="text-xs text-muted">Mon–Sat, 8 AM – 6 PM CT</p>
              </div>
            </div>
            <a
              href={`tel:${COMPANY.phone.replace(/\D/g, '')}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-accent px-6 font-semibold text-white shadow-md shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              {COMPANY.phone}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
