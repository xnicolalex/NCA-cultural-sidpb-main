"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { ProgressBar } from "./_components/progress-bar";
import { NavigationButtons } from "./_components/navigation-buttons";
import { ListaPendentes } from "./_components/lista-pendentes";
import { ListaAnotadas } from "./_components/lista-anotadas";
import { RegistroSidebar } from "./_components/registro-sidebar";
import { RegistroDetail } from "./_components/registro-detail";
import { LightboxViewer } from "./_components/lightbox-viewer";
import { useBoundingBoxes } from "./_hooks/useBoundingBoxes";
import { useAnnotationLabels } from "./_hooks/useAnnotationLabels";
import { useAnotacaoData } from "./_hooks/useAnotacaoData";
import { useFormAnotacao } from "./_hooks/useFormAnotacao";
import { useAnotacaoSelection } from "./_hooks/useAnotacaoSelection";

export default function AnotacaoPage() {
  const { user } = useAuth();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showPendentes, setShowPendentes] = useState(true);
  const [showAnotadas, setShowAnotadas] = useState(false);

  const {
    registro,
    setRegistro,
    pendentes,
    anotadas,
    stats,
    filtroMinhas,
    setFiltroMinhas,
    fetchReviewNotes,
    refreshAll,
  } = useAnotacaoData();

  const { availableLabels, selectedLabel, setSelectedLabel } =
    useAnnotationLabels();

  const { annotations, handleChange, clearAnnotations, getBoundingBoxesForAPI, getAnnotationCount } =
    useBoundingBoxes(registro?.bounding_boxes || []);

  const { preencherDoRegistro, ...form } = useFormAnotacao({
    registro,
    getBoundingBoxesForAPI,
    onClearAnnotations: clearAnnotations,
    onSaved: () => {
      setRegistro(null);
      refreshAll();
    },
  });

  const { modoVisualizacao, reviewNotes, showReviewNotes, setShowReviewNotes, selecionar } =
    useAnotacaoSelection({
      fetchReviewNotes,
      clearAnnotations,
      preencherForm: preencherDoRegistro,
    });

  const isIA = registro?.origem === "IA_GENERATIVA";

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar total={stats.total} anotadas={stats.anotadas} />
      <NavigationButtons papel={user?.papel_acesso} />

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <ListaPendentes
          pendentes={pendentes}
          registroSelecionado={registro}
          show={showPendentes}
          onToggle={() => setShowPendentes(!showPendentes)}
          onSelect={(reg) => selecionar(reg, false)}
          modoVisualizacao={modoVisualizacao}
        />
        <ListaAnotadas
          anotadas={anotadas}
          registroSelecionado={registro}
          show={showAnotadas}
          onToggle={() => setShowAnotadas(!showAnotadas)}
          onSelect={(reg) => selecionar(reg, true)}
          modoVisualizacao={modoVisualizacao}
          filtroMinhas={filtroMinhas}
          onFiltroChange={setFiltroMinhas}
        />

        {!registro ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground text-lg">
              Selecione uma imagem acima para começar.
            </p>
          </div>
        ) : (
          <div className="flex gap-8 flex-col lg:flex-row">
            <RegistroSidebar
              registro={registro}
              reviewNotes={reviewNotes}
              onImageClick={() => setLightboxOpen(true)}
              annotations={annotations}
              onAnnotationsChange={handleChange}
              readOnly={modoVisualizacao}
              isBloqueado={registro.status_bloqueio === "BLOQUEADO"}
              selectedLabel={selectedLabel}
            />
            <RegistroDetail
              registro={registro}
              reviewNotes={reviewNotes}
              isIA={isIA}
              modoVisualizacao={modoVisualizacao}
              descricao={form.descricao}
              setDescricao={form.setDescricao}
              municipio={form.municipio}
              setMunicipio={form.setMunicipio}
              labelsInput={form.labelsInput}
              setLabelsInput={form.setLabelsInput}
              showReviewNotes={showReviewNotes}
              justificativa={form.justificativa}
              setJustificativa={form.setJustificativa}
              handleSalvar={form.handleSalvar}
              handlePular={form.handlePular}
              annotations={annotations}
              annotationCount={getAnnotationCount()}
              onAddAnnotation={() => {}}
              onClearAnnotations={clearAnnotations}
              availableLabels={availableLabels}
              selectedLabel={selectedLabel}
              onSelectedLabelChange={setSelectedLabel}
            />
          </div>
        )}
      </div>

      {registro && (
        <LightboxViewer
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageUrl={registro.url}
        />
      )}
    </div>
  );
}