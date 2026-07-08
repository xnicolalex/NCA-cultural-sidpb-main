"use client";

import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import type { AnotadaParaRevisao } from "../_types";

interface AnnotationReviewListProps {
  anotadas: AnotadaParaRevisao[];
  show: boolean;
  onToggle: () => void;
  onSelect: (anotada: AnotadaParaRevisao) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  isIA: (item: AnotadaParaRevisao) => boolean;
}

export function AnnotationReviewList({
  anotadas,
  show,
  onToggle,
  onSelect,
  onApprove,
  onReject,
  isIA,
}: AnnotationReviewListProps) {
  return (
    <div className="mt-8 border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 font-medium text-slate-900"
      >
        <span>Anotações para Revisão ({anotadas.length})</span>
        <span className="text-slate-500">
          {show ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {show && (
        <div className="p-4 grid gap-3 max-h-96 overflow-y-auto">
          {anotadas.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma anotação pendente de revisão.</p>
          ) : (
            anotadas.map((a) => (
              <div
                key={a.id}
                onClick={() => onSelect(a)}
                className="bg-white border rounded-lg p-4 cursor-pointer hover:border-slate-300 transition-colors"
              >
                <div className="flex gap-4 flex-col sm:flex-row">
                  <img
                    src={a.url}
                    alt={a.titulo}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">{a.titulo}</p>
                      {isIA(a) && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          IA
                        </span>
                      )}
                      {(a.total_rejections ?? 0) > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle className="h-3 w-3" />
                          Rejeitada {a.total_rejections}x
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{a.descricao}</p>
                    <p className="text-xs text-slate-400">
                      Anotado por: {a.anotador?.nome ?? "—"} | Domínio:{" "}
                      {a.dominio?.nome_categoria ?? "Outros"}
                    </p>
                    {(a.total_rejections ?? 0) > 0 && a.last_rejection_reason && (
                      <div className="mt-1 text-xs text-amber-600 truncate max-w-full">
                        Último motivo: "{a.last_rejection_reason}"
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onApprove(a.id);
                        }}
                        className="px-3 py-1 text-xs bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReject(a.id);
                        }}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Rejeitar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}