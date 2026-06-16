export const PORTFOLIO_ARCHIVE_URL =
  "https://drive.google.com/drive/folders/1TySD6JnlQA3Agvcfw1M_ZvgyOcIXUFfs?usp=sharing";

export const CONTACT_URL = "https://openlink.co/gxcb";

export const PORTFOLIO_SECTION_ID = "portfolio-showcase";
export const OPPORTUNITIES_SECTION_ID = "currently-looking-for";
export const HERO_SECTION_ID = "hero";
export const ABOUT_SECTION_ID = "about";

export const EXTERNAL_LINK_PROPS = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToPortfolioShowcase() {
  scrollToSection(PORTFOLIO_SECTION_ID);
}

export function scrollToOpportunities() {
  scrollToSection(OPPORTUNITIES_SECTION_ID);
}

export function scrollToAbout() {
  scrollToSection(ABOUT_SECTION_ID);
}

export function scrollToHero() {
  scrollToSection(HERO_SECTION_ID);
}
