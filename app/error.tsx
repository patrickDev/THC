'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <AlertTriangle size={48} className="mb-6 text-accent" aria-hidden="true" />
      <h1 className="font-display text-3xl font-bold text-text">Something went wrong</h1>
      <p className="mt-3 max-w-sm text-base text-muted">
        We hit an unexpected error. Please try again or contact us if the problem persists.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Try again</Button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-6 font-semibold text-text hover:bg-bg-secondary"
        >
          Go home
        </Link>
      </div>
    </Container>
  );
}
