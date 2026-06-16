"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";
import {
  CONTACT_URL,
  EXTERNAL_LINK_PROPS,
  PORTFOLIO_ARCHIVE_URL,
} from "@/lib/links";

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="bg-white px-4 py-12 md:py-16">
      <FadeIn className="mx-auto max-w-[1015px]">
        <motion.div
          className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[26px] bg-black px-6 py-8 md:flex-row md:items-center md:px-[55px] md:py-[27px]"
        >
          <h2
            id="cta-heading"
            className="max-w-[376px] text-left text-[18px] font-semibold leading-[1.4] text-white sm:text-[21px] sm:leading-[25px]"
          >
            See My Work In Action. Start Our Creative Journey Together.
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={CONTACT_URL}
              {...EXTERNAL_LINK_PROPS}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-[31px] rounded-full px-4 text-[15px] font-normal"
              )}
            >
              Get In Touch
            </Link>
            <Link
              href={PORTFOLIO_ARCHIVE_URL}
              {...EXTERNAL_LINK_PROPS}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-[31px] rounded-full px-4 text-[15px] font-normal"
              )}
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </FadeIn>
    </section>
  );
}
