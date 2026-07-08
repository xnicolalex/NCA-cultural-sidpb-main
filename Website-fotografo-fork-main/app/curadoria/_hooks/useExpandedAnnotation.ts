"use client";

import { useState, useCallback } from "react";
import type { AnotadaParaRevisao } from "../_types";

export function useExpandedAnnotation() {
  const [anotada, setAnotada] = useState<AnotadaParaRevisao | null>(null);

  const open = useCallback((item: AnotadaParaRevisao) => {
    setAnotada(item);
  }, []);

  const close = useCallback(() => {
    setAnotada(null);
  }, []);

  return {
    expandedAnotada: anotada,
    openExpanded: open,
    closeExpanded: close,
  };
}