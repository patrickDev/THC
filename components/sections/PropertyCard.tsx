import Link from 'next/link';
import { Bed, Bath, Maximize2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCents, formatSqft, STRATEGY_LABELS, STATUS_LABELS } from '@/lib/format';
import type { Property } from '@/db/schema';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property: p }: PropertyCardProps) {
  const statusVariant =
    p.status === 'available' ? 'sage' : p.status === 'under_contract' ? 'warning' : 'muted';

  return (
    <Card as="article" hover className="overflow-hidden">
      {/* Body */}
      <div className="p-5">
        <div className="mb-3 flex gap-1.5">
          <Badge variant={p.strategy === 'fix_and_flip' ? 'accent' : 'sage'}>
            {STRATEGY_LABELS[p.strategy]}
          </Badge>
          <Badge variant={statusVariant}>{STATUS_LABELS[p.status]}</Badge>
        </div>

        <p className="font-display text-2xl font-bold text-accent">
          {formatCents(p.priceCents)}
        </p>

        <Link href={`/buyers/${p.slug}`} className="group mt-1 block">
          <h3 className="font-semibold text-text transition-colors group-hover:text-accent">
            {p.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted">
            {p.address}, {p.city}, {p.state} {p.zip}
          </p>
        </Link>

        <dl className="mt-4 flex gap-4 text-sm text-muted">
          <div className="flex items-center gap-1">
            <Bed size={14} aria-hidden="true" />
            <dd>
              <span className="sr-only">Bedrooms: </span>
              {p.beds} bd
            </dd>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} aria-hidden="true" />
            <dd>
              <span className="sr-only">Bathrooms: </span>
              {p.baths} ba
            </dd>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 size={14} aria-hidden="true" />
            <dd>
              <span className="sr-only">Square feet: </span>
              {formatSqft(p.sqft)}
            </dd>
          </div>
        </dl>

        <Link
          href={`/buyers/${p.slug}`}
          className="mt-4 block rounded-xl border border-border py-2.5 text-center text-sm font-semibold text-text transition-colors hover:bg-accent hover:border-accent hover:text-accent-fg"
        >
          View Property
        </Link>
      </div>
    </Card>
  );
}
