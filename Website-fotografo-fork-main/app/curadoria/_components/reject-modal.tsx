"use client";

import { Loader2 } from "lucide-react";

interface RejectModalProps {
  isOpen: boolean;
  registroId: number | null;
  reason: string;
  onReasonChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export function RejectModal({
  isOpen,
  registroId,
  reason,
  onReasonChange,
  onConfirm,
  onClose,
  isSubmitting,
}: RejectModalProps) {
  if (!isOpen || !registroId) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-2">Motivo da Rejeição</h3>
        <p className="text-sm text-slate-600 mb-4">
          Explique o motivo da rejeição para que o anotador possa corrigir.
        </p>
        <textarea
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="Descreva o que precisa ser ajustado..."
          className="w-full border rounded px-3 py-2 min-h-[100px] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          disabled={isSubmitting}
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border rounded-md text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Rejeitando...
              </>
            ) : (
              "Confirmar Rejeição"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}