import type { Metadata } from 'next';
import { db } from '@/db/index';
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
      <section className="bg-bg-secondary py-14 md:py-20" id="get-offer">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left: copy */}
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                Free &amp; No Obligation
              </p>
              <h2 className="font-display text-display-md font-bold text-text">
                Get your fair cash offer today.
              </h2>
              <p className="mt-4 text-lg leading-prose text-muted">
                Fill out the form and we&rsquo;ll get back to you within one business day
                with a no-pressure cash offer — no repairs, no commissions, no games.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Sell your home as-is — no repairs needed',
                  'No agent commissions or hidden fees',
                  'Close in as few as 7 days',
                  'Cash in hand on your timeline',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <span className="mt-0.5 shrink-0 text-sage">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-bg-card p-6 shadow-card md:p-8">
                <h3 className="mb-1 font-display text-xl font-bold text-text">
                  Request your cash offer
                </h3>
                <p className="mb-6 text-sm text-muted">
                  Takes less than 2 minutes. We respond within one business day.
                </p>
                <HomeOfferForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="py-16 md:py-24 bg-bg">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Our Strategies
            </p>
            <h2 className="font-display text-display-md font-bold text-text">
              Two ways we invest in Texas real estate
            </h2>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {WHAT_WE_DO.map((item, i) => (
              <Reveal key={item.strategy} delay={i * 0.06}>
                <div className={`flex flex-col gap-6 rounded-3xl border border-border bg-bg-card p-6 shadow-card lg:flex-row ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-square lg:w-48 lg:shrink-0">
                    <Image src={item.img} alt={item.imgAlt} fill sizes="(max-width: 1024px) 100vw, 192px" className="object-cover" />
                  </div>
                  <div>
                    <span className="inline-block rounded-full bg-accent-light px-3 py-1 text-xs font-bold text-accent">
                      {item.strategy}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold text-text">{item.headline}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Steps
        eyebrow="How It Works"
        heading="Sell your home in 4 simple steps"
        subhead="We've simplified the process so you can focus on what's next — not the paperwork."
        steps={HOW_IT_WORKS_STEPS}
      />

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
      <section className="bg-bg-secondary py-10">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-semibold text-text">Questions? Call us directly.</p>
              <p className="text-xs text-muted">We answer Mon–Sat, 8 AM – 6 PM CT</p>
            </div>
            <a
              href={`tel:${COMPANY.phone.replace(/\D/g, '')}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-accent px-6 font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              <Phone size={16} aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
