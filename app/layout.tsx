import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const OG_IMAGE_URL = `${SITE_CONFIG.url}/assets/homepage-portfolio-example/1.png`;

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  // Canonical URL — prevents duplicate-content penalties if served on multiple domains
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 900,
        height: 1200,
        alt: "Between Portfolio — Chawankorn Bouraphan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    // Explicitly set twitter:image (previously missing from metadata object)
    images: [
      {
        url: OG_IMAGE_URL,
        width: 900,
        height: 1200,
        alt: "Between Portfolio — Chawankorn Bouraphan",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data for search engines (Person + WebSite schema)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/#person`,
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
      jobTitle: SITE_CONFIG.author.role,
      description: SITE_CONFIG.author.bio,
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Chulalongkorn University",
      },
      knowsAbout: [
        "Educational Innovation",
        "UX/UI Design",
        "Science of Learning",
        "Product Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: { "@id": `${SITE_CONFIG.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data — Person + WebSite schema for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {/* Skip to main content — visible on :focus for keyboard/screen-reader users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
