export interface RegistroIconografico {
  id: number;
  url: string;
  titulo: string;
  descricao: string;
  municipio: string;
  categoria_sugerida: string;
  licenca: string;
  data_upload: string;
  status_curadoria: string;
  usuarioId: number;
}

export async function buscarRegistrosPorUsuario(usuarioId: string): Promise<RegistroIconografico[]> {
  const response = await fetch(`/api/registros?usuarioId=${usuarioId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao buscar contribuições.');
  }

  return data as RegistroIconografico[];
}