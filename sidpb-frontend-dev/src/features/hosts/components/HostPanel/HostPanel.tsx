"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Maximize2, Minimize2, AlertCircle, Search } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { useHosts } from "@/features/hosts/hooks/useHosts"

// Host categories
const hostCategories = [
  { id: "humano", label: "Humanos", color: "bg-destructive/10 text-destructive" },
  { id: "producao", label: "Produção", color: "bg-chart-3/10 text-chart-3" },
  { id: "criacao", label: "Criação", color: "bg-primary/10 text-primary" },
  { id: "silvestre", label: "Silvestres", color: "bg-accent/10 text-accent" },
  { id: "outro", label: "Outros", color: "bg-muted text-muted-foreground" },
]

// Life stages
const lifeStages = [
  { id: "recem-nascido", label: "Recém-nascido" },
  { id: "jovem", label: "Jovem" },
  { id: "adulto", label: "Adulto" },
]

// Sex options
const sexOptions = [
  { id: "masculino", label: "Masculino" },
  { id: "feminino", label: "Feminino" },
]

// Host species
const hostSpecies = [
  { id: "homo-sapiens", name: "Homo sapiens", commonName: "Humano", category: "humano", count: 3, inCurrentMap: true },
  { id: "canis-familiaris", name: "Canis familiaris", commonName: "Cão", category: "criacao", count: 2, inCurrentMap: true },
  { id: "felis-catus", name: "Felis catus", commonName: "Gato", category: "criacao", count: 1, inCurrentMap: true },
  { id: "bos-taurus", name: "Bos taurus", commonName: "Bovino", category: "producao", count: 1, inCurrentMap: true },
  { id: "ovis-aries", name: "Ovis aries", commonName: "Ovino", category: "producao", count: 2, inCurrentMap: true },
  { id: "capra-hircus", name: "Capra aegagrus hircus", commonName: "Caprino", category: "producao", count: 1, inCurrentMap: true },
  { id: "sus-scrofa", name: "Sus scrofa domesticus", commonName: "Suíno", category: "producao", count: 1, inCurrentMap: true },
  { id: "equus-caballus", name: "Equus caballus", commonName: "Equino", category: "criacao", count: 1, inCurrentMap: true },
  { id: "hydrochoerus", name: "Hydrochoerus hydrochaeris", commonName: "Capivara", category: "silvestre", count: 1, inCurrentMap: true },
]

// Distribution by host over time
const timeDistribution = [
  { period: "2008-2010", humano: 2, producao: 2, criacao: 1, silvestre: 1 },
  { period: "2011-2013", humano: 1, producao: 2, criacao: 1, silvestre: 0 },
  { period: "2014-2016", humano: 0, producao: 1, criacao: 3, silvestre: 0 },
  { period: "2017-2020", humano: 0, producao: 2, criacao: 0, silvestre: 0 },
]

// Distribution by region
const regionDistribution = [
  { region: "Norte", count: 2 },
  { region: "Nordeste", count: 4 },
  { region: "Centro-Oeste", count: 2 },
  { region: "Sudeste", count: 3 },
  { region: "Sul", count: 1 },
]

interface HostPanelProps {
  isExpanded: boolean
  onClose: () => void
  onToggleExpand: () => void
  selectedHosts: string[]
  onHostSelect: (hostIds: string[]) => void
  onApplyFilter: () => void
}

export function HostPanel({
  isExpanded,
  onClose,
  onToggleExpand,
  selectedHosts,
  onHostSelect,
  onApplyFilter,
}: HostPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [selectedSex, setSelectedSex] = useState<string[]>([])
  const [showError, setShowError] = useState(false)
  const { data: hostsFromApi } = useHosts()
  const hosts = hostsFromApi ?? hostSpecies

  // Filter hosts
  const filteredHosts = useMemo(() => {
    let result = hosts

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (host) =>
          host.name.toLowerCase().includes(query) ||
          (host.commonName ?? host.name).toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((host) => host.category && selectedCategories.includes(host.category))
    }

    return result
  }, [hosts, searchQuery, selectedCategories])

  const handleHostToggle = (hostId: string) => {
    if (selectedHosts.includes(hostId)) {
      onHostSelect(selectedHosts.filter((id) => id !== hostId))
    } else {
      onHostSelect([...selectedHosts, hostId])
    }
  }

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleStageToggle = (stage: string) => {
    if (selectedStages.includes(stage)) {
      setSelectedStages(selectedStages.filter((s) => s !== stage))
    } else {
      setSelectedStages([...selectedStages, stage])
    }
  }

  const handleSexToggle = (sex: string) => {
    if (selectedSex.includes(sex)) {
      setSelectedSex(selectedSex.filter((s) => s !== sex))
    } else {
      setSelectedSex([...selectedSex, sex])
    }
  }

  const handleSelectAll = () => {
    onHostSelect(filteredHosts.map((h) => h.id))
  }

  const handleClearSelection = () => {
    onHostSelect([])
  }

  const handleApply = () => {
    if (selectedHosts.length === 0) {
      setShowError(true)
      return
    }
    setShowError(false)
    onApplyFilter()
  }

  const getCategoryColor = (category: string) => {
    return hostCategories.find((c) => c.id === category)?.color || "bg-muted text-muted-foreground"
  }

  return (
    <div
      className={`absolute left-4 top-16 bottom-4 z-20 bg-card border-r border-border shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded ? "w-[700px]" : "w-[420px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Filtro por Hospedeiro</h2>
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

      {/* Search and Filters */}
      <div className="p-4 border-b border-border space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar hospedeiro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-none border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Grupo de Hospedeiro
          </label>
          <div className="flex flex-wrap gap-2">
            {hostCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryToggle(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Life Stage Filter */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Estágio de Vida
          </label>
          <div className="flex flex-wrap gap-2">
            {lifeStages.map((stage) => (
              <Button
                key={stage.id}
                variant={selectedStages.includes(stage.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageToggle(stage.id)}
              >
                {stage.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Sex Filter */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Sexo
          </label>
          <div className="flex flex-wrap gap-2">
            {sexOptions.map((sex) => (
              <Button
                key={sex.id}
                variant={selectedSex.includes(sex.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleSexToggle(sex.id)}
              >
                {sex.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Selection Actions */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {selectedHosts.length} de {filteredHosts.length} selecionados
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

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Host List */}
        <div className={`overflow-y-auto border-r border-border ${isExpanded ? "w-1/2" : "flex-1"}`}>
          {filteredHosts.map((host) => (
            <div
              key={host.id}
              className={`px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors ${
                host.inCurrentMap ? "" : "opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedHosts.includes(host.id)}
                  onCheckedChange={() => handleHostToggle(host.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground italic">
                      {host.name}
                    </p>
                    {host.inCurrentMap && (
                      <span className="w-2 h-2 rounded-none bg-accent" title="No mapa atual" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{host.commonName ?? host.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-none ${getCategoryColor(host.category ?? "outro")}`}>
                      {hostCategories.find((c) => c.id === host.category)?.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {host.count ?? 0} ocorrência(s)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts (expanded view) */}
        {isExpanded && (
          <div className="w-1/2 overflow-y-auto p-4 space-y-6">
            {/* Time Distribution Chart */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Distribuição ao Longo do Tempo
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="period"
                      tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="humano"
                      name="Humanos"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="producao"
                      name="Produção"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="criacao"
                      name="Criação"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="silvestre"
                      name="Silvestres"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-none bg-destructive" />
                  <span className="text-xs text-muted-foreground">Humanos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-none bg-chart-3" />
                  <span className="text-xs text-muted-foreground">Produção</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-none bg-primary" />
                  <span className="text-xs text-muted-foreground">Criação</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-none bg-accent" />
                  <span className="text-xs text-muted-foreground">Silvestres</span>
                </div>
              </div>
            </div>

            {/* Regional Distribution Chart */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Distribuição por Região
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis
                      type="category"
                      dataKey="region"
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                      name="Ocorrências"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {showError && (
        <div className="px-4 py-3 bg-destructive/10 border-t border-destructive/20 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">
            Selecione pelo menos um hospedeiro para aplicar o filtro.
          </span>
        </div>
      )}

      {/* Apply Filter Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleApply}
          className="w-full"
          disabled={selectedHosts.length === 0}
        >
          Aplicar Filtro ({selectedHosts.length} hospedeiros)
        </Button>
      </div>
    </div>
  )
}
