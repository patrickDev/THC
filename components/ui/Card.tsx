import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'li';
}

export function Card({ children, className, hover = false, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-border bg-bg-card shadow-card',
        hover &&
          'transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </Tag>
  );
}
