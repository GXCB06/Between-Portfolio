import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-20 md:py-28">
      <h1 className="text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-black md:text-[48px]">
        Privacy Policy
      </h1>
      <p className="mt-4 text-[15px] text-[#494949]">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="mt-10 space-y-8 text-[16px] leading-[1.7] text-[#333333]">
        <section>
          <h2 className="text-[22px] font-semibold text-black">
            1. Information We Collect
          </h2>
          <p className="mt-3">
            This portfolio website (<strong>Between</strong>) is a personal
            portfolio site. We do not collect any personal data directly. Any
            contact or interaction is handled through third-party platforms
            (e.g., openlink.co) that have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-black">
            2. Analytics
          </h2>
          <p className="mt-3">
            We use Vercel Analytics to collect anonymous, aggregated usage data
            (page views, device types, and general location). No personally
            identifiable information is stored. You can learn more at{" "}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-black">3. Cookies</h2>
          <p className="mt-3">
            This site does not use any tracking cookies or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-black">4. Contact</h2>
          <p className="mt-3">
            For any questions regarding this privacy policy, please reach out
            via{" "}
            <a
              href="https://www.openlink.co/gxcb"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black"
            >
              my contact page
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="text-[14px] font-semibold text-black underline-offset-2 hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
