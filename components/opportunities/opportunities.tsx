"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import { OPPORTUNITIES } from "@/lib/constants";
import { OPPORTUNITIES_SECTION_ID } from "@/lib/links";

export function Opportunities() {
  return (
    <section
      id={OPPORTUNITIES_SECTION_ID}
      aria-labelledby="opportunities-heading"
      className="scroll-mt-28 bg-white px-4 py-16 md:py-20"
    >
      <FadeIn className="mx-auto max-w-[464px] text-center">
        <p className="text-[18px] font-semibold leading-[25px] text-[#FE0D84] sm:text-[21px]">
          CURRENTLY
        </p>
        <h2
          id="opportunities-heading"
          className="mx-auto mt-6 max-w-[420px] text-[38px] font-bold leading-[1.21] text-black sm:mt-[33px] sm:text-[48px]"
        >
          I&apos;m looking for
        </h2>
        <p className="mx-auto mt-4 max-w-[371px] text-[17px] font-medium leading-[25px] text-[#5C5C5C] sm:text-[21px]">
          People to build, learn, and grow with.
        </p>
      </FadeIn>

      <FadeIn className="mx-auto mt-8 max-w-[1015px] rounded-[22px] bg-[rgba(238,238,238,0.38)] px-4 py-4 sm:mt-[38px] sm:px-[27px] sm:py-[19px]">
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-stretch md:justify-center md:gap-[10px]">
          {OPPORTUNITIES.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
