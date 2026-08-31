import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { COMPANY } from '@/lib/utils';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  adjustFontFallback: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://texashomescapital.com'),
  title: {
    default: `${COMPANY.name} — Texas Real Estate Investment`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    'Texas Homes Capital buys and sells residential real estate across Houston, Dallas, and San Antonio. Sell your home fast for cash, or invest with us.',
  keywords: ['Texas real estate', 'sell house fast', 'cash home buyers Texas', 'real estate investment', 'fix and flip', 'buy and hold'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: COMPANY.name,
    title: `${COMPANY.name} — Texas Real Estate Investment`,
    description: 'Buy and sell Texas homes fast — no repairs, no commissions, no pressure.',
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY.name,
    description: 'Buy and sell Texas homes fast — no repairs, no commissions, no pressure.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Do NOT set maximumScale: 1 — that disables user pinch-to-zoom (accessibility violation)
};

// ─── Root layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        {/* Anti-FOUC: set data-theme before first paint, no flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',s||(d?'dark':'light'));}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
