import type { W3CAnnotation } from '@annotorious/react';
import type { RegistroComDominio as RegistroComDominioOriginal } from "@/hooks/usePerfil";

export type { RegistroComDominioOriginal as RegistroComDominio };

export interface DominioCultural {
  nome_categoria: string;
}

export interface AnotadaParaRevisao {
  id: number;
  url: string;
  titulo: string;
  descricao?: string;
  municipio?: string;
  dominio?: DominioCultural;
  labels?: { label: { nome: string } }[];
  anotador?: { id: number; nome: string };
  data_upload: string;
  origem?: string;
  modelo_ia?: string;
  prompt_ia?: string;
  detalhes_ia?: string;
  total_rejections?: number;
  last_rejection_reason?: string;
  bounding_boxes?: W3CAnnotation[];
}

export interface CurationStats {
  pendentes: number;
  aprovados: number;
  rejeitados: number;
}