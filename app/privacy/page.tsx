import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { COMPANY } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${COMPANY.name}.`,
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted">
              Last updated: January 1, {year} &nbsp;·&nbsp; {COMPANY.legalName}
            </p>
          </div>

          {/* Body */}
          <div className="prose prose-neutral max-w-none text-muted [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed">

            <p>
              {COMPANY.legalName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              respects your privacy and is committed to protecting your personal information. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or submit a property inquiry.
            </p>

            <h2>1. Information We Collect</h2>
            <h3>Information you provide directly</h3>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Property address and details</li>
              <li>Any additional information submitted through our contact or lead forms</li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li>IP address (hashed and anonymized for rate-limiting purposes)</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring URL</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your property inquiries and provide cash offers</li>
              <li>Communicate with you about your transaction or request</li>
              <li>Send transactional emails related to your submission</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraudulent submissions and abuse</li>
            </ul>
            <p>
              We do <strong className="text-text">not</strong> sell, rent, or trade your personal
              information to third parties for marketing purposes.
            </p>

            <h2>3. How We Share Your Information</h2>
            <p>
              We may share your information with trusted service providers who assist us in
              operating our website and conducting our business, subject to confidentiality
              agreements. These include:
            </p>
            <ul>
              <li>Email delivery providers (for sending confirmation and notification emails)</li>
              <li>Database hosting services</li>
              <li>Analytics providers (anonymized data only)</li>
            </ul>
            <p>
              We may also disclose your information where required by law, regulation, or court
              order.
            </p>

            <h2>4. Cookies &amp; Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing
              experience and analyse site traffic. You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent. However, some features of the site
              may not function properly without cookies.
            </p>
            <p>
              We store your theme preference (light/dark mode) in your browser&rsquo;s
              localStorage. No personally identifiable information is stored in localStorage.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfil the purposes
              described in this policy, or as required by applicable law. Lead and inquiry data is
              retained for up to 3 years from the date of submission, after which it is securely
              deleted.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However,
              no method of transmission over the internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the details below. We will
              respond within 30 days.
            </p>

            <h2>8. Children&rsquo;s Privacy</h2>
            <p>
              Our website is not directed to individuals under the age of 18. We do not knowingly
              collect personal information from children. If you believe we have inadvertently
              collected such information, please contact us immediately and we will take steps to
              delete it.
            </p>

            <h2>9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for
              the privacy practices of those sites and encourage you to review their respective
              privacy policies.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo;
              date at the top of this page reflects the most recent revision. We encourage you to
              review this policy periodically.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
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
