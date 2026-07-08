interface SectionTitleProps {
  icon?: React.ReactNode
  title: string
  description?: string
}

export function SectionTitle({ icon, title, description }: SectionTitleProps) {
  return (
    <div className="flex items-start gap-2 text-foreground">
      {icon && <div className="text-primary mt-0.5">{icon}</div>}
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  )
}
