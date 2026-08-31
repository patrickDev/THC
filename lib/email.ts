import { Resend } from 'resend';
import type { Lead, SellerSubmission, BuyerPreference, PartnerApplication } from '@/db/schema';
import { LeadNotification } from '@/emails/LeadNotification';
import { LeadConfirmation } from '@/emails/LeadConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export type LeadEmailPayload = {
  lead: Lead;
  detail: SellerSubmission | BuyerPreference | PartnerApplication | null;
};

/**
 * Sends two emails: an internal notification + a confirmation to the submitter.
 * Failures are caught and logged — they must never bubble up to block a submission.
 */
export async function sendLeadEmails(payload: LeadEmailPayload): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL ?? 'service@texashomescapital.com';
  const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL ?? 'service@texashomescapital.com';

  const leadTypeLabel =
    payload.lead.leadType === 'buyer'
      ? 'Buyer'
      : payload.lead.leadType === 'seller'
        ? 'Seller'
        : 'Partner';

  try {
    await Promise.all([
      resend.emails.send({
        from,
        to: notifyTo,
        subject: `New ${leadTypeLabel} Lead: ${payload.lead.fullName}`,
        react: LeadNotification(payload),
      }),
      resend.emails.send({
        from,
        to: payload.lead.email,
        subject: `We got your message — Texas Homes Capital`,
        react: LeadConfirmation({ lead: payload.lead }),
      }),
    ]);
  } catch (err) {
    // Log but never throw — the lead is already saved
    console.error('[email] Failed to send lead emails:', err);
  }
}
