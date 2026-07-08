"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

export function useRejectionModal(onReject: (id: number, motivo?: string) => Promise<void>) {
  const [isOpen, setIsOpen] = useState(false);
  const [registroId, setRegistroId] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const open = useCallback((id: number) => {
    setRegistroId(id);
    setReason("");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setReason("");
    setRegistroId(null);
    setIsSubmitting(false);
  }, []);

  const confirm = useCallback(async () => {
    if (!registroId) return;
    setIsSubmitting(true);
    try {
      await onReject(registroId, reason);
      close();
    } catch (error) {
      console.error("Erro ao rejeitar:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [registroId, reason, onReject, close]);

  return {
    isOpen,
    registroId,
    reason,
    setReason,
    isSubmitting,
    open,
    close,
    confirm,
  };
}