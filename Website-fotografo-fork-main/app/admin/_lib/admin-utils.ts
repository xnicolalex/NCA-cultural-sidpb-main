import { PapelUsuario } from "../_types";

export const ROLE_LABELS: Record<PapelUsuario, string> = {
  [PapelUsuario.ADMINISTRADOR]: "Administrador",
  [PapelUsuario.CURADOR]: "Curador",
  [PapelUsuario.ANOTADOR]: "Anotação",
  [PapelUsuario.COLABORADOR]: "Colaborador",
};

export const ROLE_BADGE_CLASS: Record<PapelUsuario, string> = {
  [PapelUsuario.ADMINISTRADOR]: "bg-purple-50 text-purple-700 border-purple-200",
  [PapelUsuario.CURADOR]: "bg-emerald-50 text-emerald-700 border-emerald-200",
  [PapelUsuario.ANOTADOR]: "bg-blue-50 text-blue-700 border-blue-200",
  [PapelUsuario.COLABORADOR]: "bg-slate-100 text-slate-600 border-slate-200",
};

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function getRoleLabel(role: PapelUsuario): string {
  return ROLE_LABELS[role] || role;
}

export function getRoleBadgeClass(role: PapelUsuario): string {
  return ROLE_BADGE_CLASS[role] || "bg-slate-100 text-slate-600 border-slate-200";
}