"use client"

import { useState } from "react"
import type { Occurrence } from "@/entities/occurrence/occurrence.types"

export function useOccurrenceSelection() {
  const [selectedOccurrences, setSelectedOccurrences] = useState<Occurrence[]>([])
  const [isOccurrencePanelExpanded, setIsOccurrencePanelExpanded] = useState(false)

  return {
    selectedOccurrences,
    setSelectedOccurrences,
    isOccurrencePanelExpanded,
    setIsOccurrencePanelExpanded,
  }
}
