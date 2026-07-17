"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { apiPath } from "@/lib/paths";
import type { RegistroComDominio, AnotadaParaRevisao, CurationStats } from "../_types";

export function useCuradoriaData() {
  const [registros, setRegistros] = useState<RegistroComDominio[]>([]);
  const [anotadas, setAnotadas] = useState<AnotadaParaRevisao[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CurationStats>({ pendentes: 0, aprovados: 0, rejeitados: 0 });
  const [filtroStatus, setFiltroStatus] = useState("");
  const [somenteComSugestao, setSomenteComSugestao] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(apiPath("/api/curadoria/stats"));
      if (res.ok) setStats(await res.json());
    } catch {
      // Silent fail
    }
  }, []);

  const fetchPendentes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filtroStatus) params.set("status", filtroStatus);
      if (somenteComSugestao) params.set("comSugestao", "true");
      const res = await fetch(apiPath(`/api/curadoria/pendentes?${params.toString()}`));
      if (res.ok) {
        setRegistros(await res.json());
      } else {
        toast.error("Erro ao carregar imagens.");
      }
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }, [filtroStatus, somenteComSugestao]);

  const fetchAnotadas = useCallback(async () => {
    try {
      const res = await fetch(apiPath("/api/curadoria/anotadas"));
      if (res.ok) {
        const data = await res.json();
        setAnotadas(data);
      }
    } catch {
      // Silent fail
    }
  }, []);

  const refreshAll = useCallback(() => {
    fetchStats();
    fetchPendentes();
    fetchAnotadas();
  }, [fetchStats, fetchPendentes, fetchAnotadas]);

  return {
    // State
    registros,
    anotadas,
    loading,
    stats,
    filtroStatus,
    setFiltroStatus,
    somenteComSugestao,
    setSomenteComSugestao,
    // Actions
    fetchStats,
    fetchPendentes,
    fetchAnotadas,
    refreshAll,
  };
}
