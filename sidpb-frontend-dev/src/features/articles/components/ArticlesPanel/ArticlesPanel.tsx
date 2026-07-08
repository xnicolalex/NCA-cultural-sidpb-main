"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  X,
  Search,
  Maximize2,
  Minimize2,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { Article } from "@/entities/article/article.types"
import { useArticles } from "@/features/articles/hooks/useArticles"

// Extended mock articles for demonstration
const allArticles: Article[] = [
  { id: "art-001", title: "Miíase cutânea em cães no estado do Rio de Janeiro", authors: ["Silva, J.A.", "Santos, M.B.", "Oliveira, C.D."], year: 2016, type: "caso clínico", journal: "Revista Brasileira de Parasitologia Veterinária" },
  { id: "art-002", title: "Miíase humana em área urbana de São Paulo", authors: ["Ferreira, R.P.", "Lima, S.T."], year: 2015, type: "caso clínico", journal: "Revista de Saúde Pública" },
  { id: "art-003", title: "Epidemiologia da miíase em humanos no Brasil", authors: ["Costa, A.B.", "Mendes, L.C.", "Ferreira, R.P."], year: 2017, type: "revisão", journal: "Parasitology Research" },
  { id: "art-004", title: "Impacto econômico da miíase em bovinos no Nordeste brasileiro", authors: ["Souza, F.G.", "Almeida, P.R.", "Barbosa, T.M."], year: 2013, type: "outro", journal: "Arquivo Brasileiro de Medicina Veterinária" },
  { id: "art-005", title: "Ocorrência de miíase em ovinos no Centro-Oeste brasileiro", authors: ["Rodrigues, H.S.", "Nascimento, E.V."], year: 2017, type: "caso clínico", journal: "Veterinária e Zootecnia" },
  { id: "art-006", title: "Miíase em felinos domésticos no Rio Grande do Sul", authors: ["Martins, D.L.", "Cardoso, R.A.", "Vieira, M.S."], year: 2014, type: "caso clínico", journal: "Acta Scientiae Veterinariae" },
  { id: "art-007", title: "Miíase umbilical em recém-nascido na Amazônia", authors: ["Oliveira, N.F.", "Santos, C.R."], year: 2012, type: "caso clínico", journal: "Jornal de Pediatria" },
  { id: "art-008", title: "Miíase em suínos criados em sistema extensivo em Pernambuco", authors: ["Lima, A.J.", "Freitas, B.M.", "Nunes, C.P."], year: 2011, type: "anais de congresso" },
  { id: "art-009", title: "Primeiro relato de miíase em caprinos no Distrito Federal", authors: ["Pereira, G.S.", "Alves, L.T."], year: 2018, type: "caso clínico", journal: "Ciência Rural" },
  { id: "art-010", title: "Miíase em capivara de vida livre no Maranhão", authors: ["Sousa, M.R.", "Bezerra, J.A.", "Costa, F.L."], year: 2010, type: "caso clínico", journal: "Brazilian Journal of Veterinary Parasitology" },
  { id: "art-011", title: "Miíase auricular em equino no Espírito Santo", authors: ["Santos, V.M.", "Ribeiro, P.A."], year: 2016, type: "caso clínico", journal: "Revista Brasileira de Medicina Veterinária" },
  { id: "art-012", title: "Miíase oral em paciente com neoplasia na Amazônia Oriental", authors: ["Carvalho, E.R.", "Moura, S.B.", "Tavares, L.M."], year: 2009, type: "caso clínico", journal: "Revista de Odontologia da UNESP" },
  { id: "art-013", title: "Miíase fatal em cães no Nordeste brasileiro: série de casos", authors: ["Andrade, K.L.", "Gomes, R.F."], year: 2015, type: "caso clínico", journal: "Semina: Ciências Agrárias" },
  { id: "art-014", title: "Revisão sistemática de miíase em animais domésticos no Brasil", authors: ["Fernandes, L.M.", "Pereira, A.B."], year: 2019, type: "revisão", journal: "Parasitology International" },
  { id: "art-015", title: "Aspectos clínicos da miíase em equídeos", authors: ["Castro, R.P.", "Lima, F.G."], year: 2008, type: "revisão", journal: "Veterinary Parasitology" },
  { id: "art-016", title: "Miíase nasofaríngea em ovino na região Sul", authors: ["Borges, T.A."], year: 2005, type: "caso clínico", journal: "Ciência Animal Brasileira" },
  { id: "art-017", title: "Estudo retrospectivo de miíase em animais de produção", authors: ["Moreira, C.S.", "Alves, P.R."], year: 2001, type: "outro", journal: "Arquivo Brasileiro de Medicina Veterinária" },
  { id: "art-018", title: "Cochliomyia hominivorax: revisão histórica no Brasil", authors: ["Guimarães, J.H.", "Papavero, N."], year: 1999, type: "revisão", journal: "Memórias do Instituto Oswaldo Cruz" },
  { id: "art-019", title: "Controle biológico da mosca da bicheira", authors: ["Vargas-Terán, M."], year: 1995, type: "anais de congresso" },
  { id: "art-020", title: "Primeiros registros de miíase no Maranhão", authors: ["Pinto, C."], year: 1930, type: "outro", journal: "Boletim Biológico" },
]

const regions = [
  { id: "norte", label: "Norte", states: ["AC", "AM", "AP", "PA", "RO", "RR", "TO"] },
  { id: "nordeste", label: "Nordeste", states: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"] },
  { id: "centro-oeste", label: "Centro-Oeste", states: ["DF", "GO", "MS", "MT"] },
  { id: "sudeste", label: "Sudeste", states: ["ES", "MG", "RJ", "SP"] },
  { id: "sul", label: "Sul", states: ["PR", "RS", "SC"] },
]

const articleTypes = [
  { id: "revisão", label: "Revisão" },
  { id: "caso clínico", label: "Caso Clínico" },
  { id: "anais de congresso", label: "Anais de Congresso" },
  { id: "outro", label: "Outro" },
]

interface ArticlesPanelProps {
  isExpanded: boolean
  onClose: () => void
  onToggleExpand: () => void
  selectedArticles: string[]
  onArticleSelect: (articleIds: string[]) => void
  onApplyFilter: () => void
}

export function ArticlesPanel({
  isExpanded,
  onClose,
  onToggleExpand,
  selectedArticles,
  onArticleSelect,
  onApplyFilter,
}: ArticlesPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const { data: articlesFromApi } = useArticles()
  const articles = articlesFromApi ?? allArticles

  // Filter articles
  const filteredArticles = useMemo(() => {
    let result = articles

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.authors.some((a) => a.toLowerCase().includes(query)) ||
          article.year.toString().includes(query)
      )
    }

    // Type filter
    if (selectedTypes.length > 0) {
      result = result.filter((article) => selectedTypes.includes(article.type))
    }

    return result
  }, [articles, searchQuery, selectedTypes])

  // Chart data for articles over time
  const chartData = useMemo(() => {
    const periods = [
      { name: "Antes de 1999", min: 0, max: 1999 },
      { name: "2000-2008", min: 2000, max: 2008 },
      { name: "2009-2020", min: 2009, max: 2020 },
    ]

    return periods.map((period) => ({
      name: period.name,
      quantidade: articles.filter(
        (a) => a.year >= period.min && a.year <= period.max
      ).length,
    }))
  }, [articles])

  const handleArticleToggle = (articleId: string) => {
    if (selectedArticles.includes(articleId)) {
      onArticleSelect(selectedArticles.filter((id) => id !== articleId))
    } else {
      onArticleSelect([...selectedArticles, articleId])
    }
  }

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleSelectAll = () => {
    onArticleSelect(filteredArticles.map((a) => a.id))
  }

  const handleClearSelection = () => {
    onArticleSelect([])
  }

  return (
    <div
      className={`absolute left-4 top-16 bottom-4 z-20 bg-card border-r border-border shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded ? "w-[600px]" : "w-96"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Fontes / Artigos</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpand}
            title={isExpanded ? "Recolher" : "Expandir"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por título, autor ou ano..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-none border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </span>
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 pt-2">
            {/* Region Filter */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Região do Brasil
              </label>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <Button
                    key={region.id}
                    variant={selectedRegion === region.id ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setSelectedRegion(selectedRegion === region.id ? null : region.id)
                    }
                  >
                    {region.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Tipo de Artigo
              </label>
              <div className="flex flex-wrap gap-2">
                {articleTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedTypes.includes(type.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeToggle(type.id)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      {isExpanded && (
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Distribuição de Artigos por Período
          </h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="quantidade"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Selection Actions */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {selectedArticles.length} de {filteredArticles.length} selecionados
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleSelectAll}>
            Selecionar todos
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClearSelection}>
            Limpar
          </Button>
        </div>
      </div>

      {/* Articles List */}
      <div className="flex-1 overflow-y-auto">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedArticles.includes(article.id)}
                onCheckedChange={() => handleArticleToggle(article.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-tight">
                  {article.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {article.authors.join(", ")} ({article.year})
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-none ${
                      article.type === "revisão"
                        ? "bg-primary/10 text-primary"
                        : article.type === "caso clínico"
                        ? "bg-accent/10 text-accent"
                        : article.type === "anais de congresso"
                        ? "bg-chart-3/10 text-chart-3"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {article.type}
                  </span>
                  {article.journal && (
                    <span className="text-xs text-muted-foreground truncate">
                      {article.journal}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Apply Filter Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={onApplyFilter}
          className="w-full"
          disabled={selectedArticles.length === 0}
        >
          Aplicar Filtro ({selectedArticles.length} artigos)
        </Button>
      </div>
    </div>
  )
}
