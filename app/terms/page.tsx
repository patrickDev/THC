import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { COMPANY } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Terms and conditions for ${COMPANY.name}.`,
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  const year = new Date().getFullYear();

  return (
    <section className="bg-bg py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-10 border-b border-border pb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
              Legal
            </p>
            <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm text-muted">
              Last updated: January 1, {year} &nbsp;·&nbsp; {COMPANY.legalName}
            </p>
          </div>

          {/* Body */}
          <div className="prose prose-neutral max-w-none text-muted [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed">

            <p>
              Please read these Terms &amp; Conditions (&ldquo;Terms&rdquo;) carefully before
              using the website operated by <strong className="text-text">{COMPANY.legalName}</strong>{' '}
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using our
              website, you agree to be bound by these Terms.
            </p>

            <h2>1. Use of the Website</h2>
            <p>
              Our website is provided for informational purposes only. You agree to use it only for
              lawful purposes and in a manner that does not infringe the rights of others. You must
              not use our site to transmit any unsolicited or unauthorised advertising or promotional
              material.
            </p>

            <h2>2. No Real Estate Brokerage</h2>
            <p>
              {COMPANY.name} is a real estate investment company, not a licensed real estate broker
              or agent. Nothing on this website constitutes a brokerage agreement or agency
              relationship. All property acquisitions are made for investment purposes only.
            </p>

            <h2>3. Offers &amp; Pricing</h2>
            <p>
              Any cash offer presented to you is non-binding until a formal purchase agreement is
              signed by both parties. Offers are based on current market conditions and property
              information provided, and are subject to change or withdrawal at any time prior to
              execution of a written agreement.
            </p>

            <h2>4. Accuracy of Information</h2>
            <p>
              We make reasonable efforts to keep the information on our website accurate and
              up-to-date, but we make no representations or warranties of any kind — express or
              implied — about the completeness, accuracy, reliability, or suitability of the
              information on the site.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. These links are provided for
              your convenience only. We have no control over the content of those sites and accept
              no responsibility for them or for any loss or damage that may arise from your use of
              them.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and images — is the
              property of {COMPANY.legalName} or its content suppliers and is protected by applicable
              intellectual property laws. You may not reproduce, distribute, or create derivative
              works without our express written permission.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {COMPANY.legalName} shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising out of
              your use of, or inability to use, this website or any content therein.
            </p>

            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless {COMPANY.legalName} and its officers,
              directors, employees, and agents from and against any claims, liabilities, damages,
              losses, and expenses arising out of or in connection with your use of the website or
              violation of these Terms.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              State of Texas, without regard to its conflict of law provisions. Any disputes shall
              be resolved exclusively in the state or federal courts located in Texas.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time without prior notice.
              Continued use of the website after any changes constitutes your acceptance of the new
              Terms. We encourage you to review this page periodically.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul>
              <li><strong className="text-text">{COMPANY.legalName}</strong></li>
              <li>{COMPANY.address}</li>
              <li>
                Email:{' '}
                <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href={`tel:${COMPANY.phone.replace(/\D/g, '')}`} className="text-accent hover:underline">
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
