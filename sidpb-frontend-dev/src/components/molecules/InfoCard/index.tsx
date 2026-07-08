interface InfoCardProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

export function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="p-3 rounded-none border border-border bg-background">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  )
}
