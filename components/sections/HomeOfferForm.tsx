'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { SuccessState } from '@/components/forms/SuccessState';
import { homeContactSchema, type HomeContactValues } from '@/lib/validations';
import { submitHomeLead } from '@/app/actions/leads';
import { COMPANY } from '@/lib/utils';

export function HomeOfferForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<HomeContactValues>({
    resolver: zodResolver(homeContactSchema),
    mode: 'onBlur',
  });

  function onSubmit(data: HomeContactValues) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });

    startTransition(async () => {
      try {
        const result = await submitHomeLead(fd);
        if (result.ok) {
          reset();
          setDone(true);
        } else if (result.errors) {
          Object.entries(result.errors).forEach(([field, msgs]) => {
            setError(field as keyof HomeContactValues, { message: msgs[0] });
          });
        } else {
          setServerError('Something went wrong. Please try again.');
        }
      } catch {
        setServerError('Something went wrong. Please try again.');
      }
    });
  }

  if (done) {
    return (
      <SuccessState
        heading="We'll be in touch soon!"
        body="One of our team members will reach out within one business day with your cash offer. Check your inbox for a confirmation."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        // @ts-expect-error inert is a valid HTML attribute not yet in React types
        inert=""
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
        {...register('website')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          autoComplete="given-name"
          required
          placeholder="Jane"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Last Name"
          type="text"
          autoComplete="family-name"
          required
          placeholder="Smith"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <Input
        label="Street Address"
        type="text"
        autoComplete="address-line1"
        required
        placeholder="123 Main St"
        error={errors.street?.message}
        {...register('street')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          type="text"
          autoComplete="address-level2"
          required
          placeholder="Houston"
          error={errors.city?.message}
          {...register('city')}
        />
        <Input
          label="ZIP Code"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          required
          placeholder="77001"
          error={errors.zip?.message}
          {...register('zip')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="(713) 555-0100"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="jane@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <Checkbox
        label={
          <span>
            I agree to be contacted by {COMPANY.name} regarding my inquiry. We
            respect your privacy and will never share your information.
          </span>
        }
        required
        error={errors.consent?.message}
        {...register('consent')}
      />

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <Button type="submit" fullWidth size="lg" loading={isPending} disabled={isPending}>
        {isPending ? 'Sending…' : 'GET MY FAIR OFFER'}
      </Button>
    </form>
  );
}
