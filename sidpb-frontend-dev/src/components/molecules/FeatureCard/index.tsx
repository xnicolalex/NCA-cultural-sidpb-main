interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-none border border-border bg-background hover:border-primary/30 transition-colors">
      <div className="w-12 h-12 rounded-none bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
