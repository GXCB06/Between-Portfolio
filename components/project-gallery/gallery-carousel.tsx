"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import type { PortfolioItem } from "@/lib/portfolio-types";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 277;
const CARD_HEIGHT = 392;
const CARD_GAP = 24;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;
const CARD_WIDTH_MOBILE = 200;
const CARD_HEIGHT_MOBILE = 284;
const SCROLL_SPEED = 0.55;

interface InfiniteGalleryProps {
  items: PortfolioItem[];
  categoryKey: string;
}

/**
 * Memoized gallery card — prevents re-renders when parent state changes.
 * Uses pure CSS for visual effects instead of per-card JS useTransform callbacks.
 */
const GalleryCard = memo(function GalleryCard({
  item,
}: {
  item: PortfolioItem;
}) {
  return (
    <article
      className={cn(
        "gallery-card relative shrink-0 overflow-hidden rounded-[10px] bg-white",
        "shadow-[0_0_4px_rgba(0,0,0,0.25)]"
      )}
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {/* Mobile size */}
      <div
        className="relative overflow-hidden md:hidden"
        style={{ width: CARD_WIDTH_MOBILE, height: CARD_HEIGHT_MOBILE }}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="200px"
          className="object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>
      {/* Desktop size */}
      <div
        className="relative hidden overflow-hidden md:block"
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="277px"
          className="object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>
    </article>
  );
});

export function InfiniteGallery({ items, categoryKey }: InfiniteGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  // containerWidth state — value not consumed; setter kept to trigger re-render on resize
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_containerWidth, setContainerWidth] = useState(1200);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Stabilize the tripled items array — only recalculate when items change
  const loopItems = useMemo(
    () => [...items, ...items, ...items],
    [items]
  );
  const singleSetWidth = items.length * CARD_STRIDE;

  // Debounced resize handler
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const measure = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      }, 100);
    };
    // Initial measure (immediate)
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Reset position on category change
  useEffect(() => {
    if (singleSetWidth > 0) {
      x.set(-singleSetWidth);
    }
  }, [categoryKey, singleSetWidth, x]);

  const normalizePosition = useCallback(
    (value: number) => {
      if (singleSetWidth <= 0) return value;
      let next = value;
      while (next <= -singleSetWidth * 2) next += singleSetWidth;
      while (next > -singleSetWidth) next -= singleSetWidth;
      return next;
    },
    [singleSetWidth]
  );

  // Single RAF loop — drives the auto-scroll. No per-card JS transforms.
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPausedRef.current && !isDraggingRef.current && singleSetWidth > 0) {
        const next = normalizePosition(
          x.get() - SCROLL_SPEED * (delta / 16.67)
        );
        x.set(next);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [normalizePosition, singleSetWidth, x]);

  const handlePause = useCallback(() => { isPausedRef.current = true; }, []);
  const handleResume = useCallback(() => { isPausedRef.current = false; }, []);

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-2"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/80 to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/80 to-transparent md:w-20" />

      <motion.div
        drag="x"
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x, willChange: "transform", transform: "translateZ(0)" }}
        onDragStart={() => {
          isDraggingRef.current = true;
          isPausedRef.current = true;
        }}
        onDragEnd={() => {
          x.set(normalizePosition(x.get()));
          isDraggingRef.current = false;
          isPausedRef.current = false;
        }}
        className="flex cursor-grab gap-6 active:cursor-grabbing"
      >
        {loopItems.map((item, index) => (
          <GalleryCard
            key={`${categoryKey}-${item.id}-${index}`}
            item={item}
          />
        ))}
      </motion.div>
    </div>
  );
}
