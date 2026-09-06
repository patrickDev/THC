'use server';

import { headers } from 'next/headers';
import { getDb, enableForeignKeys } from '@/db/index';
import { leads, sellerSubmissions, buyerPreferences, partnerApplications } from '@/db/schema';
import { sellerSchema, buyerSchema, partnerSchema, homeContactSchema } from '@/lib/validations';
import { hashIp, checkRateLimit } from '@/lib/utils';
import { parseDollarsToCents } from '@/lib/format';
import { sendLeadEmails } from '@/lib/email';
import type { SellerValues, BuyerValues, PartnerValues } from '@/lib/validations';

type ActionResult = { ok: true } | { ok: false; errors?: Record<string, string[]> };

async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    h.get('x-real-ip') ??
    'unknown'
  );
}

// ─── Seller Action ────────────────────────────────────────────────────────────
export async function submitSellerLead(fd: FormData): Promise<ActionResult> {
  const ip = await getClientIp();
  const ipHash = hashIp(ip);
  const rateCheck = checkRateLimit(ipHash);
  if (!rateCheck.allowed) {
    return { ok: false, errors: { _: ['Too many submissions. Please try again later.'] } };
  }

  const raw: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) raw[k] = v;
  raw.consent = raw.consent === 'true' || raw.consent === 'on';

  const parse = sellerSchema.safeParse(raw);
  if (!parse.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parse.error.issues) {
      const key = String(issue.path[0] ?? '_');
      (errors[key] ??= []).push(issue.message);
    }
    return { ok: false, errors };
  }

  const data: SellerValues = parse.data;

  // Honeypot check
  if (data.website) {
    return { ok: true }; // Silently discard bots
  }

  await enableForeignKeys();

  let savedLead: typeof leads.$inferSelect | undefined;

  try {
    const db = await getDb();
    const [lead] = await db
      .insert(leads)
      .values({
        leadType: 'seller',
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        city: data.city,
        state: data.state,
        message: data.message ?? null,
        consent: data.consent,
        sourcePath: '/sellers',
        ipHash,
      })
      .returning();

    savedLead = lead;

    await db.insert(sellerSubmissions).values({
      leadId: lead.id,
      propertyAddress: data.propertyAddress,
      propertyCity: data.propertyCity,
      propertyState: data.propertyState,
      zip: data.zip,
      condition: data.condition,
      timeline: data.timeline,
      askingPriceCents: data.askingPrice
        ? parseDollarsToCents(data.askingPrice) ?? null
        : null,
      reasonForSelling: data.reasonForSelling ?? null,
    });
  } catch (err) {
    console.error('[db] seller lead insert failed:', err);
    return { ok: false };
  }

  if (savedLead) {
    await sendLeadEmails({ lead: savedLead, detail: null });
  }

  return { ok: true };
}

// ─── Buyer Action ─────────────────────────────────────────────────────────────
export async function submitBuyerLead(fd: FormData): Promise<ActionResult> {
  const ip = await getClientIp();
  const ipHash = hashIp(ip);
  const rateCheck = checkRateLimit(ipHash);
  if (!rateCheck.allowed) {
    return { ok: false, errors: { _: ['Too many submissions. Please try again later.'] } };
  }

  const raw: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) {
    if (k === 'markets') {
      if (!raw.markets) raw.markets = [];
      (raw.markets as string[]).push(String(v));
    } else {
      raw[k] = v;
    }
  }
  raw.consent = raw.consent === 'true' || raw.consent === 'on';
  if (!raw.markets) raw.markets = [];

  const parse = buyerSchema.safeParse(raw);
  if (!parse.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parse.error.issues) {
      const key = String(issue.path[0] ?? '_');
      (errors[key] ??= []).push(issue.message);
    }
    return { ok: false, errors };
  }

  const data: BuyerValues = parse.data;
  if (data.website) return { ok: true };

  await enableForeignKeys();

  let savedLead: typeof leads.$inferSelect | undefined;

  try {
    const db = await getDb();
    const [lead] = await db
      .insert(leads)
      .values({
        leadType: 'buyer',
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        city: data.city,
        state: data.state,
        message: data.message ?? null,
        consent: data.consent,
        sourcePath: '/buyers',
        ipHash,
      })
      .returning();

    savedLead = lead;

    const budgetMinCents = parseDollarsToCents(data.budgetMin) ?? 0;
    const budgetMaxCents = parseDollarsToCents(data.budgetMax) ?? 0;

    await db.insert(buyerPreferences).values({
      leadId: lead.id,
      budgetMinCents,
      budgetMaxCents,
      strategy: data.strategy,
      markets: data.markets,
      financingType: data.financingType,
    });
  } catch (err) {
    console.error('[db] buyer lead insert failed:', err);
    return { ok: false };
  }

  if (savedLead) {
    await sendLeadEmails({ lead: savedLead, detail: null });
  }

  return { ok: true };
}

// ─── Partner Action ───────────────────────────────────────────────────────────
export async function submitPartnerLead(fd: FormData): Promise<ActionResult> {
  const ip = await getClientIp();
  const ipHash = hashIp(ip);
  const rateCheck = checkRateLimit(ipHash);
  if (!rateCheck.allowed) {
    return { ok: false, errors: { _: ['Too many submissions. Please try again later.'] } };
  }

  const raw: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) {
    if (k === 'marketsOfInterest') {
      if (!raw.marketsOfInterest) raw.marketsOfInterest = [];
      (raw.marketsOfInterest as string[]).push(String(v));
    } else {
      raw[k] = v;
    }
  }
  raw.consent = raw.consent === 'true' || raw.consent === 'on';
  raw.accredited = raw.accredited === 'true' || raw.accredited === 'on';
  if (!raw.marketsOfInterest) raw.marketsOfInterest = [];

  const parse = partnerSchema.safeParse(raw);
  if (!parse.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parse.error.issues) {
      const key = String(issue.path[0] ?? '_');
      (errors[key] ??= []).push(issue.message);
    }
    return { ok: false, errors };
  }

  const data: PartnerValues = parse.data;
  if (data.website) return { ok: true };

  await enableForeignKeys();

  let savedLead: typeof leads.$inferSelect | undefined;

  try {
    const db = await getDb();
    const [lead] = await db
      .insert(leads)
      .values({
        leadType: 'partner',
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        city: data.city,
        state: data.state,
        message: data.message ?? null,
        consent: data.consent,
        sourcePath: '/partnership',
        ipHash,
      })
      .returning();

    savedLead = lead;

    await db.insert(partnerApplications).values({
      leadId: lead.id,
      partnerType: data.partnerType,
      capitalAvailableCents: data.capitalAvailable
        ? parseDollarsToCents(data.capitalAvailable) ?? null
        : null,
      marketsOfInterest: data.marketsOfInterest,
      yearsExperience: data.yearsExperience ? parseInt(data.yearsExperience, 10) : null,
      accredited: data.accredited ?? false,
    });
  } catch (err) {
    console.error('[db] partner lead insert failed:', err);
    return { ok: false };
  }

  if (savedLead) {
    await sendLeadEmails({ lead: savedLead, detail: null });
  }

  return { ok: true };
}

// ─── Home Contact Action ───────────────────────────────────────────────────────
export async function submitHomeLead(fd: FormData): Promise<ActionResult> {
  try {
    console.log('[home] step 1: action started');
    const ip = await getClientIp();
    console.log('[home] step 2: got ip', ip);
    const ipHash = hashIp(ip);
    const rateCheck = checkRateLimit(ipHash);
    if (!rateCheck.allowed) {
      return { ok: false, errors: { _: ['Too many submissions. Please try again later.'] } };
    }

    const raw: Record<string, unknown> = {};
    for (const [k, v] of fd.entries()) raw[k] = v;
    raw.consent = raw.consent === 'true' || raw.consent === 'on';
    console.log('[home] step 3: raw fields', Object.keys(raw).join(','), 'consent=', raw.consent);

    const parse = homeContactSchema.safeParse(raw);
    if (!parse.success) {
      console.log('[home] step 4: validation failed', JSON.stringify(parse.error.issues));
      const errors: Record<string, string[]> = {};
      for (const issue of parse.error.issues) {
        const key = String(issue.path[0] ?? '_');
        (errors[key] ??= []).push(issue.message);
      }
      return { ok: false, errors };
    }
    console.log('[home] step 4: validation passed');

    const data = parse.data;
    if (data.website) return { ok: true };

    await enableForeignKeys();
    console.log('[home] step 5: getting db');

    const db = await getDb();
    console.log('[home] step 6: inserting lead');

    const [lead] = await db
      .insert(leads)
      .values({
        leadType: 'seller',
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email.toLowerCase(),
        phone: data.phone,
        city: '',
        state: '',
        message: `Property: ${data.street}, ${data.city}, TX ${data.zip}`,
        consent: data.consent,
        sourcePath: '/',
        ipHash,
      })
      .returning();

    console.log('[home] step 7: lead saved, id=', lead?.id);

    if (lead) {
      console.log('[home] step 8: sending emails');
      await sendLeadEmails({ lead, detail: null });
      console.log('[home] step 9: emails done');
    }

    return { ok: true };
  } catch (err) {
    console.error('[home] FATAL error:', err);
    return { ok: false };
  }
}
