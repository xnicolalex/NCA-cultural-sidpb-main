import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import type { Registro } from '../_types';

interface UseFormAnotacaoProps {
  registro: Registro | null;
  getBoundingBoxesForAPI: () => any[];
  onClearAnnotations: () => void;
  onSaved: () => void;
}

export function useFormAnotacao({
  registro,
  getBoundingBoxesForAPI,
  onClearAnnotations,
  onSaved,
}: UseFormAnotacaoProps) {
  const [descricao, setDescricao] = useState('');
  const [labelsInput, setLabelsInput] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [justificativa, setJustificativa] = useState('');

  const preencherDoRegistro = useCallback((reg: Registro) => {
    setDescricao(reg.descricao || '');
    setMunicipio(reg.municipio || '');
    setLabelsInput(
      reg.labels?.map((l) => l.label.nome).join(', ') || ''
    );
    setJustificativa('');
  }, []);

  const limpar = useCallback(() => {
    setDescricao('');
    setLabelsInput('');
    setMunicipio('');
    setJustificativa('');
  }, []);

  const handleSalvar = useCallback(async () => {
    if (!registro) return;

    const labels = labelsInput
      .split(',')
      .map((l) => l.trim())
      .filter((l) => l);

    const boundingBoxes = getBoundingBoxesForAPI();

    const res = await fetch('/api/anotacao/salvar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registroId: registro.id,
        descricao,
        labels,
        municipio,
        boundingBoxes,
      }),
    });

    if (res.ok) {
      toast.success(
        registro.status_revisao === 'REJEITADO'
          ? 'Anotação corrigida e reenviada para revisão!'
          : 'Anotação salva e enviada para revisão!'
      );
      limpar();
      onClearAnnotations();
      onSaved();
    } else {
      const error = await res.json();
      toast.error(error.error || 'Erro ao salvar.');
    }
  }, [
    registro,
    descricao,
    labelsInput,
    municipio,
    getBoundingBoxesForAPI,
    onClearAnnotations,
    onSaved,
    limpar,
  ]);

  const handlePular = useCallback(async () => {
    if (!justificativa.trim()) {
      toast.error('Informe uma justificativa para pular.');
      return;
    }
    if (!registro) return;

    const res = await fetch('/api/anotacao/pular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registroId: registro.id, justificativa }),
    });

    if (res.ok) {
      toast.success('Imagem pulada.');
      limpar();
      onSaved();
    } else {
      toast.error('Erro ao pular.');
    }
  }, [registro, justificativa, onSaved, limpar]);

  return {
    descricao,
    setDescricao,
    labelsInput,
    setLabelsInput,
    municipio,
    setMunicipio,
    justificativa,
    setJustificativa,
    preencherDoRegistro,
    limpar,
    handleSalvar,
    handlePular,
  };
}