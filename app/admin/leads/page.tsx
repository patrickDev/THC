import type { Metadata } from 'next';
import { getDb } from '@/db/index';
import { leads, sellerSubmissions, buyerPreferences, partnerApplications } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { adminLogout } from '@/app/admin/actions';
import {
  formatCents,
  formatDate,
  CONDITION_LABELS,
  TIMELINE_LABELS,
  STRATEGY_LABELS,
  FINANCING_LABELS,
  PARTNER_TYPE_LABELS,
} from '@/lib/format';

export const metadata: Metadata = {
  title: 'Leads — Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const TYPE_STYLES: Record<string, string> = {
  seller: 'bg-accent-light text-accent',
  buyer: 'bg-sage/15 text-sage',
  partner: 'bg-bg-secondary text-muted border border-border',
};

export default async function AdminLeadsPage() {
  const db = await getDb();

  const rows = await db
    .select()
    .from(leads)
    .leftJoin(sellerSubmissions, eq(sellerSubmissions.leadId, leads.id))
    .leftJoin(buyerPreferences, eq(buyerPreferences.leadId, leads.id))
    .leftJoin(partnerApplications, eq(partnerApplications.leadId, leads.id))
    .orderBy(desc(leads.createdAt))
    .limit(200);

  const total = rows.length;
  const sellerCount = rows.filter((r) => r.leads.leadType === 'seller').length;
  const buyerCount = rows.filter((r) => r.leads.leadType === 'buyer').length;
  const partnerCount = rows.filter((r) => r.leads.leadType === 'partner').length;

  return (
    <div className="py-8">
      {/* Admin top bar */}
      <div className="mb-8 border border-border bg-bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-accent px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
              Admin
            </span>
            <span className="text-sm font-semibold text-text">Leads Dashboard</span>
            <span className="hidden text-sm text-muted sm:inline">— Texas Homes Capital</span>
          </div>
          <form action={adminLogout}>
            <button
              type="submit"
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-text hover:text-text"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Leads', value: total, cls: 'text-text' },
            { label: 'Sellers', value: sellerCount, cls: 'text-accent' },
            { label: 'Buyers', value: buyerCount, cls: 'text-sage' },
            { label: 'Partners', value: partnerCount, cls: 'text-muted' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-bg-card p-5 shadow-card">
              <p className="text-xs font-medium text-muted">{s.label}</p>
              <p className={`font-display text-3xl font-bold ${s.cls}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-card shadow-card">
          {rows.length === 0 ? (
            <div className="px-6 py-16 text-center text-muted">
              No leads yet. Submissions will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-secondary text-left">
                    <th className="px-4 py-3 font-semibold text-text">Name</th>
                    <th className="px-4 py-3 font-semibold text-text">Type</th>
                    <th className="px-4 py-3 font-semibold text-text">Contact</th>
                    <th className="px-4 py-3 font-semibold text-text">Location</th>
                    <th className="px-4 py-3 font-semibold text-text">Details</th>
                    <th className="px-4 py-3 font-semibold text-text">Source</th>
                    <th className="px-4 py-3 font-semibold text-text">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ leads: lead, seller_submissions: seller, buyer_preferences: buyer, partner_applications: partner }) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border last:border-0 transition-colors hover:bg-bg-secondary"
                    >
                      {/* Name */}
                      <td className="px-4 py-3 font-medium text-text">{lead.fullName}</td>

                      {/* Type badge */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${TYPE_STYLES[lead.leadType] ?? ''}`}
                        >
                          {lead.leadType}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-3">
                        <a href={`mailto:${lead.email}`} className="block text-muted hover:text-accent">
                          {lead.email}
                        </a>
                        <a href={`tel:${lead.phone}`} className="block text-muted hover:text-accent">
                          {lead.phone}
                        </a>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3 text-muted">
                        {[lead.city, lead.state].filter(Boolean).join(', ') || '—'}
                      </td>

                      {/* Details — varies by lead type */}
                      <td className="max-w-xs px-4 py-3 text-xs text-muted">
                        {seller && (
                          <div className="space-y-0.5">
                            <p className="font-medium text-text">
                              {seller.propertyAddress}, {seller.propertyCity} {seller.zip}
                            </p>
                            <p>
                              Condition: {CONDITION_LABELS[seller.condition] ?? seller.condition} ·{' '}
                              {TIMELINE_LABELS[seller.timeline] ?? seller.timeline}
                            </p>
                            {seller.askingPriceCents !== null && (
                              <p>Asking: {formatCents(seller.askingPriceCents)}</p>
                            )}
                            {seller.reasonForSelling && (
                              <p className="italic">{seller.reasonForSelling.slice(0, 60)}{seller.reasonForSelling.length > 60 ? '…' : ''}</p>
                            )}
                          </div>
                        )}
                        {buyer && (
                          <div className="space-y-0.5">
                            <p className="font-medium text-text">
                              Budget: {formatCents(buyer.budgetMinCents)} – {formatCents(buyer.budgetMaxCents)}
                            </p>
                            <p>
                              {STRATEGY_LABELS[buyer.strategy] ?? buyer.strategy} ·{' '}
                              {FINANCING_LABELS[buyer.financingType] ?? buyer.financingType}
                            </p>
                            <p>Markets: {(buyer.markets as string[]).join(', ')}</p>
                          </div>
                        )}
                        {partner && (
                          <div className="space-y-0.5">
                            <p className="font-medium text-text">
                              {PARTNER_TYPE_LABELS[partner.partnerType] ?? partner.partnerType}
                            </p>
                            {partner.capitalAvailableCents !== null && (
                              <p>Capital: {formatCents(partner.capitalAvailableCents)}</p>
                            )}
                            {partner.yearsExperience !== null && (
                              <p>Experience: {partner.yearsExperience} yr{partner.yearsExperience !== 1 ? 's' : ''}</p>
                            )}
                            <p>Markets: {(partner.marketsOfInterest as string[]).join(', ')}</p>
                            {partner.accredited && <p className="text-sage font-medium">Accredited investor</p>}
                          </div>
                        )}
                        {!seller && !buyer && !partner && lead.message && (
                          <p className="italic">
                            {lead.message.slice(0, 100)}{lead.message.length > 100 ? '…' : ''}
                          </p>
                        )}
                      </td>

                      {/* Source */}
                      <td className="px-4 py-3 text-muted">{lead.sourcePath}</td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-4 py-3 text-muted">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Showing up to 200 most recent leads · Data from production D1 database
        </p>
      </div>
    </div>
  );
}
