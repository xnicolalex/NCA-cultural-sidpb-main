import { useState, useCallback } from 'react';
import type { Registro } from '../_types';

interface UseAnotacaoSelectionProps {
  fetchReviewNotes: (registroId: number) => Promise<any[]>;
  clearAnnotations: () => void;
  preencherForm: (reg: Registro) => void;
}

export function useAnotacaoSelection({
  fetchReviewNotes,
  clearAnnotations,
  preencherForm,
}: UseAnotacaoSelectionProps) {
  const [modoVisualizacao, setModoVisualizacao] = useState(false);
  const [reviewNotes, setReviewNotes] = useState<any[]>([]);
  const [showReviewNotes, setShowReviewNotes] = useState(false);

  const selecionar = useCallback(
    (reg: Registro, somenteLeitura: boolean) => {
      setModoVisualizacao(somenteLeitura);
      setReviewNotes([]);
      setShowReviewNotes(false);
      clearAnnotations();
      preencherForm(reg);

      if (!somenteLeitura && reg.status_revisao === 'REJEITADO') {
        fetchReviewNotes(reg.id).then((notes) => {
          setReviewNotes(notes);
          if (notes.length > 0) setShowReviewNotes(true);
        });
      }
    },
    [fetchReviewNotes, clearAnnotations, preencherForm]
  );

  return {
    modoVisualizacao,
    reviewNotes,
    showReviewNotes,
    setShowReviewNotes,
    selecionar,
  };
}