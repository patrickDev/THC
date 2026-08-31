import { Container } from '@/components/layout/Container';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';

const STATS = [
  { label: 'Properties Acquired', value: 180, suffix: '+' },
  { label: 'Markets Active', value: 4, suffix: '' },
  { label: 'Million in Transactions', value: 42, prefix: '$', suffix: 'M+' },
  { label: 'Years in Texas RE', value: 8, suffix: '+' },
];

export function Stats() {
  return (
    <section className="bg-text py-16 md:py-20">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="order-2 mt-2 text-sm font-medium text-muted" style={{ color: 'rgba(245,237,228,0.6)' }}>
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-5xl font-bold" style={{ color: '#F5EDE4' }}>
                  <CountUp
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
