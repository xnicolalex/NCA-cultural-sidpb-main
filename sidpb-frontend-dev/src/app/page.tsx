import { AppHeader } from "@/components/organisms/AppHeader"
import { CtaSection } from "@/sections/landing/CtaSection"
import { FeaturesSection } from "@/sections/landing/FeaturesSection"
import { HeroSection } from "@/sections/landing/HeroSection"
import { LandingFooterSection } from "@/sections/landing/LandingFooterSection"
import { StatsSection } from "@/sections/landing/StatsSection"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader action="dashboard" />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CtaSection />
      </main>
      <LandingFooterSection />
    </div>
  )
}
