export enum PapelUsuario {
  ADMINISTRADOR = "ADMINISTRADOR",
  CURADOR = "CURADOR",
  ANOTADOR = "ANOTADOR",
  COLABORADOR = "COLABORADOR",
}

export interface AdminUser {
  id: number;
  nome: string;
  email: string;
  papel: PapelUsuario;
  status_conta: boolean;
  ultimo_acesso: string | null;
}

export interface AdminStats {
  total: number;
  ativos: number;
  inativos: number;
  porPapel: Record<PapelUsuario, number>;
}