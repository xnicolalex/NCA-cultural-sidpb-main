export async function editarSenha(usuarioId: string, novaSenha: string): Promise<void> {
  const response = await fetch('/api/usuario/senha', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuarioId, novaSenha }),
  });

  if (!response.ok) {
    throw new Error('Erro ao alterar a senha.');
  }
}

export async function inativarUsuario(usuarioId: string): Promise<void> {
  const response = await fetch('/api/usuario/inativar', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuarioId }),
  });

  if (!response.ok) {
    throw new Error('Erro ao inativar a conta.');
  }
}

export async function deletarUsuario(usuarioId: string): Promise<void> {
  const response = await fetch(`/api/usuario/deletar?usuarioId=${usuarioId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar a conta.');
  }
}