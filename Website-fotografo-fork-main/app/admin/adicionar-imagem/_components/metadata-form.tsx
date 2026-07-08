"use client";

interface MetadataFormProps {
  titulo: string;
  setTitulo: (value: string) => void;
  descricao: string;
  setDescricao: (value: string) => void;
  municipio: string;
  setMunicipio: (value: string) => void;
  dominioId: string;
  setDominioId: (value: string) => void;
  dominios: { id: string | number; nome_categoria: string }[];
  loadingDominios: boolean;
}

export function MetadataForm({
  titulo,
  setTitulo,
  descricao,
  setDescricao,
  municipio,
  setMunicipio,
  dominioId,
  setDominioId,
  dominios,
  loadingDominios,
}: MetadataFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Título *</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
          placeholder="Ex: Festa do Divino - representação artística"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm h-24"
          placeholder="Descreva a imagem..."
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Município</label>
          <input
            type="text"
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
            placeholder="Ex: São Luís"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Domínio *</label>
          <select
            value={dominioId}
            onChange={(e) => setDominioId(e.target.value)}
            disabled={loadingDominios}
            className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            {dominios.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome_categoria}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}