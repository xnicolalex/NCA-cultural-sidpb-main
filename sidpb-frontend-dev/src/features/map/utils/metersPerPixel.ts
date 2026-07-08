export function metersPerPixel(latitude: number, zoom: number) {
  return (40075016.686 * Math.cos((latitude * Math.PI) / 180)) / Math.pow(2, zoom + 8)
}
