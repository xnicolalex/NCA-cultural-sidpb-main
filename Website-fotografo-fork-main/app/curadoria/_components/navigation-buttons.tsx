"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

interface NavigationButtonsProps {
  user: any;
}

export function NavigationButtons({ user }: NavigationButtonsProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-4 flex items-center gap-3 flex-wrap">
      <Link
        href="/"
        className="inline-flex items-center h-8 px-3 text-xs font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 rounded-md transition-colors"
      >
        Início
      </Link>
      <Link
        href="/perfil"
        className="inline-flex items-center h-8 px-3 text-xs font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 rounded-md transition-colors"
      >
        Meu Perfil
      </Link>
      {user?.papel_acesso === "ADMINISTRADOR" && (
        <Link
          href="/admin"
          className="inline-flex items-center h-8 px-3 text-xs font-medium text-purple-700 border border-purple-200 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
        >
          Admin
        </Link>
      )}
      {(user?.papel_acesso === "CURADOR" || user?.papel_acesso === "ADMINISTRADOR") && (
        <Link
          href="/admin/adicionar-imagem"
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Enviar Imagem IA
        </Link>
      )}
    </div>
  );
}