"use client";

import type { Registro, ReviewNote } from "../_types";
import type { W3CAnnotation } from '@annotorious/react';
import { AnnotationCanvas } from "./annotation-canvas";

interface RegistroSidebarProps {
  registro: Registro;
  reviewNotes: ReviewNote[];
  onImageClick: () => void;
  annotations: W3CAnnotation[];
  onAnnotationsChange: (annotationsOrFn: W3CAnnotation[] | ((prev: W3CAnnotation[]) => W3CAnnotation[])) => void;
  readOnly?: boolean;
  isBloqueado?: boolean;
  selectedLabel?: string;
}

export function RegistroSidebar({
  registro,
  reviewNotes,
  onImageClick,
  annotations,
  onAnnotationsChange,
  readOnly = false,
  isBloqueado = false,
  selectedLabel,
}: RegistroSidebarProps) {
  const isReadOnly = readOnly || isBloqueado;

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  const handleWrapperClick = (e: React.MouseEvent) => {
    // Only open lightbox in read-only mode
    // In edit mode, let clicks pass through to the annotator
    if (!isReadOnly) return;
    e.stopPropagation();
    onImageClick();
  };

  return (
    <div className="w-full lg:w-1/3">
      <div className="sticky top-24">
        <div
          className={`rounded-lg overflow-hidden border border-border bg-black/5 ${
            isReadOnly ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={handleWrapperClick}
          onDragStart={handleDragStart}
        >
          {/* Stop click propagation in edit mode so annotator works */}
          <div onClick={(e) => !isReadOnly && e.stopPropagation()}>
            <AnnotationCanvas
              key={registro.id}
              imageUrl={registro.url}
              annotations={annotations}
              onAnnotationChange={onAnnotationsChange}
              readOnly={isReadOnly}
              className="w-full"
              minHeight="300px"
              selectedLabel={selectedLabel}
            />
          </div>
        </div>

        {/* Metadados da imagem */}
        <div className="bg-slate-100 p-4 mt-4 rounded-lg text-sm text-slate-600 space-y-1">
          {registro.largura_pixels && registro.altura_pixels && (
            <p>
              Dimensões: {registro.largura_pixels}x{registro.altura_pixels}
            </p>
          )}
          {registro.tamanho_bytes && (
            <p>Tamanho: {registro.tamanho_bytes} bytes</p>
          )}
          <p>Domínio: {registro.dominio?.nome_categoria || "Outros"}</p>
          <p>Local original: {registro.municipio || "—"}</p>
          {reviewNotes.length > 0 && (
            <p className="text-amber-600 font-medium mt-2">
              Rejeitada {reviewNotes.length} vez{reviewNotes.length > 1 ? "es" : ""}
            </p>
          )}
          {isBloqueado && (
            <p className="text-red-600 font-medium mt-1">🔒 Bloqueada para anotação</p>
          )}
          {!isReadOnly && annotations.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {annotations.length} caixa{annotations.length > 1 ? "s" : ""} desenhada{annotations.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}