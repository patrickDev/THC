import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle2, Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { CountUp } from '@/components/motion/CountUp';
import { COMPANY } from '@/lib/utils';

const HERO_STATS = [
  { num: 180, prefix: '',  suffix: '+',    label: 'Homes Acquired' },
  { num: 42,  prefix: '$', suffix: 'M+',   label: 'In Transactions' },
  { num: 9,   prefix: '',  suffix: ' days', label: 'Avg. Close Time' },
  { num: 100, prefix: '',  suffix: '+',    label: 'Satisfied Sellers' },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col overflow-hidden">
      {/* ── Full-bleed building background ── */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
          alt="Modern tall building in Texas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Base dark layer — ensures minimum contrast everywhere */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Directional gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        {/* Brand warm tint */}
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: 'radial-gradient(ellipse at 75% 25%, #C0603C 0%, transparent 55%)' }}
          aria-hidden="true"
        />
      </div>

      {/* ── Main content ── */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center py-16 lg:py-28">
        <div className="max-w-2xl">

          {/* Live badge */}
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4714a] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4714a]" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-white">
                Serving all of Texas &mdash; Houston · Dallas · San Antonio
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.05}>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Sell your home{' '}
              <span className="relative inline-block text-[#e07e58]">
                fast
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 100 8"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6 Q25 1 50 5 Q75 8 98 3"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.65"
                  />
                </svg>
              </span>
              <br />
              for a fair cash offer.
            </h1>
          </Reveal>

          {/* Sub-copy */}
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/95">
              No repairs. No agent fees. No games. We buy Texas homes as-is and close
              on{' '}
              <strong className="font-bold text-white">your schedule</strong>
              {' '}— in as little as 7 days.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-offer"
                className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-[#c0603c] px-8 text-base font-semibold text-white shadow-2xl shadow-black/40 transition-all hover:-translate-y-0.5 hover:bg-[#a84e2e]"
              >
                Get My Free Cash Offer
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.replace(/\D/g, '')}`}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Phone size={16} aria-hidden="true" />
                {COMPANY.phone}
              </a>
            </div>
          </Reveal>

          {/* Trust checklist */}
          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {['No repairs required', 'Zero fees or commissions', 'Close in as few as 7 days'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 size={15} className="shrink-0 text-[#8fa080]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Social proof */}
          <Reveal delay={0.25}>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-orange-400', 'bg-amber-500', 'bg-red-400', 'bg-orange-600'].map((c, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full border-2 border-black/30 ${c}`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-white/90">100+ Texas families served</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* ── Stats strip anchored to bottom ── */}
      <div className="relative z-10 border-t border-white/10 bg-black/55 backdrop-blur-md">
        <Container>
          <dl className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {HERO_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={0.3 + i * 0.08}>
                <div className="flex flex-col items-center px-4 py-5 text-center">
                  <dd className="font-display text-2xl font-bold text-white md:text-3xl">
                    <CountUp to={stat.num} prefix={stat.prefix} suffix={stat.suffix} duration={1.8} />
                  </dd>
                  <dt className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                    {stat.label}
                  </dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
