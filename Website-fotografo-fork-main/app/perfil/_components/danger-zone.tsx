interface DangerZoneProps {
  onInativar: () => void;
  onDeletar: () => void;
}

export function DangerZone({ onInativar, onDeletar }: DangerZoneProps) {
  return (
    <div className="rounded-[1.5rem] md:rounded-xl border border-red-200 bg-red-50/30 p-6 md:p-8">
      <h2 className="font-semibold text-base md:text-lg text-red-600 mb-1 md:mb-2">Zona de Risco</h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-5 md:mb-6 leading-relaxed">Estas ações são irreversíveis ou de difícil recuperação. Leia com atenção antes de prosseguir.</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <button onClick={onInativar} className="text-sm md:text-base text-muted-foreground hover:text-red-600 transition-colors underline underline-offset-4 py-2 sm:py-0 min-h-[44px] sm:min-h-0 text-left">INATIVAR CONTA</button>
        <button onClick={onDeletar} className="text-sm md:text-base text-muted-foreground hover:text-red-600 transition-colors underline underline-offset-4 py-2 sm:py-0 min-h-[44px] sm:min-h-0 text-left">DELETAR CONTA</button>
      </div>
    </div>
  );
}