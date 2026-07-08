"use client"

import { useState } from "react"

export function useVectorPanel(initialSelectedVectors: string[] = []) {
  const [selectedVectors, setSelectedVectors] = useState(initialSelectedVectors)

  return {
    selectedVectors,
    setSelectedVectors,
  }
}
