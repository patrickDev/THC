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
  hidden: reduce ? {} : { opacity: 0, y: 24, scale: 0.96 },
  visible: reduce
    ? {}
    : {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
