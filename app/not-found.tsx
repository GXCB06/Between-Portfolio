import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <div className="flex flex-col items-center gap-6">
        {/* Large 404 number */}
        <p className="text-[120px] font-bold leading-none tracking-[-0.04em] text-black md:text-[160px]">
          404
        </p>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-black md:text-[36px]">
            Page not found
          </h1>
          <p className="max-w-[360px] text-[16px] leading-[1.6] text-[#494949]">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-[41px] min-w-[137px] items-center justify-center rounded-full bg-black px-5 text-[13px] font-semibold text-white transition-all hover:bg-black/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Back to home
          </Link>
          <a
            href="https://www.openlink.co/gxcb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[41px] min-w-[137px] items-center justify-center rounded-full border border-[#D1D1D1] bg-white px-5 text-[13px] font-semibold text-black transition-all hover:bg-[#FAFAFA] hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact me
          </a>
        </div>
      </div>
    </main>
  );
}
