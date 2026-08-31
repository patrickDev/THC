import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BadgeVariant = 'accent' | 'sage' | 'muted' | 'warning';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  accent: 'bg-accent-light text-accent',
  sage: 'bg-sage-light text-sage',
  muted: 'bg-bg-secondary text-muted',
  warning: 'bg-amber-100 text-amber-800',
};

export function Badge({ children, variant = 'muted', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
