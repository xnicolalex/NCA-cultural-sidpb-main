import { useState, useEffect, useCallback } from 'react';
import { apiPath } from '@/lib/paths';
import type { Registro, ReviewNote } from '../_types';

export function useAnotacaoData() {
  const [registro, setRegistro] = useState<Registro | null>(null);
  const [pendentes, setPendentes] = useState<Registro[]>([]);
  const [anotadas, setAnotadas] = useState<Registro[]>([]);
  const [stats, setStats] = useState({ total: 0, anotadas: 0 });
  const [filtroMinhas, setFiltroMinhas] = useState(false);
  const [reviewNotes, setReviewNotes] = useState<ReviewNote[]>([]);

  const fetchReviewNotes = useCallback(async (registroId: number) => {
    try {
      const res = await fetch(apiPath(
        `/api/anotacao/review-notes?registroId=${registroId}&resolved=false`
      ));
      if (res.ok) {
        const data = await res.json();
        const unresolved = data.data || [];
        setReviewNotes(unresolved);
        return unresolved;
      }
    } catch {
      // Silent fail
    }
    return [];
  }, []);

  const fetchStats = useCallback(async () => {
    const res = await fetch(apiPath('/api/anotacao/stats'));
    const data = await res.json();
    setStats(data);
  }, []);

  const fetchPendentes = useCallback(async () => {
    const res = await fetch(apiPath('/api/anotacao/pendentes'));
    if (res.ok) {
      const data = await res.json();
      setPendentes(data);
      if (data.length > 0) {
        setRegistro((prev) => prev ?? data[0]);
        if (data[0].status_revisao === 'REJEITADO') {
          fetchReviewNotes(data[0].id);
        }
      }
    }
  }, [fetchReviewNotes]);

  const fetchAnotadas = useCallback(async () => {
    const url = apiPath(`/api/anotacao/anotadas${filtroMinhas ? '?minhas=true' : ''}`);
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setAnotadas(data);
    }
  }, [filtroMinhas]);

  const refreshAll = useCallback(() => {
    fetchStats();
    fetchPendentes();
    fetchAnotadas();
  }, [fetchStats, fetchPendentes, fetchAnotadas]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    fetchAnotadas();
  }, [filtroMinhas, fetchAnotadas]);

  const selecionarRegistro = useCallback(
    (reg: Registro, somenteLeitura: boolean) => {
      setRegistro(reg);
      setReviewNotes([]);

      if (!somenteLeitura && reg.status_revisao === 'REJEITADO') {
        fetchReviewNotes(reg.id);
      }

      return {
        descricao: reg.descricao || '',
        municipio: reg.municipio || '',
        labelsInput: reg.labels?.map((l) => l.label.nome).join(', ') || '',
        modoVisualizacao: somenteLeitura,
      };
    },
    [fetchReviewNotes]
  );

  return {
    registro,
    setRegistro,
    pendentes,
    anotadas,
    stats,
    filtroMinhas,
    setFiltroMinhas,
    reviewNotes,
    setReviewNotes,
    fetchReviewNotes,
    refreshAll,
    selecionarRegistro,
  };
}
