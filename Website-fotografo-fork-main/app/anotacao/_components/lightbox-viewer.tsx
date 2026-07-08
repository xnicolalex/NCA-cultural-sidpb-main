"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface LightboxViewerProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
}

export function LightboxViewer({ open, onClose, imageUrl }: LightboxViewerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        onClick={onClose}
        aria-label="Fechar"
      >
        <X className="h-8 w-8" />
      </button>
      <img
        src={imageUrl}
        alt="Visualização expandida"
        className="max-h-[95vh] max-w-[95vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}