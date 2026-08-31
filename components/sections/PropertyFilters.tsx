'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

const STRATEGY_OPTIONS = [
  { value: '', label: 'All Strategies' },
  { value: 'fix_and_flip', label: 'Fix & Flip' },
  { value: 'buy_and_hold', label: 'Buy & Hold' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'available', label: 'Available' },
  { value: 'under_contract', label: 'Under Contract' },
  { value: 'sold', label: 'Sold' },
];

const BED_OPTIONS = [
  { value: '', label: 'Any Beds' },
  { value: '2', label: '2+ Beds' },
  { value: '3', label: '3+ Beds' },
  { value: '4', label: '4+ Beds' },
];

function FilterFields({
  strategy,
  status,
  beds,
  onChange,
}: {
  strategy: string;
  status: string;
  beds: string;
  onChange: (key: string, val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Strategy"
        value={strategy}
        onChange={(e) => onChange('strategy', e.target.value)}
        options={STRATEGY_OPTIONS}
      />
      <Select
        label="Status"
        value={status}
        onChange={(e) => onChange('status', e.target.value)}
        options={STATUS_OPTIONS}
      />
      <Select
        label="Bedrooms"
        value={beds}
        onChange={(e) => onChange('beds', e.target.value)}
        options={BED_OPTIONS}
      />
    </div>
  );
}

export function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const strategy = searchParams.get('strategy') ?? '';
  const status = searchParams.get('status') ?? '';
  const beds = searchParams.get('beds') ?? '';

  const activeCount = [strategy, status, beds].filter(Boolean).length;

  function applyFilter(key: string, val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set(key, val);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function clearAll() {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
    setDrawerOpen(false);
  }

  return (
    <>
      {/* Mobile trigger */}
      <div className="mb-6 flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDrawerOpen(true)}
          className="gap-2"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-fg">
              {activeCount}
            </span>
          )}
        </Button>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm font-medium text-muted hover:text-accent"
          >
            <X size={14} /> Clear filters
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filter Properties">
        <FilterFields
          strategy={strategy}
          status={status}
          beds={beds}
          onChange={applyFilter}
        />
        <div className="mt-6 flex gap-3">
          <Button variant="outline" fullWidth onClick={clearAll}>
            Clear all
          </Button>
          <Button fullWidth onClick={() => setDrawerOpen(false)}>
            Show results
          </Button>
        </div>
      </Drawer>

      {/* Desktop inline filter bar */}
      <div className="mb-8 hidden items-center gap-3 rounded-2xl border border-border bg-bg-card p-3 shadow-soft lg:flex">
        <SlidersHorizontal size={16} className="shrink-0 text-muted" aria-hidden="true" />

        <div className="flex flex-1 flex-wrap gap-3">
          <div className="w-44">
            <Select
              label="Strategy"
              value={strategy}
              onChange={(e) => applyFilter('strategy', e.target.value)}
              options={STRATEGY_OPTIONS}
            />
          </div>
          <div className="w-44">
            <Select
              label="Status"
              value={status}
              onChange={(e) => applyFilter('status', e.target.value)}
              options={STATUS_OPTIONS}
            />
          </div>
          <div className="w-36">
            <Select
              label="Bedrooms"
              value={beds}
              onChange={(e) => applyFilter('beds', e.target.value)}
              options={BED_OPTIONS}
            />
          </div>
        </div>

        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-muted hover:text-accent"
          >
            <X size={14} /> Clear
          </button>
        )}
      </div>
    </>
  );
}
