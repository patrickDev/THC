'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, COMPANY } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import { useCallback } from 'react';

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-30 bg-bg/95 backdrop-blur-md transition-shadow duration-300',
          scrolled ? 'shadow-soft' : ''
        )}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex max-w-site items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg focus-visible:outline-accent"
            aria-label={`${COMPANY.name} — home`}
          >
            <Image
              src="https://images.texashomescapital.com/site/thc_logo.png"
              alt={COMPANY.name}
              width={200}
              height={52}
              className="h-20 w-auto object-contain sm:h-24"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-accent-light text-accent font-semibold'
                    : 'text-muted hover:bg-bg-secondary hover:text-text'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Desktop CTA */}
            <Link
              href="/sellers"
              className="hidden rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md shadow-black/20 transition-colors hover:bg-accent-hover lg:inline-flex"
            >
              Get a Cash Offer
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-text transition-colors hover:bg-bg-secondary lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={menuOpen} onClose={closeMenu} />

      {/* Spacer so content doesn't hide behind fixed header */}
      <div className="h-[112px] sm:h-[128px]" aria-hidden="true" />
    </>
  );
}
