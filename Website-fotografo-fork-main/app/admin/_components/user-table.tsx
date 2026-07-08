"use client";

import { useState } from "react";
import { ShieldCheck, Eye } from "lucide-react";
import { AdminUser, PapelUsuario } from "../_types";
import { RoleChangeModal } from "./role-change-modal";
import { useUserFilters } from "../_hooks/useUserFilters";
import { getRoleLabel, getRoleBadgeClass, formatDate } from "../_lib/admin-utils";

interface UserTableProps {
  users: AdminUser[];
  refreshData: () => void;
}

function RoleBadge({ role }: { role: PapelUsuario }) {
  const label = getRoleLabel(role);
  const className = getRoleBadgeClass(role);
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {label}
    </span>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
        active
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-red-500"}`} />
      {active ? "Ativa" : "Inativa"}
    </span>
  );
}

export function UserTable({ users, refreshData }: UserTableProps) {
  const {
    searchQuery,
    setSearchQuery,
    filterRole,
    setFilterRole,
    filterStatus,
    setFilterStatus,
    filteredUsers,
  } = useUserFilters(users);

  const [modalUser, setModalUser] = useState<AdminUser | null>(null);

  const handleRoleChanged = (userId: number, newRole: PapelUsuario) => {
    refreshData();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="search"
          placeholder="Buscar por nome ou e-mail…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[220px] h-9 px-3 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as PapelUsuario | "")}
          className="h-9 px-3 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        >
          <option value="">Todos os papéis</option>
          {Object.values(PapelUsuario).map((r) => (
            <option key={r} value={r}>
              {getRoleLabel(r)}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "" | "ativa" | "inativa")}
          className="h-9 px-3 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        >
          <option value="">Todos os status</option>
          <option value="ativa">Ativa</option>
          <option value="inativa">Inativa</option>
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Nome</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">E-mail</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Papel atual</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Último acesso</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{user.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{user.nome}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{user.email}</td>
                    <td className="px-4 py-3"><RoleBadge role={user.papel} /></td>
                    <td className="px-4 py-3"><StatusBadge active={user.status_conta} /></td>
                    <td className="px-4 py-3 text-xs text-slate-400">{formatDate(user.ultimo_acesso)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setModalUser(user)}
                        className="inline-flex items-center gap-1.5 h-7 px-2.5 text-xs font-medium text-purple-700 border border-purple-200 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        Alterar permissão
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RoleChangeModal
        user={modalUser}
        onClose={() => setModalUser(null)}
        onSuccess={handleRoleChanged}
      />
    </>
  );
}