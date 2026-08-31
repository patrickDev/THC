import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { Lead } from '@/db/schema';
import { COMPANY } from '@/lib/utils';

interface LeadConfirmationProps {
  lead: Lead;
}

const TYPE_MESSAGES: Record<string, { greeting: string; next: string }> = {
  seller: {
    greeting: "Thank you for reaching out about selling your home.",
    next: "One of our team members will review your property details and reach out within one business day with a fair, no-obligation cash offer.",
  },
  buyer: {
    greeting: "Thanks for joining our buyer list!",
    next: "We'll add you to our off-market deal flow and reach out when properties matching your criteria become available.",
  },
  partner: {
    greeting: "Thank you for your partnership application.",
    next: "We'll review your details and reach out within one business day to discuss how we might work together.",
  },
};

export function LeadConfirmation({ lead }: LeadConfirmationProps) {
  const { greeting, next } = TYPE_MESSAGES[lead.leadType] ?? TYPE_MESSAGES.seller;
  const firstName = lead.fullName.split(' ')[0];

  return (
    <Html lang="en">
      <Head />
      <Preview>We received your message — Texas Homes Capital will be in touch soon.</Preview>
      <Body style={{ backgroundColor: '#FAF7F2', fontFamily: 'Georgia, serif', margin: 0, padding: '32px 0' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E8E0D6' }}>
          {/* Header */}
          <Section style={{ backgroundColor: '#C0603C', padding: '28px 32px' }}>
            <Heading style={{ color: '#fff', fontSize: '22px', margin: '0 0 4px', fontFamily: 'Georgia, serif' }}>
              Texas Homes Capital
            </Heading>
            <Text style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '13px' }}>
              Buying and holding Texas real estate
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '32px' }}>
            <Heading as="h2" style={{ fontSize: '20px', color: '#2B2320', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
              Hi {firstName}, we got your message.
            </Heading>
            <Text style={{ color: '#6B5F58', fontSize: '15px', lineHeight: '1.65', margin: '0 0 16px' }}>
              {greeting}
            </Text>
            <Text style={{ color: '#6B5F58', fontSize: '15px', lineHeight: '1.65', margin: '0 0 24px' }}>
              {next}
            </Text>

            <Section style={{ backgroundColor: '#F2EDE4', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
              <Text style={{ color: '#2B2320', fontWeight: 700, fontSize: '14px', margin: '0 0 8px' }}>
                What happens next
              </Text>
              <Text style={{ color: '#6B5F58', fontSize: '13px', lineHeight: '1.6', margin: '0 0 6px' }}>
                1. Our team reviews your submission (usually within a few hours).
              </Text>
              <Text style={{ color: '#6B5F58', fontSize: '13px', lineHeight: '1.6', margin: '0 0 6px' }}>
                2. We reach out by phone or email to discuss next steps.
              </Text>
              <Text style={{ color: '#6B5F58', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                3. If it&rsquo;s a good fit, we move quickly — no delays.
              </Text>
            </Section>

            <Text style={{ color: '#6B5F58', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Have an urgent question? Call us at{' '}
              <Link href={`tel:${COMPANY.phone.replace(/\D/g, '')}`} style={{ color: '#C0603C' }}>
                {COMPANY.phone}
              </Link>{' '}
              or reply to this email.
            </Text>
          </Section>

          <Hr style={{ borderColor: '#E8E0D6', margin: '0 32px' }} />

          {/* Footer */}
          <Section style={{ padding: '20px 32px' }}>
            <Text style={{ color: '#6B5F58', fontSize: '13px', lineHeight: '1.6', margin: '0 0 4px' }}>
              Warm regards,
            </Text>
            <Text style={{ color: '#2B2320', fontWeight: 700, fontSize: '14px', margin: 0 }}>
              The Texas Homes Capital Team
            </Text>
            <Text style={{ color: '#6B5F58', fontSize: '12px', margin: '8px 0 0' }}>
              {COMPANY.email} · {COMPANY.phone} · {COMPANY.address}
            </Text>
          </Section>

          <Section style={{ backgroundColor: '#F2EDE4', padding: '12px 32px', borderTop: '1px solid #E8E0D6' }}>
            <Text style={{ fontSize: '11px', color: '#9B8F8A', margin: 0, lineHeight: '1.5' }}>
              You&rsquo;re receiving this because you submitted a form at texashomescapital.com.
              We are real estate investors, not licensed agents or brokers.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadConfirmation;
