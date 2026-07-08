interface UserInfoCardProps {
  nome: string;
  email: string;
  onEditarSenha: () => void;
}

export function UserInfoCard({ nome, email, onEditarSenha }: UserInfoCardProps) {
  return (
    <div className="bg-background rounded-[1.5rem] md:rounded-xl border border-border p-6 md:p-8 shadow-sm mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 md:mb-6 gap-2 sm:gap-0">
        <h2 className="font-semibold text-base md:text-lg text-foreground">Dados Cadastrais</h2>
        <button onClick={onEditarSenha} className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 py-2 sm:py-0 min-h-[44px] sm:min-h-0 self-start sm:self-auto text-left">Editar Senha</button>
      </div>
      <div className="space-y-4 md:space-y-5">
        <div><p className="text-[10px] md:text-xs uppercase tracking-wide text-muted-foreground mb-1">Nome</p><p className="text-sm md:text-base text-foreground font-medium">{nome}</p></div>
        <div className="border-t border-border pt-4 md:pt-5"><p className="text-[10px] md:text-xs uppercase tracking-wide text-muted-foreground mb-1">E-mail</p><p className="text-sm md:text-base text-foreground font-medium">{email}</p></div>
      </div>
    </div>
  );
}