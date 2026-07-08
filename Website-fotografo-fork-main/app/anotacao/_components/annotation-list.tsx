"use client";

import { Card, CardContent } from "@/components/ui/card";

interface AnnotationListProps {
  annotations: { id: string; label: string }[];
}

export function AnnotationList({ annotations }: AnnotationListProps) {
  if (annotations.length === 0) {
    return (
      <div className="text-sm text-muted-foreground p-4 border rounded-lg bg-slate-50">
        Nenhuma caixa desenhada. Selecione um label e desenhe na imagem.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {annotations.map((ann) => (
        <Card key={ann.id} className="p-3">
          <CardContent className="p-0">
            <span className="text-sm font-medium">{ann.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}