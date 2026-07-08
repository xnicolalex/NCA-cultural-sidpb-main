

export function getClusterRadius(zoom: number) {
  if (zoom <= 4) return 70
  if (zoom <= 6) return 55
  if (zoom <= 8) return 42
  if (zoom <= 10) return 30

  return 0
}