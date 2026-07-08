"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
  disabled: boolean;
}

export function FormActions({ isSubmitting, disabled }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
      <Link
        href="/admin"
        className="px-4 py-2 text-sm border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50"
      >
        Cancelar
      </Link>
      <button
        type="submit"
        disabled={disabled || isSubmitting}
        className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          "Enviar Imagem IA"
        )}
      </button>
    </div>
  );
}