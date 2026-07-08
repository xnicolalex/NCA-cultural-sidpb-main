import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';

interface UseAuthModalReturn {
  nomeCadastro: string;
  emailCadastro: string;
  senhaCadastro: string;
  aceitaTermos: boolean;
  aceitaPolitica: boolean; 
  erroCadastro: string;
  isLoadingCadastro: boolean;
  setNomeCadastro: (value: string) => void;
  setEmailCadastro: (value: string) => void;
  setSenhaCadastro: (value: string) => void;
  setAceitaTermos: (value: boolean) => void;
  setAceitaPolitica: (value: boolean) => void;
  limparErroCadastro: () => void;
  emailLogin: string;
  senhaLogin: string;
  erroLogin: string;
  isLoadingLogin: boolean;
  setEmailLogin: (value: string) => void;
  setSenhaLogin: (value: string) => void;
  limparErroLogin: () => void;
  handleCadastro: (onSuccess: () => void, onClose: () => void) => Promise<void>;
  handleLogin: (onSuccess: () => void, onClose: () => void) => Promise<void>;
}

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useAuthModal(): UseAuthModalReturn {
  const { loginSessao } = useAuth();
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [aceitaPolitica, setAceitaPolitica] = useState(false); 
  const [erroCadastro, setErroCadastro] = useState('');
  const [isLoadingCadastro, setIsLoadingCadastro] = useState(false);
  
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  
  const limparErroCadastro = () => setErroCadastro('');
  const limparErroLogin = () => setErroLogin('');

  const handleCadastro = async (onSuccess: () => void, onClose: () => void) => {
    if (!nomeCadastro || !emailCadastro || !senhaCadastro) {
      setErroCadastro('Preencha todos os campos.');
      toast.error('Preencha todos os campos para se cadastrar.');
      return;
    }
    if (!regexEmail.test(emailCadastro)) {
      setErroCadastro('E-mail inválido. Use o formato: nome@dominio.com');
      toast.error('O formato do e-mail é inválido.');
      return;
    }
    if (!aceitaTermos || !aceitaPolitica) {
      setErroCadastro('Você precisa aceitar os Termos de Uso e a Política de Privacidade para se cadastrar.');
      toast.error('Aceite os documentos legais para continuar.');
      return;
    }

    setIsLoadingCadastro(true);

    try {
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeCadastro, email: emailCadastro, senha: senhaCadastro }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        const msg = registerData.error || 'Erro ao realizar cadastro.';
        setErroCadastro(msg);
        toast.error(msg); 
        return;
      }

      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailCadastro, senha: senhaCadastro }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        const msg = loginData.error || 'Erro ao autenticar após cadastro.';
        setErroCadastro(msg);
        toast.error(msg);
        return;
      }

      loginSessao(loginData.user);
      setNomeCadastro('');
      setEmailCadastro('');
      setSenhaCadastro('');
      setAceitaTermos(false);
      setAceitaPolitica(false); 
      setErroCadastro('');

      toast.success('Cadastro realizado com sucesso! Bem-vindo(a) à plataforma.');

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setErroCadastro('Erro de conexão. Tente novamente.');
      toast.error('Falha de conexão com o servidor. Verifique sua internet.');
    } finally {
      setIsLoadingCadastro(false);
    }
  };

  const handleLogin = async (onSuccess: () => void, onClose: () => void) => {
    if (!emailLogin || !senhaLogin) {
      setErroLogin('Preencha todos os campos.');
      toast.error('Preencha seu e-mail e senha para entrar.');
      return;
    }
    if (!regexEmail.test(emailLogin)) {
      setErroLogin('E-mail inválido. Use o formato: nome@dominio.com');
      toast.error('O formato do e-mail é inválido.');
      return;
    }

    setIsLoadingLogin(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLogin, senha: senhaLogin }),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data.error || 'Erro ao realizar login.';
        setErroLogin(msg);
        toast.error(msg); 
        return;
      }

      loginSessao(data.user);

      setEmailLogin('');
      setSenhaLogin('');
      setErroLogin('');

      toast.success('Login realizado com sucesso! Que bom ter você de volta.');

      onSuccess();
      onClose();
    } catch {
      setErroLogin('Erro de conexão. Tente novamente.');
      toast.error('Falha de conexão com o servidor. Verifique sua internet.');
    } finally {
      setIsLoadingLogin(false);
    }
  };

  return {
    nomeCadastro, emailCadastro, senhaCadastro, aceitaTermos, aceitaPolitica, erroCadastro, isLoadingCadastro,
    setNomeCadastro, setEmailCadastro, setSenhaCadastro, setAceitaTermos, setAceitaPolitica, limparErroCadastro,
    emailLogin, senhaLogin, erroLogin, isLoadingLogin,
    setEmailLogin, setSenhaLogin, limparErroLogin,
    handleCadastro, handleLogin,
  };
}