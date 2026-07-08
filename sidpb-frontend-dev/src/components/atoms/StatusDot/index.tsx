import { cn } from "@/lib/utils"

interface StatusDotProps {
  className?: string
  title?: string
}

export function StatusDot({ className, title }: StatusDotProps) {
  return <span className={cn("h-2 w-2 rounded-none bg-accent", className)} title={title} />
}
