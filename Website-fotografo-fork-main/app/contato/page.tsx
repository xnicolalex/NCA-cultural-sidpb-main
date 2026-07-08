import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactHero } from "./_components/contact-hero";
import { ContactForm } from "./_components/contact-form";
import { ContactInfo } from "./_components/contact-info";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ContactHero />
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}