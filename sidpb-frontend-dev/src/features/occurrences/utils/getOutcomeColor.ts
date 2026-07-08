export function getOutcomeColor(outcome?: string | null): string {
  if (!outcome) return "text-muted-foreground"
  if (outcome === "Recuperado") return "text-accent"
  if (outcome === "Obito" || outcome === "Ã“bito") return "text-destructive"
  return "text-muted-foreground"
}
