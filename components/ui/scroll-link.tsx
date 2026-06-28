"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { scrollToPortfolioShowcase, PORTFOLIO_SECTION_ID } from "@/lib/links";

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
    // Anchor with href fallback: navigates to section without JS; onClick smooth-scrolls when JS available
    <a
      href={`#${PORTFOLIO_SECTION_ID}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToPortfolioShowcase();
        onClick?.();
      }}
      className={cn(className)}
    >
      {children}
    </a>
  );
}
