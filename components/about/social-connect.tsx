import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { CONTACT_URL, EXTERNAL_LINK_PROPS } from "@/lib/links";

const imageSocials = [
  {
    name: "Facebook",
    src: "/assets/contact-logos/Facebook_Logo_(2019).png",
    width: 31,
    height: 31,
  },
  {
    name: "Line",
    src: "/assets/contact-logos/LINE_New_App_Icon_(2020-12).png",
    width: 35,
    height: 35,
  },
  {
    name: "Instagram",
    src: "/assets/contact-logos/Instagram_icon.png",
    width: 35,
    height: 32,
  },
] as const;

export function SocialConnect() {
  return (
    <section
      aria-label="Social connect"
      className="flex justify-center bg-white px-4 pb-16 pt-4 md:pb-20"
    >
      <FadeIn className="flex w-[312px] flex-col items-center gap-4">
        <p className="w-full text-center text-[15px] font-medium leading-[25px] text-[#555556]">
          Let&apos;s connect on
        </p>
        <ul className="flex w-full items-center justify-between">
          {imageSocials.map((social) => (
            <li key={social.name}>
              <Link
                href={CONTACT_URL}
                {...EXTERNAL_LINK_PROPS}
                aria-label={social.name}
                className="flex items-center justify-center transition-transform hover:scale-105"
              >
                <Image
                  src={social.src}
                  alt=""
                  width={social.width}
                  height={social.height}
                  className="object-contain"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={CONTACT_URL}
              {...EXTERNAL_LINK_PROPS}
              aria-label="Gmail"
              className="flex h-[33px] w-[33px] items-center justify-center text-black transition-transform hover:scale-105"
            >
              <Mail className="h-[33px] w-[33px]" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </FadeIn>
    </section>
  );
}
