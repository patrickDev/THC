
import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CTABand } from '@/components/sections/CTABand';
import { Stats } from '@/components/sections/Stats';
import { LeadForm } from '@/components/forms/LeadForm';
import { PARTNER_CONFIG } from '@/components/forms/fieldConfigs';
import { submitPartnerLead } from '@/app/actions/leads';
import { COMPANY } from '@/lib/utils';
import {
  Coins,
  Landmark,
  GitMerge,
  HardHat,
  Share2,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner with Us — Capital, Lending & JV Opportunities',
  description:
    'Partner with Texas Homes Capital as a private lender, capital partner, JV partner, contractor, wholesaler, or referral agent. Explore deal structures and apply.',
};

const PARTNER_TYPES = [
  {
    Icon: Coins,
    type: 'Capital Partner',
    badge: 'Equity',
    description:
      'Provide capital for acquisitions and receive a share of the equity upside on fix-and-flip or buy-and-hold projects. Typical minimum: $50K.',
    returns: 'Profit share on exit or refinance',
  },
  {
    Icon: Landmark,
    type: 'Private Lender',
    badge: 'Debt',
    description:
      'Lend against real property with a first lien position. Earn fixed monthly interest on short-term bridge loans secured by Texas real estate.',
    returns: '8–12% annualized, interest-only',
  },
  {
    Icon: GitMerge,
    type: 'JV Partner',
    badge: 'Joint Venture',
    description:
      'Bring capital, deal flow, or local expertise and partner on a deal-by-deal basis. We handle operations; you participate in the profit.',
    returns: 'Negotiated split per project',
  },
  {
    Icon: HardHat,
    type: 'Contractor / Vendor',
    badge: 'Services',
    description:
      'Trusted contractors and vendors who deliver consistent, quality work are core to our operation. We are always looking to grow our network.',
    returns: 'Ongoing project work',
  },
  {
    Icon: Share2,
    type: 'Wholesaler',
    badge: 'Deal Flow',
    description:
      'If you source off-market properties in our target markets, we want to hear from you. We close quickly and pay assignment fees promptly.',
    returns: 'Assignment fee per deal',
  },
  {
    Icon: Users,
    type: 'Referral Agent',
    badge: 'Referrals',
    description:
      'Refer sellers, buyers, or investors and earn a referral fee when a deal closes. Simple, clean, and we pay fast.',
    returns: 'Referral fee per closed deal',
  },
];

const DEAL_STRUCTURES = [
  { title: 'Fix & Flip', description: 'Short-term (4–9 months). We acquire, renovate, and sell. Capital partners share in the net profit after all costs.' },
  { title: 'Buy & Hold', description: 'Long-term (3–7+ years). We acquire and manage rental property. Partners receive preferred returns and share in appreciation on exit.' },
  { title: 'Bridge Lending', description: 'Private lenders fund acquisition and renovation with a 12-month note, secured by the property. We pay monthly interest and a balloon at payoff or refinance.' },
];

const MARKETS = COMPANY.markets.map((m) => ({ value: m, label: m }));

export default function PartnershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="flex flex-col justify-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                Partnership Opportunities
              </p>
              <h1 className="font-display text-display-xl font-bold text-text">
                Grow your capital with Texas real estate.
              </h1>
              <p className="mt-5 max-w-prose text-lg leading-prose text-muted">
                We work with private lenders, capital partners, JV investors, contractors, and wholesalers
                to execute residential real estate deals across Texas. Our track record is our pitch.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage inline-block" />
                  {COMPANY.markets[0]} · {COMPANY.markets[1]} · {COMPANY.markets[2]}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage inline-block" />
                  8+ years of operations
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage inline-block" />
                  180+ properties acquired
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-float">
                <Image
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
                  alt="Partners reviewing a real estate deal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Partner type cards */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <h2 className="font-display text-display-md font-bold text-text">
              Six ways to partner with us
            </h2>
            <p className="mt-4 text-lg text-muted">
              Whether you have capital, skills, or deal flow — there&rsquo;s a structure that works for you.
            </p>
          </Reveal>

          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TYPES.map((pt) => (
              <Card key={pt.type} hover className="flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light">
                    <pt.Icon size={22} className="text-accent" aria-hidden="true" />
                  </div>
                  <Badge variant="muted">{pt.badge}</Badge>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-text">{pt.type}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pt.description}</p>
                </div>
                <div className="mt-auto rounded-xl bg-bg-secondary px-4 py-2.5">
                  <p className="text-xs font-semibold text-muted">Typical Return</p>
                  <p className="text-sm font-bold text-text">{pt.returns}</p>
                </div>
              </Card>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Deal structures */}
      <section className="bg-bg py-16 md:py-24">
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="font-display text-display-md font-bold text-text">Deal structures</h2>
            <p className="mt-4 text-lg text-muted">
              High-level overview of how we structure different types of partnerships.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {DEAL_STRUCTURES.map((ds, i) => (
              <Reveal key={ds.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-border bg-bg-card p-6 shadow-card">
                  <h3 className="font-display text-xl font-bold text-text">{ds.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{ds.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <p className="text-sm text-muted">
              * All deal terms are negotiated on a project-by-project basis. Past returns are not a guarantee of future performance. This is not an offer to sell securities.
            </p>
          </Reveal>
        </Container>
      </section>

      <Stats />

      {/* Application form */}
      <section className="bg-bg py-16 md:py-24" id="apply">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal className="mb-10 text-center">
              <h2 className="font-display text-display-md font-bold text-text">
                Apply to partner with us
              </h2>
              <p className="mt-4 text-lg text-muted">
                Tell us about yourself and what kind of partnership you&rsquo;re looking for. We review every application and follow up within one business day.
              </p>
            </Reveal>

            <LeadForm
              action={submitPartnerLead}
              leadType="partner"
              title={PARTNER_CONFIG.title}
              subtitle={PARTNER_CONFIG.subtitle}
              submitLabel={PARTNER_CONFIG.submitLabel}
              extraFields={PARTNER_CONFIG.extraFields as Parameters<typeof LeadForm>[0]['extraFields']}
              markets={MARKETS}
              successHeading="Application received!"
              successBody="We'll review your details and reach out within one business day to discuss how we might work together."
            />
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Have properties to sell?"
        heading="We buy too."
        subhead="If you're a wholesaler or agent with off-market deals in our target markets, we close fast."
        primaryCta={{ label: 'Submit a Property', href: '/sellers' }}
        secondaryCta={{ label: 'Browse Our Inventory', href: '/buyers' }}
      />
    </>
  );
}
