import type { SellerValues, BuyerValues, PartnerValues } from '@/lib/validations';

export type LeadType = 'buyer' | 'seller' | 'partner';

// ─── Seller ───────────────────────────────────────────────────────────────────
export const SELLER_CONFIG = {
  leadType: 'seller' as const,
  title: 'Get Your Free Cash Offer',
  subtitle:
    "Tell us a little about your property and we'll reach out within one business day — no pressure, no obligation.",
  submitLabel: 'Request My Cash Offer',
  extraFields: [
    { name: 'propertyAddress' as keyof SellerValues, label: 'Property Street Address', type: 'text', autoComplete: 'address-line1', required: true, placeholder: '123 Main St' },
    { name: 'propertyCity' as keyof SellerValues, label: 'City', type: 'text', autoComplete: 'address-level2', required: true, placeholder: 'Houston' },
    { name: 'propertyState' as keyof SellerValues, label: 'State', type: 'text', autoComplete: 'address-level1', required: true, placeholder: 'TX' },
    { name: 'zip' as keyof SellerValues, label: 'ZIP Code', type: 'text', inputMode: 'numeric', autoComplete: 'postal-code', required: true, placeholder: '77001' },
    {
      name: 'condition' as keyof SellerValues,
      label: 'Property Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'needs_work', label: 'Needs Work' },
        { value: 'major_repairs', label: 'Major Repairs' },
      ],
    },
    {
      name: 'timeline' as keyof SellerValues,
      label: 'When do you need to sell?',
      type: 'select',
      required: true,
      options: [
        { value: 'asap', label: 'As soon as possible' },
        { value: '1_3_months', label: '1–3 months' },
        { value: '3_6_months', label: '3–6 months' },
        { value: 'just_exploring', label: 'Just exploring' },
      ],
    },
    { name: 'askingPrice' as keyof SellerValues, label: 'Asking Price (optional)', type: 'text', inputMode: 'numeric', required: false, placeholder: '$250,000' },
    { name: 'reasonForSelling' as keyof SellerValues, label: 'Reason for Selling (optional)', type: 'textarea', required: false, placeholder: 'E.g. relocating, estate sale, downsizing...' },
  ],
};

// ─── Buyer ────────────────────────────────────────────────────────────────────
export const BUYER_CONFIG = {
  leadType: 'buyer' as const,
  title: 'Get on the Buyer List',
  subtitle:
    "We send deals directly to our buyer list before they hit the open market. Tell us what you're looking for.",
  submitLabel: 'Join the Buyer List',
  extraFields: [
    { name: 'budgetMin' as keyof BuyerValues, label: 'Min Budget', type: 'text', inputMode: 'numeric', required: true, placeholder: '$100,000' },
    { name: 'budgetMax' as keyof BuyerValues, label: 'Max Budget', type: 'text', inputMode: 'numeric', required: true, placeholder: '$400,000' },
    {
      name: 'strategy' as keyof BuyerValues,
      label: 'Investment Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'fix_and_flip', label: 'Fix & Flip' },
        { value: 'buy_and_hold', label: 'Buy & Hold' },
        { value: 'either', label: 'Either / Both' },
      ],
    },
    {
      name: 'financingType' as keyof BuyerValues,
      label: 'Financing Type',
      type: 'select',
      required: true,
      options: [
        { value: 'cash', label: 'Cash' },
        { value: 'conventional', label: 'Conventional' },
        { value: 'hard_money', label: 'Hard Money' },
        { value: 'seller_finance', label: 'Seller Finance' },
        { value: 'undecided', label: 'Undecided' },
      ],
    },
  ],
};

// ─── Partner ──────────────────────────────────────────────────────────────────
export const PARTNER_CONFIG = {
  leadType: 'partner' as const,
  title: 'Apply to Partner with Us',
  subtitle:
    'Whether you have capital, construction skills, or deal flow — we want to hear from you.',
  submitLabel: 'Submit Application',
  extraFields: [
    {
      name: 'partnerType' as keyof PartnerValues,
      label: 'Partnership Type',
      type: 'select',
      required: true,
      options: [
        { value: 'capital', label: 'Capital Partner' },
        { value: 'lender', label: 'Private Lender' },
        { value: 'jv', label: 'JV Partner' },
        { value: 'contractor', label: 'Contractor / Vendor' },
        { value: 'wholesaler', label: 'Wholesaler' },
        { value: 'agent', label: 'Referral Agent' },
      ],
    },
    { name: 'capitalAvailable' as keyof PartnerValues, label: 'Capital Available (optional)', type: 'text', inputMode: 'numeric', required: false, placeholder: '$500,000' },
    { name: 'yearsExperience' as keyof PartnerValues, label: 'Years of RE Experience', type: 'text', inputMode: 'numeric', required: false, placeholder: '5' },
  ],
};
