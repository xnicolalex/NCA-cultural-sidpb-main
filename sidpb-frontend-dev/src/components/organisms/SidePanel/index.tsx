import { cn } from "@/lib/utils"

interface SidePanelProps {
  isExpanded?: boolean
  className?: string
  children: React.ReactNode
}

export function SidePanel({ isExpanded = false, className, children }: SidePanelProps) {
  return (
    <div
      className={cn(
        "absolute left-16 top-0 bottom-0 z-20 bg-card border-r border-border shadow-xl flex flex-col transition-all duration-300",
        isExpanded ? "w-[600px]" : "w-96",
        className
      )}
    >
      {children}
    </div>
  )
}
