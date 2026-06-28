import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { TrustSection } from "@/components/journey/trust-section";
import { Ecosystem } from "@/components/ecosystem/ecosystem";
import { ProjectGallery } from "@/components/project-gallery/project-gallery";
import { Opportunities } from "@/components/opportunities/opportunities";
import { CtaBanner } from "@/components/cta-banner/cta-banner";
import { About } from "@/components/about/about";
import { SocialConnect } from "@/components/about/social-connect";
import { Footer } from "@/components/footer/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { getPortfolioCategories } from "@/lib/portfolio-data.server";

export default function Home() {
  const portfolioCategories = getPortfolioCategories();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustSection />
        <Ecosystem />
        <ProjectGallery categories={portfolioCategories} />
        <Opportunities />
        <CtaBanner />
        <About />
        <SocialConnect />
      </main>
      <Footer />
      {/* Floating back-to-top button — appears after scrolling 400px */}
      <BackToTop />
    </>
  );
}
