import { z } from 'zod';

// ─── Shared base fields ───────────────────────────────────────────────────────
export const baseLeadSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name').max(120),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20)
    .transform((v) => v.replace(/\D/g, '')),
  city: z.string().min(2, 'Please enter your city').max(100),
  state: z.string().min(2, 'Please enter your state').max(50),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted to proceed' }),
  }),
  // Honeypot: must be empty. Hidden from real users via CSS.
  website: z.string().max(0, 'Bot detected').optional(),
});

// ─── Seller form ─────────────────────────────────────────────────────────────
export const sellerSchema = baseLeadSchema.extend({
  propertyAddress: z.string().min(5, 'Please enter the property street address').max(255),
  propertyCity: z.string().min(2, 'Please enter the property city').max(100),
  propertyState: z.string().min(2, 'Please enter the property state').max(50),
  zip: z
    .string()
    .min(5, 'Please enter a valid ZIP code')
    .max(10)
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  condition: z.enum(['excellent', 'good', 'fair', 'needs_work', 'major_repairs'], {
    errorMap: () => ({ message: 'Please select the property condition' }),
  }),
  timeline: z.enum(['asap', '1_3_months', '3_6_months', 'just_exploring'], {
    errorMap: () => ({ message: 'Please select your timeline' }),
  }),
  askingPrice: z.string().optional(),
  reasonForSelling: z.string().max(500).optional(),
});

// ─── Buyer form ──────────────────────────────────────────────────────────────
export const buyerSchema = baseLeadSchema.extend({
  budgetMin: z
    .string()
    .min(1, 'Please enter a minimum budget')
    .regex(/^\$?[\d,]+$/, 'Invalid dollar amount'),
  budgetMax: z
    .string()
    .min(1, 'Please enter a maximum budget')
    .regex(/^\$?[\d,]+$/, 'Invalid dollar amount'),
  strategy: z.enum(['fix_and_flip', 'buy_and_hold', 'either'], {
    errorMap: () => ({ message: 'Please select an investment strategy' }),
  }),
  markets: z
    .array(z.string())
    .min(1, 'Please select at least one market')
    .default([]),
  financingType: z.enum(['cash', 'conventional', 'hard_money', 'seller_finance', 'undecided'], {
    errorMap: () => ({ message: 'Please select a financing type' }),
  }),
});

// ─── Partner form ─────────────────────────────────────────────────────────────
export const partnerSchema = baseLeadSchema.extend({
  partnerType: z.enum(['capital', 'lender', 'jv', 'contractor', 'wholesaler', 'agent'], {
    errorMap: () => ({ message: 'Please select a partnership type' }),
  }),
  capitalAvailable: z.string().optional(),
  marketsOfInterest: z
    .array(z.string())
    .min(1, 'Please select at least one market of interest')
    .default([]),
  yearsExperience: z.string().optional(),
  accredited: z.boolean().optional().default(false),
});

// ─── Home contact form ────────────────────────────────────────────────────────
export const homeContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(60),
  lastName: z.string().min(1, 'Last name is required').max(60),
  street: z.string().min(3, 'Please enter the property street address').max(255),
  city: z.string().min(2, 'Please enter the city').max(100),
  zip: z
    .string()
    .min(5, 'Please enter a valid ZIP code')
    .max(10)
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20)
    .transform((v) => v.replace(/\D/g, '')),
  email: z.string().email('Please enter a valid email address').max(255),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted to proceed' }),
  }),
  website: z.string().max(0).optional(),
});

// ─── Inferred types ──────────────────────────────────────────────────────────
export type SellerValues = z.infer<typeof sellerSchema>;
export type BuyerValues = z.infer<typeof buyerSchema>;
export type PartnerValues = z.infer<typeof partnerSchema>;
export type HomeContactValues = z.infer<typeof homeContactSchema>;
