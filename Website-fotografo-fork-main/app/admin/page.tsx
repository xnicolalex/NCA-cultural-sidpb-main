"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { StatsCards } from "./_components/stats-cards";
import { UserTable } from "./_components/user-table";
import { useAdminData } from "./_hooks/useAdminData";

export default function AdminPage() {
  const { user } = useAuth();
  const { users, stats, isLoading, error, refreshAll } = useAdminData();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Painel super-admin</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Gerenciamento de usuários e permissões de acesso
            </p>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
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
              {user?.papel_acesso === "ANOTADOR" && (
                <Link
                  href="/anotacao"
                  className="inline-flex items-center h-8 px-3 text-xs font-medium text-blue-700 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  Anotação
                </Link>
              )}
              {user?.papel_acesso === "CURADOR" && (
                <Link
                  href="/curadoria"
                  className="inline-flex items-center h-8 px-3 text-xs font-medium text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                >
                  Curadoria
                </Link>
              )}
              {user?.papel_acesso === "ADMINISTRADOR" && (
                <Link
                  href="/admin/adicionar-imagem"
                  className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Adicionar Imagem IA
                </Link>
              )}
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-slate-900 text-white">
            Acesso root
          </span>
        </div>

        {isLoading ? (
          <p className="text-sm text-slate-500">Carregando…</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <>
            <StatsCards stats={stats} />
            <UserTable users={users} refreshData={refreshAll} />
          </>
        )}
      </div>
    </div>
  );
}