"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { AdminUser, PapelUsuario } from "../_types";
import { useRoleChange } from "../_hooks/useRoleChange";
import { getRoleLabel, getRoleBadgeClass } from "../_lib/admin-utils";

interface RoleChangeModalProps {
  user: AdminUser | null;
  onClose: () => void;
  onSuccess: (userId: number, newRole: PapelUsuario) => void;
}

const ROLE_OPTIONS = Object.values(PapelUsuario).map((value) => ({
  value,
  label: getRoleLabel(value),
}));

export function RoleChangeModal({ user, onClose, onSuccess }: RoleChangeModalProps) {
  const {
    step,
    setStep,
    selectedRole,
    setSelectedRole,
    isAware,
    setIsAware,
    isLoading,
    canProceed,
    canSave,
    handleSave,
    reset,
  } = useRoleChange(user, onSuccess, onClose);

  // Reset state when modal closes
  const handleClose = () => {
    reset();
    onClose();
  };

  if (!user) return null;

  const currentRoleLabel = getRoleLabel(user.papel);
  const selectedRoleLabel = selectedRole ? getRoleLabel(selectedRole as PapelUsuario) : "";

  return (
    <Dialog open={!!user} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-900">Alterar permissão</DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            {user.nome} — {user.email}
          </DialogDescription>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Papel atual</Label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-md border border-slate-200">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getRoleBadgeClass(user.papel)}`}>
                  {currentRoleLabel}
                </span>
                <span className="text-sm text-slate-500">(somente leitura)</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Novo papel</Label>
              <Select
                value={selectedRole}
                onValueChange={(val) => setSelectedRole(val as PapelUsuario)}
              >
                <SelectTrigger className="border-slate-200 focus:ring-purple-500">
                  <SelectValue placeholder="— selecione —" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} disabled={opt.value === user.papel}>
                      <span className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getRoleBadgeClass(opt.value)}`}>
                          {opt.label}
                        </span>
                        {opt.value === user.papel && (
                          <span className="text-xs text-slate-400">(atual)</span>
                        )}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200 text-sm">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getRoleBadgeClass(user.papel)}`}>
                  {currentRoleLabel}
                </span>
                <span className="text-slate-400">→</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getRoleBadgeClass(selectedRole as PapelUsuario)}`}>
                  {selectedRoleLabel}
                </span>
              </div>
              <span className="text-xs text-slate-400 truncate max-w-[120px]">{user.nome}</span>
            </div>
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Atenção:</strong> Esta operação modifica as permissões de acesso imediatamente após salvar.
              </p>
            </div>
            <div
              className="flex items-start gap-3 p-3 rounded-md border border-slate-200 bg-white cursor-pointer"
              onClick={() => setIsAware(!isAware)}
            >
              <Checkbox
                id="awareness-check"
                checked={isAware}
                onCheckedChange={(checked) => setIsAware(checked === true)}
                className="mt-0.5 border-slate-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="awareness-check" className="text-sm text-slate-700 leading-relaxed cursor-pointer">
                Estou ciente de que esta alteração modifica os acessos imediatos deste usuário às rotas protegidas.
              </Label>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </Button>
          {step === "select" ? (
            <Button
              onClick={() => setStep("confirm")}
              disabled={!canProceed}
              className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40"
            >
              Próximo
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              disabled={!canSave || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando…
                </>
              ) : (
                "Confirmar alteração"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}