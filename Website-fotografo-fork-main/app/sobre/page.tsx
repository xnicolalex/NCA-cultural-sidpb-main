import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectTimeline } from "@/components/timelineProjeto";
import { AboutHero } from "./_components/about-hero";
import { AboutContext } from "./_components/about-context";
import { ObjectivesGrid } from "./_components/objectives-grid";
import { MethodologyCards } from "./_components/methodology-cards";
import { TransparencySection } from "./_components/transparency-section";
import { timeline } from "./_data";

export const metadata = {
  title: "Sobre o Projeto - Cultura Maranhense",
  description: "Conheça os objetivos, metodologia e parcerias do projeto de dataset multimodal da cultura maranhense.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <AboutHero />
        <AboutContext />
        <ObjectivesGrid />
        <MethodologyCards />
        <ProjectTimeline items={timeline} />
        <TransparencySection />
      </main>
      <SiteFooter />
    </div>
  );
}