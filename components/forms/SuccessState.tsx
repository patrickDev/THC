'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessStateProps {
  heading?: string;
  body?: string;
}

export function SuccessState({
  heading = "You're all set!",
  body = "We received your message and will reach out within one business day. Check your inbox for a confirmation email.",
}: SuccessStateProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, scale: 0.96 }}
      animate={shouldReduce ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col items-center gap-5 rounded-2xl border border-sage-light bg-bg-card py-12 text-center shadow-card"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-light">
        <CheckCircle size={32} className="text-sage" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-display text-2xl font-bold text-text">{heading}</h3>
        <p className="mx-auto mt-2 max-w-sm text-base leading-relaxed text-muted">{body}</p>
      </div>
    </motion.div>
  );
}
