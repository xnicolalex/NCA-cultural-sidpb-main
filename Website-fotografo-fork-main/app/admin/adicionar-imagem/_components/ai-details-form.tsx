"use client";

interface AIDetailsFormProps {
  modeloIa: string;
  setModeloIa: (value: string) => void;
  promptIa: string;
  setPromptIa: (value: string) => void;
  detalhesIa: string;
  setDetalhesIa: (value: string) => void;
}

export function AIDetailsForm({
  modeloIa,
  setModeloIa,
  promptIa,
  setPromptIa,
  detalhesIa,
  setDetalhesIa,
}: AIDetailsFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-slate-900">Detalhes da IA</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Modelo de IA *</label>
          <input
            type="text"
            value={modeloIa}
            onChange={(e) => setModeloIa(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
            placeholder="Ex: Midjourney v6, DALL-E 3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Versão</label>
          <input
            type="text"
            placeholder="Ex: v6.1"
            className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Prompt utilizado *</label>
        <textarea
          value={promptIa}
          onChange={(e) => setPromptIa(e.target.value)}
          className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm h-24"
          placeholder="Descreva o prompt exato usado para gerar a imagem..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Detalhes adicionais</label>
        <textarea
          value={detalhesIa}
          onChange={(e) => setDetalhesIa(e.target.value)}
          className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm h-20"
          placeholder="Ex: imagem gerada com image-to-image, foto base era de..."
        />
      </div>
    </div>
  );
}