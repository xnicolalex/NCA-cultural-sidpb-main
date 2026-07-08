"use client"

import { createContext, useContext } from "react"

export const DashboardContext = createContext<Record<string, never> | null>(null)

export function useDashboardContext() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboardContext deve ser usado dentro de DashboardContext.Provider")
  }

  return context
}
