"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import {
  CONTACT_URL,
  EXTERNAL_LINK_PROPS,
  scrollToHero,
  scrollToPortfolioShowcase,
} from "@/lib/links";

export function Footer() {
  return (
    <footer className="bg-[#111111] px-5 py-10 text-white sm:px-8 md:px-[80px] md:py-12 lg:px-[139px]">
      <div className="mx-auto grid max-w-[1093px] gap-8 md:grid-cols-[1fr_auto_auto] md:gap-x-16 lg:gap-x-24">
        <div>
          <Link href="/" aria-label="Between home" className="inline-block">
            <Image
              src="/assets/Between-logo/Between-logo-removebg-figma.png"
              alt=""
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded-[10px] object-contain"
              aria-hidden="true"
            />
          </Link>
          <p className="mt-7 max-w-[280px] text-[15px] font-medium leading-[22px] text-[#ADADAD]">
            Get to know my life portfolio with Between.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="md:pt-1">
          <ul className="flex flex-col gap-9">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                {link.action === "external" && "href" in link ? (
                  <Link
                    href={link.href}
                    {...EXTERNAL_LINK_PROPS}
                    className="text-[16px] font-semibold leading-[24px] text-white transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                ) : link.action === "hero" ? (
                  <button
                    type="button"
                    onClick={scrollToHero}
                    className="text-[16px] font-semibold leading-[24px] text-white transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={scrollToPortfolioShowcase}
                    className="text-[16px] font-semibold leading-[24px] text-white transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:pt-1">
          <p className="text-[16px] font-semibold leading-[24px] text-white">
            Connect
          </p>
          <ul className="mt-9 flex flex-col gap-9">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <Link
                  href={CONTACT_URL}
                  {...EXTERNAL_LINK_PROPS}
                  className="text-[16px] font-semibold leading-[24px] text-white transition-colors hover:text-white/80"
                >
                  {social.name === "Instagram" ? "Instragram" : social.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1093px] flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[14px] font-medium leading-[24px] text-[#ADADAD] md:flex-row md:items-center">
        <p>&copy; Between {new Date().getFullYear()}. All rights reserved</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white/80">
            Privacy policy
          </Link>
          <Link href="#" className="hover:text-white/80">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
