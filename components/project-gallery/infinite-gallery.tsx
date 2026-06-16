"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

function GalleryCard({
  item,
  index,
  x,
  containerWidth,
}: {
  item: PortfolioItem;
  index: number;
  x: MotionValue<number>;
  containerWidth: number;
}) {
  const scale = useTransform(x, (latest) => {
    const cardCenter = index * CARD_STRIDE + CARD_WIDTH / 2 + latest;
    const distance = Math.abs(cardCenter - containerWidth / 2);
    const focus = Math.max(0, 1 - distance / (containerWidth * 0.45));
    return 0.92 + focus * 0.13;
  });

  const opacity = useTransform(x, (latest) => {
    const cardCenter = index * CARD_STRIDE + CARD_WIDTH / 2 + latest;
    const distance = Math.abs(cardCenter - containerWidth / 2);
    const focus = Math.max(0, 1 - distance / (containerWidth * 0.45));
    return 0.75 + focus * 0.25;
  });

  return (
    <motion.article
      style={{ scale, opacity }}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[10px] bg-white",
        "shadow-[0_0_4px_rgba(0,0,0,0.25)] will-change-transform"
      )}
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
        />
      </div>
    </motion.article>
  );
}

export function InfiniteGallery({ items, categoryKey }: InfiniteGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const loopItems = [...items, ...items, ...items];
  const singleSetWidth = items.length * CARD_STRIDE;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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

  useEffect(() => {
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused && !isDraggingRef.current && singleSetWidth > 0) {
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
  }, [isPaused, normalizePosition, singleSetWidth, x]);

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/80 to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/80 to-transparent md:w-20" />

      <motion.div
        drag="x"
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x }}
        onDragStart={() => {
          isDraggingRef.current = true;
          setIsPaused(true);
        }}
        onDragEnd={() => {
          x.set(normalizePosition(x.get()));
          isDraggingRef.current = false;
          setIsPaused(false);
        }}
        className="flex cursor-grab gap-6 active:cursor-grabbing"
      >
        {loopItems.map((item, index) => (
          <GalleryCard
            key={`${categoryKey}-${item.id}-${index}`}
            item={item}
            index={index}
            x={x}
            containerWidth={containerWidth}
          />
        ))}
      </motion.div>
    </div>
  );
}
