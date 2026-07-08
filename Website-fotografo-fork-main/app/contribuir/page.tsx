import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContributionHero } from "./_components/contribution-hero";
import { ContributionFlow } from "./_components/contribution-flow";
import { ContributionBenefits } from "./_components/contribution-benefits";
import { ContributionTypes } from "./_components/contribution-type";

export const metadata = {
  title: "Contribua com Imagens",
  description: "Faça parte da preservação da cultura maranhense. Envie suas imagens e ajude a inovar a representação do nosso patrimônio cultural.",
};

export default function ContributePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ContributionHero />
        <ContributionBenefits />
        <ContributionTypes />
        <ContributionFlow />
      </main>
      <SiteFooter />
    </div>
  );
}