// ─── Money ───────────────────────────────────────────────────────────────────
export function formatCents(
  cents: number,
  opts?: Partial<Intl.NumberFormatOptions>
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...opts,
  }).format(cents / 100);
}

/** Parse a human-readable price string ("$250,000") into integer cents. */
export function parseDollarsToCents(value: string): number | null {
  const cleaned = value.replace(/[$,\s]/g, '');
  const n = parseFloat(cleaned);
  if (isNaN(n)) return null;
  return Math.round(n * 100);
}

// ─── Phone ───────────────────────────────────────────────────────────────────
export function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, '');
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length === 11 && d[0] === '1')
    return `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  return phone;
}

/** Strip all non-digits for DB storage. */
export function stripPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

// ─── Numbers & dates ─────────────────────────────────────────────────────────
export function formatSqft(sqft: number): string {
  return new Intl.NumberFormat('en-US').format(sqft) + ' sqft';
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

// ─── Label maps ──────────────────────────────────────────────────────────────
export const CONDITION_LABELS: Record<string, string> = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  needs_work: 'Needs Work',
  major_repairs: 'Major Repairs',
};

export const TIMELINE_LABELS: Record<string, string> = {
  asap: 'As soon as possible',
  '1_3_months': '1–3 months',
  '3_6_months': '3–6 months',
  just_exploring: 'Just exploring',
};

export const PARTNER_TYPE_LABELS: Record<string, string> = {
  capital: 'Capital Partner',
  lender: 'Private Lender',
  jv: 'JV Partner',
  contractor: 'Contractor / Vendor',
  wholesaler: 'Wholesaler',
  agent: 'Referral Agent',
};

export const STRATEGY_LABELS: Record<string, string> = {
  fix_and_flip: 'Fix & Flip',
  buy_and_hold: 'Buy & Hold',
  either: 'Either',
};

export const FINANCING_LABELS: Record<string, string> = {
  cash: 'Cash',
  conventional: 'Conventional',
  hard_money: 'Hard Money',
  seller_finance: 'Seller Finance',
  undecided: 'Undecided',
};

export const STATUS_LABELS: Record<string, string> = {
  available: 'Available',
  under_contract: 'Under Contract',
  sold: 'Sold',
};
