import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';

interface CTABandProps {
  eyebrow?: string;
  heading: string;
  subhead?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  dark?: boolean;
}

export function CTABand({
  eyebrow,
  heading,
  subhead,
  primaryCta,
  secondaryCta,
  dark = true,
}: CTABandProps) {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background: dark
          ? 'linear-gradient(135deg, #C0603C 0%, #9E4828 100%)'
          : undefined,
        backgroundColor: dark ? undefined : 'var(--color-bg-secondary)',
      }}
    >
      {/* Subtle pattern */}
      {dark && (
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
      )}

      <Container className="relative z-10 text-center">
        <Reveal>
          {eyebrow && (
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-widest"
              style={{ color: dark ? 'rgba(255,255,255,0.75)' : 'var(--color-accent)' }}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className="font-display text-display-md font-bold"
            style={{ color: dark ? '#fff' : 'var(--color-text)' }}
          >
            {heading}
          </h2>
          {subhead && (
            <p
              className="mx-auto mt-4 max-w-prose text-lg"
              style={{ color: dark ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)' }}
            >
              {subhead}
            </p>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-8 text-base font-semibold transition-colors sm:w-auto"
              style={{
                backgroundColor: dark ? '#fff' : 'var(--color-accent)',
                color: dark ? 'var(--color-accent)' : '#fff',
              }}
            >
              {primaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border px-8 text-base font-semibold transition-colors sm:w-auto"
                style={{
                  borderColor: dark ? 'rgba(255,255,255,0.4)' : 'var(--color-border)',
                  color: dark ? '#fff' : 'var(--color-text)',
                }}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
