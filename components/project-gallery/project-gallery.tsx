"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { InfiniteGallery } from "@/components/project-gallery/infinite-gallery";
import {
  EXTERNAL_LINK_PROPS,
  PORTFOLIO_ARCHIVE_URL,
  PORTFOLIO_SECTION_ID,
} from "@/lib/links";
import type { PortfolioCategory, PortfolioCategoryKey } from "@/lib/portfolio-types";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  categories: PortfolioCategory[];
}

export function ProjectGallery({ categories }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategoryKey>("portfolio");

  const currentCategory =
    categories.find((category) => category.key === activeCategory) ??
    categories[0];

  if (!currentCategory) return null;

  return (
    <section
      id={PORTFOLIO_SECTION_ID}
      aria-labelledby="projects-heading"
      className="scroll-mt-28 overflow-hidden bg-white px-4 py-16 md:py-20"
    >
      <FadeIn className="mx-auto max-w-[464px] text-center">
        <h2
          id="projects-heading"
          className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-black sm:text-[36px] md:text-[48px]"
        >
          Explore my projects
          <br />
          in seconds.
        </h2>
      </FadeIn>

      <div className="mx-auto mt-8 flex justify-center">
        <div
          className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-[26px] bg-[#F0F0F0] p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Project categories"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              role="tab"
              aria-selected={activeCategory === category.key}
              onClick={() => setActiveCategory(category.key)}
              className={cn(
                "whitespace-nowrap rounded-[21px] px-3 py-2 text-[12px] font-semibold transition-all duration-300 sm:px-4",
                activeCategory === category.key
                  ? "bg-white text-[#494949] shadow-sm"
                  : "text-[#ADADAD] hover:text-[#666666]"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-12" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {currentCategory.items.length > 0 ? (
              <InfiniteGallery
                items={currentCategory.items}
                categoryKey={activeCategory}
              />
            ) : (
              <p className="py-12 text-center text-sm text-[#666666]">
                No portfolio images found in {currentCategory.folder}.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href={PORTFOLIO_ARCHIVE_URL}
          {...EXTERNAL_LINK_PROPS}
          className="group inline-flex items-center gap-2 text-[21px] font-semibold text-black"
        >
          View all projects
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
