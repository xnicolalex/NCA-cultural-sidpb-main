"use client";

import { MessageSquare, AlertCircle } from "lucide-react";
import type { Registro, ReviewNote } from "../_types";
import { AnnotationToolbar } from "./annotation-toolbar";
import { AnnotationList } from "./annotation-list";

interface RegistroDetailProps {
  registro: Registro;
  reviewNotes: ReviewNote[];
  isIA: boolean;
  modoVisualizacao: boolean;
  descricao: string;
  setDescricao: (value: string) => void;
  municipio: string;
  setMunicipio: (value: string) => void;
  labelsInput: string;
  setLabelsInput: (value: string) => void;
  showReviewNotes: boolean;
  justificativa: string;
  setJustificativa: (value: string) => void;
  handleSalvar: () => void;
  handlePular: () => void;
  annotations: any[];
  annotationCount: number;
  onAddAnnotation: () => void;
  onClearAnnotations: () => void;
  availableLabels: string[];
  selectedLabel: string;
  onSelectedLabelChange: (label: string) => void;
}

export function RegistroDetail({
  registro,
  reviewNotes,
  isIA,
  modoVisualizacao,
  descricao,
  setDescricao,
  municipio,
  setMunicipio,
  labelsInput,
  setLabelsInput,
  showReviewNotes,
  justificativa,
  setJustificativa,
  handleSalvar,
  handlePular,
  annotations,
  annotationCount,
  onAddAnnotation,
  onClearAnnotations,
  availableLabels,
  selectedLabel,
  onSelectedLabelChange,
}: RegistroDetailProps) {
  const isRejeitado = registro.status_revisao === "REJEITADO";
  const isBloqueado = registro.status_bloqueio === "BLOQUEADO";
  const isEditavel = !modoVisualizacao && !isBloqueado;

  const formattedAnnotations = annotations.map((ann) => ({
    id: String(ann.id),
    label: ann.body?.[0]?.value || (ann.body && typeof ann.body === 'object' && 'value' in ann.body ? (ann.body as any).value : null) || "Sem label",
  }));

  return (
    <div className="w-full lg:w-2/3">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <h1 className="text-2xl font-bold">{registro.titulo}</h1>
        {isIA && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
            IA Generativa
          </span>
        )}
        {reviewNotes.length > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Rejeitada {reviewNotes.length}x
          </span>
        )}
        {isBloqueado && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            Bloqueada
          </span>
        )}
      </div>

      {/* Detalhes da IA */}
      {isIA && (
        <div className="bg-purple-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
          <p>
            <strong className="text-purple-800">Modelo de IA:</strong> {registro.modelo_ia || "—"}
          </p>
          <p>
            <strong className="text-purple-800">Prompt:</strong> {registro.prompt_ia || "—"}
          </p>
          {registro.detalhes_ia && (
            <p>
              <strong className="text-purple-800">Detalhes:</strong> {registro.detalhes_ia}
            </p>
          )}
        </div>
      )}

      {/* Anotação Visual */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-slate-700">Anotação Visual (Bounding Boxes)</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
              {annotationCount} {annotationCount === 1 ? "caixa" : "caixas"}
            </span>
          </div>
          {!isEditavel && annotationCount > 0 && (
            <span className="text-xs text-muted-foreground">(somente leitura)</span>
          )}
        </div>

        {isEditavel ? (
          <>
            <AnnotationToolbar
              onAddBox={onAddAnnotation}
              onClearAll={onClearAnnotations}
              selectedLabel={selectedLabel}
              onLabelChange={onSelectedLabelChange}
              availableLabels={availableLabels}
              annotationCount={annotationCount}
            />

            <div className="mt-3">
              <AnnotationList annotations={formattedAnnotations} />
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              💡 Desenhe caixas na imagem (painel esquerdo) para marcar elementos culturais.
              Selecione um label antes de desenhar.
            </p>
          </>
        ) : (
          <div className="p-4 border rounded-lg bg-slate-50 text-sm text-muted-foreground">
            {annotationCount > 0 ? (
              <div className="space-y-1">
                <p className="font-medium text-slate-700">Caixas anotadas:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {formattedAnnotations.map((ann) => (
                    <li key={ann.id} className="text-sm">
                      {ann.label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Esta imagem não possui anotações visuais.</p>
            )}
          </div>
        )}
      </div>

      {/* Feedback do Curador */}
      {!modoVisualizacao && showReviewNotes && reviewNotes.length > 0 && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <MessageSquare className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-amber-800 mb-2">
                Feedback do Curador ({reviewNotes.length} revisão
                {reviewNotes.length > 1 ? "ões" : ""} pendente{reviewNotes.length > 1 ? "s" : ""})
              </h4>
              <ul className="space-y-2">
                {reviewNotes.map((note) => (
                  <li key={note.id} className="text-sm text-amber-700 border-b border-amber-200/50 pb-2 last:border-0">
                    <p className="font-medium">{note.reviewer.nome}:</p>
                    <p>{note.note}</p>
                    <p className="text-xs text-amber-500">
                      {new Date(note.created_at).toLocaleString("pt-BR")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Bloqueio */}
      {isBloqueado && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-red-800">Imagem Bloqueada</h4>
              <p className="text-sm text-red-700">
                Esta imagem foi rejeitada 3 vezes e não pode mais ser anotada.
              </p>
              {reviewNotes.length > 0 && (
                <p className="text-sm text-red-700 mt-1">
                  <strong>Último motivo:</strong> {reviewNotes[0].note}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Campos editáveis */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Descrição (Markdown)</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border rounded px-3 py-2 h-64"
          placeholder="Descreva a imagem em detalhes..."
          disabled={!isEditavel}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Local</label>
        <input
          type="text"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
          className="w-full border rounded px-3 py-2"
          disabled={!isEditavel}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Tags/Labels (separadas por vírgula)</label>
        <input
          type="text"
          value={labelsInput}
          onChange={(e) => setLabelsInput(e.target.value)}
          placeholder="bumba-meu-boi, festa popular, dança"
          className="w-full border rounded px-3 py-2"
          disabled={!isEditavel}
        />
      </div>

      {/* Ações */}
      {isEditavel && (
        <>
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleSalvar}
              disabled={!descricao.trim()}
              className="bg-emerald-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {isRejeitado ? "Reenviar para revisão" : "Salvar e Avançar"}
            </button>
            <button
              onClick={handlePular}
              className="border border-slate-300 px-6 py-2 rounded-md"
            >
              Pular Imagem
            </button>
          </div>
          <div className="mt-4">
            <textarea
              placeholder="Justificativa para pular..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
        </>
      )}

      {/* Modo visualização */}
      {modoVisualizacao && (
        <div className="p-4 bg-slate-50 rounded-md text-sm text-slate-600">
          <p>
            Esta imagem já foi anotada. Para reeditá-la, aguarde a revisão do curador
            ou verifique se há feedback pendente.
          </p>
          {isRejeitado && (
            <p className="mt-2 text-amber-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Esta anotação foi rejeitada. Você pode corrigi-la e reenviar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}