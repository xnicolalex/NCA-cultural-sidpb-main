"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { apiPath } from "@/lib/paths";
import type { AdminUser, AdminStats } from "../_types";

export function useAdminData() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (limit = 200) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(apiPath(`/api/admin/usuarios?limit=${limit}`));
      if (!res.ok) throw new Error("Erro ao carregar usuários");
      const { data } = await res.json();
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(apiPath("/api/admin/stats"));
      if (res.ok) {
        setStats(await res.json());
      }
    } catch {
      // Silent fail for stats
    }
  }, []);

  const refreshAll = useCallback(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers, fetchStats]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return {
    users,
    stats,
    isLoading,
    error,
    fetchUsers,
    fetchStats,
    refreshAll,
  };
}
