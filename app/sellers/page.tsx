import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { Steps } from '@/components/sections/Steps';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { FAQ } from '@/components/sections/FAQ';
import { LeadForm } from '@/components/forms/LeadForm';
import { SELLER_CONFIG } from '@/components/forms/fieldConfigs';
import { submitSellerLead } from '@/app/actions/leads';
import { COMPANY } from '@/lib/utils';
import { ShieldCheck, Clock, DollarSign, Heart, Home, Zap, Users, Truck, Sunset, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sell Your Texas Home Fast for Cash',
  description:
    'Real estate for Texans by Texans. Texas Homes Capital buys homes across all of Texas — as-is, no repairs, no agent fees. Get a fair cash offer within 24 hours.',
};

const STEPS = [
  { number: '01', title: 'Tell us about your home', description: 'Share a few quick details. Takes less than 2 minutes and there is absolutely no pressure.', Icon: Heart },
  { number: '02', title: 'Receive your cash offer', description: "We'll review your information and send a fair, no-obligation offer within one business day.", Icon: DollarSign },
  { number: '03', title: 'Choose your closing date', description: 'You pick the timeline. We can close in 7 days or give you time to make your next move.', Icon: Clock },
];

const SELLER_FAQS = [
  { question: 'Do I need to make repairs before selling?', answer: 'Absolutely not. We buy homes in any condition — from move-in ready to significant repairs needed. The price we offer accounts for the property\'s current condition, so you never have to spend a dollar fixing anything.' },
  { question: 'How is your offer calculated?', answer: 'We look at the property\'s location, current condition, comparable sales in the area, and our estimated renovation costs. We aim to make fair offers that reflect the true market opportunity, not predatory lowball numbers.' },
  { question: 'Are there any fees or commissions?', answer: 'None whatsoever. We cover all typical closing costs, and there are no agent commissions because we purchase directly. The offer we present is what you receive.' },
  { question: 'How quickly can you close?', answer: 'We can close in as few as 7 days if needed, or we can work on a timeline that suits you — even if you need 60 days. You set the pace.' },
  { question: 'What if I\'m behind on payments or in foreclosure?', answer: 'We work with homeowners in all kinds of situations, including pre-foreclosure. The sooner you reach out, the more options we can explore together.' },
  { question: 'Am I obligated to accept the offer?', answer: 'Never. Our offers come with zero obligation. If it doesn\'t work for you, there\'s no pressure — we understand this is a big decision.' },
];

export default function SellersPage() {
  return (
    <>
      {/* Hero — two-column: copy left, form right */}
      <section id="get-offer" className="bg-bg py-12 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">

            {/* Left: copy */}
            <Reveal className="flex flex-col justify-center pt-2">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-sage-light px-3 py-1 text-xs font-semibold text-sage">
                <ShieldCheck size={12} aria-hidden="true" />
                Real estate for Texans, by Texans &mdash; serving all of Texas
              </div>

              <h1 className="font-display text-display-xl font-bold text-text">
                Sell your home on{' '}
                <span className="text-accent">your terms</span>.
              </h1>

              <p className="mt-5 text-lg leading-prose text-muted">
                Life changes fast. Whether you&rsquo;re relocating, dealing with an estate, facing
                financial pressure, or simply ready to move on — we make selling your Texas home
                simple, dignified, and fast. <strong className="font-semibold text-text">No matter where in Texas you are.</strong>
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  'Sell as-is — no repairs or cleaning required',
                  'No agent commissions or hidden fees',
                  'Cash offer — not contingent on financing',
                  'Close in as few as 7 days, or on your schedule',
                  'We handle all the paperwork',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-0.5 shrink-0 text-sage">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-border bg-bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Prefer to call?
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-text">{COMPANY.phone}</p>
                <p className="text-sm text-muted">Mon–Sat, 8 AM – 6 PM CT</p>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.06}>
              <LeadForm
                action={submitSellerLead}
                leadType="seller"
                title={SELLER_CONFIG.title}
                subtitle={SELLER_CONFIG.subtitle}
                submitLabel={SELLER_CONFIG.submitLabel}
                extraFields={SELLER_CONFIG.extraFields as Parameters<typeof LeadForm>[0]['extraFields']}
                markets={[]}
                successHeading="We got your information!"
                successBody="A member of our team will reach out within one business day with your cash offer. No obligations."
              />
            </Reveal>

          </div>
        </Container>
      </section>

      {/* Reassurance strip */}
      <section className="bg-accent-light py-8">
        <Container>
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            {[
              { icon: '🏠', label: 'Sell as-is' },
              { icon: '📅', label: 'You pick the date' },
              { icon: '💰', label: 'Cash in hand' },
              { icon: '📄', label: 'We handle paperwork' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-semibold text-text">{item.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Steps
        eyebrow="The Process"
        heading="Three steps to your cash offer"
        subhead="No phone tag, no surprise fees, no waiting months."
        steps={STEPS}
      />

      {/* Do You Need To Sell */}
      <section className="py-16 md:py-24 bg-bg">
        <Container>
          {/* Header */}
          <Reveal className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              We Can Help
            </p>
            <h2 className="font-display text-display-md font-bold text-text">
              Do you need to sell your house?{' '}
              <span className="text-accent">Let us help!</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Even if an agent can&rsquo;t sell your house, we can assist you. Selling through a
              real estate agent isn&rsquo;t always the best option for everyone. Plus, as an added
              bonus&hellip;
            </p>
          </Reveal>

          {/* Two-column: checklist + callout */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            {/* Left: animated checklist */}
            <StaggerGroup staggerMs={90} className="space-y-4">
              {[
                "You don't need to clean or repair the property!",
                'We place a cash escrow deposit on every property!',
                'No contracts binding you to an agent or paying any commissions!',
                'We support you and your family every step of the way!',
                'Yes, we are local here in Texas!',
                'We cover all costs!',
                'No inspections needed — we buy the property 100% AS-IS!',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-bg-card px-5 py-4 shadow-card"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-sage"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium leading-relaxed text-text">{item}</p>
                </div>
              ))}
            </StaggerGroup>

            {/* Right: closing copy + callout */}
            <Reveal delay={0.1} className="flex flex-col gap-6">
              <p className="text-lg leading-relaxed text-muted">
                We&rsquo;ll let you know right away if we can help you. Unlike selling through an
                agent, you won&rsquo;t have to wait to see if the buyer secures
                financing &mdash;{' '}
                <strong className="font-semibold text-text">
                  {COMPANY.name} is ready to buy immediately!
                </strong>
              </p>

              {/* Dark callout */}
              <div className="relative overflow-hidden rounded-3xl bg-text p-8">
                {/* Subtle dot pattern */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                  aria-hidden="true"
                />
                {/* Brand glow */}
                <div
                  className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-30"
                  style={{ background: 'radial-gradient(circle, #C0603C 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <p className="relative text-base leading-relaxed" style={{ color: 'rgba(245,237,228,0.85)' }}>
                  Our aim is to make your life easier by relieving you of the property that&rsquo;s
                  causing you stress, all while offering a{' '}
                  <strong style={{ color: '#F5EDE4' }}>quick, fair, and honest price</strong>{' '}
                  for your home.
                </p>
                <a
                  href="#get-offer"
                  className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Get my free cash offer
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Speedy sale + reasons */}
      <section className="py-16 md:py-24 bg-bg-secondary">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left: copy */}
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                Any Situation. Any Condition.
              </p>
              <h2 className="font-display text-display-md font-bold text-text">
                Need to sell fast? We&rsquo;ve got you covered.
              </h2>
              <p className="mt-5 text-lg leading-prose text-muted">
                If you require a speedy sale for any reason, we&rsquo;ll provide you with an offer
                within <strong className="font-semibold text-text">24 hours</strong>. If our offer
                aligns with your needs, simply select the closing date and prepare to move forward.
              </p>
              <a
                href="#get-offer"
                className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-accent px-7 font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Get my cash offer
              </a>
            </Reveal>

            {/* Right: reasons grid */}
            <div>
              <Reveal delay={0.06}>
                <p className="mb-5 text-sm font-semibold text-muted">
                  Some reasons our clients have sold their house as-is for a cash offer:
                </p>
              </Reveal>
              <StaggerGroup staggerMs={80} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: 'Inherited Home', Icon: Home },
                  { label: 'Damage', Icon: Zap },
                  { label: 'Divorce', Icon: Users },
                  { label: 'Relocating', Icon: Truck },
                  { label: 'Retirement', Icon: Sunset },
                  { label: 'Health Issues', Icon: Activity },
                ].map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-bg-card p-5 text-center shadow-card transition-shadow hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-light text-accent">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-text">{label}</span>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </Container>
      </section>

      <ComparisonTable />

      <FAQ
        eyebrow="Common Questions"
        heading="Answers to the questions we hear most"
        items={SELLER_FAQS}
      />
    </>
  );
}
