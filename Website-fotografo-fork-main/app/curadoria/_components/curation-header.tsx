"use client";

import type { CurationStats } from "../_types";

interface CurationHeaderProps {
  stats: CurationStats;
}

export function CurationHeader({ stats }: CurationHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-slate-900">Painel de Curadoria</h1>
      <p className="text-sm text-slate-500 mt-1">
        Revise as imagens enviadas e aprove, rejeite ou gerencie sugestões de categorias.
      </p>
      <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
        <span className="bg-white border rounded px-3 py-1">
          Pendentes: {stats.pendentes}
        </span>
        <span className="bg-white border rounded px-3 py-1">
          Aprovados: {stats.aprovados}
        </span>
        <span className="bg-white border rounded px-3 py-1">
          Rejeitados: {stats.rejeitados}
        </span>
      </div>
    </div>
  );
}