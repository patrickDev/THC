'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}

const containerVariants = (staggerMs: number, reduce: boolean) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reduce ? 0 : staggerMs / 1000,
    },
  },
});

const itemVariants = (reduce: boolean) => ({
  hidden: reduce ? {} : { opacity: 0, y: 16 },
  visible: reduce
    ? {}
    : {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: 'easeOut' },
      },
});

export function StaggerGroup({ children, className, staggerMs = 60 }: StaggerGroupProps) {
  const shouldReduce = useReducedMotion();
  const variants = itemVariants(!!shouldReduce);

  return (
    <motion.div
      className={className}
      variants={containerVariants(staggerMs, !!shouldReduce)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={variants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

export { itemVariants };
