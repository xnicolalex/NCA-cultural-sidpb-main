export function formatScaleKm(value: number) {
  if (value >= 100) return Math.round(value / 10) * 10
  if (value >= 10) return Math.round(value)
  return Number(value.toFixed(1))
}
