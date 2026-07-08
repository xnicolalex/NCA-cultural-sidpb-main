"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import type { Registro } from "../_types";

interface ListaPendentesProps {
  pendentes: Registro[];
  registroSelecionado: Registro | null;
  show: boolean;
  onToggle: () => void;
  onSelect: (registro: Registro) => void;
  modoVisualizacao: boolean;
}

export function ListaPendentes({
  pendentes,
  registroSelecionado,
  show,
  onToggle,
  onSelect,
  modoVisualizacao,
}: ListaPendentesProps) {
  return (
    <div className="mb-8 border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 font-medium text-slate-900"
      >
        <span>Imagens Pendentes ({pendentes.length})</span>
        <span className="text-slate-500">
          {show ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>
      {show && (
        <div className="p-4 grid gap-3 max-h-96 overflow-y-auto">
          {pendentes.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma imagem pendente.</p>
          ) : (
            pendentes.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className={`flex items-center gap-3 p-2 rounded-md text-left hover:bg-slate-50 ${
                  registroSelecionado?.id === p.id && !modoVisualizacao
                    ? "bg-emerald-50 border border-emerald-300"
                    : "border border-transparent"
                }`}
              >
                <img src={p.url} alt={p.titulo} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="text-sm font-medium">{p.titulo}</p>
                  <p className="text-xs text-slate-500">{p.dominio?.nome_categoria ?? "Outros"}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}