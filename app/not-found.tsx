import Link from 'next/link';
import { Search } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Search size={48} className="mb-6 text-accent" aria-hidden="true" />
      <h1 className="font-display text-4xl font-bold text-text">Page not found</h1>
      <p className="mt-3 max-w-sm text-base text-muted">
        We couldn&rsquo;t find what you were looking for. It may have been moved or deleted.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-6 font-semibold text-accent-fg hover:bg-accent-hover"
        >
          Go home
        </Link>
        <Link
          href="/buyers"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-6 font-semibold text-text hover:bg-bg-secondary"
        >
          Browse Properties
        </Link>
      </div>
    </Container>
  );
}
