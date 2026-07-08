import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 
import { useAuth } from '@/contexts/auth-context';
import { buscarRegistrosPorUsuario, type RegistroIconografico } from '@/lib/services/registros.service';
import { editarSenha, inativarUsuario, deletarUsuario } from '@/lib/services/usuario.service';

export interface UsuarioAtual {
  id: string;
  nome: string;
  email: string;
}

export interface RegistroComDominio extends RegistroIconografico {
  dominio?: {
    nome_categoria: string;
  };
}

export function usePerfil() {
  const router = useRouter();
  const { user, loading, logoutSessao } = useAuth();
  const [registros, setRegistros] = useState<RegistroComDominio[]>([]);
  const [isLoadingRegistros, setIsLoadingRegistros] = useState(false);
  const [erroRegistros, setErroRegistros] = useState('');

  const [erroSenha, setErroSenha] = useState('');
  const [sucessoSenha, setSucessoSenha] = useState(false);
  const [erroDangerZone, setErroDangerZone] = useState('');

  const [editarSenhaAberto, setEditarSenhaAberto] = useState(false);
  const [inativarAberto, setInativarAberto] = useState(false);
  const [deletarAberto, setDeletarAberto] = useState(false);
  const [imagemModalAberto, setImagemModalAberto] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState<RegistroComDominio | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else {
        carregarRegistros(user.id);
      }
    }
  }, [user, loading, router]);

  const carregarRegistros = async (usuarioId: string) => {
    setIsLoadingRegistros(true);
    setErroRegistros('');
    try {
      const data = await buscarRegistrosPorUsuario(usuarioId);
      setRegistros(data);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao buscar contribuições.';
      setErroRegistros(msg);
      toast.error(msg); 
    } finally {  
      setIsLoadingRegistros(false);
    }
  };

  const handleEditarSenha = async (novaSenha: string) => {
    if (!user) return;

    setErroSenha('');
    setSucessoSenha(false);

    try {
      await editarSenha(user.id, novaSenha);
      setSucessoSenha(true); 
      toast.success('Sua senha foi atualizada com segurança!'); 
      setTimeout(() => fecharModalSenha(), 1500); 
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao alterar a senha.';
      setErroSenha(msg);
      toast.error(msg); 
    }
  };

  const fecharModalSenha = () => {
    setEditarSenhaAberto(false);
    setErroSenha('');
    setSucessoSenha(false);
  };

  const handleInativar = async () => {
    if (!user) return;
    setErroDangerZone('');
    try {
      await inativarUsuario(user.id);
      toast.success('Sua conta foi inativada. Esperamos vê-lo novamente!');
      deslogar();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao inativar a conta.';
      setErroDangerZone(msg);
      toast.error(msg);
    }
  };

  const handleDeletar = async () => {
    if (!user) return;
    setErroDangerZone('');
    try {
      await deletarUsuario(user.id);
      toast.success('Conta eliminada com sucesso. As suas imagens foram anonimizadas conforme a LGPD.');
      deslogar();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao deletar a conta.';
      setErroDangerZone(msg);
      toast.error(msg);
    }
  };

  const handleSair = () => {
    toast.info('Sessão terminada de forma segura. Até breve!'); 
    deslogar();
  };

  const deslogar = () => {
    logoutSessao();
    setInativarAberto(false);
    setDeletarAberto(false);
    router.push('/');
  };

  const abrirModalImagem = (registro: RegistroComDominio) => {
    setRegistroSelecionado(registro);
    setImagemModalAberto(true);
  };

  const fecharModalImagem = () => {
    setImagemModalAberto(false);
    setTimeout(() => setRegistroSelecionado(null), 300);
  };

  return {
    userData: user,
    registros,
    isLoadingRegistros,
    erroRegistros,
    carregarRegistros,
    erroSenha,
    sucessoSenha,
    editarSenhaAberto, setEditarSenhaAberto,
    handleEditarSenha, fecharModalSenha,
    erroDangerZone,
    inativarAberto, setInativarAberto, handleInativar,
    deletarAberto, setDeletarAberto, handleDeletar,
    handleSair,
    imagemModalAberto,
    registroSelecionado,
    abrirModalImagem,
    fecharModalImagem,
  };
}