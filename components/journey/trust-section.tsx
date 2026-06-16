import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { TRUST_LOGOS } from "@/lib/constants";

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="bg-white px-4 py-10 md:py-12"
    >
      <FadeIn className="mx-auto max-w-[727px] text-center">
        <p
          id="trust-heading"
          className="text-[13px] font-normal text-[#494949]"
        >
          Professoring my journey at
        </p>

        <ul
          className="mt-9 flex flex-wrap items-center justify-center gap-[34px]"
          aria-label="Partner universities"
        >
          {TRUST_LOGOS.map((logo) => (
            <li key={logo.name}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-auto w-auto max-h-10 object-contain opacity-60 grayscale md:max-h-11"
              />
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
