import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';

const STATS = [
  { label: 'Properties Acquired', value: 180, suffix: '+' },
  { label: 'Markets Active', value: 4, suffix: '' },
  { label: 'Million in Transactions', value: 42, prefix: '$', suffix: 'M+' },
  { label: 'Years in Texas RE', value: 8, suffix: '+' },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* City-at-night background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0907]/97 via-[#1c1210]/92 to-[#1c1210]/88" />
        {/* Subtle brand tint */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, #C0603C 0%, transparent 60%)' }}
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#d4714a]">
            By the Numbers
          </p>
          <h2 className="font-display text-display-md font-bold text-white">
            A track record built on results
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
            Over 8 years of buying and closing Texas homes — with integrity and speed.
          </p>
        </Reveal>

        {/* Stats grid */}
        <StaggerGroup
          staggerMs={120}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 md:grid-cols-4"
        >
          {STATS.map((stat) => (
            <dl
              key={stat.label}
              className="group flex flex-col items-center bg-white/[0.04] px-6 py-12 text-center transition-colors hover:bg-white/[0.08]"
            >
              <dd className="font-display text-5xl font-bold text-white md:text-6xl">
                <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.2} />
              </dd>
              <dt className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                {stat.label}
              </dt>
            </dl>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
