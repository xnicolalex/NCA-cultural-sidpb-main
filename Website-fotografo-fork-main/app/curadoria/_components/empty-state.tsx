import { ImageOff } from "lucide-react";

interface EmptyStateProps {
  filtroStatus?: string;
}

export function EmptyState({ filtroStatus }: EmptyStateProps) {
  const getMessage = () => {
    switch (filtroStatus) {
      case "APROVADO": return { title: "Nenhuma imagem aprovada", sub: "Nenhuma submissão foi aprovada ainda." };
      case "REJEITADO": return { title: "Nenhuma imagem rejeitada", sub: "Nenhuma submissão foi rejeitada." };
      default: return { title: "Nenhuma imagem encontrada", sub: "Nenhuma submissão corresponde ao filtro." };
    }
  };

  const { title, sub } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <ImageOff className="h-12 w-12 mb-4" />
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm">{sub}</p>
    </div>
  );
}