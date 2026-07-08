import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ContributionSectionProps {
  onSair: () => void;
}

export function ContributionSection({ onSair }: ContributionSectionProps) {
  return (
    <div className="bg-background rounded-[1.5rem] md:rounded-xl border border-border p-6 md:p-8 shadow-sm mb-10 md:mb-12 mt-6 md:mt-8">
      <h2 className="font-semibold text-base md:text-lg text-foreground mb-1 md:mb-2">Contribuição</h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-5 md:mb-6 leading-relaxed">Ajude a expandir o dataset enviando novas imagens da cultura maranhense.</p>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <Button asChild className="flex-1 bg-black hover:bg-neutral-800 text-white py-6 min-h-[44px] text-sm md:text-base rounded-full sm:rounded-md transition-all"><Link href="/contribuir">NOVA CONTRIBUIÇÃO</Link></Button>
        <Button variant="outline" className="flex-1 py-6 min-h-[44px] text-sm md:text-base rounded-full sm:rounded-md transition-all" onClick={onSair}>SAIR</Button>
      </div>
    </div>
  );
}