export interface LocationSearchResult {
  id: string
  label: string
  lat: number
  lon: number
  boundingBox?: [number, number, number, number]
}

export interface BrazilState {
  id: number | string
  name: string
  uf: string
}

export interface BrazilCity {
  id: number | string
  name: string
}
