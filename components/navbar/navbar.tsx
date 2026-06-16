"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS, type NavAction } from "@/lib/constants";
import {
  CONTACT_URL,
  EXTERNAL_LINK_PROPS,
  scrollToAbout,
  scrollToOpportunities,
  scrollToPortfolioShowcase,
} from "@/lib/links";

const navActions: Record<NavAction, () => void> = {
  portfolio: scrollToPortfolioShowcase,
  plan: scrollToOpportunities,
  about: scrollToAbout,
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavAction = (action: NavAction) => {
    navActions[action]();
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "grid h-[52px] w-full max-w-[543px] grid-cols-[auto_auto] items-center justify-between gap-2 md:grid-cols-[auto_1fr_auto] md:h-[57px]",
            "rounded-[55px] bg-[rgba(242,242,242,0.85)] px-4 sm:px-6",
            "shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl"
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            className="shrink-0 text-[18px] font-bold leading-none tracking-[-0.01em] text-black sm:text-[20px]"
            aria-label="Between home"
          >
            Between
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center justify-center gap-4 md:flex lg:gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => handleNavAction(link.action)}
                  className="text-[14px] font-semibold text-black transition-opacity hover:opacity-70 lg:text-[15px]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href={CONTACT_URL}
              {...EXTERNAL_LINK_PROPS}
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden h-[38px] min-w-[110px] rounded-[63px] px-3 text-[13px] font-semibold md:flex md:h-[41px] md:min-w-[118px] md:px-[13px] md:text-[14px]"
              )}
            >
              Build with me
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white md:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-menu"
              className="fixed inset-x-4 top-[72px] z-40 overflow-hidden rounded-[24px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.16)]"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex flex-col divide-y divide-[#F2F2F2] px-5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => handleNavAction(link.action)}
                      className="w-full py-4 text-left text-[16px] font-semibold text-black"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#F2F2F2] p-4">
                <Link
                  href={CONTACT_URL}
                  {...EXTERNAL_LINK_PROPS}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full rounded-[63px] text-[15px] font-semibold"
                  )}
                >
                  Build with me
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
