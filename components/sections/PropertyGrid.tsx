import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { PropertyCard } from './PropertyCard';
import type { Property } from '@/db/schema';

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (!properties.length) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium text-muted">No properties match your filters.</p>
        <p className="mt-1 text-sm text-muted">Try adjusting or clearing the filters above.</p>
      </div>
    );
  }

  return (
    <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </StaggerGroup>
  );
}
