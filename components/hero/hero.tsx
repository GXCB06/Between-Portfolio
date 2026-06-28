"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ScrollToPortfolioLink } from "@/components/ui/scroll-link";
import { cn } from "@/lib/utils";
import { OPPORTUNITIES_SECTION_ID } from "@/lib/links";
import { StaggerContainer, StaggerItem } from "@/components/motion/fade-in";

const cardShadow = "shadow-[0_10px_30px_rgba(0,0,0,0.08)]";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white px-4 pb-16 pt-[110px] md:pb-28 md:pt-[160px]"
    >
      <StaggerContainer className="mx-auto flex max-w-[712px] flex-col items-center text-center">
        <StaggerItem>
          <Image
            src="/assets/Between-logo/Between-logo-removebg-figma.png"
            alt="Between logo"
            width={83}
            height={82}
            className="mb-8 h-[82px] w-[83px] rounded-2xl object-contain"
            priority
          />
        </StaggerItem>

        <StaggerItem>
          <h1
            id="hero-heading"
            className="w-full max-w-[712px] text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[48px] md:text-[74px]"
          >
            Discover real-world learning inspiration
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-4 max-w-[613px] px-2 text-[15px] font-normal leading-[1.6] text-[#494949] sm:mt-5 sm:px-0 sm:text-[17px]">
            Building learning systems, digital products, and educational
            innovation through language, leadership, and design.
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ScrollToPortfolioLink
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-[41px] min-w-[137px] rounded-[43.5px] px-4 text-[13px] font-semibold shadow-[-1px_4px_28px_rgba(0,0,0,0.25)]"
              )}
            >
              View my portfolio
            </ScrollToPortfolioLink>
            {/* Anchor with href fallback for no-JS environments; onClick smooth-scrolls when JS is available */}
            <a
              href={`#${OPPORTUNITIES_SECTION_ID}`}
              onClick={(e) => {
                e.preventDefault();
                import("@/lib/links").then(({ scrollToOpportunities }) =>
                  scrollToOpportunities()
                );
              }}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-[41px] min-w-[148px] rounded-[43.5px] border-[#D1D1D1] px-4 text-[13px] font-semibold text-black"
              )}
            >
              View my plans
            </a>
          </div>
        </StaggerItem>

        <StaggerItem className="relative mt-14 w-full max-w-[828px] md:mt-16">
          <div className="relative mx-auto aspect-[828/497] w-full">
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 0, scale: 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ transformOrigin: "bottom center" }}
              className={cn(
                "absolute left-[31.8%] top-0 z-20 h-[94.8%] w-[40.2%] overflow-hidden rounded-t-[6px] bg-white",
                cardShadow
              )}
            >
              <Image
                src="/assets/homepage-portfolio-example/1.png"
                alt="Featured portfolio cover"
                fill
                sizes="(max-width: 768px) 40vw, 333px"
                className="object-cover object-top"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -4, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, rotate: -4, scale: 0.94 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{ transformOrigin: "bottom center" }}
              className={cn(
                "absolute left-0 top-[17.7%] z-10 h-[82.3%] w-[37.7%] overflow-hidden rounded-t-[6px] bg-white",
                cardShadow
              )}
            >
              <Image
                src="/assets/homepage-portfolio-example/2.png"
                alt="Portfolio page preview left"
                fill
                sizes="(max-width: 768px) 35vw, 312px"
                className="object-cover object-top"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 4, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, rotate: 4, scale: 0.94 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ transformOrigin: "bottom center" }}
              className={cn(
                "absolute left-[62.3%] top-[16.9%] z-10 h-[82.3%] w-[37.7%] overflow-hidden rounded-t-[6px] bg-white",
                cardShadow
              )}
            >
              <Image
                src="/assets/homepage-portfolio-example/3.jpg"
                alt="Portfolio page preview right"
                fill
                sizes="(max-width: 768px) 35vw, 312px"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
