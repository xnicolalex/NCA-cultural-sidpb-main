"use client"

import { useState, forwardRef } from "react"
import { useLocationSearch } from "@/features/locations/hooks/useLocationSearch"

interface LocationSearchProps {
  onLocationSelect: (
    lat: number,
    lon: number,
    suggestedZoom: number
  ) => void
}

export const LocationSearch = forwardRef<HTMLInputElement, LocationSearchProps>(
  function LocationSearch({ onLocationSelect }, ref) {
    const [query, setQuery] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)

    const { data: results } = useLocationSearch(query)

    return (
      <div className="relative w-full max-w-md z-[500]">
        <input
          ref={ref}
          id="map-search"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => {
            if (query.trim().length > 0) {
              setShowSuggestions(true)
            }
          }}
          placeholder="Pesquisar por bairro, cidade ou estado..."
          className="w-full px-3 pr-4 py-2 rounded-none border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />

        {showSuggestions && results && results.length > 0 && (
          <ul className="absolute w-full bg-white border border-slate-200 mt-1 rounded-none shadow-lg max-h-60 overflow-y-auto text-sm">
            {results.map((item) => (
              <li
                key={item.id}
                className="p-3 hover:bg-slate-100 cursor-pointer border-b border-slate-100 last:border-b-0"
                onClick={() => {
                  onLocationSelect(item.lat, item.lon, 13)
                  setQuery(item.label)
                  setShowSuggestions(false)
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

LocationSearch.displayName = "LocationSearch"