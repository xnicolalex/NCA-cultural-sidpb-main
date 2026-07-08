"use client";

interface FilterBarProps {
  filtroStatus: string;
  onFiltroStatusChange: (value: string) => void;
  somenteComSugestao: boolean;
  onSomenteComSugestaoChange: (value: boolean) => void;
}

export function FilterBar({
  filtroStatus,
  onFiltroStatusChange,
  somenteComSugestao,
  onSomenteComSugestaoChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <select
        value={filtroStatus}
        onChange={(e) => onFiltroStatusChange(e.target.value)}
        className="h-9 px-3 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
      >
        <option value="">Todos os status</option>
        <option value="PENDENTE">Pendente</option>
        <option value="APROVADO">Aprovado</option>
        <option value="REJEITADO">Rejeitado</option>
      </select>

      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
        <input
          type="checkbox"
          checked={somenteComSugestao}
          onChange={(e) => onSomenteComSugestaoChange(e.target.checked)}
          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />
        Apenas com sugestão de categoria
      </label>
    </div>
  );
}