'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion, AnimatePresence, motion } from 'framer-motion';

interface GalleryProps {
  images: string[];
  alt: string;
}

export function Gallery({ images, alt }: GalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduce = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current]
  );

  const prev = useCallback(() => {
    go((current - 1 + images.length) % images.length);
  }, [current, go, images.length]);

  const next = useCallback(() => {
    go((current + 1) % images.length);
  }, [current, go, images.length]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const variants = {
    enter: (d: number) => ({
      x: shouldReduce ? 0 : d * 40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: shouldReduce ? 0 : d * -40,
      opacity: 0,
    }),
  };

  if (!images.length) return null;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-secondary"
        role="region"
        aria-label="Property photo gallery"
        aria-roledescription="carousel"
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`${alt} — photo ${current + 1} of ${images.length}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-bg/80 text-text shadow-soft backdrop-blur-sm transition-colors hover:bg-bg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-bg/80 text-text shadow-soft backdrop-blur-sm transition-colors hover:bg-bg"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-text backdrop-blur-sm">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Gallery thumbnails"
        >
          {images.map((src, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`View photo ${i + 1}`}
              onClick={() => go(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-150 ${
                i === current ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
