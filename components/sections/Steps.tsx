import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import type { LucideIcon } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

interface StepsProps {
  eyebrow?: string;
  heading: string;
  subhead?: string;
  steps: Step[];
}

export function Steps({ eyebrow, heading, subhead, steps }: StepsProps) {
  return (
    <section className="py-16 md:py-24 bg-bg-secondary">
      <Container>
        {/* Header */}
        <Reveal className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-display-md font-bold text-text">{heading}</h2>
          {subhead && (
            <p className="mt-4 text-lg leading-prose text-muted">{subhead}</p>
          )}
        </Reveal>

        {/* Steps */}
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-border bg-bg-card p-6 shadow-card"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="absolute right-0 top-[2.25rem] hidden h-px w-8 translate-x-full bg-border lg:block"
                  aria-hidden="true"
                />
              )}
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-sm font-bold text-accent">
                  {step.number}
                </span>
                <step.Icon size={20} className="text-muted" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-text">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
