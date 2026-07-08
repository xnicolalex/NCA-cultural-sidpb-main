import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PerfilNavButtonsProps {
  papelAcesso?: string;
}

export function PerfilNavButtons({ papelAcesso }: PerfilNavButtonsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <Button variant="outline" asChild className="min-h-[44px] text-sm rounded-full sm:rounded-md transition-all"><Link href="/">VOLTAR AO INÍCIO</Link></Button>
      {(papelAcesso === "ANOTADOR" || papelAcesso === "ADMINISTRADOR") && <Button asChild className="min-h-[44px] text-sm rounded-full sm:rounded-md transition-all bg-blue-600 hover:bg-blue-700 text-white"><Link href="/anotacao">PAINEL ANOTAÇÃO</Link></Button>}
      {(papelAcesso === "CURADOR" || papelAcesso === "ADMINISTRADOR") && <Button asChild className="min-h-[44px] text-sm rounded-full sm:rounded-md transition-all bg-emerald-600 hover:bg-emerald-700 text-white"><Link href="/curadoria">PAINEL CURADORIA</Link></Button>}
      {papelAcesso === "ADMINISTRADOR" && <Button asChild className="min-h-[44px] text-sm rounded-full sm:rounded-md transition-all bg-purple-600 hover:bg-purple-700 text-white"><Link href="/admin">PAINEL ADMIN</Link></Button>}
    </div>
  );
}