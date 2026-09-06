import type { Metadata } from 'next';
import Link from 'next/link';
import { adminLogin } from '@/app/admin/actions';
import { COMPANY } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Internal</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-text">{COMPANY.name}</h1>
          <p className="mt-1 text-sm text-muted">Admin dashboard — authorized access only</p>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-7 shadow-card">
          <form action={adminLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-text">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                name="password"
                required
                autoFocus
                autoComplete="current-password"
                className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter admin password"
              />
            </div>

            {error === 'invalid' && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-accent"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Not authorized?{' '}
          <Link href="/" className="text-accent hover:underline">
            Return to site
          </Link>
        </p>
      </div>
    </section>
  );
}
