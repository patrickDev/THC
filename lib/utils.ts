import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createHash } from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashIp(ip: string): string {
  return createHash('sha256')
    .update(ip + (process.env.IP_SALT ?? 'thc-salt-2024'))
    .digest('hex')
    .slice(0, 16);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Company constants ────────────────────────────────────────────────────────
export const COMPANY = {
  name: 'Texas Homes & Capital',
  shortName: 'THC',
  phone: '+1 469-966-0619',
  email: 'service@texashomescapital.com',
  markets: ['Austin, TX', 'Dallas, TX', 'Houston, TX', 'San Antonio, TX'],
  tagline: 'Real estate for Texans, by Texans — serving all of Texas.',
  address: '830 North Blvd #2083, Universal City, TX 78148',
  legalName: 'Texas Homes & Capital LLC',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'For Buyers', href: '/buyers' },
  { label: 'For Sellers', href: '/sellers' },
  { label: 'Partnership', href: '/partnership' },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

// ─── Simple in-memory rate limiter ───────────────────────────────────────────
// Keyed by hashed IP. Works for single-instance deploys; upgrade to Redis/Upstash for edge.
const rateStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function checkRateLimit(ipHash: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateStore.get(ipHash);

  if (!entry || now > entry.resetAt) {
    rateStore.set(ipHash, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}
