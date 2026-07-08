interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="p-6 text-center text-sm">
      <p className="font-medium text-foreground">{title}</p>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </div>
  )
}
