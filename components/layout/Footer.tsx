'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMPANY, NAV_LINKS } from '@/lib/utils';
import { Container } from './Container';

const FOOTER_SECTIONS = [
  {
    title: 'Quick Links',
    links: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    title: 'Services',
    links: [
      { label: 'Sell Your House Fast', href: '/sellers' },
      { label: 'Investment Properties', href: '/buyers' },
      { label: 'Private Lending', href: '/partnership' },
      { label: 'JV Partnerships', href: '/partnership' },
    ],
  },
  {
    title: 'Markets',
    links: COMPANY.markets.map((m) => ({ label: m, href: '/buyers' })),
  },
];

function FooterAccordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border md:border-none">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full min-h-[44px] items-center justify-between py-3 text-left text-sm font-semibold text-text md:hidden"
      >
        {title}
        <ChevronDown
          size={16}
          className={cn('text-muted transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <p className="mb-3 hidden text-sm font-semibold text-text md:block">{title}</p>
      <div className={cn('pb-3 md:block', open ? 'block' : 'hidden')}>{children}</div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary pb-safe">
      <Container className="py-12 md:py-16">
        {/* Top: Brand + columns */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="https://images.texashomescapital.com/site/thc_logo.png"
                alt="Texas Homes Capital"
                width={200}
                height={52}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-muted">
              Buying and holding residential real estate across Texas — with integrity and speed.
            </p>
            <ul className="mt-5 space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={14} className="shrink-0 text-accent" />
                {COMPANY.address}
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Phone size={14} className="shrink-0 text-accent" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Mail size={14} className="shrink-0 text-accent" />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="md:col-span-3 md:grid md:grid-cols-3 md:gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <FooterAccordion key={section.title} title={section.title}>
                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link.label + link.href}>
                      <Link
                        href={link.href}
                        className="block py-1 text-sm text-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterAccordion>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="max-w-prose leading-relaxed">
            We are real estate investors, not licensed real estate agents or brokers. All offers are
            made with the intent to purchase for investment purposes. Prices and terms subject to
            change.
          </p>
        </div>
      </Container>
    </footer>
  );
}
