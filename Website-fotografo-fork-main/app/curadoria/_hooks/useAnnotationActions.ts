"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { apiPath } from "@/lib/paths";

export function useAnnotationActions(
  fetchAnotadas: () => Promise<void>,
  fetchStats: () => Promise<void>,
  setExpandedAnotada: (value: any) => void
) {
  const handleAprovar = useCallback(
    async (id: number) => {
      const res = await fetch(apiPath("/api/curadoria/aprovar-anotacao"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registroId: id }),
      });
      if (res.ok) {
        toast.success("Anotação aprovada!");
        await fetchAnotadas();
        await fetchStats();
        setExpandedAnotada(null);
      } else {
        toast.error("Erro ao aprovar anotação.");
      }
    },
    [fetchAnotadas, fetchStats, setExpandedAnotada]
  );

  const handleRejeitar = useCallback(
    async (id: number, motivo?: string): Promise<void> => {
      const res = await fetch(apiPath("/api/curadoria/rejeitar-anotacao"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registroId: id, motivo: motivo || "" }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        await fetchAnotadas();
        await fetchStats();
        setExpandedAnotada(null);
      } else {
        toast.error("Erro ao rejeitar anotação.");
      }
    },
    [fetchAnotadas, fetchStats, setExpandedAnotada]
  );

  return {
    handleAprovar,
    handleRejeitar,
  };
}
