import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDb } from '@/db/index';
import { properties } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Container } from '@/components/layout/Container';
import { Gallery } from '@/components/sections/Gallery';
import { Badge } from '@/components/ui/Badge';
import { LeadForm } from '@/components/forms/LeadForm';
import { BUYER_CONFIG } from '@/components/forms/fieldConfigs';
import { submitBuyerLead } from '@/app/actions/leads';
import { formatCents, formatSqft, STRATEGY_LABELS, STATUS_LABELS } from '@/lib/format';
import { COMPANY } from '@/lib/utils';
import { Bed, Bath, Maximize2, MapPin, Tag } from 'lucide-react';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [property] = await (await getDb()).select().from(properties).where(eq(properties.slug, slug)).limit(1);
  if (!property) return { title: 'Property Not Found' };

  return {
    title: `${property.title} — ${property.city}, ${property.state}`,
    description: `${property.beds} bed / ${property.baths} bath investment property at ${formatCents(property.priceCents)} in ${property.city}, TX. ${property.description.slice(0, 100)}...`,
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 150),
      images: [{ url: property.heroImageUrl, alt: property.title }],
    },
  };
}

export const dynamic = 'force-dynamic';

const MARKETS = COMPANY.markets.map((m) => ({ value: m, label: m }));

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const [property] = await (await getDb()).select().from(properties).where(eq(properties.slug, slug)).limit(1);

  if (!property) notFound();

  const allImages = [property.heroImageUrl, ...property.images].filter(Boolean);
  const statusVariant =
    property.status === 'available' ? 'sage' : property.status === 'under_contract' ? 'warning' : 'muted';

  const specs = [
    { label: 'Bedrooms', value: `${property.beds} bd`, Icon: Bed },
    { label: 'Bathrooms', value: `${property.baths} ba`, Icon: Bath },
    { label: 'Square Feet', value: formatSqft(property.sqft), Icon: Maximize2 },
    { label: 'Strategy', value: STRATEGY_LABELS[property.strategy], Icon: Tag },
  ];

  return (
    <>
      <section className="bg-bg py-10 md:py-14">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted">
            <Link href="/buyers" className="hover:text-accent">Properties</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text">{property.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
            {/* Left: gallery + details */}
            <div>
              <Gallery images={allImages} alt={property.title} />

              <div className="mt-8">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="font-display text-3xl font-bold text-text md:text-4xl">
                      {property.title}
                    </h1>
                    <p className="mt-1 flex items-center gap-1.5 text-base text-muted">
                      <MapPin size={14} aria-hidden="true" />
                      {property.address}, {property.city}, {property.state} {property.zip}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={property.strategy === 'fix_and_flip' ? 'accent' : 'sage'}>
                      {STRATEGY_LABELS[property.strategy]}
                    </Badge>
                    <Badge variant={statusVariant}>{STATUS_LABELS[property.status]}</Badge>
                  </div>
                </div>

                <p className="mt-3 font-display text-4xl font-bold text-accent md:text-5xl">
                  {formatCents(property.priceCents)}
                </p>

                {/* Specs */}
                <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-bg-card p-4 md:grid-cols-4">
                  {specs.map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                      <s.Icon size={20} className="text-accent" aria-hidden="true" />
                      <dd className="font-semibold text-text">{s.value}</dd>
                      <dt className="text-xs text-muted">{s.label}</dt>
                    </div>
                  ))}
                </dl>

                {/* Description */}
                <div className="mt-8">
                  <h2 className="font-display text-xl font-bold text-text">About this property</h2>
                  <p className="mt-3 text-base leading-prose text-muted">{property.description}</p>
                </div>
              </div>
            </div>

            {/* Right: inquiry form */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <LeadForm
                action={submitBuyerLead}
                leadType="buyer"
                title="Interested in this property?"
                subtitle="Tell us a bit about yourself and we'll be in touch quickly."
                submitLabel="Request Info"
                extraFields={BUYER_CONFIG.extraFields as Parameters<typeof LeadForm>[0]['extraFields']}
                markets={MARKETS}
                successHeading="Got it!"
                successBody="We'll reach out within one business day with more details on this property."
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
