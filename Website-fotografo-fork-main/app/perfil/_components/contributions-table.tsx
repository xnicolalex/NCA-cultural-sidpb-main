"use client";

import { Button } from "@/components/ui/button";
import { ImageOff, ExternalLink } from "lucide-react";
import type { RegistroComDominio } from "@/hooks/usePerfil";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

interface ContributionsTableProps {
  registros: RegistroComDominio[];
  isLoading: boolean;
  erro: string;
  onRefresh: () => void;
  onRowClick: (registro: RegistroComDominio) => void;
}

export function ContributionsTable({
  registros,
  isLoading,
  erro,
  onRefresh,
  onRowClick,
}: ContributionsTableProps) {
  const getLicenseDisplay = (licenca: string) => {
    if (licenca === "OPENRAIL-D") {
      return {
        label: "OpenRAIL-D",
        href: "/licenca-openrail",
        isOpenRail: true,
      };
    }
    if (licenca === "CC-BY-4.0" || licenca === "CC-BY") {
      return {
        label: "CC BY 4.0",
        href: "https://creativecommons.org/licenses/by/4.0/",
        isOpenRail: false,
      };
    }
    if (licenca === "CC0" || licenca === "CC0-1.0") {
      return {
        label: "CC0 1.0",
        href: "https://creativecommons.org/publicdomain/zero/1.0/",
        isOpenRail: false,
      };
    }
    return {
      label: licenca,
      href: null,
      isOpenRail: false,
    };
  };

  return (
    <div className="bg-background rounded-xl border border-border p-8 shadow-sm mb-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-semibold text-lg text-foreground">Minhas Contribuições</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading
              ? "Carregando..."
              : `${registros.length} imagem${registros.length !== 1 ? "s" : ""} enviada${
                  registros.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>
        <Button variant="outline" className="text-sm" onClick={onRefresh}>
          Atualizar
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!isLoading && erro && <p className="text-sm text-red-500">{erro}</p>}

      {!isLoading && !erro && registros.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground">
          <ImageOff className="h-8 w-8" />
          <p className="text-sm">Você ainda não enviou nenhuma imagem.</p>
        </div>
      )}

      {!isLoading && registros.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/30 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium w-16">Img</th>
                <th className="px-4 py-3 font-medium">Título</th>
                <th className="px-4 py-3 font-medium">Categoria</th>
                <th className="px-4 py-3 font-medium">Local</th>
                <th className="px-4 py-3 font-medium">Origem</th>
                <th className="px-4 py-3 font-medium">Licença</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {registros.map((registro) => {
                const license = getLicenseDisplay(registro.licenca);
                return (
                  <tr
                    key={registro.id}
                    onClick={() => onRowClick(registro)}
                    className="hover:bg-muted/50 cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-muted border border-border">
                        <img
                          src={withBasePath(registro.url)}
                          alt={registro.titulo}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {registro.titulo}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {registro.dominio?.nome_categoria || registro.categoria_sugerida || "Outros"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{registro.municipio}</td>
                    <td className="px-4 py-3">
                      {(registro as any).origem === "IA_GENERATIVA" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          IA
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          Câmera
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {license.isOpenRail ? (
                        <Link
                          href={license.href!}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 font-mono text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 rounded hover:bg-purple-100 transition-colors"
                        >
                          {license.label}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      ) : license.href ? (
                        <a
                          href={license.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 font-mono text-[10px] bg-muted px-2 py-1 rounded text-muted-foreground hover:bg-muted/80 transition-colors"
                        >
                          {license.label}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="font-mono text-[10px] bg-muted px-2 py-1 rounded text-muted-foreground">
                          {license.label}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          registro.status_curadoria === "APROVADO"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : registro.status_curadoria === "REJEITADO"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {registro.status_curadoria || "PENDENTE"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
