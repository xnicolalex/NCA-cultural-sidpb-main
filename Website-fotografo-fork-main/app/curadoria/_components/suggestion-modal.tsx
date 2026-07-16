"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { apiPath } from "@/lib/paths";
import type { RegistroComDominio } from "@/hooks/usePerfil";

interface SuggestionModalProps {
  registro: RegistroComDominio | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function SuggestionModal({ registro, onClose, onSuccess }: SuggestionModalProps) {
  const [acao, setAcao] = useState<"PROMOVER" | "FUNDIR" | "DESCARTAR">("PROMOVER");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [categoriaExistenteId, setCategoriaExistenteId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (registro) {
      setNovaCategoria(registro.categoria_sugerida || "");
      setAcao("PROMOVER");
      setCategoriaExistenteId(null);
      setLoadingCategorias(true);
      fetch(apiPath("/api/curadoria/categorias"))
        .then((res) => res.json())
        .then((data) => setCategorias(data))
        .catch(() => toast.error("Erro ao carregar categorias."))
        .finally(() => setLoadingCategorias(false));
    }
  }, [registro]);

  if (!registro) return null;

  const handleSubmit = async () => {
    if (acao === "PROMOVER" && !novaCategoria.trim()) {
      toast.error("Informe o nome da nova categoria.");
      return;
    }
    if (acao === "FUNDIR" && !categoriaExistenteId) {
      toast.error("Selecione uma categoria existente.");
      return;
    }

    setSalvando(true);
    try {
      const body: any = {
        registroId: registro.id,
        acao,
      };
      if (acao === "PROMOVER") body.novaCategoria = novaCategoria.trim();
      if (acao === "FUNDIR") body.dominioIdExistente = categoriaExistenteId;

      const res = await fetch(apiPath("/api/curadoria/processar-sugestao"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Falha ao processar sugestão.");
      toast.success("Sugestão processada com sucesso!");
      onSuccess();
      onClose();
    } catch {
      toast.error("Erro ao processar sugestão.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
        <h3 className="text-lg font-semibold mb-4">Processar Sugestão de Categoria</h3>
        <p className="text-sm text-slate-500 mb-4">
          Imagem: <strong>{registro.titulo}</strong><br />
          Sugestão original: <span className="font-medium text-amber-700">{registro.categoria_sugerida}</span>
        </p>

        {/* Seletor de ação */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="radio" name="acao" value="PROMOVER" checked={acao === "PROMOVER"} onChange={() => setAcao("PROMOVER")} />
            <span className="font-medium">Criar nova categoria</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="radio" name="acao" value="FUNDIR" checked={acao === "FUNDIR"} onChange={() => setAcao("FUNDIR")} />
            <span className="font-medium">Fundir com categoria existente</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="radio" name="acao" value="DESCARTAR" checked={acao === "DESCARTAR"} onChange={() => setAcao("DESCARTAR")} />
            <span className="font-medium">Descartar sugestão (manter imagem em Outros)</span>
          </label>
        </div>

        {/* Campos dinâmicos */}
        {acao === "PROMOVER" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nome da nova categoria</label>
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: Festa do Divino"
            />
          </div>
        )}

        {acao === "FUNDIR" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Selecionar categoria oficial</label>
            <select
              value={categoriaExistenteId ?? ""}
              onChange={(e) => setCategoriaExistenteId(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
              disabled={loadingCategorias}
            >
              <option value="">-- Selecione --</option>
              {categorias.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.nome_categoria}</option>
              ))}
            </select>
            {loadingCategorias && <p className="text-xs text-slate-400 mt-1">Carregando...</p>}
          </div>
        )}

        {acao === "DESCARTAR" && (
          <p className="text-sm text-slate-500 mb-4">
            A sugestão será removida e a imagem permanecerá vinculada à categoria "Outros".
          </p>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded-md">Cancelar</button>
          <button
            onClick={handleSubmit}
            disabled={salvando}
            className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
          >
            {salvando ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
