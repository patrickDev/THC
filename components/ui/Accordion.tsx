'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

function AccordionRow({ item, index }: { item: AccordionItem; index: number }) {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  const id = `accordion-${index}`;

  return (
    <div className="border-b border-border last:border-none">
      <button
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full min-h-[52px] items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-base font-medium text-text">{item.question}</span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={cn(
            'shrink-0 text-muted transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-content`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            key="content"
            initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
            animate={shouldReduce ? {} : { height: 'auto', opacity: 1 }}
            exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-5 pb-5 text-base leading-relaxed text-muted">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn('rounded-2xl border border-border bg-bg-card', className)}>
      {items.map((item, i) => (
        <AccordionRow key={i} item={item} index={i} />
      ))}
    </div>
  );
}
