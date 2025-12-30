import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { ProductTeaserCard } from "@/components/ProductTeaserCard"
import { BankingScaleHero } from "@/components/BankingScaleHero"
import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel"
import { IntegrationCarousel } from "@/components/IntegrationCarousel"
import { PricingSection } from "@/components/PricingSection"
import { FAQSection } from "@/components/FAQSection"
import { Footer } from "@/components/Footer"

export default function Page() {
  return (
    <>
      <PortfolioNavbar />
      <ProductTeaserCard />
      {/* TODO: Enable other sections later when ready */}
      {/* <BankingScaleHero /> */}
      {/* <CaseStudiesCarousel /> */}
      {/* <IntegrationCarousel /> */}
      {/* <PricingSection /> */}
      <FAQSection />
      {/* TODO: Enable footer later when ready */}
      {/* <Footer /> */}
    </>
  )
}
