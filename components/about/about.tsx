import Image from "next/image";
import { Check, Lightbulb } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { CURRENT_WORK, ECOSYSTEM_STATS, FOCUS_AREAS, SITE_CONFIG } from "@/lib/constants";
import { ABOUT_SECTION_ID } from "@/lib/links";


export function About() {
  const { author } = SITE_CONFIG;

  return (
    <section
      id={ABOUT_SECTION_ID}
      aria-labelledby="about-heading"
      className="scroll-mt-28 bg-white px-4 py-16 md:py-20"
    >
      <FadeIn className="relative mx-auto w-full max-w-[695px]">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-6">
          <div className="relative h-[142px] w-[142px] overflow-hidden rounded-full border border-[#ECECEC] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <Image
              src="/assets/myself-photo/profile-photo.jpg"
              alt={`${author.name} profile photo`}
              fill
              sizes="142px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <article className="mt-[88px] rounded-[34px] bg-white px-4 pb-6 pt-[124px] shadow-[0_0_10.8px_-2px_rgba(0,0,0,0.25)] sm:px-6 md:px-10 md:pb-7">
          <div className="flex flex-col items-center text-center">
            <h2
              id="about-heading"
              className="w-full text-[32px] font-bold leading-[36px] tracking-[-0.01em] text-[#5C5C5C]"
            >
              {author.name}
            </h2>
            <p className="mt-2 w-full text-[20px] font-medium leading-[21px] text-[#FC0E82]">
              {author.role}
            </p>

            <div className="mt-5 flex w-full justify-center">
              <div className="inline-flex h-[41px] items-center gap-2 rounded-[21px] bg-[#FEEFF6] px-3 py-1.5">
                <Image
                  src="/assets/uniserity-logo/CU.jpg"
                  alt="Chulalongkorn University"
                  width={67}
                  height={35}
                  className="h-[35px] w-[67px] shrink-0 rounded-[19.5px] object-cover"
                />
                <span className="whitespace-nowrap text-[12px] font-bold leading-[21px] text-[#FD1587]">
                  {author.university}
                </span>
              </div>
            </div>

            <p className="mx-auto mt-5 max-w-[416px] text-center text-[16px] font-normal leading-[21px] text-black">
              {author.bio}
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-[404px] border-t border-[#EDEDED] pt-7">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1px_1fr] md:gap-6">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#FEEFF3]">
                    <Check
                      className="h-[22px] w-[22px] text-black"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="text-[20px] font-semibold leading-[21px] text-black">
                    Focus areas
                  </h3>
                </div>
                <ul className="space-y-2.5 pl-3">
                  {FOCUS_AREAS.map((area) => (
                    <li
                      key={area}
                      className="flex items-center gap-2.5 text-[13px] font-medium leading-[21px] text-black"
                    >
                      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#FC0E82]" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="hidden w-px bg-[#EDEDED] md:block"
                aria-hidden="true"
              />

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#FEEFF3]">
                    <Lightbulb
                      className="h-[22px] w-[22px] text-black"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="text-[20px] font-semibold leading-[21px] text-black">
                    Currently
                  </h3>
                </div>
                <p className="pl-3 text-[16px] font-normal leading-[21px] text-black">
                  {CURRENT_WORK}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats strip */}
          <div className="mx-auto mt-7 w-full max-w-[425px] border-t border-[#EDEDED] pt-6">
            <div className="flex items-center justify-around">
              {ECOSYSTEM_STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[28px] font-bold leading-none tracking-[-0.02em] text-black sm:text-[32px]">
                      {stat.value}
                    </span>
                    <span className="text-[12px] font-medium capitalize text-[#8C8C8C]">
                      {stat.label}
                    </span>
                  </div>
                  {i < ECOSYSTEM_STATS.length - 1 && (
                    <span
                      className="ml-4 mr-0 h-8 w-px shrink-0 bg-[#EDEDED] sm:ml-6"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </article>
      </FadeIn>
    </section>
  );
}
