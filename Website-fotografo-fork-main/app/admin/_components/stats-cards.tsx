"use client";

import type { AdminStats } from "../_types";

interface StatsCardsProps {
  stats: AdminStats | null;
}

export function StatsCards({ stats }: StatsCardsProps) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border-l-4 border-l-slate-300 rounded-lg p-4 shadow-sm border border-slate-200 animate-pulse">
            <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
            <div className="h-8 w-12 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Usuários ativos",
      value: stats.ativos,
      subtitle: `de ${stats.total} cadastros totais`,
      accent: "emerald",
    },
    {
      label: "Pendentes",
      value: stats.total - stats.ativos,
      subtitle: "sem acesso registrado",
      accent: "amber",
    },
    {
      label: "Inativados",
      value: stats.inativos,
      subtitle: "acesso revogado",
      accent: "red",
    },
  ] as const;

  const accentClasses = {
    emerald: "border-l-4 border-l-emerald-500 text-emerald-700",
    amber: "border-l-4 border-l-amber-500 text-amber-700",
    red: "border-l-4 border-l-red-500 text-red-700",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`bg-white ${accentClasses[card.accent]} rounded-lg p-4 shadow-sm border border-slate-200`}
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            {card.label}
          </p>
          <p className={`text-3xl font-semibold ${accentClasses[card.accent]}`}>
            {card.value}
          </p>
          <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}