"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { PapelUsuario, AdminUser } from "../_types";

type RoleChangeStep = "select" | "confirm";

export function useRoleChange(
  user: AdminUser | null,
  onSuccess: (userId: number, newRole: PapelUsuario) => void,
  onClose: () => void
) {
  const [step, setStep] = useState<RoleChangeStep>("select");
  const [selectedRole, setSelectedRole] = useState<PapelUsuario | "">("");
  const [isAware, setIsAware] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reset = useCallback(() => {
    setStep("select");
    setSelectedRole("");
    setIsAware(false);
    setIsLoading(false);
  }, []);

  const canProceed = selectedRole !== "" && selectedRole !== user?.papel;
  const canSave = isAware;

  const handleSave = useCallback(async () => {
    if (!canSave || !user || !selectedRole) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/usuarios/${user.id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRole: selectedRole }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? "Erro ao alterar permissão.");
      }
      toast.success(`Papel de ${user.nome} alterado para ${selectedRole}.`);
      onSuccess(user.id, selectedRole as PapelUsuario);
      reset();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [canSave, user, selectedRole, onSuccess, onClose, reset]);

  return {
    step,
    setStep,
    selectedRole,
    setSelectedRole,
    isAware,
    setIsAware,
    isLoading,
    canProceed,
    canSave,
    handleSave,
    reset,
  };
}