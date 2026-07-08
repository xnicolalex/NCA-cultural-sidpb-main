import { AppHeader } from "@/components/organisms/AppHeader"

interface DashboardShellProps {
  footer: React.ReactNode
  children: React.ReactNode
}

export function DashboardShell({ footer, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader compact action="home" />
      <main className="flex-1 flex relative overflow-hidden min-h-0">{children}</main>
      {footer}
    </div>
  )
}
