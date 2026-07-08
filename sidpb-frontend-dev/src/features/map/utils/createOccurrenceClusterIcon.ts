

import L from "leaflet"

function getClusterColorClass(count: number) {
  if (count < 10) return "occurrence-cluster-low"
  if (count < 50) return "occurrence-cluster-medium"
  if (count < 100) return "occurrence-cluster-high"
  return "occurrence-cluster-critical"
}

function getClusterSize(count: number) {
  if (count < 10) return 34
  if (count < 50) return 42
  if (count < 100) return 50
  return 58
}

export function createOccurrenceClusterIcon(cluster: any) {
  const count = cluster.getChildCount()
  const size = getClusterSize(count)
  const className = getClusterColorClass(count)

  return L.divIcon({
    html: `
      <div class="occurrence-cluster ${className}" style="width:${size}px;height:${size}px;">
        <span>${count}</span>
      </div>
    `,
    className: "occurrence-cluster-wrapper",
    iconSize: L.point(size, size, true),
  })
}