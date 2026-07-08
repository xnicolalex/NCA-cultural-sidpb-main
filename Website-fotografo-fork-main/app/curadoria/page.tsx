"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { FilterBar } from "./_components/filter-bar";
import { ImageCard } from "./_components/image-card";
import { SuggestionModal } from "./_components/suggestion-modal";
import { EmptyState } from "./_components/empty-state";
import { CurationHeader } from "./_components/curation-header";
import { AnnotationReviewList } from "./_components/annotation-review-list";
import { AnnotationDetailModal } from "./_components/annotation-detail-modal";
import { RejectModal } from "./_components/reject-modal";
import { NavigationButtons } from "./_components/navigation-buttons";
import { LoadingSpinner } from "./_components/loading-spinner";
import { useCuradoriaData } from "./_hooks/useCuradoriaData";
import { useRejectionModal } from "./_hooks/useRejectionModal";
import { useAnnotationActions } from "./_hooks/useAnnotationActions";
import { useSuggestionModal } from "./_hooks/useSuggestionModal";
import { useExpandedAnnotation } from "./_hooks/useExpandedAnnotation";

export default function CuradoriaPage() {
  const { user } = useAuth();

  // Data
  const {
    registros,
    anotadas,
    loading,
    stats,
    filtroStatus,
    setFiltroStatus,
    somenteComSugestao,
    setSomenteComSugestao,
    fetchPendentes,
    fetchAnotadas,
    fetchStats,
    refreshAll,
  } = useCuradoriaData();

  // UI State
  const [showAnotadas, setShowAnotadas] = useState(false);
  const { expandedAnotada, openExpanded, closeExpanded } = useExpandedAnnotation();
  const { registro: suggestionRegistro, open: openSuggestion, close: closeSuggestion } = useSuggestionModal();

  // Actions
  const { handleAprovar, handleRejeitar } = useAnnotationActions(
    fetchAnotadas,
    fetchStats,
    closeExpanded
  );

  const { isOpen: rejectIsOpen, registroId: rejectRegistroId, reason: rejectReason, setReason: setRejectReason, isSubmitting: isRejecting, open: openReject, close: closeReject, confirm: confirmReject } = useRejectionModal(handleRejeitar);

  // Initial load
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const handleProcessarSugestao = (registro: any) => {
    openSuggestion(registro);
  };

  const handleSuggestionSuccess = () => {
    refreshAll();
    closeSuggestion();
  };

  const isIA = (item: any) => item.origem === "IA_GENERATIVA";

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationButtons user={user} />

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <CurationHeader stats={stats} />

        <FilterBar
          filtroStatus={filtroStatus}
          onFiltroStatusChange={setFiltroStatus}
          somenteComSugestao={somenteComSugestao}
          onSomenteComSugestaoChange={setSomenteComSugestao}
        />

        {loading ? (
          <LoadingSpinner />
        ) : registros.length === 0 ? (
          <EmptyState filtroStatus={filtroStatus} />
        ) : (
          <div className="grid gap-4">
            {registros.map((registro) => (
              <ImageCard
                key={registro.id}
                registro={registro}
                onProcessarSugestao={handleProcessarSugestao}
                onRefresh={fetchPendentes}
              />
            ))}
          </div>
        )}

        <AnnotationReviewList
          anotadas={anotadas}
          show={showAnotadas}
          onToggle={() => {
            setShowAnotadas(!showAnotadas);
            if (!showAnotadas) fetchAnotadas();
          }}
          onSelect={openExpanded}
          onApprove={handleAprovar}
          onReject={openReject}
          isIA={isIA}
        />
      </div>

      <AnnotationDetailModal
        anotada={expandedAnotada}
        onClose={closeExpanded}
        onApprove={handleAprovar}
        onReject={(id) => {
          closeExpanded();
          openReject(id);
        }}
        isIA={isIA}
      />

      <RejectModal
        isOpen={rejectIsOpen}
        registroId={rejectRegistroId}
        reason={rejectReason}
        onReasonChange={setRejectReason}
        onConfirm={confirmReject}
        onClose={closeReject}
        isSubmitting={isRejecting}
      />

      <SuggestionModal
        registro={suggestionRegistro}
        onClose={closeSuggestion}
        onSuccess={handleSuggestionSuccess}
      />
    </div>
  );
}