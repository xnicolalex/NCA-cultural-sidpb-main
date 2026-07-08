"use client"

import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Button } from '@/components/ui/button'

interface EditarSenhaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (novaSenha: string) => void;
}

export function EditarSenhaModal({ isOpen, onClose, onConfirm }: EditarSenhaModalProps) {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleConfirm = () => {
    if (!novaSenha || !confirmarSenha) { setErro('Preencha todos os campos.'); return; }
    if (novaSenha.length < 6) { setErro('A senha deve ter no mínimo 6 caracteres.'); return; }
    if (novaSenha !== confirmarSenha) { setErro('As senhas não coincidem.'); return; }
    onConfirm(novaSenha);
    setNovaSenha('');
    setConfirmarSenha('');
    setErro('');
  };

  const handleClose = () => {
    setNovaSenha(''); setConfirmarSenha(''); setErro('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel transition className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
          <DialogTitle className="text-xl font-bold mb-2 text-foreground">EDITAR SENHA</DialogTitle>
          <p className="text-sm text-muted-foreground mb-6">Escolha uma nova senha para a sua conta.</p>
          <div className="space-y-4 mb-2">
            <input value={novaSenha} onChange={(e) => { setNovaSenha(e.target.value); setErro(''); }} type="password" placeholder="NOVA SENHA" className="w-full border border-border p-2 rounded-md" />
            <input value={confirmarSenha} onChange={(e) => { setConfirmarSenha(e.target.value); setErro(''); }} type="password" placeholder="CONFIRMAR NOVA SENHA" className="w-full border border-border p-2 rounded-md" />
          </div>
          <div className="mb-4 min-h-[20px]">
            {erro && <p className="text-sm text-red-500">{erro}</p>}
          </div>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="w-1/2" onClick={handleClose}>CANCELAR</Button>
            <Button className="w-1/2 bg-black text-white" onClick={handleConfirm}>SALVAR</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}