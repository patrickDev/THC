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
    <section className="py-16 md:py-28 bg-bg">
      <Container>
        {/* Section header */}
        <Reveal className="mb-16 max-w-2xl">
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
        <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <div
                  className="absolute left-[2.75rem] top-[1.375rem] hidden h-px w-[calc(100%+2rem)] bg-gradient-to-r from-border to-transparent lg:block"
                  aria-hidden="true"
                />
              )}

              {/* Step number circle */}
              <div className="mb-5 flex items-center gap-4">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg shadow-accent/30 ring-4 ring-bg">
                  {step.number}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light transition-colors group-hover:bg-accent/10">
                  <step.Icon size={18} className="text-accent" aria-hidden="true" />
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-2 font-display text-xl font-semibold text-text">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
