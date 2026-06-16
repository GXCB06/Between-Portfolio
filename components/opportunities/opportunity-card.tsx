"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InfographicModal } from "@/components/opportunities/infographic-modal";
import type { OPPORTUNITIES } from "@/lib/constants";

type Opportunity = (typeof OPPORTUNITIES)[number];

// Map card id → infographic public path
const INFOGRAPHIC_MAP: Record<string, string> = {
  hackathon:
    "/assets/infographic-card/Hackathon%20Infographic.png",
  learners:
    "/assets/infographic-card/Aspiring%20Learner%20Infographic.png",
  internship:
    "/assets/infographic-card/Internship%20Infographic.png",
};

interface OpportunityCardProps {
  item: Opportunity;
}

export function OpportunityCard({ item }: OpportunityCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const infographicSrc = INFOGRAPHIC_MAP[item.id] ?? "";

  return (
    <>
      <article
        className="relative flex w-full shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[16px] bg-white p-4 shadow-[0_1px_20px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_28px_rgba(0,0,0,0.14)] md:max-w-[325px]"
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${item.title} infographic`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setModalOpen(true);
          }
        }}
      >
        {/* Top row: icon column + text column */}
        <div className="flex gap-3">
          {/* Left: icon column */}
          <div className="flex w-[80px] shrink-0 flex-col gap-2 sm:w-[100px]">
            {/* Large icon(s) */}
            <div className="flex gap-2">
              {item.largeIcons.map((icon) => (
                <div
                  key={icon.src}
                  className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-[10px] bg-white shadow-[0_1px_12px_rgba(0,0,0,0.12)]"
                >
                  <Image
                    src={icon.src}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>

            {/* Cluster row */}
            {item.clusterIcons.length > 0 && (
              <div className="flex items-center gap-1.5 rounded-[8px] bg-white px-2 py-1.5 shadow-[0_1px_14px_rgba(0,0,0,0.12)]">
                {item.clusterIcons.map((icon) => (
                  <Image
                    key={icon.src}
                    src={icon.src}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] shrink-0 object-contain"
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: text column */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
            {/* Status badge */}
            <div
              className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ backgroundColor: item.statusBg }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.statusDot }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] font-semibold leading-none tracking-wide"
                style={{ color: item.statusText }}
              >
                {item.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[15px] font-bold leading-[1.2] text-black">
              {item.title}
            </h3>

            {/* Tagline */}
            <p
              className="text-[12px] font-semibold leading-[1.3]"
              style={{ color: item.taglineColor }}
            >
              {item.tagline}
            </p>

            {/* Description */}
            <p className="text-[12px] font-medium leading-[1.5] text-[#5A5959]">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom row: tags + arrow button */}
        <div className="mt-3 flex items-end justify-between gap-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none"
                style={{
                  backgroundColor: item.tagBg,
                  color: item.tagText,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow button — stops propagation so card click still works */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            aria-label={`View ${item.title} infographic`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_1px_12px_rgba(139,139,139,0.28)] transition-all hover:scale-105 hover:shadow-[0_2px_16px_rgba(0,0,0,0.18)]"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </article>

      {/* Infographic modal */}
      <InfographicModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={infographicSrc}
        title={`${item.title} — Infographic`}
      />
    </>
  );
}
