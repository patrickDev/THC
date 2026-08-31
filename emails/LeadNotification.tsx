import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import type { Lead, SellerSubmission, BuyerPreference, PartnerApplication } from '@/db/schema';
import { formatDate, formatCents, CONDITION_LABELS, TIMELINE_LABELS, PARTNER_TYPE_LABELS, STRATEGY_LABELS, FINANCING_LABELS } from '@/lib/format';

interface LeadNotificationProps {
  lead: Lead;
  detail: SellerSubmission | BuyerPreference | PartnerApplication | null;
}

const LEAD_TYPE_LABELS: Record<string, string> = {
  seller: 'Seller Lead',
  buyer: 'Buyer Lead',
  partner: 'Partnership Application',
};

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <Row>
      <Text style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B5F58', fontWeight: 600 }}>
        {label}
      </Text>
      <Text style={{ margin: '0 0 12px', fontSize: '14px', color: '#2B2320' }}>{value}</Text>
    </Row>
  );
}

export function LeadNotification({ lead, detail }: LeadNotificationProps) {
  const typeLabel = LEAD_TYPE_LABELS[lead.leadType] ?? lead.leadType;

  return (
    <Html lang="en">
      <Head />
      <Preview>New {typeLabel}: {lead.fullName} from {lead.city}, {lead.state}</Preview>
      <Body style={{ backgroundColor: '#FAF7F2', fontFamily: 'Georgia, serif', margin: 0, padding: '32px 0' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E8E0D6' }}>
          {/* Header */}
          <Section style={{ backgroundColor: '#C0603C', padding: '24px 32px' }}>
            <Heading style={{ color: '#fff', fontSize: '20px', margin: 0, fontFamily: 'Georgia, serif' }}>
              New {typeLabel}
            </Heading>
            <Text style={{ color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', fontSize: '13px' }}>
              Received {formatDate(lead.createdAt ?? new Date())} · Source: {lead.sourcePath}
            </Text>
          </Section>

          {/* Contact info */}
          <Section style={{ padding: '24px 32px 0' }}>
            <Heading as="h2" style={{ fontSize: '16px', color: '#2B2320', margin: '0 0 16px', fontFamily: 'Georgia, serif' }}>
              Contact Information
            </Heading>
            <Field label="Name" value={lead.fullName} />
            <Field label="Email" value={lead.email} />
            <Field label="Phone" value={lead.phone} />
            <Field label="Location" value={`${lead.city}, ${lead.state}`} />
            {lead.message && <Field label="Message" value={lead.message} />}
          </Section>

          <Hr style={{ borderColor: '#E8E0D6', margin: '16px 32px' }} />

          {/* Detail section */}
          {detail && (
            <Section style={{ padding: '0 32px 24px' }}>
              <Heading as="h2" style={{ fontSize: '16px', color: '#2B2320', margin: '0 0 16px', fontFamily: 'Georgia, serif' }}>
                {lead.leadType === 'seller' ? 'Property Details' : lead.leadType === 'buyer' ? 'Buyer Preferences' : 'Partnership Details'}
              </Heading>

              {lead.leadType === 'seller' && (() => {
                const s = detail as SellerSubmission;
                return (
                  <>
                    <Field label="Property Address" value={`${s.propertyAddress}, ${s.propertyCity}, ${s.propertyState} ${s.zip}`} />
                    <Field label="Condition" value={CONDITION_LABELS[s.condition]} />
                    <Field label="Timeline" value={TIMELINE_LABELS[s.timeline]} />
                    {s.askingPriceCents && <Field label="Asking Price" value={formatCents(s.askingPriceCents)} />}
                    <Field label="Reason for Selling" value={s.reasonForSelling ?? undefined} />
                  </>
                );
              })()}

              {lead.leadType === 'buyer' && (() => {
                const b = detail as BuyerPreference;
                return (
                  <>
                    <Field label="Budget Range" value={`${formatCents(b.budgetMinCents)} – ${formatCents(b.budgetMaxCents)}`} />
                    <Field label="Strategy" value={STRATEGY_LABELS[b.strategy]} />
                    <Field label="Markets" value={b.markets.join(', ')} />
                    <Field label="Financing" value={FINANCING_LABELS[b.financingType]} />
                  </>
                );
              })()}

              {lead.leadType === 'partner' && (() => {
                const p = detail as PartnerApplication;
                return (
                  <>
                    <Field label="Partner Type" value={PARTNER_TYPE_LABELS[p.partnerType]} />
                    {p.capitalAvailableCents && <Field label="Capital Available" value={formatCents(p.capitalAvailableCents)} />}
                    <Field label="Markets of Interest" value={p.marketsOfInterest.join(', ')} />
                    {p.yearsExperience && <Field label="Years Experience" value={String(p.yearsExperience)} />}
                    <Field label="Accredited Investor" value={p.accredited ? 'Yes' : 'No'} />
                  </>
                );
              })()}
            </Section>
          )}

          {/* Footer */}
          <Section style={{ backgroundColor: '#F2EDE4', padding: '16px 32px', borderTop: '1px solid #E8E0D6' }}>
            <Text style={{ fontSize: '12px', color: '#6B5F58', margin: 0 }}>
              Texas Homes Capital — this is an automated internal notification.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadNotification;
