"use client"

import type { BrazilCity, BrazilState } from "@/entities/location/location.types"
import { apiRequest, SHOULD_USE_MOCKS } from "@/services/apiClient"
import { useApiQuery } from "@/hooks/useApiQuery"

interface IbgeState {
  id: number
  nome: string
  sigla: string
}

interface IbgeCity {
  id: number
  nome: string
}

const mockStates: BrazilState[] = [
  { id: "SP", name: "Sao Paulo", uf: "SP" },
  { id: "RJ", name: "Rio de Janeiro", uf: "RJ" },
  { id: "BA", name: "Bahia", uf: "BA" },
]

function normalizeState(state: IbgeState): BrazilState {
  return { id: state.id, name: state.nome, uf: state.sigla }
}

function normalizeCity(city: IbgeCity): BrazilCity {
  return { id: city.id, name: city.nome }
}

export function useBrazilStates() {
  return useApiQuery<BrazilState[]>(
    ["brazil-states"],
    async (signal) => {
      if (!SHOULD_USE_MOCKS) {
        return apiRequest<BrazilState[]>("/locations/states", { signal })
      }

      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
        { signal }
      )
      const data = (await response.json()) as IbgeState[]
      return data.map(normalizeState)
    },
    { fallbackData: mockStates }
  )
}

export function useBrazilCities(uf: string) {
  return useApiQuery<BrazilCity[]>(
    ["brazil-cities", uf],
    async (signal) => {
      if (!uf) return []

      if (!SHOULD_USE_MOCKS) {
        return apiRequest<BrazilCity[]>(`/locations/states/${uf}/cities`, { signal })
      }

      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
        { signal }
      )
      const data = (await response.json()) as IbgeCity[]
      return data.map(normalizeCity)
    },
    { enabled: Boolean(uf), fallbackData: [] }
  )
}
