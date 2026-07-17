"use client"

import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import type { RegistroComDominio } from '@/hooks/usePerfil'
import { withBasePath } from '@/lib/paths'

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  registro: RegistroComDominio | null;
}

export function ImageModal({ isOpen, onClose, registro }: ImageModalProps) {
  if (!registro) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0" />
      
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel transition className="w-full max-w-3xl bg-background rounded-2xl shadow-2xl transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 overflow-hidden flex flex-col max-h-[90vh]">
          
          <div className="w-full h-[50vh] sm:h-[60vh] bg-neutral-900 flex items-center justify-center border-b border-border relative">
            <img 
              src={withBasePath(registro.url)}
              alt={registro.titulo} 
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="p-6 overflow-y-auto">
            <DialogTitle className="text-2xl font-bold text-foreground mb-2">
              {registro.titulo}
            </DialogTitle>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4 border-b border-border pb-4">
              <p><span className="font-semibold text-foreground">Categoria:</span> {registro.dominio?.nome_categoria || registro.categoria_sugerida}</p>
              <p><span className="font-semibold text-foreground">Local:</span> {registro.municipio}</p>
              <p><span className="font-semibold text-foreground">Licença:</span> <span className="font-mono">{registro.licenca}</span></p>
              <p><span className="font-semibold text-foreground">Data de Envio:</span> {new Intl.DateTimeFormat('pt-BR').format(new Date(registro.data_upload))}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Descrição</h3>
              <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {registro.descricao || "Nenhuma descrição fornecida para esta imagem."}
              </p>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                FECHAR
              </Button>
            </div>
          </div>
          
        </DialogPanel>
      </div>
    </Dialog>
  )
}
