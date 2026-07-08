"use client"

import { useState } from 'react'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Loader2, ExternalLink } from 'lucide-react' 
import { useAuthModal } from '@/hooks/useAuthModal'

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [expandedDoc, setExpandedDoc] = useState<'termos' | 'privacidade' | null>(null)

  const { nomeCadastro, emailCadastro, senhaCadastro, erroCadastro, isLoadingCadastro, setNomeCadastro, setEmailCadastro, setSenhaCadastro, limparErroCadastro, aceitaTermos, setAceitaTermos, aceitaPolitica, setAceitaPolitica, emailLogin, senhaLogin, erroLogin, isLoadingLogin, setEmailLogin, setSenhaLogin, limparErroLogin, handleCadastro, handleLogin } = useAuthModal()

  const handleClose = () => {
    if (isLoadingCadastro || isLoadingLogin) return
    limparErroCadastro()
    limparErroLogin()
    setExpandedDoc(null)
    onClose()
  }

  const toggleDoc = (doc: 'termos' | 'privacidade') => {
    setExpandedDoc(expandedDoc === doc ? null : doc)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel transition className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[1.5rem] md:rounded-2xl shadow-2xl transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border flex flex-col">
              <p className="text-[10px] md:text-xs uppercase tracking-wide text-muted-foreground mb-1">Novo por aqui?</p>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 md:mb-6">CADASTRAR</h2>
              <div className="space-y-4 mb-2 flex-grow">
                <input value={nomeCadastro} onChange={(e) => { setNomeCadastro(e.target.value); limparErroCadastro(); }} type="text" placeholder="NOME" disabled={isLoadingCadastro} className="w-full border border-border px-3 py-2 md:p-2 rounded-md disabled:opacity-50 min-h-[44px]" />
                <input value={emailCadastro} onChange={(e) => { setEmailCadastro(e.target.value); limparErroCadastro(); }} type="email" placeholder="EMAIL" disabled={isLoadingCadastro} className="w-full border border-border px-3 py-2 md:p-2 rounded-md disabled:opacity-50 min-h-[44px]" />
                <input value={senhaCadastro} onChange={(e) => { setSenhaCadastro(e.target.value); limparErroCadastro(); }} type="password" placeholder="SENHA" disabled={isLoadingCadastro} className="w-full border border-border px-3 py-2 md:p-2 rounded-md disabled:opacity-50 min-h-[44px]" />
                <div className="pt-2">
                  <div className="flex items-start gap-2 md:gap-3">
                    <input id="check-termos" type="checkbox" checked={aceitaTermos} onChange={(e) => { setAceitaTermos(e.target.checked); limparErroCadastro(); }} disabled={isLoadingCadastro} className="mt-0.5 w-5 h-5 md:w-4 md:h-4 cursor-pointer disabled:opacity-50 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground leading-snug">
                      <label htmlFor="check-termos" className="cursor-pointer min-h-[24px] inline-block">Li e aceito os </label>
                      <button type="button" onClick={() => toggleDoc('termos')} className="underline font-medium hover:text-[#0056A4] transition-colors ml-1 min-h-[24px]">Termos de Uso</button>.
                    </div>
                  </div>
                  {expandedDoc === 'termos' && (
                    <div className="mt-3 p-3 md:p-4 bg-muted/30 border border-border rounded-xl text-xs text-muted-foreground">
                      <div className="max-h-24 overflow-y-auto pr-2 space-y-2 mb-3">
                        <p><strong>Resumo:</strong> Ao submeter imagens para a Plataforma de Colaboração Cultural Maranhense, você garante que é o autor legítimo da obra e concorda em licenciá-la de forma aberta (Domínio Público ou CC BY 4.0) para uso em pesquisas acadêmicas e treinamento de IA.</p>
                      </div>
                      <Link href="/termos" target="_blank" className="flex items-center gap-1 text-[#0056A4] hover:underline font-semibold min-h-[24px]">Ler documento completo <ExternalLink className="h-3 w-3" /></Link>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <input id="check-privacidade" type="checkbox" checked={aceitaPolitica} onChange={(e) => { setAceitaPolitica(e.target.checked); limparErroCadastro(); }} disabled={isLoadingCadastro} className="mt-0.5 w-5 h-5 md:w-4 md:h-4 cursor-pointer disabled:opacity-50 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground leading-snug">
                      <label htmlFor="check-privacidade" className="cursor-pointer min-h-[24px] inline-block">Estou ciente e concordo com a </label>
                      <button type="button" onClick={() => toggleDoc('privacidade')} className="underline font-medium hover:text-[#0056A4] transition-colors ml-1 min-h-[24px]">Política de Privacidade</button>.
                    </div>
                  </div>
                  {expandedDoc === 'privacidade' && (
                    <div className="mt-3 p-3 md:p-4 bg-muted/30 border border-border rounded-xl text-xs text-muted-foreground">
                      <div className="max-h-24 overflow-y-auto pr-2 space-y-2 mb-3">
                        <p><strong>Resumo:</strong> Coletamos seu nome e e-mail exclusivamente para garantir a autoria das imagens e a segurança da plataforma. Seus dados cadastrais não serão vendidos. Você pode solicitar a exclusão da sua conta a qualquer momento conforme a LGPD.</p>
                      </div>
                      <Link href="/privacidade" target="_blank" className="flex items-center gap-1 text-[#0056A4] hover:underline font-semibold min-h-[24px]">Ler documento completo <ExternalLink className="h-3 w-3" /></Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 min-h-[20px]">
                {erroCadastro && <p className="text-sm text-red-500 font-medium">{erroCadastro}</p>}
              </div>
              <Button className="w-full bg-black text-white hover:bg-neutral-800 min-h-[44px]" disabled={isLoadingCadastro} onClick={() => handleCadastro(onLoginSuccess, onClose)}>
                {isLoadingCadastro ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cadastrando...</> : 'CADASTRAR E ACEITAR'}
              </Button>
            </div>
            <div className="p-6 md:p-8 flex flex-col bg-neutral-50 md:bg-transparent">
              <p className="text-[10px] md:text-xs uppercase tracking-wide text-muted-foreground mb-1">Já tem conta?</p>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 md:mb-6">ENTRAR</h2>
              <div className="space-y-4 mb-2 flex-grow">
                <input value={emailLogin} onChange={(e) => { setEmailLogin(e.target.value); limparErroLogin(); }} type="email" placeholder="EMAIL" disabled={isLoadingLogin} className="w-full border border-border px-3 py-2 md:p-2 rounded-md disabled:opacity-50 min-h-[44px] bg-white" />
                <input value={senhaLogin} onChange={(e) => { setSenhaLogin(e.target.value); limparErroLogin(); }} type="password" placeholder="SENHA" disabled={isLoadingLogin} className="w-full border border-border px-3 py-2 md:p-2 rounded-md disabled:opacity-50 min-h-[44px] bg-white" />
              </div>
              <div className="mb-4 min-h-[20px]">
                {erroLogin && <p className="text-sm text-red-500 font-medium">{erroLogin}</p>}
              </div>
              <Button className="w-full bg-black text-white hover:bg-neutral-800 min-h-[44px]" disabled={isLoadingLogin} onClick={() => handleLogin(onLoginSuccess, onClose)}>
                {isLoadingLogin ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...</> : 'ENTRAR'}
              </Button>
              <Button variant="outline" className="w-full mt-3 hover:bg-neutral-100 min-h-[44px] bg-white md:bg-transparent" disabled={isLoadingLogin || isLoadingCadastro} onClick={handleClose}>
                CANCELAR
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}