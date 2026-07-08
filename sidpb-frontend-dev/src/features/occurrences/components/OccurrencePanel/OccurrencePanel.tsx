"use client"

import { Button } from "@/components/ui/button"
import {
  X,
  ChevronRight,
  ChevronLeft,
  Bug,
  Calendar,
  MapPin,
  User,
  Tag,
  Heart,
  FileText,
  ExternalLink,
  AlertCircle,
  Info, // Adicionado ícone que faltava
} from "lucide-react"
import type { Occurrence } from "@/entities/occurrence/occurrence.types"
import { formatOccurrenceDate } from "@/features/occurrences/utils/formatOccurrenceDate"
import { getHostCategoryColor } from "@/features/occurrences/utils/getHostCategoryColor"
import { getOutcomeColor } from "@/features/occurrences/utils/getOutcomeColor"

// Interface corrigida para o Painel Principal
interface OccurrencePanelProps {
  occurrences: Occurrence[];
  isExpanded: boolean;
  onClose: () => void;
  onExpand: () => void;
  onCollapse: () => void;
}

export function OccurrencePanel({
  occurrences,
  isExpanded,
  onClose,
  onExpand,
  onCollapse,
}: OccurrencePanelProps) {
  
  if (!occurrences || occurrences.length === 0) return null;
  const mainLocation = occurrences[0];

  return (
    <div className={`
        absolute top-0 right-0 h-full bg-card border-l border-border shadow-xl z-30
        transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? "w-full md:w-2/3 lg:w-1/2" : "w-80 md:w-96"}
      `}
    >
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-none bg-primary/10 flex items-center justify-center">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Ocorrências ({occurrences.length})
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={isExpanded ? onCollapse : onExpand}>
                {isExpanded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col">
            {occurrences.map((occ: Occurrence, index: number) => (
              <div key={occ.id || index} className="border-b border-border last:border-0">
                {isExpanded ? (
                  <ExpandedContent occurrence={occ} index={index} isMultiple={occurrences.length > 1} />
                ) : (
                  <CompactContent occurrence={occ} onExpand={onExpand} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// COMPACT CONTENT - Corrigido Props
function CompactContent({
  occurrence,
  onExpand,
}: {
  occurrence: Occurrence
  onExpand: () => void
}) {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InfoCard icon={<Bug className="w-4 h-4" />} label="Doença" value={occurrence.disease} />
        <InfoCard
          icon={<AlertCircle className="w-4 h-4" />}
          label="Vetor"
          value={<em className="text-xs">{occurrence.vector.split(" ").slice(0, 2).join(" ")}</em>}
        />
        <InfoCard icon={<Calendar className="w-4 h-4" />} label="Data" value={formatOccurrenceDate(occurrence.date)} />
        <InfoCard icon={<User className="w-4 h-4" />} label="Hospedeiro" value={occurrence.host} />
      </div>

      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-muted-foreground" />
        <span className={`text-xs font-medium px-2 py-1 rounded-none ${getHostCategoryColor(occurrence.hostCategory)}`}>
          {occurrence.hostCategory}
        </span>
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={onExpand}>
        Ver detalhes completos
        <ChevronLeft className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}

// EXPANDED CONTENT - Corrigido para não usar .map interno (já está no pai)
function ExpandedContent({ 
  occurrence, 
  index, 
  isMultiple 
}: { 
  occurrence: Occurrence, 
  index: number, 
  isMultiple: boolean 
}) {
  return (
    <div className={`p-6 bg-background ${index > 0 ? "border-t-4 border-muted" : ""}`}>
      {isMultiple && (
        <div className="mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary rounded">
            Evento Epidemiológico #{index + 1}
          </span>
        </div>
      )}

      <div className="mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-primary rounded-none" />
          <h2 className="text-lg font-semibold text-foreground">Prontuário da Ocorrência</h2>
        </div>
        <p className="text-sm text-muted-foreground">ID: {occurrence.id} — Registro de {occurrence.disease}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <section>
          <SectionTitle icon={<MapPin className="w-4 h-4" />} title="Localização" />
          <div className="space-y-3 mt-3">
            <DetailRow label="Cidade" value={occurrence.city} />
            <DetailRow label="Estado" value={occurrence.state} />
            <DetailRow label="Coordenadas" value={`${occurrence.coordinates[1].toFixed(4)}, ${occurrence.coordinates[0].toFixed(4)}`} />
          </div>
        </section>

        <section>
          <SectionTitle icon={<Bug className="w-4 h-4" />} title="Doença e Vetor" />
          <div className="space-y-3 mt-3">
            <DetailRow label="Doença" value={occurrence.disease} />
            <DetailRow label="Vetor" value={<em>{occurrence.vector}</em>} />
            <DetailRow label="Data" value={formatOccurrenceDate(occurrence.date)} />
          </div>
        </section>

        <section>
          <SectionTitle icon={<User className="w-4 h-4" />} title="Hospedeiro" />
          <div className="space-y-3 mt-3">
            <DetailRow label="Espécie" value={<em>{occurrence.host}</em>} />
            <DetailRow
              label="Categoria"
              value={<span className={`text-xs font-medium px-2 py-0.5 rounded-none ${getHostCategoryColor(occurrence.hostCategory)}`}>{occurrence.hostCategory}</span>}
            />
          </div>
        </section>

        <section>
          <SectionTitle icon={<Heart className="w-4 h-4" />} title="Desfecho" />
          <div className="space-y-3 mt-3">
            <DetailRow label="Desfecho" value={<span className={`font-medium ${getOutcomeColor(occurrence.outcome)}`}>{occurrence.outcome || "Não informado"}</span>} />
          </div>
        </section>
      </div>

      <section className="border-t border-border pt-6">
        <SectionTitle icon={<FileText className="w-4 h-4" />} title="Artigos Científicos" />
        <div className="mt-4 space-y-4">
          {occurrence.articles.map((article) => (
            <div key={article.id} className="p-4 rounded-none border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-2">{article.title}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-none">{article.year}</span>
                    <span className="text-[10px] text-muted-foreground">{article.journal}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Funções Auxiliares de UI (Sub-componentes)
function InfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) {
  return (
    <div className="p-3 rounded-none border border-border bg-background">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  )
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <div className="text-primary">{icon}</div>
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground text-right">{value}</span>
    </div>
  )
}
