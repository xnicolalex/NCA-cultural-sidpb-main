interface StatCardProps {
  value: string
  label: string
  sublabel?: string
}

export function StatCard({ value, label, sublabel }: StatCardProps) {
  return (
    <div className="text-center p-6 rounded-none border border-border bg-card">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {sublabel && <div className="text-xs text-muted-foreground/70 mt-1">{sublabel}</div>}
    </div>
  )
}
