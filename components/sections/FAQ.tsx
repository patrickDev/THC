import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';

interface FAQProps {
  eyebrow?: string;
  heading: string;
  items: AccordionItem[];
}

export function FAQ({ eyebrow, heading, items }: FAQProps) {
  return (
    <section className="py-16 md:py-24 bg-bg-secondary">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-10 text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-display-md font-bold text-text">{heading}</h2>
          </Reveal>

          <Reveal delay={0.05}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
