"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExternalLink, Info, Shield, BookOpen, AlertTriangle } from "lucide-react";
import type { ImageFile } from "./contribution-flow";
import Link from "next/link";

type LicenseStepProps = {
  images: ImageFile[];
  setImages: (images: ImageFile[]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function LicenseStep({ images, setImages, onNext, onBack }: LicenseStepProps) {
  const [consentProvided, setConsentProvided] = useState(
    images[0]?.license?.consentProvided || false
  );
  const [expanded, setExpanded] = useState(false);

  const handleContinue = () => {
    const updatedImages = images.map((img) => ({
      ...img,
      license: {
        type: "OPENRAIL-D",
        consentProvided: true,
      },
    }));
    setImages(updatedImages);
    onNext();
  };

  const canProceed = consentProvided;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
          Licença de Uso para IA Generativa
        </h2>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          Ao contribuir com imagens, você as licencia exclusivamente para o treinamento de modelos de Inteligência Artificial generativa, sob a Licença OpenRAIL-D. Você mantém todos os direitos autorais sobre suas imagens.
        </p>
      </div>

      {/* License Card */}
      <div
        className={`rounded-xl border-2 transition-all duration-300 cursor-pointer ${
          consentProvided
            ? "border-emerald-500 bg-emerald-50/50"
            : "border-border hover:border-primary/50"
        }`}
        onClick={() => setConsentProvided(!consentProvided)}
      >
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Checkbox
                id="license-consent"
                checked={consentProvided}
                onCheckedChange={(checked) => setConsentProvided(checked as boolean)}
                className="h-5 w-5"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Label
                  htmlFor="license-consent"
                  className="text-base font-semibold cursor-pointer"
                >
                  Licença OpenRAIL-D para Treinamento de IA Generativa
                </Label>
                <span className="text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Responsável
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span>Você mantém os direitos autorais</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span>Uso exclusivo para treinamento de IA</span>
                </div>
              </div>

              <div className="mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {expanded ? "Ocultar detalhes" : "Ver detalhes da licença"}
                  <AlertTriangle className="h-3.5 w-3.5" />
                </button>
              </div>

              {expanded && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-border text-sm space-y-3 animate-in slide-in-from-top-2 duration-200">
                  <p className="font-semibold">O que a Licença OpenRAIL-D permite:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Uso das imagens para <strong>treinamento de modelos de IA generativa</strong></li>
                    <li>Uso em <strong>pesquisa acadêmica e desenvolvimento tecnológico</strong></li>
                    <li>
                      <strong>Atribuição de autoria</strong> em publicações científicas
                    </li>
                  </ul>

                  <p className="font-semibold mt-2">O que NÃO é permitido:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Uso para <strong>vigilância em massa</strong> ou reconhecimento facial</li>
                    <li>Uso para <strong>discriminação</strong> com base em raça, gênero, religião, etc.</li>
                    <li>Geração de <strong>desinformação</strong> ou conteúdo enganoso</li>
                    <li>Uso <strong>comercial</strong> fora do contexto de treinamento de IA</li>
                    <li>Publicação ou distribuição das imagens em sua forma original</li>
                  </ul>

                  <div className="mt-2 pt-2 border-t border-border">
                    <Link
                      href="/licenca-openrail"
                      target="_blank"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Ler a licença completa
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-2 text-sm md:text-base">
              Sobre a Licença OpenRAIL-D
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A OpenRAIL-D é uma licença <strong>responsável</strong> para modelos de IA,
              que combina permissões de código aberto com <strong>restrições comportamentais</strong>.
              Esta licença garante que suas imagens sejam usadas de forma ética e para fins
              exclusivos de pesquisa e desenvolvimento de IA generativa, com foco na preservação
              e difusão da cultura maranhense.
            </p>
          </div>
        </div>
      </div>

      {/* Consent Check */}
      <div className="rounded-xl border border-border bg-card p-5 md:p-6">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={consentProvided}
            onCheckedChange={(checked) => setConsentProvided(checked as boolean)}
            className="mt-1 h-5 w-5"
          />
          <div className="flex-1">
            <Label
              htmlFor="consent"
              className="text-base font-semibold cursor-pointer mb-2 block"
            >
              Consentimento e Verificação *
            </Label>
            <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>Ao marcar esta opção, declaro que:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  Sou o autor/fotógrafo das imagens enviadas ou tenho autorização do autor
                </li>
                <li>
                  As pessoas identificáveis nas imagens autorizaram o uso (quando aplicável)
                </li>
                <li>
                  As imagens foram capturadas com respeito às manifestações culturais
                </li>
                <li>
                  Não estou violando direitos autorais, privacidade ou dignidade de terceiros
                </li>
                <li>
                  Concordo em licenciar as imagens sob a{" "}
                  <Link
                    href="/licenca-openrail"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Licença OpenRAIL-D
                  </Link>{" "}
                  para treinamento de IA generativa
                </li>
                <li>
                  Li e concordo com os{" "}
                  <Link href="/termos" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link href="/privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="w-full sm:w-auto min-h-[44px]"
        >
          Voltar
        </Button>
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!canProceed}
          className="w-full sm:w-auto min-h-[44px] px-8"
        >
          Continuar para Revisão
        </Button>
      </div>
    </div>
  );
}