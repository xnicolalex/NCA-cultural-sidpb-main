"use client";

import { useState, useMemo } from "react";
import { PapelUsuario, AdminUser } from "../_types";

type FilterStatus = "ativa" | "inativa" | "";

export function useUserFilters(users: AdminUser[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<PapelUsuario | "">("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("");

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return users.filter((user) => {
      const matchesSearch =
        !q ||
        user.nome.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q);
      const matchesRole = !filterRole || user.papel === filterRole;
      const matchesStatus =
        !filterStatus ||
        (filterStatus === "ativa" ? user.status_conta : !user.status_conta);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, filterRole, filterStatus]);

  return {
    searchQuery,
    setSearchQuery,
    filterRole,
    setFilterRole,
    filterStatus,
    setFilterStatus,
    filteredUsers,
  };
}