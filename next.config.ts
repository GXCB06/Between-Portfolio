import type { NextConfig } from "next";

const securityHeaders = [
  {
    // Content Security Policy — prevents XSS by controlling resource sources
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for its runtime style injections
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Next.js inline scripts + Vercel Analytics
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self, data URIs (Next.js placeholders), and Vercel image CDN
      "img-src 'self' data: blob: https://between-portfolio.vercel.app",
      // Connect: Vercel Analytics reporting endpoint
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      // No frames, objects, or base-uri overrides
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  {
    // Prevent clickjacking by disallowing iframe embedding
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Prevent MIME-type sniffing
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Control referrer information sent with requests
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Opt into browser XSS filtering (legacy browsers)
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    // Restrict browser features/permissions
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Enforce HTTPS
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  eslint: {
    // Re-enabled: lint errors must be fixed before building
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
