import {
  ABOUT_SECTION_ID,
  CONTACT_URL,
  HERO_SECTION_ID,
  OPPORTUNITIES_SECTION_ID,
  PORTFOLIO_SECTION_ID,
} from "@/lib/links";

export const SITE_CONFIG = {
  name: "Between",
  title: "Between | Chawankorn Bouraphan",
  description:
    "Get to know my life portfolio with Between. Building learning systems, digital products, and educational innovation.",
  url: "https://between-portfolio.vercel.app",
  author: {
    name: "Chawankorn Bouraphan",
    nameTh: "นายชวัลกร บัวระพันธ์",
    role: "Education × Product × Design",
    university: "EDU(MUDZIN) CHULA109",
    bio: "I explore the intersection of education, design, and technology to create systems that make learning more engaging, human-centered, and meaningful.",
  },
} as const;

export type NavAction = "portfolio" | "plan" | "about";

export const NAV_LINKS = [
  { label: "Portfolio", action: "portfolio" as NavAction },
  { label: "Plan", action: "plan" as NavAction },
  { label: "Profile", action: "about" as NavAction },
] as const;

export const TRUST_LOGOS = [
  { name: "Chulalongkorn University", src: "/assets/uniserity-logo/CU.jpg", width: 76, height: 40 },
  { name: "Khon Kaen University", src: "/assets/uniserity-logo/KKU.png", width: 86, height: 45 },
  { name: "Mahasarakham University", src: "/assets/uniserity-logo/MSU.png", width: 22, height: 32 },
  { name: "Chiang Mai University", src: "/assets/uniserity-logo/CMU.webp", width: 86, height: 34 },
] as const;

export const ECOSYSTEM_LOGOS = [
  { name: "Canva", src: "/assets/app-logo/1691829322canva-app-logo-png.png", x: 481, y: 1457, size: 65 },
  { name: "Antigravity", src: "/assets/app-logo/antigravity-icon__full-color.png", x: 755, y: 1373, size: 63 },
  { name: "Notion", src: "/assets/app-logo/Notion-Logo.png", x: 923, y: 1498, size: 63 },
  { name: "Figma", src: "/assets/app-logo/Figma-Logo-PNG-Cutout.png", x: 82, y: 1812, size: 71 },
  { name: "Reddit", src: "/assets/app-logo/reddit-icon-transparent-background-free-png.webp", x: 1075, y: 1712, size: 73 },
  { name: "Spotify", src: "/assets/app-logo/spotify-logo-spotify-social-media-icon-free-png.webp", x: 385, y: 1946, size: 68 },
  { name: "Word", src: "/assets/app-logo/word-logo.png", x: 646, y: 1961, size: 109, height: 61 },
  { name: "Product Hunt", src: "/assets/app-logo/product-hunt-logo.png", x: 1184, y: 1431, size: 79 },
  { name: "Vercel", src: "/assets/app-logo/vercel-logo.png", x: 1239, y: 1836, size: 78 },
  { name: "Coursera", src: "/assets/app-logo/1200px-Coursera-Logo_600x600.svg_-350x350.png", x: 193, y: 1401, size: 68 },
] as const;

export const ECOSYSTEM_STATS = [
  { value: "24", label: "projects" },
  { value: "32", label: "experiences" },
  { value: "9", label: "systems" },
] as const;

const ASSET_BASE = "/assets/currently-looking-for-card-png";

export const OPPORTUNITIES = [
  {
    id: "hackathon",
    title: "Hackathon Team",
    tagline: "Build. Collaborate. Win.",
    taglineColor: "#FDB412",
    description: "Building innovative products\nwith startup people",
    status: "OPEN",
    statusBg: "#FDF5E1",
    statusDot: "#FDB412",
    statusText: "#986818",
    statusWidth: 75,
    tagBg: "#FDF5E1",
    tagText: "#986818",
    tags: ["design", "code", "product"],
    largeIcons: [
      { src: `${ASSET_BASE}/visual-studio-code-logo-rounded-free-png.webp` },
      { src: `${ASSET_BASE}/github_PNG40.png` },
    ],
    clusterIcons: [
      { src: `${ASSET_BASE}/Figma-Logo-PNG-Cutout.png` },
      { src: `${ASSET_BASE}/product-hunt-logo.png` },
    ],
  },
  {
    id: "learners",
    title: "Aspiring Learners",
    tagline: "Build. Learn. Grow.",
    taglineColor: "#6B20F9",
    description: "Providing mentorship to others and growing together",
    status: "LEARNING",
    statusBg: "#F3EFFE",
    statusDot: "#6817F1",
    statusText: "#6E1BF3",
    statusWidth: 99,
    tagBg: "#F3EFFE",
    tagText: "#6817F1",
    tags: ["systems", "reflection", "mentor"],
    largeIcons: [
      { src: `${ASSET_BASE}/1200px-Coursera-Logo_600x600.svg_-350x350.png` },
      { src: `${ASSET_BASE}/chatgpt-logo.webp` },
    ],
    clusterIcons: [
      { src: `${ASSET_BASE}/1691829322canva-app-logo-png.png` },
      { src: `${ASSET_BASE}/claude-ai-logo-rounded-hd-free-png.webp` },
      { src: `${ASSET_BASE}/Notion-Logo.png` },
    ],
  },
  {
    id: "internship",
    title: "Internship",
    tagline: "Global. Language. Product.",
    taglineColor: "#FC0E82",
    description: "Cooperating in delivering mission and vision into life",
    status: "SEEKING",
    statusBg: "#FEEFF6",
    statusDot: "#FC0E82",
    statusText: "#FD1587",
    statusWidth: 89,
    tagBg: "#FEEFF6",
    tagText: "#FC0E82",
    tags: ["ux/ui", "English", "innovation"],
    largeIcons: [
      { src: `${ASSET_BASE}/Figma-Logo-PNG-Cutout.png` },
      { src: `${ASSET_BASE}/apple-logo-png-index-content-uploads-10.png` },
    ],
    clusterIcons: [
      { src: `${ASSET_BASE}/Figma-Logo-PNG-Cutout.png` },
      { src: `${ASSET_BASE}/reddit-icon-transparent-background-free-png.webp` },
    ],
  },
] as const;

export const FOCUS_AREAS = [
  "Educational Innovation",
  "UX/UI Design",
  "Science of Learning",
  "Startup Exploration",
] as const;

export const CURRENT_WORK =
  "Researching learning motivation, designing educational products, and building digital systems." as const;

export type FooterAction = "hero" | "portfolio" | "external";

export const FOOTER_LINKS = [
  { label: "Explore", action: "hero" as FooterAction },
  { label: "Portfolio", action: "portfolio" as FooterAction },
  { label: "Contact", action: "external" as FooterAction, href: CONTACT_URL },
] as const;

// Individual platform URLs — update each with the real profile link when available.
// All currently route through the link-in-bio aggregator as fallback.
export const SOCIAL_URLS = {
  facebook: CONTACT_URL,   // Replace with: "https://www.facebook.com/your-profile"
  instagram: CONTACT_URL, // Replace with: "https://www.instagram.com/your-handle"
  gmail: CONTACT_URL,     // Replace with: "mailto:your@email.com"
  line: CONTACT_URL,      // Replace with: "https://line.me/ti/p/your-id"
} as const;

export const SOCIAL_LINKS = [
  { name: "Facebook", href: SOCIAL_URLS.facebook, icon: "facebook" as const },
  { name: "Instagram", href: SOCIAL_URLS.instagram, icon: "instagram" as const },
  { name: "Gmail", href: SOCIAL_URLS.gmail, icon: "mail" as const },
  { name: "Line", href: SOCIAL_URLS.line, icon: "message-circle" as const },
] as const;

export const SECTION_IDS = {
  hero: HERO_SECTION_ID,
  portfolio: PORTFOLIO_SECTION_ID,
  opportunities: OPPORTUNITIES_SECTION_ID,
  about: ABOUT_SECTION_ID,
} as const;
