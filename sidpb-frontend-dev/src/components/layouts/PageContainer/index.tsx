import { cn } from "@/lib/utils"

interface PageContainerProps {
  className?: string
  children: React.ReactNode
}

export function PageContainer({ className, children }: PageContainerProps) {
  return <div className={cn("container mx-auto px-4", className)}>{children}</div>
}
