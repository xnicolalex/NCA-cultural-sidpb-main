"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import type { RegistroComDominio } from "@/hooks/usePerfil";

interface ImageCardProps {
  registro: RegistroComDominio;
  onProcessarSugestao: (registro: RegistroComDominio) => void;
  onRefresh: () => void;
}

export function ImageCard({ registro, onProcessarSugestao, onRefresh }: ImageCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [loadingAprovar, setLoadingAprovar] = useState(false);
  const [loadingRejeitar, setLoadingRejeitar] = useState(false);

  const isIA = (registro as any).origem === "IA_GENERATIVA";

  const handleAprovar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAprovar(true);
    try {
      const res = await fetch("/api/curadoria/aprovar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registroId: registro.id }),
      });
      if (!res.ok) throw new Error("Erro ao aprovar");
      toast.success("Imagem aprovada!");
      onRefresh();
    } catch {
      toast.error("Falha ao aprovar imagem.");
    } finally {
      setLoadingAprovar(false);
    }
  };

  const handleRejeitar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Tem certeza que deseja rejeitar esta imagem?")) return;
    setLoadingRejeitar(true);
    try {
      const res = await fetch("/api/curadoria/rejeitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registroId: registro.id }),
      });
      if (!res.ok) throw new Error("Erro ao rejeitar");
      toast.success("Imagem rejeitada.");
      onRefresh();
    } catch {
      toast.error("Falha ao rejeitar imagem.");
    } finally {
      setLoadingRejeitar(false);
    }
  };

  const handleSugestao = (e: React.MouseEvent) => {
    e.stopPropagation();
    onProcessarSugestao(registro);
  };

  const getStatusBadge = () => {
    if (registro.status_curadoria === "APROVADO") {
      return <span className="text-sm font-medium text-emerald-600">✓ Aprovada</span>;
    }
    if (registro.status_curadoria === "REJEITADO") {
      return <span className="text-sm font-medium text-red-600">✗ Rejeitada</span>;
    }
    return null;
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setExpanded(true)}
        className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm cursor-pointer hover:border-slate-300 transition-colors"
      >
        <div className="flex gap-5 flex-col sm:flex-row">
          {/* Image */}
          <div className="w-full sm:w-48 flex-shrink-0">
            <div className="relative aspect-square rounded-lg border overflow-hidden bg-slate-100">
              <img
                src={registro.url}
                alt={registro.titulo}
                className="w-full h-full object-cover"
              />
              {isIA && (
                <span className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-600/80 text-white border border-purple-400/50 backdrop-blur-sm">
                  IA
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3 min-w-0">
            {/* Title & Status */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-lg truncate">{registro.titulo}</h3>
                {registro.status_curadoria !== "PENDENTE" && getStatusBadge()}
              </div>
              <p className="text-sm text-slate-500 line-clamp-2">{registro.descricao}</p>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>
                <strong>Domínio:</strong> {registro.dominio?.nome_categoria ?? "Outros"}
              </span>
              <span>
                <strong>Local:</strong> {registro.municipio || "—"}
              </span>
              <span>
                <strong>Enviado por:</strong> Usuário #{registro.usuarioId}
              </span>
              <span>
                <strong>Data:</strong>{" "}
                {new Date(registro.data_upload).toLocaleDateString("pt-BR")}
              </span>
              {isIA && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                  IA Generativa
                </span>
              )}
            </div>

            {/* AI Details (if applicable) */}
            {isIA && (registro as any).modelo_ia && (
              <div className="text-xs text-purple-600 bg-purple-50/50 rounded px-2 py-1">
                <strong>Modelo:</strong> {(registro as any).modelo_ia}
                {(registro as any).prompt_ia && (
                  <>
                    {" "}
                    | <strong>Prompt:</strong>{" "}
                    <span className="truncate max-w-[200px] inline-block align-bottom">
                      {(registro as any).prompt_ia}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Suggestion Badge */}
            {registro.categoria_sugerida && (
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-medium text-amber-700">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                Sugestão: {registro.categoria_sugerida}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {registro.status_curadoria === "PENDENTE" && (
                <>
                  <button
                    onClick={handleAprovar}
                    disabled={loadingAprovar}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                  >
                    {loadingAprovar ? "Aprovando..." : "Aprovar"}
                  </button>
                  <button
                    onClick={handleRejeitar}
                    disabled={loadingRejeitar}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    {loadingRejeitar ? "Rejeitando..." : "Rejeitar"}
                  </button>
                  {registro.categoria_sugerida && (
                    <button
                      onClick={handleSugestao}
                      className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 transition-colors"
                    >
                      Processar Sugestão
                    </button>
                  )}
                </>
              )}
              {registro.status_curadoria !== "PENDENTE" && getStatusBadge()}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setExpanded(false)}
        >
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>

          <div
            className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col lg:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="lg:w-3/5 bg-black flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={registro.url}
                  alt={registro.titulo}
                  className="max-h-[80vh] object-contain"
                />
                {isIA && (
                  <span className="absolute top-4 right-4 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-600/80 text-white border border-purple-400/50 backdrop-blur-sm">
                    IA Generativa
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-2/5 p-6 overflow-y-auto space-y-4">
              <h2 className="text-xl font-bold">{registro.titulo}</h2>

              {isIA && (registro as any).modelo_ia && (
                <div className="bg-purple-50 rounded-lg p-4 space-y-2 text-sm">
                  <p>
                    <strong className="text-purple-800">Modelo de IA:</strong>{" "}
                    {(registro as any).modelo_ia || "—"}
                  </p>
                  <p>
                    <strong className="text-purple-800">Prompt:</strong>{" "}
                    {(registro as any).prompt_ia || "—"}
                  </p>
                  {(registro as any).detalhes_ia && (
                    <p>
                      <strong className="text-purple-800">Detalhes:</strong>{" "}
                      {(registro as any).detalhes_ia}
                    </p>
                  )}
                </div>
              )}

              <p className="text-sm text-slate-600">{registro.descricao || "Sem descrição."}</p>

              <div className="text-xs text-slate-500 space-y-1">
                <p>
                  <strong>Domínio:</strong> {registro.dominio?.nome_categoria ?? "Outros"}
                </p>
                <p>
                  <strong>Local:</strong> {registro.municipio || "—"}
                </p>
                <p>
                  <strong>Licença:</strong> {registro.licenca}
                </p>
                <p>
                  <strong>Enviado por:</strong> Usuário #{registro.usuarioId}
                </p>
                <p>
                  <strong>Data de upload:</strong>{" "}
                  {new Date(registro.data_upload).toLocaleDateString("pt-BR")}
                </p>
                {registro.categoria_sugerida && (
                  <p>
                    <strong>Sugestão de categoria:</strong> {registro.categoria_sugerida}
                  </p>
                )}
                <p>
                  <strong>Status:</strong> {registro.status_curadoria}
                </p>
                {isIA && (
                  <p className="text-purple-600">
                    <strong>Origem:</strong> IA Generativa
                  </p>
                )}
              </div>

              {registro.categoria_sugerida && (
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-medium text-amber-700">
                  <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  Sugestão: {registro.categoria_sugerida}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2 border-t">
                {registro.status_curadoria === "PENDENTE" && (
                  <>
                    <button
                      onClick={handleAprovar}
                      disabled={loadingAprovar}
                      className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                    >
                      {loadingAprovar ? "Aprovando..." : "Aprovar"}
                    </button>
                    <button
                      onClick={handleRejeitar}
                      disabled={loadingRejeitar}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      {loadingRejeitar ? "Rejeitando..." : "Rejeitar"}
                    </button>
                    {registro.categoria_sugerida && (
                      <button
                        onClick={handleSugestao}
                        className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 transition-colors"
                      >
                        Processar Sugestão
                      </button>
                    )}
                  </>
                )}
                {registro.status_curadoria !== "PENDENTE" && getStatusBadge()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}