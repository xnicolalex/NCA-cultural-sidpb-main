"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Maximize2, Minimize2, AlertCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useVectors } from "@/features/vectors/hooks/useVectors"

// Vector data
const vectors = [
  {
    id: "cochliomyia-hominivorax",
    scientificName: "Cochliomyia hominivorax",
    commonName: "Mosca-varejeira / Mosca da bicheira",
    description: "Principal causador de miíase primária no Brasil. Deposita ovos em feridas e tecidos vivos.",
    occurrenceCount: 12,
    isSelected: true,
  },
]

// Distribution over time data
const timeDistribution = [
  { period: "Antes de 2000", count: 3 },
  { period: "2000-2010", count: 4 },
  { period: "2011-2020", count: 5 },
]

// Regional distribution data
const regionDistribution = [
  { name: "Norte", value: 2 },
  { name: "Nordeste", value: 4 },
  { name: "Centro-Oeste", value: 2 },
  { name: "Sudeste", value: 3 },
  { name: "Sul", value: 1 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

interface VectorPanelProps {
  isExpanded: boolean
  onClose: () => void
  onToggleExpand: () => void
  selectedVectors: string[]
  onVectorSelect: (vectorIds: string[]) => void
  onApplyFilter: () => void
}

export function VectorPanel({
  isExpanded,
  onClose,
  onToggleExpand,
  selectedVectors,
  onVectorSelect,
  onApplyFilter,
}: VectorPanelProps) {
  const [showError, setShowError] = useState(false)
  const { data: vectorsFromApi } = useVectors()
  const vectorOptions = vectorsFromApi ?? vectors

  const handleVectorToggle = (vectorId: string) => {
    if (selectedVectors.includes(vectorId)) {
      onVectorSelect(selectedVectors.filter((id) => id !== vectorId))
    } else {
      onVectorSelect([...selectedVectors, vectorId])
    }
  }

  const handleApply = () => {
    if (selectedVectors.length === 0) {
      setShowError(true)
      return
    }
    setShowError(false)
    onApplyFilter()
  }

  return (
    <div
      className={`absolute left-4 top-16 bottom-4 z-20 bg-card border-r border-border shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded ? "w-[600px]" : "w-96"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Filtro por Vetor</h2>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Vector List */}
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Vetores Disponíveis
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Na versão atual, o sistema cobre apenas <em>Cochliomyia hominivorax</em>.
          </p>

          {vectorOptions.map((vector) => (
            <div
              key={vector.id}
              className={`p-4 rounded-none border ${
                selectedVectors.includes(vector.id)
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedVectors.includes(vector.id)}
                  onCheckedChange={() => handleVectorToggle(vector.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground italic">
                    {vector.scientificName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {vector.commonName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {vector.description}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-xs px-2 py-1 rounded-none bg-accent/10 text-accent font-medium">
                      {vector.occurrenceCount ?? 0} ocorrências no mapa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        {selectedVectors.length > 0 && (
          <>
            {/* Time Distribution Chart */}
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Distribuição ao Longo do Tempo
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="period"
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      name="Ocorrências"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Regional Distribution Chart */}
            {isExpanded && (
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Distribuição por Região
                </h3>
                <div className="h-56 flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {regionDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {regionDistribution.map((region, index) => (
                    <div key={region.name} className="flex items-center gap-1.5">
                      <div
                        className="w-3 h-3 rounded-none"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {region.name} ({region.value})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Error Message */}
      {showError && (
        <div className="px-4 py-3 bg-destructive/10 border-t border-destructive/20 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">
            Selecione pelo menos um vetor para aplicar o filtro.
          </span>
        </div>
      )}

      {/* Apply Filter Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleApply}
          className="w-full"
          disabled={selectedVectors.length === 0}
        >
          Aplicar Filtro
        </Button>
      </div>
    </div>
  )
}
