"use client"

import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { TriangleAlert } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  descricao: string;
  labelConfirmar: string;
}

export function ConfirmModal({ isOpen, onClose, onConfirm, titulo, descricao, labelConfirmar }: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel transition className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-red-100 p-2">
              <TriangleAlert className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              {titulo}
            </DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{descricao}</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>CANCELAR</Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={onConfirm}>
              {labelConfirmar}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}