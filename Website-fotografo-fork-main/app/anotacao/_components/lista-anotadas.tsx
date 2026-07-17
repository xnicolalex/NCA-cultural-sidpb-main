"use client";

import { ChevronDown, ChevronUp, Clock, CheckCircle, XCircle } from "lucide-react";
import { withBasePath } from "@/lib/paths";
import type { Registro } from "../_types";

interface ListaAnotadasProps {
  anotadas: Registro[];
  registroSelecionado: Registro | null;
  show: boolean;
  onToggle: () => void;
  onSelect: (registro: Registro) => void;
  modoVisualizacao: boolean;
  filtroMinhas: boolean;
  onFiltroChange: (minhas: boolean) => void;
}

export function ListaAnotadas({
  anotadas,
  registroSelecionado,
  show,
  onToggle,
  onSelect,
  modoVisualizacao,
  filtroMinhas,
  onFiltroChange,
}: ListaAnotadasProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return <Clock className="h-3 w-3 text-amber-500" />;
      case "APROVADO":
        return <CheckCircle className="h-3 w-3 text-emerald-500" />;
      case "REJEITADO":
        return <XCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return "Aguardando revisão";
      case "APROVADO":
        return "Aprovada";
      case "REJEITADO":
        return "Rejeitada";
      default:
        return "";
    }
  };

  return (
    <div className="mb-8 border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 font-medium text-slate-900"
      >
        <span>Imagens Anotadas ({anotadas.length})</span>
        <span className="text-slate-500">
          {show ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>
      {show && (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm text-slate-600">Mostrar:</label>
            <button
              onClick={() => onFiltroChange(false)}
              className={`px-3 py-1 text-xs rounded-full border ${
                !filtroMinhas
                  ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                  : "bg-white text-slate-600"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => onFiltroChange(true)}
              className={`px-3 py-1 text-xs rounded-full border ${
                filtroMinhas
                  ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                  : "bg-white text-slate-600"
              }`}
            >
              Minhas
            </button>
          </div>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {anotadas.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhuma imagem anotada.</p>
            ) : (
              anotadas.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onSelect(a)}
                  className={`flex items-center gap-3 p-2 rounded-md text-left hover:bg-slate-50 ${
                    registroSelecionado?.id === a.id && modoVisualizacao
                      ? "bg-blue-50 border border-blue-300"
                      : "border border-transparent"
                  }`}
                >
                  <img src={withBasePath(a.url)} alt={a.titulo} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="text-sm font-medium">{a.titulo}</p>
                    <p className="text-xs text-slate-500">{a.dominio?.nome_categoria ?? "Outros"}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {getStatusIcon(a.status_revisao)}
                      <span
                        className={`text-xs ${
                          a.status_revisao === "PENDENTE"
                            ? "text-amber-600"
                            : a.status_revisao === "APROVADO"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {getStatusText(a.status_revisao)}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
