"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FaqHero } from "./_components/faq-hero";
import { FaqSection } from "./_components/faq-section";
import { QuickLinks } from "./_components/quick-links";
import { ContactCta } from "./_components/contact-cta";
import { faqSections } from "./_data";

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <FaqHero />
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
              {faqSections.map((section) => <FaqSection key={section.id} {...section} />)}
            </div>
          </div>
        </section>
        <QuickLinks />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  );
}