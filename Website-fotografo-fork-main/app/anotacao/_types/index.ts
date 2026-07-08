import type { W3CAnnotation } from '@annotorious/react';

export interface Registro {
  id: number;
  url: string;
  titulo: string;
  descricao?: string;
  municipio?: string;
  dominio?: { nome_categoria: string };
  labels?: { label: { nome: string } }[];
  largura_pixels?: number;
  altura_pixels?: number;
  tamanho_bytes?: number;
  data_upload: string;
  status_curadoria: string;
  status_anotacao: string;
  status_revisao: string;
  status_bloqueio?: string;
  origem?: string;
  modelo_ia?: string;
  prompt_ia?: string;
  detalhes_ia?: string;
  bounding_boxes?: W3CAnnotation[];
}

export interface ReviewNote {
  id: number;
  note: string;
  created_at: string;
  resolved: boolean;
  reviewer: {
    id: number;
    nome: string;
  };
}