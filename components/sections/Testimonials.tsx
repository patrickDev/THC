'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import type { Testimonial } from '@/db/schema';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          aria-hidden="true"
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}
        />
      ))}
    </div>
  );
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#100c0a] py-20 md:py-28">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      {/* Brand glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 opacity-20"
        style={{ background: 'radial-gradient(ellipse, #C0603C 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#d4714a]">
            What People Say
          </p>
          <h2 className="font-display text-display-md font-bold text-white">
            Real results, real homeowners
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-lg text-white/55">
            We&rsquo;ve helped hundreds of Texas families sell quickly, invest wisely, and build partnerships that last.
          </p>
        </Reveal>

        <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] p-7"
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(255,255,255,0.07)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Decorative quote mark */}
              <span
                className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[8rem] font-bold leading-none text-white/[0.04]"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <StarRating rating={t.rating} />

              <blockquote className="relative flex-1 text-base leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C0603C]/20 text-sm font-bold text-[#d4714a]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/45">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
