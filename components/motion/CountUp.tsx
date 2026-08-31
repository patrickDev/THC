'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1.5,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (shouldReduce || !inView) {
      if (inView) ref.current.textContent = prefix + to.toLocaleString('en-US') + suffix;
      return;
    }

    const ctrl = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(v).toLocaleString('en-US') + suffix;
        }
      },
    });

    return () => ctrl.stop();
  }, [inView, to, prefix, suffix, duration, shouldReduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
