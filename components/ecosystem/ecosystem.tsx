"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";
import { ECOSYSTEM_LOGOS, ECOSYSTEM_STATS } from "@/lib/constants";

const SECTION_TOP = 1373;
const SECTION_HEIGHT = 665;

export function Ecosystem() {
  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="relative overflow-hidden bg-white px-4 py-16 md:py-20"
    >
      <FadeIn className="relative mx-auto w-full max-w-[1440px]">
        <div className="relative mx-auto h-[320px] max-w-[905px] sm:h-[420px] md:h-[520px] lg:h-[665px]">
          {ECOSYSTEM_LOGOS.map((logo, index) => {
            const topPct = ((logo.y - SECTION_TOP) / SECTION_HEIGHT) * 100;
            const leftPct = (logo.x / 1440) * 100;
            const size = logo.size;
            const height = "height" in logo ? logo.height : size;

            return (
              <motion.div
                key={logo.name}
                className="absolute hidden md:block"
                style={{
                  top: `${topPct}%`,
                  left: `${leftPct}%`,
                  width: size,
                  height,
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.div
                  className="h-full w-full rounded-[14px] bg-white p-1 shadow-[0_0_8px_rgba(0,0,0,0.03),0_1px_17px_rgba(0,0,0,0.08)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3.5 + (index % 3) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    width={size}
                    height={height}
                    className="h-full w-full rounded-[14px] object-contain"
                  />
                </motion.div>
              </motion.div>
            );
          })}

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <motion.p
              className="mb-2 text-[21px] font-semibold text-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              A growing journey of
            </motion.p>
            <h2 id="ecosystem-heading" className="sr-only">
              Experience Ecosystem
            </h2>
            <div className="flex flex-col items-center gap-0">
              {ECOSYSTEM_STATS.map((stat, index) => (
                <motion.p
                  key={stat.label}
                  className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-black sm:text-[48px] md:text-[73px]"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {stat.value} {stat.label}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:hidden">
          {ECOSYSTEM_LOGOS.slice(0, 8).map((logo) => (
            <div
              key={logo.name}
              className="rounded-lg border border-[#ECECEC] bg-white p-2"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
