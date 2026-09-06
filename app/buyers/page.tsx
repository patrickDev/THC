import type { Metadata } from 'next';
import { getDb } from '@/db/index';
import { properties } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { LeadForm } from '@/components/forms/LeadForm';
import { BUYER_CONFIG } from '@/components/forms/fieldConfigs';
import { submitBuyerLead } from '@/app/actions/leads';
import { COMPANY } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Investment Properties for Sale',
  description:
    'Browse off-market and investment properties across Houston, Dallas, and San Antonio. Fix-and-flip and buy-and-hold opportunities — get on the buyer list.',
};

const BUYER_FAQS = [
  { question: 'What types of properties do you sell?', answer: 'We sell single-family residential homes in the Houston, Dallas, and San Antonio areas. Properties are available in two categories: fix-and-flip (distressed, priced for renovators) and buy-and-hold (rent-ready, cash-flow positive).' },
  { question: 'Do properties go to buyers on your list first?', answer: 'Yes. Buyers who are on our list receive deal alerts before anything is marketed publicly. The best deals move fast, so list membership is a real advantage.' },
  { question: 'What financing do you accept?', answer: 'We work with cash buyers, hard-money lenders, conventional financing, and seller financing in some cases. We do not accept FHA or VA loans for fix-and-flip properties. Contact us to discuss your situation.' },
  { question: 'Are the prices negotiable?', answer: 'Our listed prices are competitive and reflect market value. We price to move quickly, so there is limited room for negotiation — but reach out and we are always happy to have a conversation.' },
  { question: 'Can I do due diligence / inspection?', answer: 'Absolutely. We encourage buyers to conduct all standard due diligence. We provide full disclosure of known issues and are transparent throughout the process.' },
];

const MARKETS = COMPANY.markets.map((m) => ({ value: m, label: m }));

export default async function BuyersPage() {
  const allProperties = await (await getDb())
    .select()
    .from(properties)
    .orderBy(desc(properties.createdAt));

  return (
    <>
      {/* Hero */}
      <section className="bg-bg py-14 md:py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Investment Properties
            </p>
            <h1 className="font-display text-display-xl font-bold text-text">
              Texas homes priced to perform.
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-prose text-muted">
              We sell off-market and investment-grade single-family homes across Houston, Dallas, and
              San Antonio. Browse available properties or get on our buyer list to see deals first.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Property listings */}
      {allProperties.length > 0 && (
        <section className="bg-bg-secondary py-16 md:py-24">
          <Container>
            <Reveal className="mb-10">
              <h2 className="font-display text-display-md font-bold text-text">
                Available properties
              </h2>
              <p className="mt-3 text-lg text-muted">
                {allProperties.length} propert{allProperties.length === 1 ? 'y' : 'ies'} across our Texas markets.
              </p>
            </Reveal>
            <PropertyGrid properties={allProperties} />
          </Container>
        </section>
      )}

      {/* Process explainer */}
      <section className="bg-bg py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="font-display text-display-md font-bold text-text">
                How buying from us works
              </h2>
              <p className="mt-4 text-base leading-prose text-muted">
                We make the buying process as streamlined as possible so you can move quickly on the
                right deal.
              </p>
              <ol className="mt-8 space-y-6">
                {[
                  { n: '1', t: 'Join the buyer list', d: 'Tell us your criteria — budget, strategy, market, and financing. We match deals to buyers.' },
                  { n: '2', t: 'Receive deal alerts', d: 'When a property fits your criteria, you hear first. Off-market deals move fast.' },
                  { n: '3', t: 'Tour and inspect', d: 'We encourage due diligence. Walk through, inspect, and ask us everything.' },
                  { n: '4', t: 'Close cleanly', d: 'We handle our side of the transaction efficiently. Close on your timeline.' },
                ].map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-sm font-bold text-accent">
                      {step.n}
                    </span>
                    <div>
                      <p className="font-semibold text-text">{step.t}</p>
                      <p className="mt-0.5 text-sm text-muted">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Buyer form */}
            <LeadForm
              action={submitBuyerLead}
              leadType="buyer"
              title={BUYER_CONFIG.title}
              subtitle={BUYER_CONFIG.subtitle}
              submitLabel={BUYER_CONFIG.submitLabel}
              extraFields={BUYER_CONFIG.extraFields as Parameters<typeof LeadForm>[0]['extraFields']}
              markets={MARKETS}
              successHeading="You're on the list!"
              successBody="We'll reach out when properties matching your criteria become available. Keep an eye on your inbox."
            />
          </div>
        </Container>
      </section>

      <FAQ
        eyebrow="Buyer FAQ"
        heading="Your questions, answered"
        items={BUYER_FAQS}
      />

      <CTABand
        eyebrow="Have a deal to sell?"
        heading="We also buy properties."
        subhead="If you have a distressed or off-market property you'd like to sell, we'd love to hear from you."
        primaryCta={{ label: 'Get a Cash Offer', href: '/sellers' }}
        secondaryCta={{ label: 'Partner with us', href: '/partnership' }}
      />
    </>
  );
}
