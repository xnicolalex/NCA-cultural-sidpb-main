"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface LicenseCardProps {
  accepted: boolean;
  onAcceptChange: (value: boolean) => void;
  expanded: boolean;
  onExpandedChange: (value: boolean) => void;
}

export function LicenseCard({
  accepted,
  onAcceptChange,
  expanded,
  onExpandedChange,
}: LicenseCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-slate-900">Licença de Uso</h2>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
          OpenRAIL-D
        </span>
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => onExpandedChange(!expanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            Ver detalhes da licença OpenRAIL-D
          </div>
          <span className="text-slate-400">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </button>

        {expanded && (
          <div className="px-4 pb-4 space-y-3 text-sm text-slate-600 animate-in slide-in-from-top-2 duration-200">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="font-semibold text-amber-800">Escopo Restrito</p>
              <p className="text-amber-700">
                Esta licença autoriza o uso da imagem <strong>exclusivamente</strong> para treinamento de modelos de Inteligência Artificial generativa.
              </p>
            </div>

            <p className="font-semibold text-slate-800">O que é permitido:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Treinamento, fine-tuning e avaliação de modelos de IA generativa</li>
              <li>Pesquisa acadêmica e desenvolvimento tecnológico</li>
              <li>Adaptação de modelos ao contexto cultural maranhense</li>
            </ul>

            <p className="font-semibold text-slate-800">O que NÃO é permitido:</p>
            <ul className="list-disc pl-5 space-y-1 text-red-700">
              <li>Uso para vigilância em massa ou reconhecimento facial</li>
              <li>Uso para discriminação com base em raça, gênero, religião</li>
              <li>Geração de desinformação ou conteúdo enganoso</li>
              <li>Uso comercial fora do contexto de treinamento de IA</li>
              <li>Publicação ou distribuição da imagem em sua forma original</li>
            </ul>

            <div className="pt-2 border-t border-slate-200">
              <Link
                href="/licenca-openrail"
                target="_blank"
                className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                Ler a licença completa (abre em nova aba)
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
        <Checkbox
          id="license-accept"
          checked={accepted}
          onCheckedChange={(checked) => onAcceptChange(checked === true)}
          className="mt-1 h-5 w-5"
          aria-label="Aceitar licença"
        />
        <div>
          <label htmlFor="license-accept" className="text-sm font-medium text-slate-700 cursor-pointer">
            Concordo com os termos da Licença OpenRAIL-D
          </label>
          <p className="text-xs text-slate-500 mt-0.5">
            Você mantém os direitos autorais. A licença permite uso exclusivo para treinamento de IA generativa.
            <Link
              href="/licenca-openrail"
              target="_blank"
              className="ml-1 text-primary hover:underline inline-flex items-center gap-0.5"
            >
              Leia mais <ExternalLink className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}