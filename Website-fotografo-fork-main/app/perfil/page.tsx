"use client";
import { usePerfil } from '@/hooks/usePerfil';
import { useAuth } from '@/contexts/auth-context';
import { PerfilNavButtons } from './_components/perfil-nav-buttons';
import { UserInfoCard } from './_components/user-info-card';
import { ContributionsTable } from './_components/contributions-table';
import { ContributionSection } from './_components/contribution-section';
import { DangerZone } from './_components/danger-zone';
import { ImageModal } from './_components/image-modal';
import { EditarSenhaModal } from './_components/editarSenha-modal';
import { ConfirmModal } from './_components/confirm-modal';

export default function PerfilPage() {
  const perfil = usePerfil();
  const { user } = useAuth();

  if (!perfil.userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16 max-w-4xl">
          <div className="mb-8 md:mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">MEU PERFIL</h1>
            <PerfilNavButtons papelAcesso={user?.papel_acesso} />
          </div>
          <UserInfoCard nome={perfil.userData.nome} email={perfil.userData.email} onEditarSenha={() => perfil.setEditarSenhaAberto(true)} />
          <ContributionsTable registros={perfil.registros} isLoading={perfil.isLoadingRegistros} erro={perfil.erroRegistros} onRefresh={() => perfil.carregarRegistros(perfil.userData!.id)} onRowClick={perfil.abrirModalImagem} />
          <ContributionSection onSair={perfil.handleSair} />
          <DangerZone onInativar={() => perfil.setInativarAberto(true)} onDeletar={() => perfil.setDeletarAberto(true)} />
        </div>
      </main>
      <ImageModal isOpen={perfil.imagemModalAberto} onClose={perfil.fecharModalImagem} registro={perfil.registroSelecionado} />
      <EditarSenhaModal isOpen={perfil.editarSenhaAberto} onClose={() => perfil.setEditarSenhaAberto(false)} onConfirm={perfil.handleEditarSenha} />
      <ConfirmModal isOpen={perfil.inativarAberto} onClose={() => perfil.setInativarAberto(false)} onConfirm={perfil.handleInativar} titulo="Inativar Conta" descricao="Sua sessão será encerrada e sua conta ficará congelada. Seus dados serão mantidos, mas você não poderá acessar o painel até realizar um novo login. Esta ação não exclui nenhum dado pessoal." labelConfirmar="INATIVAR" />
      <ConfirmModal isOpen={perfil.deletarAberto} onClose={() => perfil.setDeletarAberto(false)} onConfirm={perfil.handleDeletar} titulo="Deletar Conta Permanentemente" descricao="Seus dados pessoais (nome, e-mail e senha) serão removidos permanentemente, conforme garantido pela LGPD. As imagens já enviadas e aprovadas serão mantidas de forma anonimizada para preservar a integridade do dataset público. Esta ação não pode ser desfeita." labelConfirmar="DELETAR PERMANENTEMENTE" />
    </>
  );
}