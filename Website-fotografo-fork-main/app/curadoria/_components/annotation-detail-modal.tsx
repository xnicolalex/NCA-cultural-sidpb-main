"use client";

import { X } from "lucide-react";
import type { AnotadaParaRevisao } from "../_types";
import { BoundingBoxViewer } from "@/app/anotacao/_components/bounding-box-viewer";

interface AnnotationDetailModalProps {
  anotada: AnotadaParaRevisao | null;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  isIA: (item: AnotadaParaRevisao) => boolean;
}

export function AnnotationDetailModal({
  anotada,
  onClose,
  onApprove,
  onReject,
  isIA,
}: AnnotationDetailModalProps) {
  if (!anotada) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="h-8 w-8" />
      </button>
      <div
        className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col lg:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:w-3/5 bg-black flex items-center justify-center p-4">
          <BoundingBoxViewer
            imageUrl={anotada.url}
            annotations={anotada.bounding_boxes || []}
            className="w-full h-full"
            minHeight="400px"
          />
        </div>
        <div className="lg:w-2/5 p-6 overflow-y-auto space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold">{anotada.titulo}</h2>
            {isIA(anotada) && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                IA Generativa
              </span>
            )}
            {(anotada.total_rejections ?? 0) > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                Rejeitada {anotada.total_rejections}x
              </span>
            )}
          </div>

          {isIA(anotada) && (
            <div className="bg-purple-50 rounded-lg p-4 space-y-2 text-sm">
              <p>
                <strong className="text-purple-800">Modelo de IA:</strong>{" "}
                {anotada.modelo_ia || "—"}
              </p>
              <p>
                <strong className="text-purple-800">Prompt:</strong>{" "}
                {anotada.prompt_ia || "—"}
              </p>
              {anotada.detalhes_ia && (
                <p>
                  <strong className="text-purple-800">Detalhes:</strong>{" "}
                  {anotada.detalhes_ia}
                </p>
              )}
            </div>
          )}

          {(anotada.total_rejections ?? 0) > 0 && anotada.last_rejection_reason && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Última rejeição:</strong> {anotada.last_rejection_reason}
              </p>
            </div>
          )}

          <div className="text-sm text-slate-600 space-y-2">
            <div>
              <strong className="text-slate-800">Anotação:</strong>
              <p>{anotada.descricao || "Sem descrição."}</p>
            </div>
            <div>
              <strong className="text-slate-800">Local:</strong>
              <p>{anotada.municipio || "—"}</p>
            </div>
            <div>
              <strong className="text-slate-800">Domínio:</strong>
              <p>{anotada.dominio?.nome_categoria ?? "Outros"}</p>
            </div>
            <div>
              <strong className="text-slate-800">Anotado por:</strong>
              <p>{anotada.anotador?.nome ?? "—"}</p>
            </div>
            {(anotada.total_rejections ?? 0) > 0 && (
              <div>
                <strong className="text-slate-800">Total de rejeições:</strong>
                <p className="text-amber-600">{anotada.total_rejections}x</p>
              </div>
            )}
          </div>

          {anotada.labels && anotada.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {anotada.labels.map((l) => (
                <span
                  key={l.label.nome}
                  className="text-xs bg-slate-100 rounded-full px-2 py-0.5"
                >
                  {l.label.nome}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t">
            <button
              onClick={() => onApprove(anotada.id)}
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700"
            >
              Aprovar
            </button>
            <button
              onClick={() => onReject(anotada.id)}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
            >
              Rejeitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}