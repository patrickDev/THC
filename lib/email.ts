import { Resend } from 'resend';
import type { Lead } from '@/db/schema';
import { COMPANY } from '@/lib/utils';

const resend = new Resend(process.env.RESEND_API_KEY);

export type LeadEmailPayload = {
  lead: Lead;
  detail: null;
};

function notificationHtml(lead: Lead): string {
  const typeLabel = lead.leadType === 'buyer' ? 'Buyer Lead' : lead.leadType === 'seller' ? 'Seller Lead' : 'Partnership Application';
  const date = lead.createdAt ? new Date(lead.createdAt).toLocaleString('en-US', { timeZone: 'America/Chicago' }) : 'now';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body style="background:#FAF7F2;font-family:Georgia,serif;margin:0;padding:32px 0">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E8E0D6">
  <div style="background:#C0603C;padding:24px 32px">
    <h1 style="color:#fff;font-size:20px;margin:0">New ${typeLabel}</h1>
    <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px">Received ${date} · Source: ${lead.sourcePath}</p>
  </div>
  <div style="padding:24px 32px">
    <h2 style="font-size:16px;color:#2B2320;margin:0 0 16px">Contact Information</h2>
    <p style="margin:0 0 4px;font-size:12px;color:#6B5F58;font-weight:600">Name</p>
    <p style="margin:0 0 12px;font-size:14px;color:#2B2320">${lead.fullName}</p>
    <p style="margin:0 0 4px;font-size:12px;color:#6B5F58;font-weight:600">Email</p>
    <p style="margin:0 0 12px;font-size:14px;color:#2B2320"><a href="mailto:${lead.email}" style="color:#C0603C">${lead.email}</a></p>
    <p style="margin:0 0 4px;font-size:12px;color:#6B5F58;font-weight:600">Phone</p>
    <p style="margin:0 0 12px;font-size:14px;color:#2B2320"><a href="tel:${lead.phone}" style="color:#C0603C">${lead.phone}</a></p>
    ${lead.city || lead.state ? `<p style="margin:0 0 4px;font-size:12px;color:#6B5F58;font-weight:600">Location</p><p style="margin:0 0 12px;font-size:14px;color:#2B2320">${[lead.city, lead.state].filter(Boolean).join(', ')}</p>` : ''}
    ${lead.message ? `<p style="margin:0 0 4px;font-size:12px;color:#6B5F58;font-weight:600">Message</p><p style="margin:0 0 12px;font-size:14px;color:#2B2320">${lead.message}</p>` : ''}
  </div>
  <div style="background:#F2EDE4;padding:16px 32px;border-top:1px solid #E8E0D6">
    <p style="font-size:12px;color:#6B5F58;margin:0">Texas Homes Capital — automated internal notification.</p>
  </div>
</div></body></html>`;
}

function confirmationHtml(lead: Lead): string {
  const firstName = lead.fullName.split(' ')[0];
  const messages: Record<string, { greeting: string; next: string }> = {
    seller: { greeting: 'Thank you for reaching out about selling your home.', next: 'One of our team members will review your property details and reach out within one business day with a fair, no-obligation cash offer.' },
    buyer: { greeting: 'Thanks for joining our buyer list!', next: "We'll add you to our off-market deal flow and reach out when properties matching your criteria become available." },
    partner: { greeting: 'Thank you for your partnership application.', next: "We'll review your details and reach out within one business day to discuss how we might work together." },
  };
  const { greeting, next } = messages[lead.leadType] ?? messages.seller;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body style="background:#FAF7F2;font-family:Georgia,serif;margin:0;padding:32px 0">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E8E0D6">
  <div style="background:#C0603C;padding:28px 32px">
    <h1 style="color:#fff;font-size:22px;margin:0 0 4px">Texas Homes Capital</h1>
    <p style="color:rgba(255,255,255,0.85);margin:0;font-size:13px">Buying and holding Texas real estate</p>
  </div>
  <div style="padding:32px">
    <h2 style="font-size:20px;color:#2B2320;margin:0 0 12px">Hi ${firstName}, we got your message.</h2>
    <p style="color:#6B5F58;font-size:15px;line-height:1.65;margin:0 0 16px">${greeting}</p>
    <p style="color:#6B5F58;font-size:15px;line-height:1.65;margin:0 0 24px">${next}</p>
    <div style="background:#F2EDE4;border-radius:12px;padding:16px 20px;margin-bottom:24px">
      <p style="color:#2B2320;font-weight:700;font-size:14px;margin:0 0 8px">What happens next</p>
      <p style="color:#6B5F58;font-size:13px;line-height:1.6;margin:0 0 6px">1. Our team reviews your submission (usually within a few hours).</p>
      <p style="color:#6B5F58;font-size:13px;line-height:1.6;margin:0 0 6px">2. We reach out by phone or email to discuss next steps.</p>
      <p style="color:#6B5F58;font-size:13px;line-height:1.6;margin:0">3. If it's a good fit, we move quickly — no delays.</p>
    </div>
    <p style="color:#6B5F58;font-size:14px;line-height:1.6;margin:0">Have an urgent question? Call us at <a href="tel:${COMPANY.phone.replace(/\D/g, '')}" style="color:#C0603C">${COMPANY.phone}</a> or reply to this email.</p>
  </div>
  <hr style="border-color:#E8E0D6;margin:0 32px"/>
  <div style="padding:20px 32px">
    <p style="color:#6B5F58;font-size:13px;margin:0 0 4px">Warm regards,</p>
    <p style="color:#2B2320;font-weight:700;font-size:14px;margin:0">The Texas Homes Capital Team</p>
    <p style="color:#6B5F58;font-size:12px;margin:8px 0 0">${COMPANY.email} · ${COMPANY.phone} · ${COMPANY.address}</p>
  </div>
  <div style="background:#F2EDE4;padding:12px 32px;border-top:1px solid #E8E0D6">
    <p style="font-size:11px;color:#9B8F8A;margin:0;line-height:1.5">You're receiving this because you submitted a form at texashomescapital.com. We are real estate investors, not licensed agents or brokers.</p>
  </div>
</div></body></html>`;
}

/**
 * Sends two emails: an internal notification + a confirmation to the submitter.
 * Uses plain HTML strings — no React Email streams, fully compatible with Cloudflare Workers.
 */
export async function sendLeadEmails(payload: LeadEmailPayload): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL ?? 'service@texashomescapital.com';
  const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL ?? 'service@texashomescapital.com';
  const leadTypeLabel = payload.lead.leadType === 'buyer' ? 'Buyer' : payload.lead.leadType === 'seller' ? 'Seller' : 'Partner';

  try {
    await Promise.all([
      resend.emails.send({
        from,
        to: notifyTo,
        subject: `New ${leadTypeLabel} Lead: ${payload.lead.fullName}`,
        html: notificationHtml(payload.lead),
      }),
      resend.emails.send({
        from,
        to: payload.lead.email,
        subject: `We got your message — Texas Homes Capital`,
        html: confirmationHtml(payload.lead),
      }),
    ]);
  } catch (err) {
    console.error('[email] Failed to send lead emails:', err);
  }
}
