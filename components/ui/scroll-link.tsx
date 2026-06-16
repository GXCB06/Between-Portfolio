"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { scrollToPortfolioShowcase } from "@/lib/links";

interface ScrollLinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ScrollToPortfolioLink({
  children,
  className,
  onClick,
}: ScrollLinkProps) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToPortfolioShowcase();
        onClick?.();
      }}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
