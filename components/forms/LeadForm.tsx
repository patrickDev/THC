'use client';

import { useRef, useState, useTransition, useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sellerSchema, buyerSchema, partnerSchema } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { SuccessState } from './SuccessState';
import { COMPANY } from '@/lib/utils';

type FieldConfig = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: string;
  options?: { value: string; label: string }[];
  hint?: string;
};

const SCHEMAS = {
  seller: sellerSchema,
  buyer: buyerSchema,
  partner: partnerSchema,
} as const;

interface LeadFormProps<T extends Record<string, unknown>> {
  action: (formData: FormData) => Promise<{ ok: boolean; errors?: Record<string, string[]> }>;
  leadType: 'buyer' | 'seller' | 'partner';
  title: string;
  subtitle: string;
  submitLabel?: string;
  extraFields?: FieldConfig[];
  markets: { value: string; label: string }[];
  successHeading?: string;
  successBody?: string;
}

export function LeadForm<T extends Record<string, unknown>>({
  action,
  leadType,
  title,
  subtitle,
  submitLabel = 'Send Message',
  extraFields = [],
  markets,
  successHeading,
  successBody,
}: LeadFormProps<T>) {
  const uid = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(SCHEMAS[leadType]),
    mode: 'onBlur',
  });

  const errorMessages = Object.values(errors)
    .map((e) => (e as { message?: string }).message)
    .filter(Boolean) as string[];

  async function onSubmit(data: T) {
    const fd = new FormData();
    Object.entries(data as Record<string, unknown>).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => fd.append(k, String(item)));
      } else if (v !== undefined && v !== null) {
        fd.append(k, String(v));
      }
    });
    fd.append('leadType', leadType);

    startTransition(async () => {
      const result = await action(fd);
      if (result.ok) {
        setDone(true);
      } else if (result.errors) {
        Object.entries(result.errors).forEach(([field, msgs]) => {
          setError(field as Parameters<typeof setError>[0], { message: msgs[0] });
        });
        setTimeout(() => errorSummaryRef.current?.focus(), 50);
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    });
  }

  if (done) {
    return <SuccessState heading={successHeading} body={successBody} />;
  }

  return (
    <div className="rounded-2xl border border-border bg-bg-card p-6 shadow-card md:p-8">
      <h2 className="font-display text-2xl font-bold text-text">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>

      {/* Error summary */}
      {errorMessages.length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 focus:outline-none"
        >
          <p className="mb-1 text-sm font-semibold text-red-700">Please fix the following:</p>
          <ul className="list-disc pl-4 text-sm text-red-600">
            {errorMessages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {serverError && (
        <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-6 space-y-5"
      >
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
          {...register('website' as Parameters<typeof register>[0])}
        />

        {/* Base fields */}
        <Input
          label="Full Name"
          type="text"
          autoComplete="name"
          required
          placeholder="Jane Smith"
          error={(errors as Record<string, { message?: string }>).fullName?.message}
          {...register('fullName' as Parameters<typeof register>[0])}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="jane@example.com"
            error={(errors as Record<string, { message?: string }>).email?.message}
            {...register('email' as Parameters<typeof register>[0])}
          />
          <Input
            label="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="(713) 555-0100"
            error={(errors as Record<string, { message?: string }>).phone?.message}
            {...register('phone' as Parameters<typeof register>[0])}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="City"
            type="text"
            autoComplete="address-level2"
            required
            placeholder="Houston"
            error={(errors as Record<string, { message?: string }>).city?.message}
            {...register('city' as Parameters<typeof register>[0])}
          />
          <Input
            label="State"
            type="text"
            autoComplete="address-level1"
            required
            placeholder="TX"
            error={(errors as Record<string, { message?: string }>).state?.message}
            {...register('state' as Parameters<typeof register>[0])}
          />
        </div>

        {/* Markets (buyer / partner only) */}
        {markets.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-text">
              Markets of Interest <span className="text-accent" aria-hidden="true">*</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {markets.map((m) => (
                <label key={m.value} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    value={m.value}
                    className="h-4 w-4 accent-accent"
                    {...register('markets' as Parameters<typeof register>[0])}
                  />
                  <span className="text-sm text-text">{m.label}</span>
                </label>
              ))}
            </div>
            {(errors as Record<string, { message?: string }>).markets?.message && (
              <p role="alert" className="mt-1 text-xs text-red-500">
                {(errors as Record<string, { message?: string }>).markets?.message}
              </p>
            )}
          </fieldset>
        )}

        {/* Page-specific extra fields */}
        {extraFields.map((field) => {
          const err = (errors as Record<string, { message?: string }>)[field.name]?.message;

          if (field.type === 'select' && field.options) {
            return (
              <Select
                key={field.name}
                label={field.label}
                required={field.required}
                options={field.options}
                placeholder="Select an option"
                error={err}
                {...register(field.name as Parameters<typeof register>[0])}
              />
            );
          }

          if (field.type === 'textarea') {
            return (
              <Textarea
                key={field.name}
                label={field.label}
                required={field.required}
                placeholder={field.placeholder}
                hint={field.hint}
                error={err}
                {...register(field.name as Parameters<typeof register>[0])}
              />
            );
          }

          return (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              inputMode={field.inputMode as 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined}
              autoComplete={field.autoComplete}
              required={field.required}
              placeholder={field.placeholder}
              hint={field.hint}
              error={err}
              {...register(field.name as Parameters<typeof register>[0])}
            />
          );
        })}

        {/* Message */}
        <Textarea
          label="Message (optional)"
          placeholder="Anything else you'd like to share..."
          rows={3}
          {...register('message' as Parameters<typeof register>[0])}
        />

        {/* Consent */}
        <Checkbox
          label={
            <span>
              I agree to be contacted by {COMPANY.name} regarding my inquiry. We respect your
              privacy and will never share your information.
            </span>
          }
          required
          error={(errors as Record<string, { message?: string }>).consent?.message}
          {...register('consent' as Parameters<typeof register>[0])}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isPending}
          disabled={isPending}
        >
          {isPending ? 'Sending…' : submitLabel}
        </Button>
      </form>
    </div>
  );
}
