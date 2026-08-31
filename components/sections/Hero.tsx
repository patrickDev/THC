import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Home, Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Warm blob — top right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px]"
        style={{
          background: 'radial-gradient(circle, rgba(192,96,60,0.18) 0%, transparent 65%)',
          filter: 'blur(72px)',
        }}
        aria-hidden="true"
      />

      {/* Sage blob — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-20 left-1/3 h-[400px] w-[400px]"
        style={{
          background: 'radial-gradient(circle, rgba(114,150,96,0.12) 0%, transparent 65%)',
          filter: 'blur(64px)',
        }}
        aria-hidden="true"
      />

      <Container className="relative py-16 lg:flex lg:min-h-[calc(100vh-128px)] lg:items-center lg:py-0">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Text column ── */}
          <div className="order-2 lg:order-1">
            {/* Animated badge */}
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light px-4 py-1.5 text-xs font-semibold text-accent">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Real estate for Texans, by Texans &mdash; serving all of Texas
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.05}>
              <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-text sm:text-6xl xl:text-7xl">
                We buy Texas<br className="hidden sm:block" /> homes{' '}
                <span className="relative inline-block text-accent">
                  fast
                  {/* Hand-drawn underline */}
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full"
                    viewBox="0 0 100 8"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 5.5 Q25 1 50 4.5 Q75 8 98 3.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="opacity-50"
                    />
                  </svg>
                </span>
                ,<br /> fair &amp; hassle&#8209;free.
              </h1>
            </Reveal>

            {/* Sub-copy */}
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
                Whether you need to sell quickly, invest in rental property, or partner on a
                deal — Texas Homes Capital is straightforward to work with. No pressure. No games.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#get-offer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-8 text-base font-semibold text-accent-fg shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-accent/35"
                >
                  Get a Cash Offer
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  href="/buyers"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-8 text-base font-semibold text-text transition-all hover:border-accent/30 hover:bg-bg-secondary"
                >
                  Browse Investments
                </Link>
              </div>
            </Reveal>

            {/* Trust pills */}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {['No repairs required', 'Close in 7 days', 'All of Texas'].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-card px-3 py-1 text-xs font-medium text-muted"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Image column ── */}
          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <div className="relative">
              {/* Decorative rings */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-56 w-56 rounded-full border border-accent/10" aria-hidden="true" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-80 w-80 rounded-full border border-accent/5" aria-hidden="true" />

              {/* Main image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl lg:aspect-[4/3] lg:max-h-[480px]">
                <Image
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=85"
                  alt="A classic residential family home in Texas"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Depth gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Bottom badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-bg/90 px-4 py-3 shadow-card backdrop-blur-md">
                  <div>
                    <p className="text-xs font-medium text-muted">Closed last month</p>
                    <p className="text-base font-bold text-text">$285,000 &middot; Houston, TX</p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent">
                    <Home size={16} className="text-accent-fg" />
                  </div>
                </div>
              </div>

              {/* Floating avg. close card */}
              <div className="absolute -left-5 top-1/3 hidden rounded-2xl border border-border bg-bg-card px-4 py-3 shadow-float backdrop-blur-md lg:block">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage/15">
                    <TrendingUp size={15} className="text-sage" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted">Avg. close time</p>
                    <p className="text-sm font-bold text-text">9 days</p>
                  </div>
                </div>
              </div>

              {/* Floating rating card */}
              <div className="absolute -right-4 top-6 hidden rounded-2xl border border-border bg-bg-card px-4 py-3 shadow-float backdrop-blur-md lg:block">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-1 text-xs font-medium text-muted">100+ satisfied sellers</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
