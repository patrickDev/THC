import { cn } from '@/lib/utils';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string | ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, className, id, ...props },
  ref
) {
  const checkId = id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : 'checkbox');
  const errorId = `${checkId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={checkId} className="flex cursor-pointer items-start gap-3">
        <input
          ref={ref}
          id={checkId}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border border-border bg-bg-card',
            'accent-accent transition-colors',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
            error && 'border-red-400',
            className
          )}
          {...props}
        />
        <span className="text-sm leading-relaxed text-text">{label}</span>
      </label>

      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});
