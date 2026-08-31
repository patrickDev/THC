import { Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { Card } from '@/components/ui/Card';
import type { Testimonial } from '@/db/schema';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-border'}
        />
      ))}
    </div>
  );
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials.length) return null;

  return (
    <section className="py-16 md:py-24 bg-bg">
      <Container>
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            What People Say
          </p>
          <h2 className="font-display text-display-md font-bold text-text">
            Real results, real homeowners
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-lg text-muted">
            We&rsquo;ve helped hundreds of Texas families sell quickly, invest wisely, and build partnerships that last.
          </p>
        </Reveal>

        <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id} className="flex flex-col gap-4 p-6">
              <StarRating rating={t.rating} />
              <blockquote className="flex-1 text-base leading-relaxed text-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-text">{t.name}</p>
                <p className="text-sm text-muted">{t.location}</p>
              </div>
            </Card>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
