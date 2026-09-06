'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? {} : { opacity: 0, y: 20, scale: 0.97 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}
