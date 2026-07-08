"use client"

import { useState } from "react"
import type { DashboardToolbarPanel } from "@/components/organisms/DashboardToolbar"

export function useDashboardPanels() {
  const [activePanel, setActivePanel] = useState<DashboardToolbarPanel>(null)
  const [isPanelMaximized, setIsPanelMaximized] = useState(false)

  return {
    activePanel,
    setActivePanel,
    isPanelMaximized,
    setIsPanelMaximized,
  }
}
