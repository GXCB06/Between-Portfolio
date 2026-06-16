"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface InfographicModalProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

function pinchDist(e: React.TouchEvent): number {
  return Math.hypot(
    e.touches[0].clientX - e.touches[1].clientX,
    e.touches[0].clientY - e.touches[1].clientY
  );
}

export function InfographicModal({
  open,
  onClose,
  imageSrc,
  title,
}: InfographicModalProps) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Refs for gesture tracking
  const lastPinchDist = useRef<number | null>(null);
  const lastTap = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateAtDragStart = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  // Reset zoom when modal opens/closes
  useEffect(() => {
    if (!open) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    }
  }, [open]);

  // ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  // ── Touch handlers ──────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      lastPinchDist.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else if (e.touches.length === 1) {
      // Pan start
      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      translateAtDragStart.current = { x: 0, y: 0 }; // will be read at move time

      // Double-tap to reset / zoom
      const now = Date.now();
      if (now - lastTap.current < 300) {
        // Double tap
        setScale((s) => {
          const next = s > 1.1 ? 1 : 2.5;
          if (next === 1) setTranslate({ x: 0, y: 0 });
          return next;
        });
      }
      lastTap.current = now;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault(); // prevent page scroll while interacting
      if (e.touches.length === 2 && lastPinchDist.current !== null) {
        // Pinch zoom
        const newDist = pinchDist(e);
        const delta = newDist / lastPinchDist.current;
        lastPinchDist.current = newDist;
        setScale((s) => clamp(s * delta, MIN_SCALE, MAX_SCALE));
      } else if (e.touches.length === 1 && isDragging.current) {
        // Pan — only allowed when zoomed in
        if (scaleRef.current <= 1) return;
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
        dragStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    },
    []
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastPinchDist.current = null;
    }
    if (e.touches.length === 0) {
      isDragging.current = false;
      // Snap back to center if scale is at 1
      setScale((s) => {
        if (s <= 1) {
          setTranslate({ x: 0, y: 0 });
          return 1;
        }
        return s;
      });
    }
  }, []);

  // ── Zoom buttons (desktop / accessibility) ───────────────
  const zoomIn = () => setScale((s) => clamp(s * 1.4, MIN_SCALE, MAX_SCALE));
  const zoomOut = () => {
    setScale((s) => {
      const next = clamp(s / 1.4, MIN_SCALE, MAX_SCALE);
      if (next <= 1) setTranslate({ x: 0, y: 0 });
      return next;
    });
  };

  const handleBackdropClick = () => {
    if (scale > 1) {
      // First click when zoomed: reset zoom rather than close
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* ── Top-right controls: zoom + close ── */}
          <motion.div
            key="controls"
            className="fixed right-3 top-3 z-[60] flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 1}
              aria-label="Zoom out"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm transition-all hover:bg-white disabled:opacity-40"
            >
              <ZoomOut className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= MAX_SCALE}
              aria-label="Zoom in"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm transition-all hover:bg-white disabled:opacity-40"
            >
              <ZoomIn className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm transition-all hover:bg-white"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </motion.div>

          {/* ── Hint pill ── */}
          <motion.div
            key="hint"
            className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-white/20 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-md"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, delay: 0.3 }}
          >
            {scale > 1
              ? "Pinch · drag to pan · tap backdrop to reset"
              : "Pinch to zoom · double-tap · ESC to close"}
          </motion.div>

          {/* ── Image container with touch handlers ── */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4 py-4"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "none" }}
          >
            {/* Entry animation wrapper */}
            <motion.div
              key="modal-entry"
              className="w-full max-w-[960px]"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom + pan transform layer */}
              <div
                style={{
                  transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                  transformOrigin: "center center",
                  cursor: scale > 1 ? "grab" : "default",
                  transition: isDragging.current
                    ? "none"
                    : "transform 0.15s ease-out",
                  willChange: "transform",
                }}
              >
                <Image
                  src={imageSrc}
                  alt={title}
                  width={960}
                  height={1200}
                  className="h-auto w-full rounded-2xl object-contain shadow-[0_32px_96px_rgba(0,0,0,0.35)]"
                  priority
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
