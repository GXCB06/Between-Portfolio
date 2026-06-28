import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-20 md:py-28">
      <h1 className="text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-black md:text-[48px]">
        Terms of Use
      </h1>
      <p className="mt-4 text-[15px] text-[#494949]">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="mt-10 space-y-8 text-[16px] leading-[1.7] text-[#333333]">
        <section>
          <h2 className="text-[22px] font-semibold text-black">
            1. Acceptance of Terms
          </h2>
          <p className="mt-3">
            By accessing or using the <strong>Between</strong> portfolio website
            at{" "}
            <a
              href="https://between-portfolio.vercel.app"
              className="underline hover:text-black"
            >
              between-portfolio.vercel.app
            </a>
            , you agree to be bound by these Terms of Use.
          </p>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-black">
            2. Intellectual Property
          </h2>
          <p className="mt-3">
            All content on this website — including text, images, designs, and
            project materials — is the intellectual property of Chawankorn
            Bouraphan unless otherwise stated. You may not reproduce, distribute,
            or use this content without explicit written permission.
          </p>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-black">
            3. Disclaimer
          </h2>
          <p className="mt-3">
            This website is provided &quot;as is&quot; without any warranties of any
            kind. The owner is not liable for any damages resulting from the use
            of this website.
          </p>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-black">
            4. External Links
          </h2>
          <p className="mt-3">
            This website may contain links to external sites. We are not
            responsible for the content or privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-black">
            5. Changes to Terms
          </h2>
          <p className="mt-3">
            These terms may be updated at any time. Continued use of the site
            after any changes constitutes acceptance of the new terms.
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
