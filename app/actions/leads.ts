'use server';

import { headers } from 'next/headers';
import { db, enableForeignKeys } from '@/db/index';
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

  await db.transaction(async (tx) => {
    const [lead] = await tx
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

    await tx.insert(sellerSubmissions).values({
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
  });

  // Fire-and-forget emails
  if (savedLead) {
    sendLeadEmails({ lead: savedLead, detail: null }).catch((err) =>
      console.error('[email] seller lead emails failed:', err)
    );
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

  await db.transaction(async (tx) => {
    const [lead] = await tx
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

    await tx.insert(buyerPreferences).values({
      leadId: lead.id,
      budgetMinCents,
      budgetMaxCents,
      strategy: data.strategy,
      markets: data.markets,
      financingType: data.financingType,
    });
  });

  if (savedLead) {
    sendLeadEmails({ lead: savedLead, detail: null }).catch((err) =>
      console.error('[email] buyer lead emails failed:', err)
    );
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

  await db.transaction(async (tx) => {
    const [lead] = await tx
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

    await tx.insert(partnerApplications).values({
      leadId: lead.id,
      partnerType: data.partnerType,
      capitalAvailableCents: data.capitalAvailable
        ? parseDollarsToCents(data.capitalAvailable) ?? null
        : null,
      marketsOfInterest: data.marketsOfInterest,
      yearsExperience: data.yearsExperience ? parseInt(data.yearsExperience, 10) : null,
      accredited: data.accredited ?? false,
    });
  });

  if (savedLead) {
    sendLeadEmails({ lead: savedLead, detail: null }).catch((err) =>
      console.error('[email] partner lead emails failed:', err)
    );
  }

  return { ok: true };
}

// ─── Home Contact Action ───────────────────────────────────────────────────────
export async function submitHomeLead(fd: FormData): Promise<ActionResult> {
  const ip = await getClientIp();
  const ipHash = hashIp(ip);
  const rateCheck = checkRateLimit(ipHash);
  if (!rateCheck.allowed) {
    return { ok: false, errors: { _: ['Too many submissions. Please try again later.'] } };
  }

  const raw: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) raw[k] = v;
  raw.consent = raw.consent === 'true' || raw.consent === 'on';

  const parse = homeContactSchema.safeParse(raw);
  if (!parse.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parse.error.issues) {
      const key = String(issue.path[0] ?? '_');
      (errors[key] ??= []).push(issue.message);
    }
    return { ok: false, errors };
  }

  const data = parse.data;
  if (data.website) return { ok: true };

  await enableForeignKeys();

  let savedLead: typeof leads.$inferSelect | undefined;

  await db.transaction(async (tx) => {
    const [lead] = await tx
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

    savedLead = lead;
  });

  if (savedLead) {
    sendLeadEmails({ lead: savedLead, detail: null }).catch((err) =>
      console.error('[email] home lead emails failed:', err)
    );
  }

  return { ok: true };
}
