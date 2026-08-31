import { Check, X } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';

interface ComparisonRow {
  feature: string;
  us: boolean | string;
  traditional: boolean | string;
}

const ROWS: ComparisonRow[] = [
  { feature: 'Repairs required', us: false, traditional: true },
  { feature: 'Agent commission (5–6%)', us: false, traditional: true },
  { feature: 'Closing costs', us: false, traditional: true },
  { feature: 'Showings & open houses', us: false, traditional: true },
  { feature: 'Closing timeline', us: '7–21 days', traditional: '30–90 days' },
  { feature: 'Certainty of closing', us: true, traditional: false },
  { feature: 'Cash offer', us: true, traditional: false },
  { feature: 'As-is purchase', us: true, traditional: false },
  { feature: 'Choose your closing date', us: true, traditional: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="font-medium text-text">{value}</span>;
  }
  return value ? (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sage-light">
      <Check size={14} className="text-sage" aria-label="Yes" />
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-50">
      <X size={14} className="text-red-400" aria-label="No" />
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section className="py-16 md:py-24 bg-bg">
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Why choose us
          </p>
          <h2 className="font-display text-display-md font-bold text-text">
            Our offer vs. the traditional route
          </h2>
          <p className="mt-4 text-lg text-muted">
            Selling the traditional way can take months and cost thousands. Here&rsquo;s how we compare.
          </p>
        </Reveal>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse rounded-2xl bg-bg-card shadow-card overflow-hidden">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted w-1/2">
                  Feature
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-accent w-1/4">
                  Texas Homes Capital
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted w-1/4">
                  Traditional Listing
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-none hover:bg-bg-secondary/50">
                  <td className="px-6 py-4 text-sm text-text">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    <Cell value={row.us} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Cell value={row.traditional} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="space-y-3 md:hidden">
          {ROWS.map((row, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-bg-card p-4 shadow-soft"
            >
              <p className="mb-3 text-sm font-semibold text-text">{row.feature}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-accent-light p-3 text-center">
                  <p className="mb-1 text-xs font-medium text-accent">Us</p>
                  <Cell value={row.us} />
                </div>
                <div className="rounded-xl bg-bg-secondary p-3 text-center">
                  <p className="mb-1 text-xs font-medium text-muted">Traditional</p>
                  <Cell value={row.traditional} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
