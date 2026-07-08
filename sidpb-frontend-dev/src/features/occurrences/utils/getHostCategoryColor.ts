export function getHostCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Humano: "bg-destructive/10 text-destructive",
    Producao: "bg-chart-3/10 text-chart-3",
    "ProduÃ§Ã£o": "bg-chart-3/10 text-chart-3",
    Criacao: "bg-primary/10 text-primary",
    "CriaÃ§Ã£o": "bg-primary/10 text-primary",
    Silvestre: "bg-accent/10 text-accent",
    Outro: "bg-muted text-muted-foreground",
  }

  return colors[category] || colors.Outro
}
