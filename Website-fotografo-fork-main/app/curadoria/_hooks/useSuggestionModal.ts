"use client";

import { useState, useCallback } from "react";
import type { RegistroComDominio } from "../_types";

export function useSuggestionModal() {
  const [registro, setRegistro] = useState<RegistroComDominio | null>(null);

  const open = useCallback((reg: RegistroComDominio) => {
    setRegistro(reg);
  }, []);

  const close = useCallback(() => {
    setRegistro(null);
  }, []);

  return {
    registro,
    open,
    close,
  };
}