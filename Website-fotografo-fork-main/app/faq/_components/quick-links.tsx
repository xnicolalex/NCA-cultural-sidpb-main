import Link from "next/link";
import { quickLinks } from "../_data";

export function QuickLinks() {
  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-center">Links Rápidos</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link key={link.id} href={`#${link.id}`} className="rounded-xl border border-border bg-card p-5 md:p-6 hover:shadow-md transition-shadow">
                <link.icon className="h-6 w-6 md:h-8 md:w-8 text-primary mb-3" />
                <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{link.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}