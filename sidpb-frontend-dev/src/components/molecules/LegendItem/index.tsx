interface LegendItemProps {
  marker: React.ReactNode
  label: string
}

export function LegendItem({ marker, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-3">
      {marker}
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
